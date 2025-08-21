import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-light border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="text-xl font-brand text-primary golden-text-glow brand-title">
                DreamWeaver
              </div>
            </Link>
            <p className="text-text-secondary max-w-md">
              Create magical, personalized bedtime stories for your children with AI. 
              Every story is unique and tailored to your child&apos;s interests and imagination.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-text-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-text-secondary hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@dreamweaver-app.com" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  support@dreamweaver-app.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} DreamWeaver. All rights reserved.
            </p>
            <p className="text-text-muted text-sm mt-4 md:mt-0">
              Made with ❤️ for families everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}