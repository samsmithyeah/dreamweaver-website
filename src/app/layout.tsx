import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// PlayfairDisplay only for brand name and story text
const playfairDisplay = localFont({
  src: './fonts/PlayfairDisplay-Regular.ttf',
  variable: '--font-playfair',
  display: 'swap',
});

// Use system fonts for everything else (matching mobile app)
// San Francisco on iOS/macOS, Segoe UI on Windows, Roboto on Android

export const metadata: Metadata = {
  title: 'DreamWeaver - AI Bedtime Stories for Kids',
  description:
    "Create magical, personalised bedtime stories with your children using AI. DreamWeaver generates unique stories tailored to your child's interests and imagination.",
  keywords:
    'bedtime stories, children stories, AI stories, personalised stories, kids app, parenting app',
  authors: [{ name: 'DreamWeaver Team' }],
  creator: 'DreamWeaver',
  publisher: 'DreamWeaver',
  metadataBase: new URL('https://dreamweaver-app.com'),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'DreamWeaver - AI Bedtime Stories for Kids',
    description:
      'Create magical, personalised bedtime stories with your children using AI.',
    url: 'https://dreamweaver-app.com',
    siteName: 'DreamWeaver',
    type: 'website',
    images: ['/favicon.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DreamWeaver - AI Bedtime Stories for Kids',
    description:
      'Create magical, personalised bedtime stories with your children using AI.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} antialiased`}>
        <div className="min-h-screen bg-navy-deep flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
