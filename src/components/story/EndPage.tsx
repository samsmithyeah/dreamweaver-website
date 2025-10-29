'use client';

import { EndTitle } from './EndTitle';
import { CallToAction } from './CallToAction';

interface EndPageProps {
  onReadAgain: () => void;
}

const CREAM_COLOR = '#F5E6C8';

export function EndPage({ onReadAgain }: EndPageProps) {
  return (
    <div className="bg-[#0f1129] flex items-center justify-center px-6 md:px-12 min-h-[calc(100vh-93px)] py-0 landscape:min-h-[65vh] landscape:py-8 landscape:px-8">
      <div className="max-w-xl landscape:max-w-2xl w-full">
        <div
          className="rounded-2xl border-[3px] border-[#D4AF37] p-6 md:p-8 landscape:p-10 shadow-[0_0_40px_rgba(212,175,55,0.4)] text-center w-full"
          style={{ backgroundColor: CREAM_COLOR }}
        >
          <EndTitle />
          <CallToAction onReadAgain={onReadAgain} />
        </div>
      </div>
    </div>
  );
}
