'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
          'relative overflow-hidden rounded-lg shadow-lg',
          'border border-[#2A0E61] hover:border-purple-500/50',
          'flex h-full flex-col transition-all duration-300',
          'bg-linear-to-br from-[#0a0a1a] to-[#1a0a2e]'
        )}
      >
        {/* Image with overlay */}
        <div className="relative min-h-[275px] w-full overflow-hidden bg-linear-to-br from-purple-500/20 to-cyan-500/20">
          <Image
            src={src}
            alt={title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Hide image on error and show gradient background
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a1a] via-transparent to-transparent opacity-60" />

          {/* Fallback icon if image fails */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <svg
              className="h-20 w-20 text-purple-400/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* Role Badge */}
          {role && (
            <div className="absolute top-4 right-4 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              {role}
            </div>
          )}

          {/* Company & Year Badges with Modern Design */}
          {company && (
            <div className="absolute bottom-4 left-4 flex flex-col gap-2.5">
              <div className="rounded-xl border border-cyan-400/40 bg-linear-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-cyan-500/50">
                <span className="text-cyan-300">@</span> {company}
              </div>
              {year && (
                <div className="flex items-center gap-2 rounded-xl border border-purple-400/40 bg-linear-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 text-sm font-bold text-purple-200 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-purple-500/50">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {year}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col p-4 md:p-6">
          <h2 className="text-xl leading-tight font-bold text-white transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-purple-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent md:text-2xl">
            {title}
          </h2>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-300 md:mt-3 md:text-base">
            {description}
          </p>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* View Project Link */}
          <div className="mt-4 flex items-center font-semibold text-cyan-400 group-hover:text-cyan-300">
            View Project
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
