'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useMemo, useRef } from 'react';

type AnimatedWordsProps = {
  text: string;
  className?: string;
  as?: React.ElementType;
};

export const AnimatedWords = ({
  text,
  className,
  as = 'h2',
}: AnimatedWordsProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const words = useMemo(() => text.split(' '), [text]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const targets = container.querySelectorAll('[data-word]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const Tag = as as any;

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          data-word
          className="inline-block whitespace-pre"
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
};
