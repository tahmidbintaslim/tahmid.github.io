"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpenIcon, ClockIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon, FunnelIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  platform: "Medium" | "Dev.to";
  readTime?: string;
  coverImage?: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<"all" | "Medium" | "Dev.to">("all");
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Mock data - in production, replace with actual RSS feed fetching
        const mockPosts: BlogPost[] = [
          {
            title: "Building Scalable E-commerce Platforms with Shopify Plus",
            link: "https://medium.com/@tahmidbintaslimrafi",
            pubDate: "2024-01-15",
            description: "Learn how to architect and develop high-performance e-commerce solutions using Shopify Plus, Remix, and modern web technologies.",
            platform: "Medium",
            readTime: "8 min read",
            coverImage: "/blog/shopify-ecommerce.jpg",
          },
          {
            title: "Integrating AI/ML into Web Applications with OpenAI",
            link: "https://dev.to/tahmidbintaslim",
            pubDate: "2023-12-20",
            description: "A comprehensive guide to integrating GPT-3 and GPT-4 models into your web applications for enhanced user experiences.",
            platform: "Dev.to",
            readTime: "12 min read",
            coverImage: "/blog/ai-ml-integration.jpg",
          },
          {
            title: "Building Real-time Systems with Node.js and Redis",
            link: "https://medium.com/@tahmidbintaslimrafi",
            pubDate: "2023-11-10",
            description: "Explore the architecture and implementation of real-time systems using Node.js, Redis, and WebSockets for scalable applications.",
            platform: "Medium",
            readTime: "10 min read",
            coverImage: "/blog/nodejs-realtime.jpg",
          },
          {
            title: "Modern Full-Stack Development with Next.js 14",
            link: "https://dev.to/tahmidbintaslim",
            pubDate: "2023-10-05",
            description: "Discover the latest features and best practices for building full-stack applications with Next.js 14, TypeScript, and Tailwind CSS.",
            platform: "Dev.to",
            readTime: "15 min read",
            coverImage: "/blog/nextjs-fullstack.jpg",
          },
          {
            title: "Cloud-Native Architecture with AWS and Docker",
            link: "https://medium.com/@tahmidbintaslimrafi",
            pubDate: "2023-09-18",
            description: "Learn how to design and deploy cloud-native applications using AWS services, Docker containers, and Kubernetes orchestration.",
            platform: "Medium",
            readTime: "11 min read",
            coverImage: "/blog/cloud-aws.jpg",
          },
          {
            title: "Optimizing React Performance for Large Applications",
            link: "https://dev.to/tahmidbintaslim",
            pubDate: "2023-08-22",
            description: "Deep dive into React performance optimization techniques including code splitting, lazy loading, and memoization strategies.",
            platform: "Dev.to",
            readTime: "9 min read",
            coverImage: "/blog/react-performance.jpg",
          },
          {
            title: "Microservices Architecture with Node.js",
            link: "https://medium.com/@tahmidbintaslimrafi",
            pubDate: "2023-07-15",
            description: "Building scalable microservices with Node.js, Docker, and Kubernetes for enterprise applications.",
            platform: "Medium",
            readTime: "13 min read",
            coverImage: "/blog/nodejs-realtime.jpg",
          },
          {
            title: "TypeScript Best Practices for 2024",
            link: "https://dev.to/tahmidbintaslim",
            pubDate: "2023-06-10",
            description: "Essential TypeScript patterns and practices for building maintainable and type-safe applications.",
            platform: "Dev.to",
            readTime: "7 min read",
            coverImage: "/blog/nextjs-fullstack.jpg",
          },
          {
            title: "Serverless Functions with AWS Lambda",
            link: "https://medium.com/@tahmidbintaslimrafi",
            pubDate: "2023-05-20",
            description: "Complete guide to building and deploying serverless functions using AWS Lambda and API Gateway.",
            platform: "Medium",
            readTime: "14 min read",
            coverImage: "/blog/cloud-aws.jpg",
          },
        ];

        setPosts(mockPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
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
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlatform =
        selectedPlatform === "all" || post.platform === selectedPlatform;

      return matchesSearch && matchesPlatform;
    });

    // Sort posts
    filtered.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return sortBy === "latest" ? dateB - dateA : dateA - dateB;
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
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedPlatform("all");
    setSortBy("latest");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery !== "" || selectedPlatform !== "all" || sortBy !== "latest";

  return (
    <section
      id="blog"
      className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4"
    >
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-left md:text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[28px] md:text-[40px] lg:text-[50px] font-bold mb-3 md:mb-4 leading-tight">
              <span className="text-white">Latest Articles </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                & Insights
              </span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-2xl md:mx-auto">
              Sharing knowledge and experiences on full-stack development, cloud architecture,
              and modern web technologies
            </p>
          </motion.div>
        </div>

        {/* Search, Filter, and Sort Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-[#1a1a2e]/50 border border-purple-500/30 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Search articles by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-gray-200 hover:bg-purple-500/30 transition-colors min-h-[44px] w-full sm:w-auto"
              >
                <FunnelIcon className="w-5 h-5" />
                <span>Filters</span>
              </button>

              {/* Sort - Full width on mobile */}
              <div className="relative flex items-center gap-2 px-4 py-3 md:py-2 bg-[#1a1a2e]/50 border border-purple-500/30 rounded-lg min-h-[44px] w-full sm:w-auto">
                <ArrowsUpDownIcon className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "latest" | "oldest")}
                  className="bg-transparent text-gray-200 focus:outline-none cursor-pointer appearance-none pr-6 flex-1 text-sm sm:text-base"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              {/* Article Count */}
              <span className="text-gray-400 text-sm">
                Showing {paginatedPosts.length} of {filteredAndSortedPosts.length} articles
              </span>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors text-sm min-h-[44px] w-full sm:w-auto"
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
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-[#1a1a2e]/50 border border-purple-500/30 rounded-lg space-y-4"
            >
              {/* Platform Filter */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Platform</label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedPlatform("all")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPlatform === "all"
                        ? "bg-purple-500 text-white"
                        : "bg-purple-500/20 text-gray-300 hover:bg-purple-500/30"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedPlatform("Medium")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPlatform === "Medium"
                        ? "bg-green-500 text-white"
                        : "bg-green-500/20 text-gray-300 hover:bg-green-500/30"
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setSelectedPlatform("Dev.to")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPlatform === "Dev.to"
                        ? "bg-purple-600 text-white"
                        : "bg-purple-600/20 text-gray-300 hover:bg-purple-600/30"
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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="text-red-400 text-lg mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:opacity-80 transition-opacity"
            >
              Retry
            </button>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && paginatedPosts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                    <div className="h-full bg-gradient-to-br from-[#0a0a1a] to-[#1a0a2e] border border-purple-500/30 rounded-lg overflow-hidden hover:border-purple-500/60 transition-all duration-300 flex flex-col">
                      {/* Cover Image */}
                      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                        {post.coverImage ? (
                          <>
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                // Hide image on error and show gradient background
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpenIcon className="w-16 h-16 text-purple-400/40" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Platform Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              post.platform === "Medium"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            }`}
                          >
                            {post.platform}
                          </span>
                          <BookOpenIcon className="w-5 h-5 text-gray-400" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500 transition-all line-clamp-2 leading-tight">
                          {post.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 flex-1 line-clamp-3">
                          {post.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
                          <div className="flex items-center gap-4">
                            <span>{formatDate(post.pubDate)}</span>
                            {post.readTime && (
                              <div className="flex items-center gap-1">
                                <ClockIcon className="w-4 h-4" />
                                <span>{post.readTime}</span>
                              </div>
                            )}
                          </div>
                          <ArrowTopRightOnSquareIcon className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-3 md:p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-3 md:py-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] ${
                      currentPage === page
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold"
                        : "bg-purple-500/20 border border-purple-500/30 text-gray-300 hover:bg-purple-500/30"
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 md:p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Next page"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* View All Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link
                href="https://medium.com/@tahmidbintaslimrafi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2 font-semibold"
              >
                View All on Medium
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://dev.to/tahmidbintaslim"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2 font-semibold"
              >
                View All on Dev.to
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}

        {/* No Results State */}
        {!loading && !error && paginatedPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No articles found matching your criteria.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:opacity-80 transition-opacity"
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
