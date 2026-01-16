"use client";

import { useEffect } from "react";
import { initializeMonitoring } from "@/lib/error-tracking";

/**
 * MonitoringInit
 * Initializes error tracking and performance monitoring services
 * Supports: Sentry, LogRocket, and custom error logging
 */
export function MonitoringInit() {
  useEffect(() => {
    initializeMonitoring();
  }, []);

  return null;
}
