'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-navy-light border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-brand text-primary golden-text-glow brand-title">
              DreamWeaver
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/privacy-policy" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-of-service" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/contact" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/privacy-policy" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Terms of Service
              </Link>
              <Link 
                href="/contact" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}