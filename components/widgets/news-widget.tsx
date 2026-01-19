'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  IoClose,
  IoCloudOutline,
  IoNewspaperOutline,
  IoOpenOutline,
  IoRefresh,
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

interface NewsWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  latitude?: number;
  longitude?: number;
  city?: string;
  weather?: {
    temperature: number;
    condition: string;
  } | null;
}

export default function NewsWidget({
  isOpen,
  setIsOpen,
  latitude: _latitude,
  longitude: _longitude,
  city,
  weather,
}: NewsWidgetProps) {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const fetchedRef = useRef(false);

  const fetchNews = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch from our own API route (server-side cached with ISR)
      const response = await fetch('/api/news');

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();

      if (data.success && data.articles?.length > 0) {
        const articles: NewsArticle[] = data.articles.map(
          (item: {
            title: string;
            source: string;
            link: string;
            pubDate: string;
            description?: string;
            thumbnail?: string;
          }) => ({
            title: item.title,
            source: item.source,
            url: item.link,
            publishedAt: item.pubDate,
            description: item.description || '',
            image: item.thumbnail,
          })
        );

        setNews(articles);
        setLastFetched(new Date());
      } else {
        // Fallback to static news links
        setNews([
          {
            title: 'Stay Updated with Tech News',
            source: 'Tech Feed',
            url: 'https://news.ycombinator.com',
            publishedAt: new Date().toISOString(),
            description:
              'Visit Hacker News for the latest tech discussions and breaking news.',
          },
          {
            title: 'TechCrunch - Breaking Tech News',
            source: 'TechCrunch',
            url: 'https://techcrunch.com',
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            description:
              'Get the latest technology news, analysis and startup coverage.',
          },
          {
            title: 'The Verge - Tech & Science',
            source: 'The Verge',
            url: 'https://www.theverge.com',
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            description:
              'The Verge covers the intersection of technology, science, art, and culture.',
          },
        ]);
        setLastFetched(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setError('Unable to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Fetch news when widget opens
  useEffect(() => {
    if (isOpen && !fetchedRef.current && !loading) {
      fetchedRef.current = true;
      fetchNews();
    }
  }, [isOpen, loading, fetchNews]);

  // Reset fetch flag when widget closes
  useEffect(() => {
    if (!isOpen) {
      // Keep data but allow refresh after 5 minutes
      const timeSinceLastFetch = lastFetched
        ? Date.now() - lastFetched.getTime()
        : Infinity;
      if (timeSinceLastFetch > 5 * 60 * 1000) {
        fetchedRef.current = false;
      }
    }
  }, [isOpen, lastFetched]);

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

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(!isOpen);
    },
    [isOpen, setIsOpen]
  );

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

  const handleRefresh = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      fetchedRef.current = false;
      fetchNews();
    },
    [fetchNews]
  );

  const handleArticleClick = useCallback((e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <>
      {/* Desktop Floating Button - Bigger with Animation */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 400 }}
        onClick={handleToggle}
        className="group fixed top-40 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-linear-to-br from-cyan-600/30 to-blue-600/30 shadow-lg shadow-cyan-500/20 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-500/40 md:flex"
        aria-label="Toggle news widget"
        type="button"
      >
        <motion.div
          animate={{
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <IoNewspaperOutline className="h-7 w-7 text-cyan-400 transition-colors group-hover:text-cyan-300" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
              className="fixed inset-0 z-44 cursor-pointer bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-60 flex h-full w-full max-w-md flex-col border-l border-cyan-500/20 bg-[#030014]/95 backdrop-blur-xl md:top-16 md:z-45 md:h-[calc(100vh-65px)] md:w-105"
              role="dialog"
              aria-modal="true"
              aria-labelledby="news-widget-title"
            >
              {/* Header - Fixed */}
              <div className="shrink-0 border-b border-cyan-500/20 bg-[#030014]/80 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-cyan-500/30 bg-linear-to-br from-cyan-500/20 to-blue-500/20 p-2">
                        <IoNewspaperOutline className="h-5 w-5 text-cyan-400" />
                      </div>
                      <h3
                        id="news-widget-title"
                        className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-xl font-bold text-transparent"
                      >
                        Tech News
                      </h3>
                    </div>
                    {(city || weather) && (
                      <div className="mt-3 ml-12 flex items-center gap-2">
                        {city && (
                          <p className="text-sm text-gray-400">{city}</p>
                        )}
                        {weather && (
                          <>
                            <span className="text-gray-600">•</span>
                            <div className="flex items-center gap-1 text-sm">
                              <IoCloudOutline className="text-blue-400" />
                              <span className="text-gray-300">
                                {weather.temperature}°C
                              </span>
                              <span className="text-gray-500">
                                {weather.condition}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleClose}
                    className="group rounded-xl border border-white/10 bg-white/5 p-2.5 transition-all duration-200 hover:border-red-500/30 hover:bg-white/10"
                    aria-label="Close news widget"
                    type="button"
                  >
                    <IoClose className="h-5 w-5 text-gray-400 transition-colors group-hover:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {loading && news.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-16">
                    <div className="h-10 w-10 animate-spin rounded-full border-3 border-cyan-500 border-t-transparent" />
                    <p className="text-sm text-gray-400">
                      Loading latest news...
                    </p>
                  </div>
                ) : error ? (
                  <div className="py-12 text-center text-gray-400">
                    <p className="mb-4">{error}</p>
                    <button
                      onClick={handleRefresh}
                      className="rounded-xl border border-cyan-500/30 bg-cyan-500/20 px-5 py-2.5 text-white transition-colors hover:bg-cyan-500/30"
                      type="button"
                    >
                      Try Again
                    </button>
                  </div>
                ) : news.length > 0 ? (
                  <>
                    {/* Last Updated Info */}
                    {lastFetched && (
                      <div className="flex items-center justify-between pb-2 text-xs text-gray-500">
                        <span>
                          Updated {formatTimeAgo(lastFetched.toISOString())}
                        </span>
                        <button
                          onClick={handleRefresh}
                          disabled={loading}
                          className="flex items-center gap-1 transition-colors hover:text-cyan-400 disabled:opacity-50"
                          type="button"
                        >
                          <IoRefresh
                            className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`}
                          />
                          Refresh
                        </button>
                      </div>
                    )}

                    {/* News Articles */}
                    {news.map((article, index) => (
                      <motion.article
                        key={`${article.url}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <button
                          onClick={(e) => handleArticleClick(e, article.url)}
                          className="group w-full cursor-pointer rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/10 p-4 text-left backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
                          type="button"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <h4 className="line-clamp-2 leading-snug font-semibold text-white transition-colors group-hover:text-cyan-400">
                                {article.title}
                              </h4>
                              {article.description && (
                                <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                                  {article.description}
                                </p>
                              )}
                              <div className="mt-3 flex items-center gap-3">
                                <span className="rounded-lg bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">
                                  {article.source}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                  <IoTimeOutline className="h-3 w-3" />
                                  {formatTimeAgo(article.publishedAt)}
                                </span>
                              </div>
                            </div>
                            <IoOpenOutline className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-cyan-400" />
                          </div>
                        </button>
                      </motion.article>
                    ))}
                  </>
                ) : (
                  <div className="py-12 text-center text-gray-400">
                    No news available
                  </div>
                )}
              </div>

              {/* Footer Navigation - Fixed at Bottom */}
              <div className="shrink-0 border-t border-cyan-500/20 bg-[#030014]/80 p-4 backdrop-blur-xl">
                <button
                  onClick={handleClose}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-linear-to-r from-cyan-500/20 to-blue-500/20 px-4 py-3 font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:from-cyan-500/30 hover:to-blue-500/30"
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
    </>
  );
}
