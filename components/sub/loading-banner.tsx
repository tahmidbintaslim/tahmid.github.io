'use client';

import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type LoadingBannerProps = {
  visible: boolean;
  onHiddenAction?: () => void;
  label?: string;
  tagline?: string;
  progress?: number; // 0-100
  minDuration?: number; // minimum display time in ms
  rememberKey?: string; // sessionStorage key to avoid repeat blocking
};

export default function LoadingBanner({
  visible,
  onHiddenAction,
  label = 'Tahmid Bin Taslim Rafi',
  tagline = 'Senior Software Engineer',
  progress = 0,
  minDuration = 1200,
  rememberKey = 'loading-banner-seen',
}: LoadingBannerProps) {
  const el = useRef<HTMLDivElement | null>(null);
  const progressCircleRef = useRef<SVGCircleElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const previousOverflowRef = useRef<string>('');
  const skipRef = useRef<boolean>(false);
  const prefersReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    const node = el.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    prefersReducedMotionRef.current = prefersReducedMotion;

    const tl = gsap.timeline({ paused: true });

    // Start immediately visible for preloader effect
    gsap.set(node, { autoAlpha: 1, scale: 1 });

    tlRef.current = tl;

    if (visible) {
      // Lock body scroll - banner is already visible
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    return () => {
      tl.kill();
      tlRef.current = null;
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      document.body.style.overflow = previousOverflowRef.current || '';
    };
  }, [visible]);

  const hideNow = useCallback(
    (node: HTMLDivElement) => {
      gsap.to(node, {
        autoAlpha: 0,
        scale: 1.1,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          document.body.style.overflow = previousOverflowRef.current || '';
          try {
            sessionStorage.setItem(rememberKey, 'true');
          } catch {}
          onHiddenAction?.();
        },
      });
    },
    [onHiddenAction, rememberKey]
  );

  useEffect(() => {
    const node = el.current;
    if (!node) return;

    if (visible) {
      try {
        const seen = sessionStorage.getItem(rememberKey);
        if (seen) {
          skipRef.current = true;
          onHiddenAction?.();
          return;
        }
      } catch {}
    }

    if (visible) {
      startTimeRef.current = Date.now();
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      tlRef.current?.play();
      return;
    }

    // Only hide when progress is complete
    if (progress < 100 && !skipRef.current) return;

    // Calculate elapsed time and delay to ensure minimum display duration
    const elapsed = Date.now() - startTimeRef.current;
    const delay = skipRef.current ? 0 : Math.max(0, minDuration - elapsed);

    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      // Hide with elegant fade out after minimum duration
      hideNow(node);
    }, delay);
  }, [visible, onHiddenAction, minDuration, progress, rememberKey, hideNow]);

  // Update progress circle
  useEffect(() => {
    const circle = progressCircleRef.current;
    if (!circle) return;

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (progress / 100) * circumference;
    circle.style.strokeDashoffset = offset.toString();
  }, [progress]);

  // Typing effect animation
  useEffect(() => {
    if (!visible) return;

    const node = el.current;
    if (!node) return;

    if (prefersReducedMotionRef.current) return;

    const maskElements = node.querySelectorAll('.mask div');
    if (maskElements.length === 0) return;

    // Create typing timeline
    const tl = gsap
      .timeline({ repeat: 10, repeatDelay: 1 })
      .from(maskElements, {
        xPercent: gsap.utils.wrap([100, -100]),
        stagger: 0.4,
        opacity: 0,
        ease: 'circ.inOut',
      })
      .to(
        maskElements,
        {
          opacity: 0,
          yPercent: gsap.utils.wrap([-100, 100]),
          duration: 1,
          ease: 'none',
        },
        '>0.5'
      );

    // Bar animation
    const bar = node.querySelector('.bar');
    if (bar) {
      gsap.fromTo(
        bar,
        { x: -200 },
        { x: 200, duration: 16, ease: 'none', repeat: 2, yoyo: true }
      );
    }

    return () => {
      tl.kill();
      if (bar) {
        gsap.killTweensOf(bar);
      }
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const node = el.current;
    if (!node) return;
    if (prefersReducedMotionRef.current) return;

    const ring = node.querySelector('.progress-ring');
    const shine = node.querySelector('.progress-shine');

    const tl = gsap.timeline();
    if (ring) {
      tl.fromTo(
        ring,
        { scale: 0.92, opacity: 0.8 },
        { scale: 1.02, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
    if (shine) {
      tl.fromTo(
        shine,
        { x: '-120%' },
        { x: '120%', duration: 1.6, ease: 'power2.out' },
        0.1
      );
    }

    return () => {
      tl.kill();
    };
  }, [visible]);

  return (
    <div
      ref={el}
      className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-space-950 via-space-900 to-space-950 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Loading content"
    >
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center shadow-2xl shadow-purple-500/10 backdrop-blur-xl sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-linear-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 opacity-70 blur-lg" />
        <div className="relative flex flex-col items-center space-y-4 sm:space-y-6">
          {/* Brand Title */}
          <div className="text-center">
            <p className="text-5 font-semibold tracking-tight text-white sm:text-7 md:text-9">
              <span className="bg-linear-to-r from-purple-400 via-cyan-400 to-purple-300 bg-clip-text text-transparent">
                {label}
              </span>
            </p>
            <p className="text-muted mt-2 text-xs tracking-[0.35em] uppercase sm:text-sm">
              {tagline}
            </p>
            <div className="mx-auto mt-3 h-px w-20 bg-linear-to-r from-transparent via-cyan-400/80 to-transparent sm:w-28"></div>
          </div>

          {/* Brand Keywords */}
          <div className="mask relative overflow-hidden">
            <div className="text-base font-semibold text-cyan-300 sm:text-lg">
              Design · Build · Scale
            </div>
            <div className="text-sm text-purple-300 sm:text-base">
              Cloud-native · AI integrations · Full-stack
            </div>
            <div className="text-xs text-amber-300 sm:text-sm">
              Fast, secure, conversion-focused
            </div>
          </div>

          {/* Animated Bar */}
          <div className="bar absolute bottom-8 left-1/2 h-0.5 w-28 -translate-x-1/2 bg-linear-to-r from-purple-500 to-cyan-500 sm:bottom-10 sm:h-1 sm:w-36"></div>

          {/* Circular Progress Loader */}
          <div className="relative">
            <div className="progress-shine pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/20 to-transparent blur-md"></div>
            <svg
              className="h-24 w-24 -rotate-90 transform sm:h-28 sm:w-28"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                ref={progressCircleRef}
                cx="50"
                cy="50"
                r="45"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45}`}
                className="progress-ring transition-all duration-300"
              />
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>

            {/* Progress Percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-white sm:text-xl">
                {Math.round(progress)}
              </span>
              <span className="text-muted ml-0.5 text-sm sm:ml-1 sm:text-base">
                %
              </span>
            </div>
          </div>

          {/* Subtle Loading Text */}
          <p className="text-muted text-xs font-medium tracking-[0.3em] uppercase sm:text-sm">
            Loading portfolio
          </p>

          <button
            type="button"
            onClick={() => {
              skipRef.current = true;
              const node = el.current;
              if (node) {
                hideNow(node);
              }
            }}
          className="text-muted text-xs transition-colors hover:text-ink"
        >
            Skip intro
          </button>
        </div>
      </div>
    </div>
  );
}
