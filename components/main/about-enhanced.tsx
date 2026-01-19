'use client';

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/lib/motion';
import {
  CheckBadgeIcon,
  CloudIcon as CloudIconSolid,
  CodeBracketIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  ShoppingCartIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa';
import {
  SiAngular,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiJavascript,
  SiKubernetes,
  SiLaravel,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiRemix,
  SiRuby,
  SiRubyonrails,
  SiRust,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

// Icon map for easy lookup - using react-icons components
const iconComponentsMap: Record<string, IconType> = {
  siPython: SiPython,
  siJavascript: SiJavascript,
  siTypescript: SiTypescript,
  siPhp: SiPhp,
  siRust: SiRust,
  siGo: SiGo,
  siRuby: SiRuby,
  siReact: SiReact,
  siVuedotjs: SiVuedotjs,
  siNextdotjs: SiNextdotjs,
  siRemix: SiRemix,
  siAngular: SiAngular,
  siTailwindcss: SiTailwindcss,
  siMui: SiMui,
  siNodedotjs: SiNodedotjs,
  siDjango: SiDjango,
  siFlask: SiFlask,
  siFastapi: SiFastapi,
  siLaravel: SiLaravel,
  siRubyonrails: SiRubyonrails,
  siExpress: SiExpress,
  siAmazonaws: FaAws,
  siGooglecloud: SiGooglecloud,
  siMicrosoftazure: VscAzure,
  siDocker: SiDocker,
  siKubernetes: SiKubernetes,
  siTerraform: SiTerraform,
  siGithubactions: SiGithubactions,
};

// Helper to get icon component
const getIconComponent = (iconName: string): IconType | null => {
  return iconComponentsMap[iconName] || null;
};

export const AboutEnhanced = () => {
  const ref = useRef(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('all'); // Open all by default
  const statsRef = useRef(null);
  const quickFactsRef = useRef(null);
  const expertiseRef = useRef(null);

  // Use Framer Motion's useInView for scroll animations
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const quickFactsInView = useInView(quickFactsRef, {
    once: true,
    amount: 0.2,
  });
  const expertiseInView = useInView(expertiseRef, { once: true, amount: 0.2 });

  const achievements = [
    {
      number: '4+',
      label: 'Years Experience',
      description:
        'Building scalable, high-performance applications with modern technologies and best practices',
      icon: RocketLaunchIcon,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-linear-to-br from-purple-500/20 to-pink-500/20',
    },
    {
      number: '20+',
      label: 'Enterprise Projects',
      description:
        'Successfully delivered complex enterprise solutions across various industries',
      icon: CheckBadgeIcon,
      color: 'from-cyan-500 to-blue-500',
      bgGradient: 'bg-linear-to-br from-cyan-500/20 to-blue-500/20',
    },
    {
      number: '50+',
      label: 'Technologies Mastered',
      description:
        'Expert proficiency in modern frameworks, languages, and development tools',
      icon: CodeBracketIcon,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-linear-to-br from-green-500/20 to-emerald-500/20',
    },
    {
      number: '99.9%',
      label: 'System Uptime',
      description:
        'Reliable architecture ensuring maximum availability and performance',
      icon: CloudIconSolid,
      color: 'from-yellow-500 to-orange-500',
      bgGradient: 'bg-linear-to-br from-yellow-500/20 to-orange-500/20',
    },
    {
      number: '10K+',
      label: 'Active Users',
      description:
        'Built applications serving thousands of users worldwide daily',
      icon: SparklesIcon,
      color: 'from-pink-500 to-rose-500',
      bgGradient: 'bg-linear-to-br from-pink-500/20 to-rose-500/20',
    },
  ];

  const quickFacts = [
    {
      title: 'SaaS & Software Architecture Expert',
      description:
        'Expert in SDLC, Agile methodologies, microservices architecture, scalable SaaS platforms, and end-to-end software development lifecycle management',
      icon: CodeBracketSquareIcon,
      colorClass: 'text-purple-400',
      bgGradient: 'bg-linear-to-br from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/30',
    },
    {
      title: 'E-commerce Expert',
      description:
        'Shopify/Plus, WordPress, Headless CMS, ~40% sales growth achieved',
      icon: ShoppingCartIcon,
      colorClass: 'text-cyan-400',
      bgGradient: 'bg-linear-to-br from-cyan-500/10 to-blue-500/10',
      borderColor: 'border-cyan-500/30',
    },
    {
      title: 'AI/ML Integration',
      description: 'OpenAI, GPT-3/4, TensorFlow, PyTorch, Custom chatbots',
      icon: CpuChipIcon,
      colorClass: 'text-green-400',
      bgGradient: 'bg-linear-to-br from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      title: 'Cloud Native',
      description:
        'AWS, GCP, Azure, Docker, Kubernetes, Terraform, CI/CD pipelines, serverless architecture, and infrastructure as code',
      icon: CloudIconSolid,
      colorClass: 'text-blue-400',
      bgGradient: 'bg-linear-to-br from-blue-500/10 to-indigo-500/10',
      borderColor: 'border-blue-500/30',
    },
  ];

  const expertise = [
    {
      id: 'languages',
      title: 'Programming Languages',
      items: [
        { name: 'Python', icon: 'siPython' },
        { name: 'JavaScript', icon: 'siJavascript' },
        { name: 'TypeScript', icon: 'siTypescript' },
        { name: 'PHP', icon: 'siPhp' },
        { name: 'Rust', icon: 'siRust' },
        { name: 'Go', icon: 'siGo' },
        { name: 'Ruby', icon: 'siRuby' },
      ],
      titleColor: 'text-purple-400',
      badgeBg: 'bg-purple-500/10',
      badgeText: 'text-purple-300',
      badgeBorder: 'border-purple-500/30',
      badgeBgHover: 'hover:bg-purple-500/20',
    },
    {
      id: 'frontend',
      title: 'Frontend Frameworks',
      items: [
        { name: 'React', icon: 'siReact' },
        { name: 'Vue.js', icon: 'siVuedotjs' },
        { name: 'Next.js', icon: 'siNextdotjs' },
        { name: 'Remix', icon: 'siRemix' },
        { name: 'Angular', icon: 'siAngular' },
        { name: 'Tailwind CSS', icon: 'siTailwindcss' },
        { name: 'Material UI', icon: 'siMui' },
      ],
      titleColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10',
      badgeText: 'text-cyan-300',
      badgeBorder: 'border-cyan-500/30',
      badgeBgHover: 'hover:bg-cyan-500/20',
    },
    {
      id: 'backend',
      title: 'Backend Frameworks',
      items: [
        { name: 'Node.js', icon: 'siNodedotjs' },
        { name: 'Django', icon: 'siDjango' },
        { name: 'Flask', icon: 'siFlask' },
        { name: 'FastAPI', icon: 'siFastapi' },
        { name: 'Laravel', icon: 'siLaravel' },
        { name: 'Ruby on Rails', icon: 'siRubyonrails' },
        { name: 'Express.js', icon: 'siExpress' },
      ],
      titleColor: 'text-green-400',
      badgeBg: 'bg-green-500/10',
      badgeText: 'text-green-300',
      badgeBorder: 'border-green-500/30',
      badgeBgHover: 'hover:bg-green-500/20',
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      items: [
        { name: 'AWS', icon: 'siAmazonaws' },
        { name: 'GCP', icon: 'siGooglecloud' },
        { name: 'Azure', icon: 'siMicrosoftazure' },
        { name: 'Docker', icon: 'siDocker' },
        { name: 'Kubernetes', icon: 'siKubernetes' },
        { name: 'Terraform', icon: 'siTerraform' },
        { name: 'CI/CD', icon: 'siGithubactions' },
      ],
      titleColor: 'text-blue-400',
      badgeBg: 'bg-blue-500/10',
      badgeText: 'text-blue-300',
      badgeBorder: 'border-blue-500/30',
      badgeBgHover: 'hover:bg-blue-500/20',
    },
  ];

  return (
    <section
      id="about-me"
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-16 md:px-20 md:py-20"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl sm:h-96 sm:w-96"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl sm:h-96 sm:w-96"
        />
      </div>

      {/* Header */}
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="Welcome-box relative z-10 border border-[#7042f88b] px-[7px] py-[8px] opacity-[0.9]"
      >
        <SparklesIcon className="mr-[10px] h-5 w-5 text-[#b49bff]" />
        <h2 className="Welcome-text text-[12px] sm:text-[13px]">
          Get to know me better
        </h2>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mt-[16px] mb-[12px] text-center text-[28px] font-bold text-white sm:mt-[20px] sm:mb-[15px] sm:text-[36px] md:text-[40px] lg:text-[50px]"
      >
        About{' '}
        <span className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
          Me
        </span>
      </motion.h2>

      {/* Bento Grid: Statistics Cards with improved layout */}
      <motion.div
        ref={statsRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mt-6 mb-12 w-full max-w-7xl sm:mt-10 sm:mb-20"
      >
        {/* Proper Bento Grid Layout - 3-column responsive grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            // First card (4+ Years) spans 2 columns and 2 rows (large)
            // Next 2 cards (20+, 50+) are normal size on top row
            // Last 2 cards (99.9%, 10K+) are normal size on bottom row beside the large card
            let gridClass = '';
            if (index === 0) {
              gridClass = 'md:col-span-1 md:row-span-2'; // Large card takes 2 rows, 1 column
            } else {
              gridClass = 'md:col-span-1'; // Regular cards
            }

            const isLarge = index === 0;

            return (
              <motion.div
                key={achievement.label}
                initial={{ y: 100, opacity: 0 }}
                animate={
                  statsInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }
                }
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                }}
                className={`${gridClass} flex flex-col items-center justify-center p-8 ${isLarge ? 'md:p-12' : 'md:p-8'} rounded-3xl ${achievement.bgGradient} group relative cursor-pointer overflow-hidden border border-purple-500/30 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-purple-500/60 hover:shadow-purple-500/20`}
              >
                {/* Glassmorphism layers */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/10 via-white/5 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/0 to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Animated gradient orb */}
                <div
                  className={`absolute top-0 right-0 h-32 w-32 bg-linear-to-br ${achievement.color} rounded-full opacity-20 blur-3xl transition-transform duration-700 group-hover:scale-150`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon with proper rendering using fill color */}
                  <div
                    className={`rounded-2xl p-5 ${achievement.bgGradient} mb-6 flex items-center justify-center border border-purple-500/20 transition-all duration-500 group-hover:scale-110`}
                  >
                    <div
                      className={`bg-linear-to-r ${achievement.color} rounded-xl p-1`}
                    >
                      <Icon
                        className={`${isLarge ? 'h-14 w-14 md:h-16 md:w-16' : 'h-10 w-10 md:h-12 md:w-12'} text-white`}
                      />
                    </div>
                  </div>

                  <h3
                    className={`${isLarge ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'} bg-linear-to-r bg-clip-text font-bold text-transparent ${achievement.color} mb-4 transition-transform duration-300 group-hover:scale-105`}
                  >
                    {achievement.number}
                  </h3>

                  <p
                    className={`text-gray-300 ${isLarge ? 'text-lg md:text-xl' : 'text-base md:text-lg'} mb-3 font-semibold transition-colors duration-300 group-hover:text-white`}
                  >
                    {achievement.label}
                  </p>

                  {/* Add descriptive text for all cards */}
                  <p
                    className={`text-gray-400 ${isLarge ? 'text-sm md:text-base' : 'text-xs md:text-sm'} max-w-xs leading-relaxed transition-colors duration-300 group-hover:text-gray-300`}
                  >
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Proper Bento Grid: Quick Facts */}
      <motion.div
        ref={quickFactsRef}
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mt-12 mb-20 w-full max-w-7xl"
      >
        <h3 className="mb-8 text-left text-[28px] font-bold md:mb-10 md:text-center md:text-[32px] lg:text-[40px]">
          <span className="text-white">Quick </span>
          <span className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Facts
          </span>
        </h3>

        {/* Single column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {quickFacts.map((fact, index) => {
            // First item and last item span full width on desktop
            const isWide = index === 0 || index === 3;

            return (
              <motion.div
                key={fact.title}
                initial={{ x: -100, opacity: 0 }}
                animate={
                  quickFactsInView
                    ? { x: 0, opacity: 1 }
                    : { x: -100, opacity: 0 }
                }
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: 'easeOut',
                }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}
                className={`${isWide ? 'md:col-span-2' : 'md:col-span-1'} group rounded-2xl p-6 md:rounded-3xl md:p-8 lg:p-10 ${fact.bgGradient} border ${fact.borderColor} hover:border-opacity-100 hover:shadow-3xl relative cursor-pointer overflow-hidden shadow-xl backdrop-blur-xl transition-all duration-500 md:shadow-2xl`}
              >
                {/* Glassmorphism layers */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 via-white/5 to-transparent md:rounded-3xl" />
                <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/0 to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Floating gradient orb */}
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-linear-to-br from-white/10 to-transparent blur-3xl transition-transform duration-700 group-hover:scale-150 md:h-40 md:w-40" />

                <div className="relative z-10 flex items-start gap-4 md:gap-6">
                  {/* Icon Container */}
                  <div
                    className={`flex-shrink-0 ${fact.colorClass} transition-all duration-500 group-hover:scale-110`}
                  >
                    <div
                      className={`rounded-xl p-3 md:rounded-2xl md:p-5 ${fact.bgGradient} border ${fact.borderColor}`}
                    >
                      <fact.icon className="h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14" />
                    </div>
                  </div>

                  {/* Content - Left aligned for F/Z reading pattern */}
                  <div className="min-w-0 flex-1 text-left">
                    <h4
                      className={`mb-2 text-lg font-bold md:mb-4 md:text-2xl lg:text-3xl ${fact.colorClass} leading-tight transition-all duration-300`}
                    >
                      {fact.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-white md:text-base lg:text-lg">
                      {fact.description}
                    </p>
                  </div>
                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-20" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Technical Expertise with Icons - Open by Default */}
      <motion.div
        ref={expertiseRef}
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mt-12 mb-20 w-full max-w-7xl"
      >
        <h3 className="mb-10 text-center text-[32px] font-bold md:text-[40px]">
          <span className="text-white">Technical </span>
          <span className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Expertise
          </span>
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {expertise.map((category, index) => {
            const isOpen =
              expandedSection === 'all' || expandedSection === category.id;

            return (
              <motion.div
                key={category.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  expertiseInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.8, opacity: 0 }
                }
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/5 to-cyan-500/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40"
              >
                {/* Liquid Glass effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-md" />

                <button
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === category.id ? 'all' : category.id
                    )
                  }
                  className="relative z-10 w-full text-left"
                >
                  <h4
                    className={`mb-4 text-xl font-bold ${category.titleColor} flex items-center justify-between transition-transform duration-200 hover:scale-105`}
                  >
                    {category.title}
                    <span className="text-2xl">{isOpen ? '−' : '+'}</span>
                  </h4>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? 'auto' : '0',
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="relative z-10 overflow-hidden"
                >
                  <div className="grid grid-cols-4 gap-4 pt-2 md:grid-cols-5">
                    {category.items.map((item) => {
                      const IconComponent = getIconComponent(item.icon);

                      return (
                        <div
                          key={item.name}
                          className="group relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 p-3 transition-all duration-300 hover:border-white/20 hover:from-white/10 hover:to-white/5"
                          title={item.name}
                        >
                          {/* Icon */}
                          {IconComponent ? (
                            <IconComponent
                              className={`h-10 w-10 ${category.badgeText} transition-transform duration-300 group-hover:scale-110`}
                            />
                          ) : (
                            <div
                              className={`h-10 w-10 rounded-lg ${category.badgeBg} flex items-center justify-center ${category.badgeText} text-sm font-bold transition-transform duration-300 group-hover:scale-110`}
                            >
                              {item.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}

                          {/* Label */}
                          <span
                            className={`text-xs ${category.badgeText} text-center leading-tight transition-colors duration-200 group-hover:text-white`}
                          >
                            {item.name}
                          </span>

                          {/* Tooltip */}
                          <div className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-black/90 px-3 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Professional Summary - Same width as Quick Facts */}
      <motion.div
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mb-8 w-full max-w-7xl text-center text-lg leading-relaxed text-gray-300"
      >
        <div className="rounded-2xl border border-purple-500/30 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-8 backdrop-blur-md">
          <p className="mb-4">
            I&apos;m a passionate{' '}
            <span className="font-semibold text-purple-400">
              Senior Software Engineer
            </span>{' '}
            with over 4 years of hands-on experience in building modern,
            scalable, and user-centric applications. I transform complex
            challenges into elegant solutions through clean architecture,
            scalable design, and measurable business impact.
          </p>
          <p className="mb-4">
            Throughout my career at{' '}
            <a
              href="https://www.marionskitchen.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
            >
              Marion&apos;s Kitchen Group
            </a>
            ,{' '}
            <span className="font-semibold text-cyan-400">
              Trienpont International
            </span>
            , and{' '}
            <span className="font-semibold text-cyan-400">
              Relevant Audience
            </span>
            , I&apos;ve delivered impactful solutions including
            <span className="font-semibold text-purple-400">
              {' '}
              ~40% sales growth
            </span>{' '}
            through e-commerce optimizations, served{' '}
            <span className="font-semibold text-purple-400">10,000+ users</span>
            , and achieved{' '}
            <span className="font-semibold text-purple-400">
              99.9% system uptime
            </span>
            .
          </p>
          <p>
            I also offer specialized services through{' '}
            <span className="font-semibold text-cyan-400">Iglu</span> as a
            freelancing partner, focusing on{' '}
            <span className="font-semibold text-purple-400">
              Shopify/Plus development
            </span>
            ,{' '}
            <span className="font-semibold text-purple-400">
              AI/ML integration
            </span>
            , and{' '}
            <span className="font-semibold text-purple-400">
              cloud-native architectures
            </span>
            .
          </p>
        </div>
      </motion.div>
    </section>
  );
};
