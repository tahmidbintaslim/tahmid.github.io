'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

type AnimatedUnderlineProps = {
  className?: string;
};

export const AnimatedUnderline = ({ className }: AnimatedUnderlineProps) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: path,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }, path);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      viewBox="0 0 220 12"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        ref={pathRef}
        d="M4 8 C 60 2, 120 2, 216 8"
        stroke="url(#underlineGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="underlineGradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
};
