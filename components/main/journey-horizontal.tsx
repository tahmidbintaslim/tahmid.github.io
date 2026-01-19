'use client';

import { slideInFromTop } from '@/lib/motion';
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { motion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  FaBuilding,
  FaChartBar,
  FaComments,
  FaPaintBrush,
  FaRocket,
  FaUtensils,
} from 'react-icons/fa';

export const JourneyHorizontal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({ container: containerRef });
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const timeline = [
    {
      year: 'March 2024 - Present',
      title: 'Senior Software Developer',
      company: "Marion's Kitchen Group",
      companyUrl: 'https://www.marionskitchen.com/',
      location: 'Bangkok, Thailand',
      description:
        'Leading full-stack Shopify Headless development with Remix, Node.js, TypeScript, and Rust. Pioneered Shopify app development, optimized e-commerce pipelines achieving ~40% sales boost, architected internal SaaS solutions, and built scalable Klaviyo integration APIs for advanced marketing automation.',
      technologies: [
        'Remix',
        'Node.js',
        'TypeScript',
        'Rust',
        'Shopify',
        'Klaviyo',
      ],
      achievements: [
        '~40% sales boost',
        'Internal SaaS architecture',
        'Klaviyo API integration',
      ],
      dotGradient: 'from-purple-500 to-purple-600',
      dotShadow: 'shadow-purple-500/50',
      badgeBg: 'bg-purple-500/20',
      badgeBorder: 'border-purple-500/30',
      badgeText: 'text-purple-300',
      iconColor: 'text-purple-400',
      techBadgeBg: 'bg-purple-500/10',
      techBadgeText: 'text-purple-300',
      techBadgeBorder: 'border-purple-500/30',
      logo: FaUtensils,
    },
    {
      year: 'May 2023 - February 2024',
      title: 'Senior Software Developer',
      company: 'Trienpont International',
      location: 'Bangkok, Thailand',
      description:
        'Led Full Stack Development team for real estate project, architecting robust Node.js APIs and Next.js/React front-ends. Optimized cloud deployments for enhanced performance, developed custom WordPress APIs/plugins, contributed to Ruby on Rails projects, and implemented comprehensive CI/CD workflows.',
      technologies: [
        'Node.js',
        'Next.js',
        'React',
        'Ruby on Rails',
        'WordPress',
        'CI/CD',
      ],
      achievements: [
        'Led Full Stack team',
        'Cloud optimization',
        'CI/CD implementation',
      ],
      dotGradient: 'from-cyan-500 to-cyan-600',
      dotShadow: 'shadow-cyan-500/50',
      badgeBg: 'bg-cyan-500/20',
      badgeBorder: 'border-cyan-500/30',
      badgeText: 'text-cyan-300',
      iconColor: 'text-cyan-400',
      techBadgeBg: 'bg-cyan-500/10',
      techBadgeText: 'text-cyan-300',
      techBadgeBorder: 'border-cyan-500/30',
      logo: FaBuilding,
    },
    {
      year: 'November 2021 - May 2023',
      title: 'Full Stack Developer',
      company: 'Relevant Audience',
      location: 'Bangkok, Thailand',
      description:
        'Directed technical team on high-impact projects. Engineered complex TCAS System using Node.js, TypeScript, Vue.js, TypeORM, Redis, MongoDB, AWS. Built custom e-commerce on WordPress/Shopify, developed AI-driven SEO tools in Python, and integrated enterprise solutions (Cal.com, Chatwoot, Outline).',
      technologies: [
        'Vue.js',
        'TypeScript',
        'TypeORM',
        'Redis',
        'MongoDB',
        'AWS',
        'Python',
      ],
      achievements: [
        'TCAS System architecture',
        'AI-driven SEO tools',
        'Enterprise integrations',
      ],
      dotGradient: 'from-green-500 to-green-600',
      dotShadow: 'shadow-green-500/50',
      badgeBg: 'bg-green-500/20',
      badgeBorder: 'border-green-500/30',
      badgeText: 'text-green-300',
      iconColor: 'text-green-400',
      techBadgeBg: 'bg-green-500/10',
      techBadgeText: 'text-green-300',
      techBadgeBorder: 'border-green-500/30',
      logo: FaChartBar,
    },
    {
      year: 'June 2021 - September 2021',
      title: 'Full Stack Developer',
      company: 'INFINITE AGENCY BKK',
      location: 'Bangkok, Thailand',
      description:
        "Drove 20% sales increase through e-commerce pipeline optimization on Shopify. Developed custom themes, executed comprehensive architectural revamp of Bettr Men's Facial Care website, and managed full website architecture for various e-commerce projects.",
      technologies: ['Shopify', 'JavaScript', 'CSS', 'E-commerce'],
      achievements: [
        '20% sales increase',
        'Bettr website revamp',
        'Custom theme development',
      ],
      dotGradient: 'from-blue-500 to-blue-600',
      dotShadow: 'shadow-blue-500/50',
      badgeBg: 'bg-blue-500/20',
      badgeBorder: 'border-blue-500/30',
      badgeText: 'text-blue-300',
      iconColor: 'text-blue-400',
      techBadgeBg: 'bg-blue-500/10',
      techBadgeText: 'text-blue-300',
      techBadgeBorder: 'border-blue-500/30',
      logo: FaPaintBrush,
    },
    {
      year: 'April 2021 - September 2021',
      title: 'Full Stack Developer',
      company: 'Adaptivity',
      location: 'Bangkok, Thailand',
      description:
        "Led strategic redesign of Adaptivity's brand website, revitalized WordPress theme. Developed custom chat application using OpenAI API and Python, integrated GPT-3/GPT-3.5 models into internal systems, and implemented comprehensive performance improvements.",
      technologies: ['OpenAI', 'Python', 'GPT-3', 'WordPress'],
      achievements: [
        'GPT chat application',
        'Website redesign',
        'OpenAI integration',
      ],
      dotGradient: 'from-pink-500 to-pink-600',
      dotShadow: 'shadow-pink-500/50',
      badgeBg: 'bg-pink-500/20',
      badgeBorder: 'border-pink-500/30',
      badgeText: 'text-pink-300',
      iconColor: 'text-pink-400',
      techBadgeBg: 'bg-pink-500/10',
      techBadgeText: 'text-pink-300',
      techBadgeBorder: 'border-pink-500/30',
      logo: FaComments,
    },
    {
      year: 'September 2020 - June 2021',
      title: 'Software Developer',
      company: 'Scalia Ventures',
      location: 'Bangkok, Thailand',
      description:
        'Successfully delivered 20+ custom web development projects for leading conglomerate agency. Demonstrated expertise in WordPress, Shopify, and custom solutions across restaurants, real estate, fashion, finance, and trading sectors.',
      technologies: ['WordPress', 'Shopify', 'HTML', 'CSS', 'JavaScript'],
      achievements: [
        '20+ projects delivered',
        'Multi-sector expertise',
        'Custom solutions',
      ],
      dotGradient: 'from-yellow-500 to-yellow-600',
      dotShadow: 'shadow-yellow-500/50',
      badgeBg: 'bg-yellow-500/20',
      badgeBorder: 'border-yellow-500/30',
      badgeText: 'text-yellow-300',
      iconColor: 'text-yellow-400',
      techBadgeBg: 'bg-yellow-500/10',
      techBadgeText: 'text-yellow-300',
      techBadgeBorder: 'border-yellow-500/30',
      logo: FaRocket,
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-20 md:px-20">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-linear-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="Welcome-box relative z-10 mb-6 border border-[#7042f88b] px-[7px] py-[8px] opacity-[0.9]"
      >
        <SparklesIcon className="mr-[10px] h-5 w-5 text-[#b49bff]" />
        <h2 className="Welcome-text text-[13px]">Professional Timeline</h2>
      </motion.div>

      <motion.h2
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mb-[15px] text-center text-[40px] font-bold text-white md:text-[50px]"
      >
        My{' '}
        <span className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
          Journey
        </span>
      </motion.h2>

      <motion.p
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mb-12 max-w-2xl text-center text-gray-300"
      >
        4 years of professional growth across cutting-edge technologies and
        diverse industries
      </motion.p>

      {/* Desktop: Horizontal Scrolling Timeline */}
      <div className="relative z-10 hidden w-full max-w-7xl md:block">
        <div
          ref={containerRef}
          className="scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-purple-500/10 overflow-x-auto overflow-y-hidden pb-8"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="relative flex min-w-max gap-8 px-8">
            {/* Timeline line */}
            <div className="absolute top-24 right-0 left-0 h-1 bg-linear-to-r from-purple-500 via-cyan-500 to-yellow-500" />

            {timeline.map((item, index) => {
              // Extract year from the date range with robust fallback
              const yearMatch = item.year.match(/(\d{4})/);
              const displayYear = yearMatch
                ? yearMatch[1]
                : new Date().getFullYear().toString();
              const companyUrl =
                'companyUrl' in item ? item.companyUrl : undefined;

              return (
                <motion.div
                  key={item.company}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative w-96 flex-shrink-0"
                >
                  {/* Year Marker replacing timeline dot */}
                  <div className="absolute top-24 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`rounded-xl bg-linear-to-r px-4 py-2 ${item.dotGradient} cursor-pointer border-2 border-[#030014] shadow-2xl ${item.dotShadow} backdrop-blur-sm`}
                    >
                      <span className="text-lg font-bold text-white">
                        {displayYear}
                      </span>
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    onClick={() =>
                      setSelectedJob(selectedJob === index ? null : index)
                    }
                    className="group mt-36 cursor-pointer rounded-2xl border border-purple-500/30 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Company Logo/Icon */}
                    <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                      <item.logo className={`text-6xl ${item.iconColor}`} />
                    </div>

                    {/* Year Badge */}
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${item.badgeBg} border ${item.badgeBorder} mb-4`}
                    >
                      <CalendarIcon className={`h-4 w-4 ${item.iconColor}`} />
                      <span className={`text-xs font-bold ${item.badgeText}`}>
                        {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
                      {item.title}
                    </h3>

                    {/* Company */}
                    <div className="mb-3 flex items-center gap-2">
                      <BuildingOfficeIcon
                        className={`h-5 w-5 ${item.iconColor}`}
                      />
                      {companyUrl ? (
                        <a
                          href={companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${item.iconColor} font-semibold transition-colors hover:text-white`}
                        >
                          {item.company}
                        </a>
                      ) : (
                        <p className={`${item.iconColor} font-semibold`}>
                          {item.company}
                        </p>
                      )}
                    </div>

                    {/* Location */}
                    <p className="mb-4 text-sm text-gray-400">
                      {item.location}
                    </p>

                    {/* Description */}
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-300 transition-all duration-300 group-hover:line-clamp-none">
                      {item.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {item.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-md px-2 py-1 text-xs ${item.techBadgeBg} ${item.techBadgeText} border ${item.techBadgeBorder}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 4 && (
                        <span className="rounded-md bg-gray-500/10 px-2 py-1 text-xs text-gray-300">
                          +{item.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Achievements (on hover/click) */}
                    {selectedJob === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-purple-500/20 pt-4"
                      >
                        <h5 className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
                          <BriefcaseIcon className="h-4 w-4 text-cyan-400" />
                          Key Achievements
                        </h5>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement) => (
                            <li
                              key={achievement}
                              className="flex items-start gap-2 text-sm text-gray-300"
                            >
                              <span className="mt-1 text-cyan-400">✓</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-center text-sm text-gray-400"
        >
          ← Scroll horizontally to explore timeline →
        </motion.div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="relative z-10 w-full max-w-xl md:hidden">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-4 w-1 bg-linear-to-b from-purple-500 via-cyan-500 to-yellow-500" />

          {timeline.map((item, index) => {
            const companyUrl =
              'companyUrl' in item ? item.companyUrl : undefined;

            return (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative mb-8 pl-12"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-8 left-4 h-4 w-4 -translate-x-1/2 transform rounded-full bg-linear-to-r ${item.dotGradient} border-4 border-[#030014] shadow-lg ${item.dotShadow}`}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    setSelectedJob(selectedJob === index ? null : index)
                  }
                  className="cursor-pointer rounded-xl border border-purple-500/30 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50"
                >
                  {/* Logo */}
                  <div className="mb-3">
                    <item.logo className={`text-4xl ${item.iconColor}`} />
                  </div>

                  {/* Year */}
                  <div
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${item.badgeBg} border ${item.badgeBorder} mb-3`}
                  >
                    <CalendarIcon className={`h-3 w-3 ${item.iconColor}`} />
                    <span className={`text-xs font-bold ${item.badgeText}`}>
                      {item.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  {/* Company */}
                  <div className="mb-3 flex items-center gap-2">
                    <BuildingOfficeIcon
                      className={`h-4 w-4 ${item.iconColor}`}
                    />
                    {companyUrl ? (
                      <a
                        href={companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${item.iconColor} text-sm font-semibold transition-colors hover:text-white`}
                      >
                        {item.company}
                      </a>
                    ) : (
                      <p className={`${item.iconColor} text-sm font-semibold`}>
                        {item.company}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-300">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-md px-2 py-1 text-xs ${item.techBadgeBg} ${item.techBadgeText} border ${item.techBadgeBorder}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span className="rounded-md bg-gray-500/10 px-2 py-1 text-xs text-gray-300">
                        +{item.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Achievements (expanded) */}
                  {selectedJob === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 border-t border-purple-500/20 pt-3"
                    >
                      <h5 className="mb-2 text-sm font-bold text-white">
                        Key Achievements
                      </h5>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-start gap-2 text-xs text-gray-300"
                          >
                            <span className="text-cyan-400">✓</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
