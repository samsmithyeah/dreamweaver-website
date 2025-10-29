import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryViewer } from '@/components/story/StoryViewer';
import { adminDb, adminStorage } from '@/lib/firebase-admin';

interface StoryPage {
  page: number;
  text: string;
  imageUrl: string;
  audioUrl?: string;
}

interface Child {
  id: string;
  childName: string;
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

async function getSharedStory(shareId: string): Promise<Story | null> {
  try {
    // Query for story with matching shareId
    const storiesSnapshot = await adminDb
      .collection('stories')
      .where('shareId', '==', shareId)
      .where('isShared', '==', true)
      .limit(1)
      .get();

    if (storiesSnapshot.empty) {
      return null;
    }

    const storyDoc = storiesSnapshot.docs[0];
    const storyData = storyDoc.data();

    // Get bucket once for efficiency
    const bucket = adminStorage.bucket();

    // Helper function to convert storage path to public URL
    const getPublicUrl = (storagePath: string): string => {
      if (!storagePath) return '';
      // Firebase Storage public URL format
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
          creatorDisplayName = userData?.displayName;

          // Fetch audience children names from selectedChildrenIds
          const selectedChildrenIds =
            storyData.generationMetadata?.selectedChildrenIds;
          if (
            selectedChildrenIds &&
            Array.isArray(selectedChildrenIds) &&
            selectedChildrenIds.length > 0
          ) {
            const children = (userData?.children || []) as Child[];
            audienceChildren = selectedChildrenIds
              .map((childId: string) => {
                const child = children.find((c: Child) => c.id === childId);
                return child?.childName;
              })
              .filter((name): name is string => name !== undefined);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    // Return story data without sensitive user information
    // Convert Firestore Timestamp to plain object
    const createdAt = storyData.createdAt?.toDate
      ? {
          seconds: storyData.createdAt.toDate().getTime() / 1000,
          nanoseconds: 0,
        }
      : storyData.createdAt;

    const story: Story = {
      id: storyDoc.id,
      title: storyData.title,
      storyContent,
      coverImageUrl: getPublicUrl(storyData.coverImageUrl),
      createdAt,
      storyConfiguration: {
        theme: storyData.storyConfiguration?.theme || 'Unknown Theme',
        illustrationStyle:
          storyData.storyConfiguration?.illustrationStyle || 'Default Style',
        pageCount: storyData.storyConfiguration?.pageCount || 0,
      },
      creatorDisplayName,
      audienceChildren,
    };

    return story;
  } catch (error) {
    console.error('Error fetching shared story:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shareId: string }>;
}): Promise<Metadata> {
  const { shareId } = await params;
  const story = await getSharedStory(shareId);

  if (!story) {
    return {
      title: 'Story Not Found - DreamWeaver',
    };
  }

  return {
    title: `${story.title} - DreamWeaver`,
    description: `Read this magical story created with DreamWeaver`,
    openGraph: {
      title: story.title,
      description: 'A magical story created with DreamWeaver',
      images: story.coverImageUrl ? [story.coverImageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: 'A magical story created with DreamWeaver',
      images: story.coverImageUrl ? [story.coverImageUrl] : [],
    },
  };
}

export default async function SharedStoryPage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = await params;
  const story = await getSharedStory(shareId);

  if (!story) {
    notFound();
  }

  return <StoryViewer story={story} shareId={shareId} />;
}
