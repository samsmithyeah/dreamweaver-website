import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-navy-deep flex items-center justify-center px-6 md:px-12 py-8 min-h-[60vh] landscape:py-8 landscape:px-8">
      <div className="max-w-xl landscape:max-w-2xl w-full">
        <div className="rounded-2xl border-[3px] border-primary p-6 md:p-8 landscape:p-10 shadow-[0_0_40px_rgba(212,175,55,0.4)] text-center w-full bg-cream">
          <h1 className="text-3xl md:text-5xl landscape:text-6xl font-bold text-navy-deep mb-4 landscape:mb-6 font-brand">
            Story not found
          </h1>
          <p className="text-base md:text-lg landscape:text-2xl text-navy-deep mb-6 landscape:mb-8 font-brand">
            The story you&apos;re looking for doesn&apos;t exist or is no longer
            shared.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-light text-navy-deep font-bold py-4 px-8 rounded-[25px] transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.6)] font-accent"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
