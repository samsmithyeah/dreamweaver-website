'use client';

import { useMemo } from 'react';
import { formatCreatorAndChildren } from '@/lib/name-utils';
import { APP_NAME } from '@/lib/constants';

interface CoverMetadataProps {
  creatorDisplayName?: string;
  audienceChildren?: string[];
  formattedDate: string | null;
  totalPages: number;
  onStartReading: () => void;
}

export function CoverMetadata({
  creatorDisplayName,
  audienceChildren,
  formattedDate,
  totalPages,
  onStartReading,
}: CoverMetadataProps) {
  const creatorAndChildrenText = useMemo(
    () => formatCreatorAndChildren(creatorDisplayName, audienceChildren),
    [creatorDisplayName, audienceChildren]
  );

  return (
    <div className="landscape:w-1/2 landscape:flex landscape:flex-col landscape:justify-center text-center space-y-3">
      {(creatorDisplayName || formattedDate) && (
        <div className="space-y-1">
          {creatorDisplayName && (
            <p className="text-lg text-white/80 font-accent">
              Created in the {APP_NAME} app by {creatorAndChildrenText}
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
        onClick={onStartReading}
        className="w-full max-w-[240px] mx-auto block bg-primary hover:bg-primary-light text-navy-deep font-bold py-4 px-8 rounded-[25px] transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.6)] font-accent"
      >
        Start reading
      </button>
    </div>
  );
}
