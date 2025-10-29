'use client';

import AppStoreButtons from '../AppStoreButtons';

interface CallToActionProps {
  onReadAgain: () => void;
}

export function CallToAction({ onReadAgain }: CallToActionProps) {
  return (
    <>
      <div className="mb-4 landscape:mb-6">
        <p
          className="text-base md:text-lg landscape:text-2xl text-[#0f1129] mb-2 landscape:mb-3"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Want to create your own magical stories?
        </p>
        <p
          className="text-sm md:text-base landscape:text-lg text-[#0f1129]/80"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Download DreamWeaver and start crafting personalised AI-powered
          stories with your children
        </p>
      </div>

      <div className="flex justify-center mb-3 landscape:mb-5 scale-90 landscape:scale-100">
        <AppStoreButtons
          showComingSoon={false}
          appStoreUrl="https://apps.apple.com/gb/app/dreamweaver-ai/id6749024646"
        />
      </div>

      <button
        onClick={onReadAgain}
        className="text-[#D4AF37] hover:text-[#fcd34d] font-semibold underline transition-colors text-sm landscape:text-base"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Read again
      </button>
    </>
  );
}
