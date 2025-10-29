'use client';

import { StoryImage } from './StoryImage';
import { StoryText } from './StoryText';
import { PageIndicator } from './PageIndicator';
import { NavigationArrows } from './NavigationArrows';

interface StoryPageData {
  page: number;
  text: string;
  imageUrl: string;
  audioUrl?: string;
}

interface StoryPageProps {
  page: StoryPageData;
  pageNumber: number;
  totalPages: number;
  storyTitle: string;
  onTitleClick: () => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
}

const CREAM_COLOR = '#F5E6C8';

export function StoryPage({
  page,
  pageNumber,
  totalPages,
  storyTitle,
  onTitleClick,
  onPrevious,
  onNext,
  canGoPrevious,
}: StoryPageProps) {
  return (
    <div className="bg-[#0f1129] flex items-start justify-center px-6 md:px-12 pt-4 md:pt-8 pb-8 landscape:items-center landscape:h-[calc(100vh-93px)] landscape:py-2 landscape:px-8">
      <div className="max-w-4xl landscape:max-w-none w-full relative landscape:h-full landscape:flex landscape:flex-col landscape:py-2">
        {/* Story title */}
        <h1
          className="text-2xl md:text-3xl font-bold text-center text-[#D4AF37] mb-6 cursor-pointer hover:text-[#fcd34d] transition-colors landscape:mb-2 landscape:text-lg landscape:flex-shrink-0"
          style={{ fontFamily: 'var(--font-playfair)' }}
          onClick={onTitleClick}
        >
          {storyTitle}
        </h1>

        <div
          className="rounded-2xl border-[3px] border-[#D4AF37] overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] landscape:flex-1 landscape:min-h-0 landscape:h-full"
          style={{ backgroundColor: CREAM_COLOR }}
        >
          {/* Responsive Layout: Side-by-side in landscape, stacked in portrait */}
          <div className="flex flex-col landscape:flex-row-reverse landscape:h-full landscape:overflow-hidden">
            <StoryImage
              imageUrl={page.imageUrl}
              pageNumber={pageNumber}
              pageLabel={page.page}
            />

            {/* Text and Page Number Section */}
            <div className="landscape:w-1/2 landscape:flex landscape:flex-col">
              <StoryText text={page.text} />
              <PageIndicator
                currentPage={pageNumber + 1}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>

        <NavigationArrows
          onPrevious={onPrevious}
          onNext={onNext}
          canGoPrevious={canGoPrevious}
        />
      </div>
    </div>
  );
}
