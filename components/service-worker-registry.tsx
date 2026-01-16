"use client";

import { useEffect } from "react";

/**
 * Service Worker Registration Component
 * Registers the service worker for offline support and caching
 */
export default function ServiceWorkerRegistry() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log("Service Worker registered successfully:", registration);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every 60 seconds
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }, []);

  return null;
}
