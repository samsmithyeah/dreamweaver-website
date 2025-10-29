'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface StoryImageProps {
  imageUrl: string;
  pageNumber: number;
  pageLabel: number;
}

export function StoryImage({
  imageUrl,
  pageNumber,
  pageLabel,
}: StoryImageProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string>('1 / 1');
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset loading state when imageUrl or pageNumber changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [imageUrl, pageNumber]);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const ratio = `${img.width} / ${img.height}`;
      setAspectRatio(ratio);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  if (!imageUrl) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full landscape:w-1/2 bg-[rgba(26,27,58,0.5)] landscape:flex landscape:items-center landscape:justify-center"
      style={{ aspectRatio }}
    >
      {imageLoading && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {!imageError ? (
        <Image
          key={`page-${pageNumber}`}
          src={imageUrl}
          alt={`Page ${pageLabel}`}
          fill
          className={`transition-opacity duration-200 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ objectFit: 'contain', objectPosition: 'center' }}
          onLoadingComplete={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
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
  );
}
