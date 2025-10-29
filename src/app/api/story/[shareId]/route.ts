import { NextRequest, NextResponse } from 'next/server';
import { getSharedStory } from '@/server/lib/shared-story';

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

    const story = await getSharedStory(shareId);

    if (!story) {
      return NextResponse.json(
        { error: 'Shared story not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json({ success: true, story });
    // Cache for 5 minutes in browser, 1 hour in CDN with revalidation
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=300'
    );
    return response;
  } catch (error) {
    console.error('Error fetching shared story:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shared story' },
      { status: 500 }
    );
  }
}
