'use client';

import { useEffect } from 'react';

type ContrastMode = 'light' | 'dark';

const TRANSPARENT = 'rgba(0, 0, 0, 0)';

const parseRgb = (value: string) => {
  const match = value.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/
  );
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] ? Number(match[4]) : 1,
  };
};

const luminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getBackgroundColor = (el: HTMLElement) => {
  let node: HTMLElement | null = el;
  while (node) {
    const style = getComputedStyle(node);
    const bg = style.backgroundColor;
    if (bg && bg !== TRANSPARENT) return bg;
    node = node.parentElement;
  }
  return TRANSPARENT;
};

const inferContrast = (el: HTMLElement): ContrastMode => {
  const forced = el.getAttribute('data-contrast');
  if (forced === 'light' || forced === 'dark') return forced;

  const bg = getBackgroundColor(el);
  const rgb = parseRgb(bg);
  if (!rgb || rgb.a === 0) return 'dark';

  const lum = luminance(rgb.r, rgb.g, rgb.b);
  return lum > 0.6 ? 'light' : 'dark';
};

const applyContrast = (mode: ContrastMode) => {
  const root = document.documentElement;
  root.setAttribute('data-contrast', mode);
};

export default function AutoContrast() {
  useEffect(() => {
    const scopes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-contrast-scope]')
    );
    const targets =
      scopes.length > 0
        ? scopes
        : Array.from(
            document.querySelectorAll<HTMLElement>(
              'main, main section, footer, header'
            )
          );

    if (targets.length === 0) return;

    applyContrast('dark');

    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target, entry.intersectionRatio);
        });

        let winner: HTMLElement | null = null;
        let maxRatio = 0;
        ratios.forEach((ratio, el) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            winner = el as HTMLElement;
          }
        });

        if (winner) {
          const mode = inferContrast(winner);
          applyContrast(mode);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -40% 0px',
      }
    );

    targets.forEach((el) => {
      ratios.set(el, 0);
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      ratios.clear();
    };
  }, []);

  return null;
}
