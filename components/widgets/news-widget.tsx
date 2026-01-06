"use client";

import { useState, useEffect } from "react";
import { IoNewspaperOutline, IoClose, IoOpenOutline, IoTimeOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface NewsArticle {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  description: string;
}

interface NewsWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function NewsWidget({ isOpen, setIsOpen }: NewsWidgetProps) {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const sampleNews: NewsArticle[] = [
        {
          title: "AI Breakthroughs in 2026: The Rise of Multimodal Models",
          source: "TechCrunch",
          url: "https://techcrunch.com",
          publishedAt: new Date().toISOString(),
          description: "Latest advancements in AI technology reshape the industry...",
        },
        {
          title: "Next.js 15 Released with Revolutionary Features",
          source: "Vercel Blog",
          url: "https://vercel.com/blog",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          description: "Partial Prerendering and Server Actions transform web development...",
        },
        {
          title: "Web Development Trends: What's Hot in 2026",
          source: "Dev.to",
          url: "https://dev.to",
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          description: "Bento grids, liquid glass UI, and scrollytelling dominate...",
        },
        {
          title: "TypeScript 6.0: Enhanced Type Safety and Performance",
          source: "TypeScript Blog",
          url: "https://devblogs.microsoft.com/typescript",
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          description: "Major update brings improved developer experience...",
        },
      ];

      setNews(sampleNews);
      setLoading(false);
    }

    if (isOpen) {
      fetchNews();
    }
  }, [isOpen]);

  const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex fixed right-4 md:right-6 top-48 z-[45] h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Toggle news widget"
      >
        <IoNewspaperOutline className="h-5 w-5 text-cyan-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[44]"
            />

            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 max-w-md bg-[#030014]/95 backdrop-blur-xl border-l border-white/10 z-[45] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#030014]/80 backdrop-blur-xl border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Tech News
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    aria-label="Close"
                  >
                    <IoClose className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Latest from the tech world
                </p>
              </div>

              <div className="p-6 space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
                  </div>
                ) : news.length > 0 ? (
                  news.map((article, index) => (
                    <motion.a
                      key={index}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 p-4 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs text-cyan-400 font-medium">
                              {article.source}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <IoTimeOutline className="h-3 w-3" />
                              {formatTimeAgo(article.publishedAt)}
                            </span>
                          </div>
                        </div>
                        <IoOpenOutline className="h-4 w-4 text-gray-400 group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    No news available
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
