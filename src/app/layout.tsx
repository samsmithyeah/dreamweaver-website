import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Modern, clean font for all content
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// PlayfairDisplay only for brand name
const playfairDisplay = localFont({
  src: "./fonts/PlayfairDisplay-Regular.ttf",
  variable: "--font-playfair",
  display: "swap",
});

// SpaceMono for buttons/accents
const spaceMono = localFont({
  src: "./fonts/SpaceMono-Regular.ttf", 
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DreamWeaver - AI Bedtime Stories for Kids",
  description: "Create magical, personalized bedtime stories for your children with AI. DreamWeaver generates unique stories tailored to your child's interests and imagination.",
  keywords: "bedtime stories, children stories, AI stories, personalized stories, kids app, parenting app",
  authors: [{ name: "DreamWeaver Team" }],
  creator: "DreamWeaver",
  publisher: "DreamWeaver",
  metadataBase: new URL('https://dreamweaver-app.com'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "DreamWeaver - AI Bedtime Stories for Kids",
    description: "Create magical, personalized bedtime stories for your children with AI.",
    url: "https://dreamweaver-app.com",
    siteName: "DreamWeaver",
    type: "website",
    images: ['/favicon.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamWeaver - AI Bedtime Stories for Kids", 
    description: "Create magical, personalized bedtime stories for your children with AI.",
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
      <body className={`${inter.variable} ${playfairDisplay.variable} ${spaceMono.variable} antialiased`}>
        <div className="min-h-screen bg-navy-deep flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
