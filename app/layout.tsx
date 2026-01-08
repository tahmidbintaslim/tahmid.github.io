import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/stars-canvas-wrapper";
import CustomCursor from "@/components/main/custom-cursor";
import { siteConfig } from "@/config";
import { structuredData } from "@/config/structured-data";
import { cn } from "@/lib/utils";

import "./globals.css";

// Inter - Highly readable sans-serif for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Space Grotesk - Modern geometric sans-serif for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030014",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden font-sans"
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
        
        <StarsCanvas />
        <Navbar />
        <CustomCursor />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
