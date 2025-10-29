'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CoverPage } from './CoverPage';
import { StoryPage } from './StoryPage';
import { EndPage } from './EndPage';

interface StoryPageData {
  page: number;
  text: string;
  imageUrl: string;
  audioUrl?: string;
}

interface Story {
  id: string;
  title: string;
  storyContent: StoryPageData[];
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

interface StoryViewerProps {
  story: Story;
  initialPage?: number;
}

export function StoryViewer({ story, initialPage = -1 }: StoryViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage); // -1 for cover page
  const totalPages = story.storyContent.length;

  // Update URL when page changes
  const updatePage = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    if (page === -1) {
      params.set('page', 'cover');
    } else if (page >= 0 && page < totalPages) {
      params.set('page', String(page + 1));
    } else if (page === totalPages) {
      params.set('page', 'end');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      updatePage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > -1) {
      updatePage(currentPage - 1);
    }
  };

  // Cover page
  if (currentPage === -1) {
    return <CoverPage story={story} onNext={handleNext} />;
  }

  // Story pages
  if (currentPage >= 0 && currentPage < totalPages) {
    const page = story.storyContent[currentPage];

    return (
      <StoryPage
        page={page}
        pageNumber={currentPage}
        totalPages={totalPages}
        storyTitle={story.title}
        creatorDisplayName={story.creatorDisplayName}
        audienceChildren={story.audienceChildren}
        onTitleClick={() => updatePage(-1)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={currentPage > 0}
      />
    );
  }

  // End page
  return <EndPage onReadAgain={() => updatePage(-1)} />;
}
