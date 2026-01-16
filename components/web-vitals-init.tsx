"use client";

import { useEffect } from "react";
import { initWebVitals } from "@/lib/web-vitals";

/**
 * Client-side component to initialize Web Vitals tracking
 * This must be a client component to access browser APIs
 */
export const WebVitalsInit = () => {
  useEffect(() => {
    // Initialize Web Vitals tracking when component mounts
    initWebVitals();
  }, []);

  // Component doesn't render anything
  return null;
};
