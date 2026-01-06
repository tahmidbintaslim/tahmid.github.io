"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
  techStack?: readonly string[];
  role?: string;
  company?: string;
  year?: number;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
  techStack = [],
  role,
  company,
  year,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          "relative overflow-hidden rounded-lg shadow-lg",
          "border border-[#2A0E61] hover:border-purple-500/50",
          "transition-all duration-300 h-full flex flex-col",
          "bg-gradient-to-br from-[#0a0a1a] to-[#1a0a2e]"
        )}
      >
        {/* Image with overlay */}
        <div className="relative w-full min-h-[275px] overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onError={(e) => {
              // Hide image on error and show gradient background
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-60" />
          
          {/* Fallback icon if image fails */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-20 h-20 text-purple-400/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          {/* Role Badge */}
          {role && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-semibold shadow-lg">
              {role}
            </div>
          )}

          {/* Company & Year Badges with Modern Design */}
          {company && (
            <div className="absolute bottom-4 left-4 flex flex-col gap-2.5">
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/40 text-white text-sm font-semibold shadow-xl hover:shadow-cyan-500/50 transition-all duration-300">
                <span className="text-cyan-300">@</span> {company}
              </div>
              {year && (
                <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/40 text-purple-200 text-sm font-bold shadow-xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {year}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-4 md:p-6 flex-1 flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500 transition-all duration-300 leading-tight">
            {title}
          </h2>
          <p className="mt-2 md:mt-3 text-gray-300 text-sm md:text-base leading-relaxed flex-1 line-clamp-3">
            {description}
          </p>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* View Project Link */}
          <div className="mt-4 flex items-center text-cyan-400 font-semibold group-hover:text-cyan-300">
            View Project
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
