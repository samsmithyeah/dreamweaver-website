'use client';

import { useState } from 'react';
import Image from 'next/image';
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
}

interface StoryViewerProps {
  story: Story;
}

export function StoryViewer({ story }: StoryViewerProps) {
  const [currentPage, setCurrentPage] = useState(-1); // -1 for cover page
  const totalPages = story.storyContent.length;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > -1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Cover page
  if (currentPage === -1) {
    return (
      <div className="min-h-screen bg-[#0f1129] flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="bg-[#F5E6C8] rounded-2xl border-4 border-[#D4AF37] p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <h1 className="text-4xl md:text-6xl font-bold text-center text-[#0f1129] mb-8 tracking-wider">
              {story.title}
            </h1>

            {story.coverImageUrl && (
              <div className="relative w-full aspect-square max-w-md mx-auto mb-8 rounded-xl overflow-hidden">
                <Image
                  src={story.coverImageUrl}
                  alt={story.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full bg-[#D4AF37] hover:bg-[#fcd34d] text-[#0f1129] font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.6)]"
            >
              Start Reading
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Story pages
  if (currentPage >= 0 && currentPage < totalPages) {
    const page = story.storyContent[currentPage];

    return (
      <div className="min-h-screen bg-[#0f1129] flex items-center justify-center p-4">
        <div className="max-w-5xl w-full">
          <div className="bg-[#F5E6C8] rounded-2xl border-4 border-[#D4AF37] overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            {/* Image Section */}
            {page.imageUrl && (
              <div className="relative w-full aspect-video md:aspect-[16/10] bg-white">
                <Image
                  src={page.imageUrl}
                  alt={`Page ${page.page}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}

            {/* Text Section */}
            <div className="p-6 md:p-10">
              <p className="text-lg md:text-2xl text-[#0f1129] leading-relaxed text-center font-medium">
                {page.text}
              </p>
            </div>

            {/* Navigation */}
            <div className="p-6 pt-0 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                className="bg-[#D4AF37] hover:bg-[#fcd34d] text-[#0f1129] font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-[#0f1129] font-semibold">
                {currentPage + 1} / {totalPages}
              </span>

              <button
                onClick={handleNext}
                className="bg-[#D4AF37] hover:bg-[#fcd34d] text-[#0f1129] font-bold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // End page
  return (
    <div className="min-h-screen bg-[#0f1129] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-[#F5E6C8] rounded-2xl border-4 border-[#D4AF37] p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.4)] text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-[#0f1129] mb-8 tracking-[0.3em]">
            THE
            <br />
            END
          </h2>

          <div className="mb-8">
            <p className="text-xl md:text-2xl text-[#0f1129] mb-4">
              Want to create your own magical stories?
            </p>
            <p className="text-lg text-[#0f1129]/80">
              Download DreamWeaver and start crafting personalized AI-powered
              stories for your children
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <AppStoreButtons showComingSoon={true} />
          </div>

          <button
            onClick={() => setCurrentPage(-1)}
            className="text-[#D4AF37] hover:text-[#fcd34d] font-semibold underline transition-colors"
          >
            Read Again
          </button>
        </div>
      </div>
    </div>
  );
}
