"use client";

import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
}

const SEARCH_DATA: SearchResult[] = [
  {
    id: "1",
    title: "About",
    description: "Learn more about me and my journey",
    category: "Navigation",
    href: "#about",
  },
  {
    id: "2",
    title: "Projects",
    description: "View my portfolio projects and work",
    category: "Navigation",
    href: "#projects",
  },
  {
    id: "3",
    title: "Skills",
    description: "Check out my technical skills",
    category: "Navigation",
    href: "#skills",
  },
  {
    id: "4",
    title: "Contact",
    description: "Get in touch with me",
    category: "Navigation",
    href: "#contact",
  },
  {
    id: "5",
    title: "Blog",
    description: "Read my articles and insights",
    category: "Navigation",
    href: "#blog",
  },
  {
    id: "6",
    title: "React",
    description: "JavaScript library for building user interfaces",
    category: "Skill",
    href: "#skills",
  },
  {
    id: "7",
    title: "TypeScript",
    description: "Typed superset of JavaScript",
    category: "Skill",
    href: "#skills",
  },
  {
    id: "8",
    title: "Next.js",
    description: "React framework for production",
    category: "Skill",
    href: "#skills",
  },
  {
    id: "9",
    title: "Tailwind CSS",
    description: "Utility-first CSS framework",
    category: "Skill",
    href: "#skills",
  },
];

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }

      if (isOpen && e.key === "Escape") {
        setIsOpen(false);
      }

      if (isOpen && e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      }

      if (isOpen && e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }

      if (isOpen && e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setSelectedIndex(0);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const filtered = SEARCH_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    setResults([]);

    const element = document.querySelector(result.href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open search"
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
        title="Search (Cmd+K)"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
        <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400">
          Cmd+K
        </span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl mx-auto z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search projects, skills, pages..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full ml-3 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500"
              />
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close search"
                className="p-1"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${
                        index === selectedIndex
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {result.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {result.description}
                          </p>
                        </div>
                        <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                          {result.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <p>No results found for &quot;{query}&quot;</p>
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <p className="mb-2">Start typing to search</p>
                  <p className="text-xs">
                    Use arrow keys to navigate, enter to select, ESC to close
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
