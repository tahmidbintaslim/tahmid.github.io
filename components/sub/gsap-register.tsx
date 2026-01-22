'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function GSAPRegister() {
  useEffect(() => {
    // Register built-in plugins if available
    (async () => {
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
      } catch {
        // already registered or not available
      }

      try {
        const mod = await import('gsap/ScrollToPlugin');
        // modern bundlers may export default or named
        // @ts-ignore
        gsap.registerPlugin(mod.ScrollToPlugin || mod.default || mod);
      } catch {
        // optional plugin not installed
      }

      // Try to import Spline runtime (optional) for integrations with Spline scenes
      try {
        // this package is optional; if present we'll attach to window for easy access
        // @ts-ignore - optional dependency
        const spline = await import('@splinetool/runtime');
        // @ts-ignore
        if (typeof window !== 'undefined') window.__splineRuntime = spline;
      } catch {
        // not critical if absent
      }
    })();
  }, []);

  return null;
}
