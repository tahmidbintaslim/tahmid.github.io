'use client';

import { gsap } from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';

type AnimatedTypewriterProps = {
  phrases: string[];
  className?: string;
};

export const AnimatedTypewriter = ({
  phrases,
  className,
}: AnimatedTypewriterProps) => {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const [displayText, setDisplayText] = useState('');

  const processedPhrases = useMemo(
    () =>
      phrases.map((phrase) =>
        phrase
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      ),
    [phrases]
  );

  const scrambleText = (text: string, duration: number = 1) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    // Start with a fully scrambled string so there's immediate visual feedback
    const scrambled = text
      .split('')
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
    setDisplayText(scrambled);

    // Tween a numeric progress value from 0 -> text.length and update display on each tick.
    const state = { progress: 0 };
    const tween = gsap.to(state, {
      progress: text.length,
      duration: Math.max(0.2, duration),
      ease: 'none',
      onUpdate: () => {
        const progress = Math.floor(state.progress);
        const newScrambled = text
          .split('')
          .map((char, i) =>
            i < progress
              ? char
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join('');
        setDisplayText(newScrambled);
      },
      onComplete: () => setDisplayText(text),
    });

    // ensure cleanup if needed (no-op here since caller timeline handles lifecycle)
    return () => tween.kill();
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      setDisplayText(processedPhrases[0]);
      return;
    }

    const sentenceEl = wrapper.querySelector<HTMLElement>('[data-sentence]');
    const cursor = wrapper.querySelector<HTMLElement>('[data-cursor]');

    if (!sentenceEl) {
      // Fallback to first phrase if the expected element is not found
      setDisplayText(processedPhrases[0]);
      return;
    }

    const timeline = gsap.timeline({ repeat: -1 });

    processedPhrases.forEach((phrase) => {
      timeline.call(() => {
        // Flip in
        gsap.to(sentenceEl, {
          rotationY: 180,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            // Start scramble
            scrambleText(phrase, 1);
          },
        });
      });

      // Wait for scramble
      timeline.to({}, { duration: 1.5 });

      // Hold
      timeline.to({}, { duration: 2 });

      // Flip out
      timeline.call(() => {
        gsap.to(sentenceEl, {
          rotationY: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      });

      timeline.to({}, { duration: 0.3 });
    });

    let cursorTween: gsap.core.Tween | null = null;
    if (cursor) {
      cursorTween = gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    return () => {
      timeline.kill();
      cursorTween?.kill();
    };
  }, [processedPhrases]);

  return (
    <span ref={wrapperRef} className="inline-block">
      <span className="sr-only">{phrases.join(' ')}</span>
      <span
        aria-hidden="true"
        data-sentence
        className={className ? `inline-block ${className}` : 'inline-block'}
      >
        {displayText}
        <span
          data-cursor
          className="ml-1 inline-block h-5 w-0.5 bg-purple-400 align-middle"
        />
      </span>
    </span>
  );
};
