'use client';

import { HeroContent } from '@/components/sub/hero-content';
import { useState, useEffect } from 'react';

interface HeroProps {
  onLocationClick?: () => void;
  onNewsClick?: () => void;
  onFeedbackClick?: () => void;
  onVideoReady?: () => void;
}

export const Hero = ({
  onLocationClick,
  onNewsClick,
  onFeedbackClick,
  onVideoReady,
}: HeroProps) => {
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Only load video on larger screens
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      setLoadVideo(true);
    }
  }, []);

  useEffect(() => {
    // no-op: banner is managed at top-level
  }, [loadVideo, videoReady]);

  return (
    <div
      id="hero"
      data-cursor="ball"
      className="relative flex h-full w-full flex-col"
    >
      {loadVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          width={1920}
          height={1080}
          aria-label="Animated background video of a black hole"
          title="Black hole animation"
          onCanPlay={() => {
            setVideoReady(true);
            try {
              onVideoReady?.();
            } catch {}
          }}
          className={`pointer-events-none absolute -top-85 left-0 -z-20 h-full w-full rotate-180 object-cover transition-opacity duration-500 will-change-transform ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/videos/blackhole.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )}

      <HeroContent
        onLocationClick={onLocationClick}
        onNewsClick={onNewsClick}
        onFeedbackClick={onFeedbackClick}
      />
    </div>
  );
};
