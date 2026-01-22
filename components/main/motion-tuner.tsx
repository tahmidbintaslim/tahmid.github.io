'use client';

import { useEffect, useRef } from 'react';

export default function MotionTuner() {
  const lastYRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      root.style.setProperty('--motion-scale', '0');
      return;
    }

    root.style.setProperty('--motion-scale', '1');

    const onScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
        lastYRef.current = currentY;
        return;
      }

      const dt = now - lastTimeRef.current;
      const dy = Math.abs(currentY - lastYRef.current);
      const velocity = dt > 0 ? dy / dt : 0;
      const scale = Math.max(0.6, Math.min(1, 1 - velocity * 0.6));

      root.style.setProperty('--motion-scale', scale.toFixed(2));
      window.dispatchEvent(
        new CustomEvent('motion-scale-change', { detail: { scale } })
      );

      lastTimeRef.current = now;
      lastYRef.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
