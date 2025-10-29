'use client';

import { useMemo } from 'react';
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
  creatorDisplayName?: string;
  audienceChildren?: string[];
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
  creatorDisplayName,
  audienceChildren,
  onTitleClick,
  onPrevious,
  onNext,
  canGoPrevious,
}: StoryPageProps) {
  const formatNamesList = (names: string[]) => {
    if (names.length === 0) return '';
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
  };

  const getFirstName = (displayName: string) => {
    return displayName.split(' ')[0];
  };

  const creatorAndChildrenText = useMemo(() => {
    if (!creatorDisplayName) return '';
    const names = [getFirstName(creatorDisplayName)];
    if (audienceChildren && audienceChildren.length > 0) {
      names.push(...audienceChildren);
    }
    return formatNamesList(names);
  }, [creatorDisplayName, audienceChildren]);

  return (
    <div className="bg-[#0f1129] flex items-start justify-center px-6 md:px-12 pt-4 md:pt-8 pb-6 md:pb-8 landscape:items-center landscape:py-4 landscape:px-8">
      <div className="max-w-4xl landscape:max-w-none w-full relative">
        {/* Story title */}
        <h1
          className="text-2xl md:text-3xl font-bold text-center text-[#D4AF37] mb-6 cursor-pointer hover:text-[#fcd34d] transition-colors landscape:mb-2 landscape:text-lg landscape:flex-shrink-0"
          style={{ fontFamily: 'var(--font-playfair)' }}
          onClick={onTitleClick}
        >
          {storyTitle}
        </h1>

        <div
          className="rounded-2xl border-[3px] border-[#D4AF37] overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          style={{ backgroundColor: CREAM_COLOR }}
        >
          {/* Responsive Layout: Side-by-side in landscape, stacked in portrait */}
          <div className="flex flex-col landscape:flex-row-reverse">
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

        {creatorDisplayName && (
          <p className="text-center text-base text-white/80 font-accent mt-4">
            Created in the DreamWeaver app by {creatorAndChildrenText}
          </p>
        )}

        <NavigationArrows
          onPrevious={onPrevious}
          onNext={onNext}
          canGoPrevious={canGoPrevious}
        />
      </div>
    </div>
  );
}
