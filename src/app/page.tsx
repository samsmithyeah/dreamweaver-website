import AppStoreButtons from "@/components/AppStoreButtons";

export default function Home() {
  return (
    <div className="bg-navy-deep">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-brand text-primary golden-text-glow mb-6 brand-title">
              DreamWeaver
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto">
              Create magical, personalized bedtime stories for your children with AI. 
              Every story is unique and tailored to your child&apos;s interests and imagination.
            </p>
            
            {/* App Store Buttons */}
            <div className="mb-12">
              <AppStoreButtons showComingSoon={true} />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
