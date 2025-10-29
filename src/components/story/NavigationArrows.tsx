'use client';

interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
}

export function NavigationArrows({
  onPrevious,
  onNext,
  canGoPrevious,
}: NavigationArrowsProps) {
  return (
    <>
      {/* Previous Arrow */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
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

      {/* Next Arrow */}
      <button
        onClick={onNext}
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
    </>
  );
}
