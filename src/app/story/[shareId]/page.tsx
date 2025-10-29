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
