'use client';

import type { PropsWithChildren } from 'react';
import { HeroUIProvider } from '@heroui/react';

import { Footer } from '@/components/main/footer';
import { Navbar } from '@/components/main/navbar';
import { StarsCanvas } from '@/components/main/stars-canvas-wrapper';
import CustomCursor from '@/components/main/custom-cursor';
import AutoContrast from '@/components/main/auto-contrast';
import { Analytics } from '@vercel/analytics/next';

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <HeroUIProvider>
      {/* Skip to main content - Accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <StarsCanvas />
      <Navbar />
      <CustomCursor />
      <AutoContrast />
      {children}
      <Footer />
      <Analytics />
    </HeroUIProvider>
  );
}
