"use client";

import { useTheme } from "@/lib/theme-provider";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useTheme();

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <button
        disabled
        aria-label="Loading theme toggle"
        className="p-2 rounded-lg opacity-50"
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
}
