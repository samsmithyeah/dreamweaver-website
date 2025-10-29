import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryViewer } from '@/components/story/StoryViewer';
import { getSharedStory } from '@/server/lib/shared-story';

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
  searchParams,
}: {
  params: Promise<{ shareId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { shareId } = await params;
  const story = await getSharedStory(shareId);

  if (!story) {
    notFound();
  }

  // Read initial page from URL to prevent hydration mismatch
  const search = await searchParams;
  const pageParam = search.page;
  let initialPage = -1; // -1 for cover page

  if (pageParam === 'cover') {
    initialPage = -1;
  } else if (pageParam === 'end') {
    initialPage = story.storyContent.length;
  } else if (typeof pageParam === 'string') {
    const pageNum = parseInt(pageParam, 10);
    if (
      !isNaN(pageNum) &&
      pageNum >= 1 &&
      pageNum <= story.storyContent.length
    ) {
      initialPage = pageNum - 1;
    }
  }

  return <StoryViewer story={story} initialPage={initialPage} />;
}
