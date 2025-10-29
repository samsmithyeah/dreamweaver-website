import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminStorage } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

interface StoryPage {
  page: number;
  text: string;
  imageUrl: string;
  audioUrl?: string;
}

interface Story {
  id: string;
  title: string;
  storyContent: StoryPage[];
  coverImageUrl: string;
  createdAt: Date | { seconds: number; nanoseconds: number };
  storyConfiguration: {
    theme: string;
    illustrationStyle: string;
    pageCount: number;
  };
  creatorDisplayName?: string;
  audienceChildren?: string[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    const { shareId } = await params;

    if (!shareId) {
      return NextResponse.json(
        { error: 'Share ID is required' },
        { status: 400 }
      );
    }

    // Query for story with matching shareId
    const storiesSnapshot = await adminDb
      .collection('stories')
      .where('shareId', '==', shareId)
      .where('isShared', '==', true)
      .limit(1)
      .get();

    if (storiesSnapshot.empty) {
      return NextResponse.json(
        { error: 'Shared story not found' },
        { status: 404 }
      );
    }

    const storyDoc = storiesSnapshot.docs[0];
    const storyData = storyDoc.data();

    // Helper function to convert storage path to public URL
    const getPublicUrl = (storagePath: string): string => {
      if (!storagePath) return '';
      // Firebase Storage public URL format
      const bucket = adminStorage.bucket();
      return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storagePath)}?alt=media`;
    };

    // Convert all image paths to public URLs
    const storyContent = storyData.storyContent.map((page: StoryPage) => ({
      ...page,
      imageUrl: getPublicUrl(page.imageUrl),
      audioUrl: page.audioUrl ? getPublicUrl(page.audioUrl) : undefined,
    }));

    // Fetch creator's display name and audience children
    let creatorDisplayName: string | undefined;
    let audienceChildren: string[] | undefined;
    if (storyData.userId) {
      try {
        const userDoc = await adminDb
          .collection('users')
          .doc(storyData.userId)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          creatorDisplayName =
            userData?.displayName || userData?.email?.split('@')[0];

          // Fetch audience children names from selectedChildrenIds
          const selectedChildrenIds =
            storyData.generationMetadata?.selectedChildrenIds;
          if (
            selectedChildrenIds &&
            Array.isArray(selectedChildrenIds) &&
            selectedChildrenIds.length > 0
          ) {
            const children = userData?.children || [];
            audienceChildren = selectedChildrenIds
              .map((childId: string) => {
                const child = children.find((c: any) => c.id === childId);
                return child?.childName;
              })
              .filter((name: string | undefined) => name !== undefined);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    // Return story data without sensitive user information
    const story: Story = {
      id: storyDoc.id,
      title: storyData.title,
      storyContent,
      coverImageUrl: getPublicUrl(storyData.coverImageUrl),
      createdAt: storyData.createdAt,
      storyConfiguration: {
        theme: storyData.storyConfiguration?.theme,
        illustrationStyle: storyData.storyConfiguration?.illustrationStyle,
        pageCount: storyData.storyConfiguration?.pageCount,
      },
      creatorDisplayName,
      audienceChildren,
    };

    return NextResponse.json({ success: true, story });
  } catch (error) {
    console.error('Error fetching shared story:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shared story' },
      { status: 500 }
    );
  }
}
