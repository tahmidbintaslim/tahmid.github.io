import type { Metadata, Viewport } from 'next';
import { Cedarville_Cursive, Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import type { PropsWithChildren } from 'react';

import { siteConfig } from '@/config';
import { structuredData } from '@/config/structured-data';
import { themeColors } from '@/lib/theme';
import { cn } from '@/lib/utils';

import ClientLayout from './client-layout';

import './globals.css';

// Inter - Highly readable sans-serif for body text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Space Grotesk - Modern geometric sans-serif for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Cedarville Cursive - Decorative cursive font (lazy loaded)
const cedarvilleCursive = Cedarville_Cursive({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
  preload: false, // Don't preload since it's rarely used
});

export const viewport: Viewport = {
  themeColor: themeColors.space[950],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${cedarvilleCursive.variable}`}
    >
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llm.txt"
          title="LLM-ready site summary"
        />
      </head>
      <body
        className={cn(
          'bg-space-950 overflow-x-hidden overflow-y-scroll font-sans'
        )}
      >
        {/* Structured Data for SEO and AEO - optimized loading */}
        <Script
          id="structured-data-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.person),
          }}
        />
        <Script
          id="structured-data-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.website),
          }}
        />
        <Script
          id="structured-data-service"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.professionalService),
          }}
        />
        <Script
          id="structured-data-webpage"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.webPage),
          }}
        />
        <Script
          id="structured-data-faq"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.faqPage),
          }}
        />

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
