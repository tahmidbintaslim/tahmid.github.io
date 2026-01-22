'use client';

import { useEffect, useState } from 'react';

type CursorMode = 'default' | 'ball' | 'book' | 'rocket';

const getCursorMode = (target: EventTarget | null): CursorMode => {
  if (!(target instanceof HTMLElement)) return 'default';
  const el = target.closest<HTMLElement>('[data-cursor]');
  const value = el?.dataset.cursor;
  if (value === 'ball' || value === 'book' || value === 'rocket') {
    return value;
  }
  return 'default';
};

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setVisible(true);
    const onMove = (event: MouseEvent) => {
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
      setVisible(true);
      setMode(getCursorMode(event.target));
    };

    const onOver = (event: MouseEvent) => {
      setMode(getCursorMode(event.target));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${visible ? 'is-visible' : ''}`}
      aria-hidden="true"
    >
      <div className={`cursor-shape cursor-${mode}`}>
        {mode === 'book' ? (
          <svg viewBox="0 0 32 32" className="cursor-icon" aria-hidden="true">
            <path
              d="M6 7h10c2.2 0 4 1.8 4 4v14c-1-1-2.3-1.5-4-1.5H6V7z"
              fill="currentColor"
            />
            <path
              d="M26 7H16c-2.2 0-4 1.8-4 4v14c1-1 2.3-1.5 4-1.5h10V7z"
              fill="currentColor"
              opacity="0.75"
            />
          </svg>
        ) : mode === 'rocket' ? (
          <svg viewBox="0 0 32 32" className="cursor-icon" aria-hidden="true">
            <path
              d="M18 3c4 2 6 6 7 10-3 1-7 3-10 7-4 3-6 7-7 10 4-1 8-3 10-7 4-3 6-7 7-10 4-1 8-3 10-7-4-2-8-4-13-3-3 1-6 3-7 0z"
              fill="currentColor"
            />
            <circle cx="19" cy="12" r="2.5" fill="#0b0b18" />
          </svg>
        ) : mode === 'ball' ? (
          <div className="cursor-ball" />
        ) : (
          <div className="cursor-dot" />
        )}
      </div>
    </div>
  );
}
