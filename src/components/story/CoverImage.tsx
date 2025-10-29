'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CoverImageProps {
  imageUrl: string;
  title: string;
}

const CREAM_COLOR = '#F5E6C8';

export function CoverImage({ imageUrl, title }: CoverImageProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div
      className="rounded-2xl border-[3px] border-[#D4AF37] overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] mb-6 landscape:mb-0 landscape:w-1/2 landscape:max-h-[calc(100vh-93px-2rem)]"
      style={{ backgroundColor: CREAM_COLOR }}
    >
      {imageUrl && (
        <div className="relative w-full aspect-square bg-[rgba(26,27,58,0.5)] landscape:max-h-full">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            key="cover"
            src={imageUrl}
            alt={title}
            fill
            priority
            className={`object-cover transition-opacity duration-200 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoadingComplete={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </div>
      )}
    </div>
  );
}
