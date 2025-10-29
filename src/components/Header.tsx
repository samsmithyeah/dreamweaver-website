'use client';

import Link from 'next/link';
import { useState } from 'react';
import { APP_NAME } from '@/lib/constants';
import AppStoreButtons from './AppStoreButtons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-navy-light border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-brand text-primary golden-text-glow brand-title">
              {APP_NAME}
            </div>
          </Link>

          {/* Desktop App Store Buttons */}
          <div className="hidden md:block scale-75 origin-right">
            <AppStoreButtons
              showComingSoon={false}
              appStoreUrl="https://apps.apple.com/gb/app/dreamweaver-ai/id6749024646"
            />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="scale-90">
              <AppStoreButtons
                showComingSoon={false}
                appStoreUrl="https://apps.apple.com/gb/app/dreamweaver-ai/id6749024646"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
