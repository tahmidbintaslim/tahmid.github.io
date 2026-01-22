'use client';

import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const seen = sessionStorage.getItem('intro-loader-seen');
    if (seen) return;
    sessionStorage.setItem('intro-loader-seen', 'true');
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || !overlayRef.current || !countRef.current) return;

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (!countRef.current) return;
        countRef.current.textContent = `${Math.round(counter.value)}%`;
      },
    }).to(
      overlayRef.current,
      {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      '+=0.2'
    );

    return () => {
      tl.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="bg-space-950 fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-2 border-purple-500/40" />
        <span
          ref={countRef}
          className="text-sm font-semibold tracking-widest text-purple-300"
        >
          0%
        </span>
        <p className="text-muted text-xs">Loading portfolio</p>
      </div>
    </div>
  );
}
