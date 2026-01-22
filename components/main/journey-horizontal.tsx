'use client';

import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { WelcomePill } from '@/components/ui/welcome-pill';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getMotionScale } from '@/lib/motion-scale';
import {
  FaBuilding,
  FaChartBar,
  FaComments,
  FaPaintBrush,
  FaRocket,
  FaUtensils,
} from 'react-icons/fa';

const getSummary = (text: string, maxLength = 180) => {
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength).replace(/\s+\S*$/, '');
  return `${trimmed}…`;
};

export const JourneyHorizontal = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const hintArrowRef = useRef<HTMLSpanElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const registerCardRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    if (!cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const scale = getMotionScale();

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6 * scale,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              scroller,
              start: 'left 80%',
              end: 'right 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      if (hintArrowRef.current) {
        gsap.to(hintArrowRef.current, {
          x: 10,
          duration: 0.9,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }, scroller);

    return () => ctx.revert();
  }, []);

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
    <section
      id="journey"
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-20 md:px-20"
    >
      {/* Soft ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-linear-to-r from-purple-500/10 to-cyan-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <WelcomePill
        icon={<SparklesIcon className="text-brand-300 h-4 w-4" />}
        className="relative z-10 mb-6"
      >
        Professional Timeline
      </WelcomePill>

      <h2 className="section-title relative z-10 mb-3.75 text-start md:text-center">
        My <span className="section-title-gradient">Journey</span>
      </h2>

      <p className="section-lead relative z-10 mb-12 max-w-3xl text-start md:mx-auto md:text-center">
        4 years of professional growth across cutting-edge technologies and
        diverse industries
      </p>

      {/* Horizontal scroll timeline */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="mb-6 grid gap-3 rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 p-6 backdrop-blur-md md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3">
            <FaRocket className="text-xl text-purple-300" />
            <span className="text-sm font-semibold text-purple-200">
              20+ projects delivered
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3">
            <FaChartBar className="text-xl text-cyan-300" />
            <span className="text-sm font-semibold text-cyan-200">
              40% sales growth impact
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
            <FaBuilding className="text-xl text-green-300" />
            <span className="text-sm font-semibold text-green-200">
              Multi-sector leadership
            </span>
          </div>
        </div>

        <div className="text-muted mb-3 flex items-center justify-between text-start text-sm md:text-center">
          <span className="text-muted font-medium">
            Scroll horizontally to explore the timeline
          </span>
          <span ref={hintArrowRef} className="hidden md:inline">
            →
          </span>
        </div>

        <div ref={scrollerRef} className="scrollbar-thin overflow-x-auto pb-8">
          <div className="relative flex min-w-max gap-6 px-1">
            <div className="absolute top-8 right-0 left-0 h-px bg-linear-to-r from-purple-500 via-cyan-500 to-yellow-500" />
            {timeline.map((item, index) => {
              const companyUrl =
                'companyUrl' in item ? item.companyUrl : undefined;
              const isExpanded = selectedJob === index;
              const detailsId = `journey-details-${index}`;

              return (
                <div
                  key={item.company}
                  ref={registerCardRef}
                  className="relative w-96 shrink-0"
                >
                  <div className="absolute top-8 left-6 z-10 -translate-y-1/2">
                    <div
                      className={`rounded-full bg-linear-to-r ${item.dotGradient} border-space-950 border-2 px-3 py-1 text-xs font-bold text-white shadow-lg ${item.dotShadow}`}
                    >
                      {item.year}
                    </div>
                  </div>

                  <div className="mt-12 rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-6 backdrop-blur-md">
                    <div className="flex items-start gap-3">
                      <item.logo className={`text-4xl ${item.iconColor}`} />
                      <div className="space-y-1">
                        <p className="text-muted text-sm">{item.location}</p>
                        <h3 className="text-xl font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-ink mt-3 flex items-center gap-2 text-sm font-semibold">
                      <BuildingOfficeIcon
                        className={`h-4 w-4 ${item.iconColor}`}
                      />
                      {companyUrl ? (
                        <a
                          href={companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${item.iconColor} hover:text-white`}
                        >
                          {item.company}
                        </a>
                      ) : (
                        <span className={item.iconColor}>{item.company}</span>
                      )}
                    </div>

                    <p className="text-muted mt-4 text-sm leading-relaxed">
                      {isExpanded
                        ? item.description
                        : getSummary(item.description)}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-md px-2.5 py-1 text-xs ${item.techBadgeBg} ${item.techBadgeText} border ${item.techBadgeBorder}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 5 && (
                        <span className="text-muted bg-panel rounded-md px-2.5 py-1 text-xs">
                          +{item.technologies.length - 5}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.achievements.map((achievement) => (
                        <span
                          key={achievement}
                          className="text-ink rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedJob(isExpanded ? null : index)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                        {...(isExpanded && { 'aria-expanded': 'true' })}
                        aria-controls={detailsId}
                      >
                        <BriefcaseIcon className="h-4 w-4 text-cyan-300" />
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    </div>

                    {isExpanded && (
                      <div
                        id={detailsId}
                        className="mt-4 border-t border-purple-500/20 pt-4"
                      >
                        <div className="grid gap-3">
                          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <p className="text-muted text-xs font-semibold">
                              Role focus
                            </p>
                            <p className="text-ink mt-2 text-sm">
                              {item.title} · {item.company}
                            </p>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <p className="text-muted text-xs font-semibold">
                              Timeline
                            </p>
                            <p className="text-ink mt-2 text-sm">{item.year}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
