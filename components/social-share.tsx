"use client";

import { useState } from "react";
import { ShareIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { shareOnPlatform, canShare } from "@/lib/social-share";

interface SocialShareProps {
  url: string;
  title: string;
  showLabel?: boolean;
  variant?: "compact" | "full";
}

const platforms = [
  { name: "twitter", label: "Twitter/X", icon: "𝕏" },
  { name: "linkedin", label: "LinkedIn", icon: "in" },
  { name: "facebook", label: "Facebook", icon: "f" },
  { name: "whatsapp", label: "WhatsApp", icon: "w" },
  { name: "email", label: "Email", icon: "✉" },
  { name: "copy", label: "Copy Link", icon: "📋" },
] as const;

export function SocialShare({
  url,
  title,
  showLabel = true,
  variant = "compact",
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const supportsShare = canShare();

  const handleShare = async (platform: (typeof platforms)[number]["name"]) => {
    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    } else {
      shareOnPlatform(
        platform as "twitter" | "linkedin" | "facebook" | "whatsapp" | "email",
        url
      );
      setIsOpen(false);
    }
  };

  if (variant === "full") {
    return (
      <div className="flex flex-wrap gap-3">
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform.name)}
            title={`Share on ${platform.label}`}
            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <span className="font-bold">{platform.icon}</span>
            {platform.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
        title="Share"
        aria-label="Share this page"
      >
        <ShareIcon className="h-5 w-5" />
        {showLabel && <span className="text-sm">Share</span>}
      </button>

      {/* Share Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 min-w-[200px]">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleShare(platform.name)}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                title={`Share on ${platform.label}`}
              >
                <span className="text-lg font-bold">{platform.icon}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {platform.label}
                </span>
                {copied && platform.name === "copy" && (
                  <CheckIcon className="h-4 w-4 ml-auto text-green-500" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
