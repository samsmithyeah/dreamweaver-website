import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f1129] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-[#1A1B3A] rounded-2xl border-2 border-[#D4AF37]/30 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4">
            Story Not Found
          </h1>
          <p className="text-xl text-white/80 mb-8">
            The story you&apos;re looking for doesn&apos;t exist or is no longer
            shared.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#D4AF37] hover:bg-[#fcd34d] text-[#0f1129] font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.6)]"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
