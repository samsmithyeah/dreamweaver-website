import Link from 'next/link';

const CREAM_COLOR = '#F5E6C8';

export default function NotFound() {
  return (
    <div className="bg-[#0f1129] flex items-center justify-center px-6 md:px-12 py-8 min-h-[60vh] landscape:py-8 landscape:px-8">
      <div className="max-w-xl landscape:max-w-2xl w-full">
        <div
          className="rounded-2xl border-[3px] border-[#D4AF37] p-6 md:p-8 landscape:p-10 shadow-[0_0_40px_rgba(212,175,55,0.4)] text-center w-full"
          style={{ backgroundColor: CREAM_COLOR }}
        >
          <h1
            className="text-3xl md:text-5xl landscape:text-6xl font-bold text-[#0f1129] mb-4 landscape:mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Story not found
          </h1>
          <p
            className="text-base md:text-lg landscape:text-2xl text-[#0f1129] mb-6 landscape:mb-8"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            The story you&apos;re looking for doesn&apos;t exist or is no longer
            shared.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#D4AF37] hover:bg-[#fcd34d] text-[#0f1129] font-bold py-4 px-8 rounded-[25px] transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.6)] font-accent"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
