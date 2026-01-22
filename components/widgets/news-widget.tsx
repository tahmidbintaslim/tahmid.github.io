'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import {
  IoClose,
  IoNewspaperOutline,
  IoOpenOutline,
  IoTimeOutline,
} from 'react-icons/io5';

interface NewsArticle {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  description: string;
  image?: string;
}

export interface NewsWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialNews: NewsArticle[]; // Changed from 'news'
  initialError?: string | null; // Changed from 'lastUpdated' and made optional
}

export default function NewsWidget({
  isOpen,
  setIsOpen,
  initialNews, // Changed from 'news'
  initialError, // Changed from 'lastUpdated'
}: NewsWidgetProps) {
  const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(dateString).toLocaleDateString();
  };

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
    },
    [setIsOpen]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
    },
    [setIsOpen]
  );

  const handleArticleClick = useCallback((e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-40 cursor-pointer bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="contrast-dark bg-space-950/95 fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-cyan-500/20 backdrop-blur-xl md:top-16 md:bottom-0 md:w-105"
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-widget-title"
            aria-describedby="news-widget-subtitle"
            id="news-widget-dialog"
          >
            {/* Header - Fixed */}
            <div className="bg-space-950/80 shrink-0 border-b border-cyan-500/20 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-2">
                      <IoNewspaperOutline className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3
                        id="news-widget-title"
                        className="text-lg font-bold text-cyan-400"
                      >
                        Tech News
                      </h3>
                      <p className="text-muted text-xs">
                        <span id="news-widget-subtitle">
                          {initialError ? initialError : 'Latest headlines'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-xl p-2 transition-colors duration-200 ease-out hover:bg-white/10"
                  aria-label="Close news panel"
                  type="button"
                  autoFocus
                >
                  <IoClose className="text-muted h-6 w-6 transition-colors duration-200 ease-out hover:text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-5">
              {initialNews.length === 0 || initialError ? (
                <div className="text-muted py-12 text-start">
                  {initialError || 'No news available right now.'}
                </div>
              ) : (
                <div className="space-y-4">
                  {initialNews.map((article, index) => (
                    <button
                      key={`${article.url}-${index}`}
                      className="w-full rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-4 text-left transition-colors duration-200 ease-out hover:bg-cyan-500/10"
                      type="button"
                      aria-label={`Open article: ${article.title}`}
                      onClick={(e) => handleArticleClick(e, article.url)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-ink text-sm font-semibold">
                          {article.title}
                        </h4>
                        <IoOpenOutline className="text-muted mt-1 h-4 w-4" />
                      </div>
                      <p className="text-muted mt-2 text-xs">
                        {article.description}
                      </p>
                      <div className="text-muted mt-3 flex items-center justify-between text-xs">
                        <span className="font-medium text-cyan-400">
                          {article.source}
                        </span>
                        <div className="flex items-center gap-1">
                          <IoTimeOutline className="h-3 w-3" />
                          <span>{formatTimeAgo(article.publishedAt)}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-space-950/90 sticky bottom-0 z-10 border-t border-cyan-500/20 p-4 backdrop-blur-xl">
              <button
                onClick={handleClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-linear-to-r from-cyan-500/20 to-blue-500/20 px-4 py-3 font-medium text-white transition-colors duration-200 ease-out hover:border-blue-500/50 hover:from-cyan-500/30 hover:to-blue-500/30"
                type="button"
              >
                <IoClose className="h-5 w-5" />
                Close Panel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
