'use client';

import { CoverImage } from './CoverImage';
import { CoverMetadata } from './CoverMetadata';
import { formatDate } from '@/lib/utils';

interface Story {
  id: string;
  title: string;
  coverImageUrl: string;
  createdAt: Date | { seconds: number; nanoseconds: number };
  creatorDisplayName?: string;
  audienceChildren?: string[];
  storyContent: { page: number }[];
}

interface CoverPageProps {
  story: Story;
  onNext: () => void;
}

export function CoverPage({ story, onNext }: CoverPageProps) {
  const formattedDate = formatDate(story.createdAt);
  const totalPages = story.storyContent.length;

  return (
    <div className="bg-[#0f1129] flex items-start justify-center px-6 md:px-12 pt-16 pb-12 landscape:items-center landscape:h-[calc(100vh-93px)] landscape:py-4 landscape:px-8">
      <div className="max-w-3xl landscape:max-w-none w-full landscape:h-full landscape:flex landscape:items-center landscape:gap-8">
        <CoverImage imageUrl={story.coverImageUrl} title={story.title} />
        <CoverMetadata
          creatorDisplayName={story.creatorDisplayName}
          audienceChildren={story.audienceChildren}
          formattedDate={formattedDate}
          totalPages={totalPages}
          onStartReading={onNext}
        />
      </div>
    </div>
  );
}
