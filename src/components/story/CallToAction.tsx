'use client';

import AppStoreButtons from '../AppStoreButtons';
import { APP_NAME } from '@/lib/constants';

interface CallToActionProps {
  onReadAgain: () => void;
}

export function CallToAction({ onReadAgain }: CallToActionProps) {
  return (
    <>
      <div className="mb-4 landscape:mb-6">
        <p className="text-base md:text-lg landscape:text-2xl text-navy-deep mb-2 landscape:mb-3 font-brand">
          Want to create your own magical stories?
        </p>
        <p className="text-sm md:text-base landscape:text-lg text-navy-deep/80 font-brand">
          Download {APP_NAME} and start crafting personalised AI-powered stories
          with your children
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
        className="text-primary hover:text-primary-light font-semibold underline transition-colors text-sm landscape:text-base font-brand"
      >
        Read again
      </button>
    </>
  );
}
