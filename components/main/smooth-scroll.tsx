'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const baseDuration = 1.1;
    const lenis = new Lenis({
      duration: baseDuration,
      smoothWheel: true,
      syncTouch: false,
      gestureOrientation: 'vertical',
    });

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || !link.hash) return;

      const hash = link.hash.slice(1);
      if (!hash) return;

      const targetEl = document.getElementById(hash);
      if (!targetEl) return;

      event.preventDefault();
      lenis.scrollTo(targetEl, { offset: -80, duration: baseDuration });
    };

    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    const handleScaleChange = (event: Event) => {
      const detail = (event as CustomEvent<{ scale: number }>).detail;
      if (!detail) return;
      lenis.options.duration = baseDuration * detail.scale;
    };

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);
    lenis.on('scroll', handleLenisScroll);
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('motion-scale-change', handleScaleChange);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('motion-scale-change', handleScaleChange);
      lenis.off('scroll', handleLenisScroll);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
