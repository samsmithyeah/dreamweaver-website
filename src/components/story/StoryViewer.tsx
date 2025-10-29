'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import AppStoreButtons from '../AppStoreButtons';

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

interface StoryViewerProps {
  story: Story;
  shareId: string;
}

const CREAM_COLOR = '#F5E6C8';

export function StoryViewer({ story }: StoryViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(-1); // -1 for cover page
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const totalPages = story.storyContent.length;

  // Initialize current page from URL
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam === 'cover') {
      setCurrentPage(-1);
    } else if (pageParam) {
      const pageNum = parseInt(pageParam, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum - 1);
      }
    }
  }, [searchParams, totalPages]);

  // Update URL when page changes
  const updatePage = (page: number) => {
    setCurrentPage(page);
    // Set loading state for the new page
    if (page >= 0 && page < totalPages) {
      setImageLoading(prev => ({ ...prev, [page]: true }));
    } else if (page === -1) {
      setImageLoading(prev => ({ ...prev, [-1]: true }));
    }
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

  const formatDate = (
    date: Date | { seconds: number; nanoseconds: number }
  ) => {
    try {
      let d: Date;
      if (date instanceof Date) {
        d = date;
      } else if (date && typeof date === 'object' && 'seconds' in date) {
        d = new Date(date.seconds * 1000);
      } else {
        return null;
      }

      if (isNaN(d.getTime())) {
        return null;
      }

      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return null;
    }
  };

  const formatNamesList = (names: string[]) => {
    if (names.length === 0) return '';
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
  };

  const getFirstName = (displayName: string) => {
    return displayName.split(' ')[0];
  };

  // Cover page
  if (currentPage === -1) {
    const formattedDate = formatDate(story.createdAt);

    return (
      <div className="bg-[#0f1129] flex items-start justify-center px-6 md:px-12 pt-16 pb-12">
        <div className="max-w-3xl w-full">
          {/* Image card */}
          <div
            className="rounded-2xl border-[3px] border-[#D4AF37] overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] mb-6"
            style={{ backgroundColor: CREAM_COLOR }}
          >
            {story.coverImageUrl && (
              <div className="relative w-full aspect-square bg-[rgba(26,27,58,0.5)]">
                {imageLoading[-1] !== false && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <Image
                  key="cover"
                  src={story.coverImageUrl}
                  alt={story.title}
                  fill
                  className={`object-cover transition-opacity duration-200 ${imageLoading[-1] !== false ? 'opacity-0' : 'opacity-100'}`}
                  unoptimized
                  onLoadingComplete={() =>
                    setImageLoading(prev => ({ ...prev, [-1]: false }))
                  }
                  onError={() => {
                    setImageLoading(prev => ({ ...prev, [-1]: false }));
                    setImageErrors(prev => ({ ...prev, [-1]: true }));
                  }}
                />
              </div>
            )}
          </div>

          {/* Metadata and CTA below the image */}
          <div className="text-center space-y-3">
            {(story.creatorDisplayName || formattedDate) && (
              <div className="space-y-1">
                {story.creatorDisplayName && (
                  <p className="text-lg text-white/80 font-accent">
                    Created in DreamWeaver by{' '}
                    {(() => {
                      const names = [getFirstName(story.creatorDisplayName)];
                      if (story.audienceChildren && story.audienceChildren.length > 0) {
                        names.push(...story.audienceChildren);
                      }
                      return formatNamesList(names);
                    })()}
                  </p>
                )}
                {formattedDate && (
                  <p className="text-base text-white/60 font-accent">
                    {formattedDate}
                  </p>
                )}
              </div>
            )}

            <p className="text-white/70 font-accent">
              {totalPages} {totalPages === 1 ? 'page' : 'pages'}
            </p>

            <button
              onClick={handleNext}
              className="w-full max-w-[240px] mx-auto block bg-[#D4AF37] hover:bg-[#fcd34d] text-[#0f1129] font-bold py-4 px-8 rounded-[25px] transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.6)] font-accent"
            >
              Start reading
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Story pages
  if (currentPage >= 0 && currentPage < totalPages) {
    const page = story.storyContent[currentPage];
    const pageNumber = currentPage;

    return (
      <div className="bg-[#0f1129] flex items-start justify-center px-6 md:px-12 pt-4 md:pt-8 pb-8">
        <div className="max-w-4xl w-full relative">
          {/* Story title */}
          <h1
            className="text-2xl md:text-3xl font-bold text-center text-[#D4AF37] mb-6 cursor-pointer hover:text-[#fcd34d] transition-colors"
            style={{ fontFamily: 'var(--font-playfair)' }}
            onClick={() => updatePage(-1)}
          >
            {story.title}
          </h1>

          <div
            className="rounded-2xl border-[3px] border-[#D4AF37] overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            style={{ backgroundColor: CREAM_COLOR }}
          >
            {/* Image Section */}
            {page.imageUrl && (
              <div className="relative w-full aspect-square bg-[rgba(26,27,58,0.5)]">
                {imageLoading[pageNumber] !== false &&
                  !imageErrors[pageNumber] && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                {!imageErrors[pageNumber] ? (
                  <Image
                    key={`page-${pageNumber}`}
                    src={page.imageUrl}
                    alt={`Page ${page.page}`}
                    fill
                    className={`object-cover transition-opacity duration-200 ${imageLoading[pageNumber] !== false ? 'opacity-0' : 'opacity-100'}`}
                    unoptimized
                    onLoadingComplete={() =>
                      setImageLoading(prev => ({
                        ...prev,
                        [pageNumber]: false,
                      }))
                    }
                    onError={() => {
                      setImageLoading(prev => ({
                        ...prev,
                        [pageNumber]: false,
                      }));
                      setImageErrors(prev => ({ ...prev, [pageNumber]: true }));
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 mx-auto mb-2 text-[#999]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-[#999]">Image unavailable</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Text Section */}
            <div className="p-6 md:p-10">
              <p
                className="text-lg md:text-2xl text-[#1a1b3a] leading-relaxed text-center"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {page.text}
              </p>
            </div>

            {/* Page Number */}
            <div className="px-6 pb-6 pt-0 flex items-center justify-center">
              <span className="text-[#8B7355] font-semibold font-accent text-sm">
                Page {currentPage + 1} of {totalPages}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10"
            aria-label="Previous page"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-all duration-200 z-10"
            aria-label="Next page"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // End page
  return (
    <div className="min-h-screen bg-[#0f1129] flex items-center justify-center px-6 md:px-12 py-8">
      <div className="max-w-3xl w-full">
        <div
          className="rounded-2xl border-[3px] border-[#D4AF37] p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.4)] text-center"
          style={{ backgroundColor: CREAM_COLOR }}
        >
          <h2
            className="text-5xl md:text-7xl font-bold text-[#0f1129] mb-8 tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            THE
            <br />
            END
          </h2>

          <div className="mb-8">
            <p
              className="text-xl md:text-2xl text-[#0f1129] mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Want to create your own magical stories?
            </p>
            <p
              className="text-lg text-[#0f1129]/80"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Download DreamWeaver and start crafting personalised AI-powered
              stories with your children
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <AppStoreButtons
              showComingSoon={false}
              appStoreUrl="https://apps.apple.com/gb/app/dreamweaver-ai/id6749024646"
            />
          </div>

          <button
            onClick={() => updatePage(-1)}
            className="text-[#D4AF37] hover:text-[#fcd34d] font-semibold underline transition-colors"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Read again
          </button>
        </div>
      </div>
    </div>
  );
}
