'use client';

import {
  ArrowsUpDownIcon,
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  platform: 'Medium' | 'Dev.to';
  readTime?: string;
  coverImage?: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<
    'all' | 'Medium' | 'Dev.to'
  >('all');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
  const [showFilters, setShowFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        // Fetch from our own API route (SSR with ISR caching)
        const response = await fetch('/api/blog', {
          next: { revalidate: 3600 }, // Use cached data for 1 hour
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const data = await response.json();

        if (data.success && data.posts?.length > 0) {
          setPosts(data.posts);
          setError(null);
        } else {
          setError('No blog posts found. Please check back later.');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter, sort and paginate posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlatform =
        selectedPlatform === 'all' || post.platform === selectedPlatform;

      return matchesSearch && matchesPlatform;
    });

    // Sort posts
    filtered.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [posts, searchQuery, selectedPlatform, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / articlesPerPage);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedPlatform, sortBy]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('all');
    setSortBy('latest');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedPlatform !== 'all' || sortBy !== 'latest';

  return (
    <section
      id="blog"
      className="flex flex-col items-center justify-center px-4 py-12 md:py-16 lg:py-20"
    >
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-left md:mb-12 md:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-3 text-[28px] leading-tight font-bold md:mb-4 md:text-[40px] lg:text-[50px]">
              <span className="text-white">Latest Articles </span>
              <span className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                & Insights
              </span>
            </h1>
            <p className="max-w-2xl text-sm text-gray-300 md:mx-auto md:text-base lg:text-lg">
              Sharing knowledge and experiences on full-stack development, cloud
              architecture, and modern web technologies
            </p>
          </motion.div>
        </div>

        {/* Search, Filter, and Sort Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full rounded-lg border border-purple-500/30 bg-[#1a1a2e]/50 py-3 pr-4 pl-10 text-gray-200 placeholder-gray-400 transition-colors focus:border-purple-500 focus:outline-none"
              placeholder="Search articles by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/20 px-4 py-3 text-gray-200 transition-colors hover:bg-purple-500/30 sm:w-auto md:py-2"
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
              </button>

              {/* Sort - Full width on mobile */}
              <div className="relative flex min-h-[44px] w-full items-center gap-2 rounded-lg border border-purple-500/30 bg-[#1a1a2e]/50 px-4 py-3 sm:w-auto md:py-2">
                <ArrowsUpDownIcon className="h-5 w-5 flex-shrink-0 text-purple-400" />
                <label htmlFor="sort-articles" className="sr-only">
                  Sort articles
                </label>
                <select
                  id="sort-articles"
                  title="Sort articles by date"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'latest' | 'oldest')
                  }
                  className="flex-1 cursor-pointer appearance-none bg-transparent pr-6 text-sm text-gray-200 focus:outline-none sm:text-base"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                <svg
                  className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              {/* Article Count */}
              <span className="text-sm text-gray-400">
                Showing {paginatedPosts.length} of{' '}
                {filteredAndSortedPosts.length} articles
              </span>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="min-h-[44px] w-full rounded-lg border border-red-500/30 bg-red-500/20 px-4 py-2 text-sm text-red-300 transition-colors hover:bg-red-500/30 sm:w-auto"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Filter Options (Collapsible) */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 rounded-lg border border-purple-500/30 bg-[#1a1a2e]/50 p-4"
            >
              {/* Platform Filter */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedPlatform('all')}
                    className={`rounded-lg px-4 py-2 transition-colors ${
                      selectedPlatform === 'all'
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-500/20 text-gray-300 hover:bg-purple-500/30'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedPlatform('Medium')}
                    className={`rounded-lg px-4 py-2 transition-colors ${
                      selectedPlatform === 'Medium'
                        ? 'bg-green-500 text-white'
                        : 'bg-green-500/20 text-gray-300 hover:bg-green-500/30'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setSelectedPlatform('Dev.to')}
                    className={`rounded-lg px-4 py-2 transition-colors ${
                      selectedPlatform === 'Dev.to'
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-600/20 text-gray-300 hover:bg-purple-600/30'
                    }`}
                  >
                    Dev.to
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-20 text-center">
            <div className="mb-4 text-lg text-red-400">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 px-6 py-3 text-white transition-opacity hover:opacity-80"
            >
              Retry
            </button>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && paginatedPosts.length > 0 && (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={`${post.title}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="group"
                >
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-purple-500/30 bg-linear-to-br from-[#0a0a1a] to-[#1a0a2e] transition-all duration-300 hover:border-purple-500/60">
                      {/* Cover Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-purple-500/20 to-cyan-500/20">
                        {post.coverImage ? (
                          <>
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                // Hide image on error and show gradient background
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a1a] to-transparent" />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpenIcon className="h-16 w-16 text-purple-400/40" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        {/* Platform Badge */}
                        <div className="mb-4 flex items-center justify-between">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              post.platform === 'Medium'
                                ? 'border border-green-500/30 bg-green-500/20 text-green-300'
                                : 'border border-purple-500/30 bg-purple-500/20 text-purple-300'
                            }`}
                          >
                            {post.platform}
                          </span>
                          <BookOpenIcon className="h-5 w-5 text-gray-400" />
                        </div>

                        {/* Title */}
                        <h2 className="mb-3 line-clamp-2 text-lg leading-tight font-bold text-white transition-all group-hover:bg-linear-to-r group-hover:from-purple-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent md:text-xl">
                          {post.title}
                        </h2>

                        {/* Description */}
                        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-300 md:text-base">
                          {post.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-gray-700 pt-4 text-sm text-gray-400">
                          <div className="flex items-center gap-4">
                            <span>{formatDate(post.pubDate)}</span>
                            {post.readTime && (
                              <div className="flex items-center gap-1">
                                <ClockIcon className="h-4 w-4" />
                                <span>{post.readTime}</span>
                              </div>
                            )}
                          </div>
                          <ArrowTopRightOnSquareIcon className="h-5 w-5 transition-colors group-hover:text-cyan-400" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/20 p-3 text-gray-300 transition-colors hover:bg-purple-500/30 disabled:cursor-not-allowed disabled:opacity-50 md:p-2"
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-h-[44px] min-w-[44px] rounded-lg px-4 py-3 transition-colors md:py-2 ${
                        currentPage === page
                          ? 'bg-linear-to-r from-purple-500 to-cyan-500 font-bold text-white'
                          : 'border border-purple-500/30 bg-purple-500/20 text-gray-300 hover:bg-purple-500/30'
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/20 p-3 text-gray-300 transition-colors hover:bg-purple-500/30 disabled:cursor-not-allowed disabled:opacity-50 md:p-2"
                  aria-label="Next page"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* View All Links */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="https://medium.com/@tahmidbintaslimrafi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-green-600 px-8 py-3 font-semibold text-white transition-opacity hover:opacity-80"
              >
                View All on Medium
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://dev.to/tahmidbintaslim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-linear-to-r from-purple-500 to-purple-600 px-8 py-3 font-semibold text-white transition-opacity hover:opacity-80"
              >
                View All on Dev.to
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </Link>
            </div>
          </>
        )}

        {/* No Results State */}
        {!loading && !error && paginatedPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="mb-4 text-lg text-gray-400">
              No articles found matching your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 px-6 py-3 text-white transition-opacity hover:opacity-80"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
