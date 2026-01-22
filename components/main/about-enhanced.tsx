'use client';

import {
  CloudIcon as CloudIconSolid,
  CodeBracketIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { WelcomePill } from '@/components/ui/welcome-pill';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getMotionScale } from '@/lib/motion-scale';
import { cn } from '@/lib/utils';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { motion } from 'framer-motion';
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

const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="bg-dot-black/[0.2] dark:bg-dot-white/20 flex h-full min-h-24 w-full flex-1 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="contrast-light flex flex-row items-center space-x-2 rounded-full border border-subtle bg-panel-strong p-2"
      >
        <div className="h-6 w-6 shrink-0 rounded-full bg-linear-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-panel" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="contrast-light ml-auto flex w-3/4 flex-row items-center space-x-2 rounded-full border border-subtle bg-panel-strong p-2"
      >
        <div className="h-6 w-6 shrink-0 rounded-full bg-linear-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-panel" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: { width: 0 },
    animate: { width: '100%', transition: { duration: 0.2 } },
    hover: { width: ['0%', '100%'], transition: { duration: 2 } },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-dot-black/[0.2] dark:bg-dot-white/20 flex h-full min-h-24 w-full flex-1 flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={`skeleton-two-${i}`}
          variants={variants}
          style={{ maxWidth: `${Math.random() * (100 - 40) + 40}%` }}
          className="contrast-light flex h-4 w-full flex-row items-center space-x-2 rounded-full border border-subtle bg-panel p-2"
        />
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: { backgroundPosition: '0 50%' },
    animate: { backgroundPosition: ['0 50%', '100% 50%', '0 50%'] },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
      className="bg-dot-black/[0.2] dark:bg-dot-white/20 flex h-full min-h-24 w-full flex-1 flex-col space-y-2 rounded-lg"
      style={{
        background:
          'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
      }}
    >
      <motion.div className="h-full w-full rounded-lg" />
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-dot-black/[0.2] dark:bg-dot-white/20 flex h-full min-h-24 w-full flex-1 flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="contrast-light flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-subtle bg-panel-strong p-4"
      >
        <div className="h-10 w-10 rounded-full bg-linear-to-r from-purple-500 to-cyan-500" />
        <p className="text-muted mt-4 text-center text-xs font-semibold sm:text-sm">
          Product thinking
        </p>
        <p className="mt-4 rounded-full border border-red-500 bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/20">
          Fast feedback
        </p>
      </motion.div>
      <motion.div className="contrast-light relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-subtle bg-panel-strong p-4">
        <div className="h-10 w-10 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500" />
        <p className="text-muted mt-4 text-center text-xs font-semibold sm:text-sm">
          Clean delivery
        </p>
        <p className="mt-4 rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-xs text-green-600 dark:bg-green-900/20">
          Reliable
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="contrast-light flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-subtle bg-panel-strong p-4"
      >
        <div className="h-10 w-10 rounded-full bg-linear-to-r from-rose-500 to-violet-500" />
        <p className="text-muted mt-4 text-center text-xs font-semibold sm:text-sm">
          Measurable impact
        </p>
        <p className="mt-4 rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/20">
          User-centric
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="bg-dot-black/[0.2] dark:bg-dot-white/20 flex h-full min-h-24 w-full flex-1 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="contrast-light flex flex-row items-start space-x-2 rounded-2xl border border-subtle bg-panel-strong p-2"
      >
        <div className="h-10 w-10 rounded-full bg-linear-to-r from-purple-500 to-cyan-500" />
        <p className="text-muted text-xs">
          I craft scalable Web with Next.js, Node, and cloud-native tooling.
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="contrast-light ml-auto flex w-3/4 flex-row items-center justify-end space-x-2 rounded-full border border-subtle bg-panel-strong p-2"
      >
        <p className="text-muted text-xs">Let&apos;s ship.</p>
        <div className="h-6 w-6 shrink-0 rounded-full bg-linear-to-r from-pink-500 to-violet-500" />
      </motion.div>
    </motion.div>
  );
};

export const AboutEnhanced = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('all'); // Open all by default

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const scale = getMotionScale();

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('.js-reveal', section);
      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6 * scale,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const bentoItems = [
    {
      title: 'Product & Delivery',
      description: (
        <span className="text-sm">
          Focused on reliability, speed, and clean execution.
        </span>
      ),
      header: <SkeletonOne />,
      className: 'md:col-span-1',
      icon: <RocketLaunchIcon className="h-4 w-4 text-purple-300" />,
    },
    {
      title: 'Architecture & Scale',
      description: (
        <span className="text-sm">
          Serverless, Cloud-native, and scalable systems design.
        </span>
      ),
      header: <SkeletonTwo />,
      className: 'md:col-span-1',
      icon: <CloudIconSolid className="h-4 w-4 text-blue-300" />,
    },
    {
      title: 'AI/ML Integration',
      description: (
        <span className="text-sm">
          OpenAI, OpenCV, TensorFlow, PyTorch, RAG, automation.
        </span>
      ),
      header: <SkeletonThree />,
      className: 'md:col-span-1',
      icon: <CpuChipIcon className="h-4 w-4 text-emerald-300" />,
    },
    {
      title: 'Client Outcomes',
      description: (
        <span className="text-sm">
          Consistent delivery, tight feedback loops, measurable impact.
        </span>
      ),
      header: <SkeletonFour />,
      className: 'md:col-span-2',
      icon: <SparklesIcon className="h-4 w-4 text-emerald-300" />,
    },
    {
      title: 'Stack & Craft',
      description: (
        <span className="text-sm">
          Python, Django, MERN, Nextjs, TanStack, JAMStack.
        </span>
      ),
      header: <SkeletonFive />,
      className: 'md:col-span-1',
      icon: <CodeBracketIcon className="h-4 w-4 text-cyan-300" />,
    },
    {
      title: 'About Me',
      description: (
        <span className="text-sm">
          Senior Software Engineer specializing in scalable, user-centric
          products.
        </span>
      ),
      header: (
      <div className="space-y-4 rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-5 text-sm leading-relaxed text-muted">
          <p>
            Passionate Senior Software Engineer with 4+ years building scalable,
            user-centric applications. I transform complex challenges into
            elegant solutions through clean architecture and measurable business
            impact.
          </p>
          <p>
            Delivered ~40% sales growth through e-commerce optimizations, served
            10,000+ users, and achieved 99.9% system uptime across multiple
            companies.
          </p>
          <p>
            Open to Freelance/Contract on Ecom specializing in WordPress,
            Shopify/Plus, AI/ML integration, and cloud-native architectures.
          </p>
        </div>
      ),
      className: 'md:col-span-3',
      icon: <SparklesIcon className="h-4 w-4 text-purple-300" />,
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
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-16 md:px-20 md:py-20"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl sm:h-96 sm:w-96" />
      </div>

      {/* Header */}
      <WelcomePill icon={<SparklesIcon className="text-brand-300 h-4 w-4" />} className="js-reveal relative z-10">
        Get to know me better
      </WelcomePill>

      <h2 className="section-title js-reveal relative z-10 mt-4 mb-3 text-start sm:mt-5 sm:mb-3.75 md:text-center">
        About{' '}
        <span className="section-title-gradient">Me</span>
      </h2>

      {/* Bento Grid: About Highlights */}
      <div className="relative z-10 mt-6 mb-16 w-full max-w-7xl sm:mt-10 sm:mb-20">
        <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
          {bentoItems.map((item, index) => (
            <BentoGridItem
              key={item.title}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={cn('[& p]:text-lg js-reveal', item.className)}
              aria-label={`About highlight ${index + 1}: ${item.title}`}
            />
          ))}
        </BentoGrid>
      </div>

      {/* Technical Expertise with Icons - Open by Default */}
      <div className="relative z-10 mt-12 mb-20 w-full max-w-7xl">
        <h3 className="subsection-title mb-10 text-start md:text-center">
          <span className="text-white">Technical </span>
          <span className="section-title-gradient">Expertise</span>
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {expertise.map((category, _index) => {
            const isOpen =
              expandedSection === 'all' || expandedSection === category.id;

            return (
              <div
                key={category.id}
                className="js-reveal relative overflow-hidden rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/5 to-cyan-500/5 p-6 backdrop-blur-md transition-colors duration-200 ease-out hover:border-cyan-500/40"
              >
                {/* Liquid Glass effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-md" />

                <button
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === category.id ? 'all' : category.id
                    )
                  }
                  className="relative z-10 w-full text-start"
                >
                  <h4
                    className={`mb-4 text-xl font-bold ${category.titleColor} flex items-center justify-between`}
                  >
                    {category.title}
                    <span className="text-2xl">{isOpen ? '−' : '+'}</span>
                  </h4>
                </button>

                {isOpen ? (
                  <div className="relative z-10 overflow-hidden">
                    <div className="grid grid-cols-4 gap-4 pt-2 md:grid-cols-5">
                      {category.items.map((item) => {
                        const IconComponent = getIconComponent(item.icon);

                        return (
                          <div
                            key={item.name}
                            className="group relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 p-3 transition-colors duration-200 ease-out hover:border-white/20 hover:from-white/10 hover:to-white/5"
                            title={item.name}
                          >
                            {/* Icon */}
                            {IconComponent ? (
                              <IconComponent
                                className={`h-10 w-10 ${category.badgeText}`}
                              />
                            ) : (
                              <div
                                className={`h-10 w-10 rounded-xl ${category.badgeBg} flex items-center justify-center ${category.badgeText} text-sm font-bold`}
                              >
                                {item.name.substring(0, 2).toUpperCase()}
                              </div>
                            )}

                            {/* Label */}
                            <span
                              className={`text-xs ${category.badgeText} text-start leading-tight transition-colors duration-200 ease-out group-hover:text-white`}
                            >
                              {item.name}
                            </span>

                            {/* Tooltip */}
                            <div className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-xl bg-space-950/90 px-3 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
                              {item.name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
