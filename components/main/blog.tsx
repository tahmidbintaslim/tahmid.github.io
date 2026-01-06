"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpenIcon, ClockIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Since we can't directly fetch RSS feeds due to CORS, we'll use a proxy or mock data
        // In production, you'd want to use a serverless function or backend API
        
        // For now, we'll use mock data - in production, replace with actual RSS feed fetching
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section
      id="blog"
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
              Latest Articles & Insights
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Sharing knowledge and experiences on full-stack development, cloud architecture,
              and modern web technologies
            </p>
          </motion.div>
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
        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post, index) => (
                <motion.div
                  key={index}
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
                      {post.coverImage && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
                        </div>
                      )}

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
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500 transition-all line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
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

            {/* View All Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
      </div>
    </section>
  );
};

export default Blog;
