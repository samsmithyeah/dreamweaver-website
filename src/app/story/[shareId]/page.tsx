import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryViewer } from '@/components/story/StoryViewer';

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
}

async function getSharedStory(shareId: string): Promise<Story | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/story/${shareId}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.story;
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

  return <StoryViewer story={story} />;
}
