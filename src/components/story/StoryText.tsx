'use client';

interface StoryTextProps {
  text: string;
}

export function StoryText({ text }: StoryTextProps) {
  return (
    <div className="p-6 md:p-10 landscape:p-4 landscape:flex-1 landscape:overflow-hidden landscape:flex landscape:flex-col">
      <div className="landscape:flex-1 landscape:overflow-y-auto landscape:max-h-full landscape:flex landscape:items-center landscape:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <p
          className="text-lg md:text-2xl text-[#1a1b3a] leading-relaxed text-center"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
