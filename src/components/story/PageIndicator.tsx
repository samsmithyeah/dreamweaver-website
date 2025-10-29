'use client';

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

export function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  return (
    <div className="px-6 pb-6 pt-0 landscape:pb-4 landscape:pt-0 landscape:flex-shrink-0 flex items-center justify-center">
      <span className="text-[#8B7355] font-semibold font-accent text-sm">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
