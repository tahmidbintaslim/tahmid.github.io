'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaBrain } from 'react-icons/fa';
import {
  SiAmazonwebservices,
  SiDevdotto,
  SiDocker,
  SiGithub,
  SiGooglecloud,
  SiKaggle,
  SiKubernetes,
  SiMongodb,
  SiNetlify,
  SiOpenai,
  SiPostgresql,
  SiShopify,
  SiTailwindcss,
  SiVercel,
  SiWordpress,
} from 'react-icons/si';

const partners = [
  {
    name: 'Google Cloud',
    label: 'Certified Associate Developer',
    icon: SiGooglecloud,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    name: 'IBM Watson',
    label: 'AI Solutions Partner',
    icon: FaBrain,
    color: 'text-blue-500',
    bgGradient: 'from-blue-600/10 to-indigo-500/10',
  },
  {
    name: 'OpenAI',
    label: 'Integration Expert',
    icon: SiOpenai,
    color: 'text-green-400',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    name: 'AWS',
    label: 'Cloud Solutions Architect',
    icon: SiAmazonwebservices,
    color: 'text-orange-400',
    bgGradient: 'from-orange-500/10 to-yellow-500/10',
  },
  {
    name: 'Shopify Plus',
    label: 'E-commerce Expert',
    icon: SiShopify,
    color: 'text-green-500',
    bgGradient: 'from-green-600/10 to-lime-500/10',
  },
  {
    name: 'MongoDB',
    label: 'Database Specialist',
    icon: SiMongodb,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/10 to-green-500/10',
  },
  {
    name: 'PostgreSQL',
    label: 'Database Expert',
    icon: SiPostgresql,
    color: 'text-blue-300',
    bgGradient: 'from-blue-400/10 to-sky-400/10',
  },
  {
    name: 'Docker',
    label: 'Container Specialist',
    icon: SiDocker,
    color: 'text-blue-500',
    bgGradient: 'from-blue-500/10 to-cyan-600/10',
  },
  {
    name: 'Kubernetes',
    label: 'Orchestration Expert',
    icon: SiKubernetes,
    color: 'text-blue-600',
    bgGradient: 'from-blue-600/10 to-indigo-600/10',
  },
  {
    name: 'WordPress',
    label: 'CMS Development',
    icon: SiWordpress,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/10 to-indigo-400/10',
  },
  {
    name: 'Vercel',
    label: 'Deployment Partner',
    icon: SiVercel,
    color: 'text-white',
    bgGradient: 'from-gray-500/10 to-gray-400/10',
  },
  {
    name: 'Netlify',
    label: 'Hosting Partner',
    icon: SiNetlify,
    color: 'text-teal-400',
    bgGradient: 'from-teal-500/10 to-cyan-400/10',
  },
  {
    name: 'GitHub',
    label: 'Version Control Expert',
    icon: SiGithub,
    color: 'text-white',
    bgGradient: 'from-purple-500/10 to-gray-500/10',
  },
  {
    name: 'Kaggle',
    label: 'Data Science Competitor',
    icon: SiKaggle,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/10 to-blue-400/10',
  },
  {
    name: 'Tailwind CSS',
    label: 'UI Framework Expert',
    icon: SiTailwindcss,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-400/10 to-blue-500/10',
  },
  {
    name: 'Dev.to',
    label: 'Technical Writer',
    icon: SiDevdotto,
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
  },
];

export default function PartnersScroll() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const items = track.querySelectorAll('[data-partner-item]');
    if (!items.length) return;

    const totalWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 40,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (value) => {
          const current = parseFloat(value);
          return `${current % -totalWidth}px`;
        },
      },
    });

    return () => {
      tween.kill();
      gsap.set(track, { clearProps: 'transform' });
    };
  }, []);

  return (
    <section className="via-space-950 w-full overflow-hidden bg-linear-to-b from-transparent to-transparent py-12 md:py-16">
      <div className="w-full px-4 md:px-0">
        <div className="mb-8 text-start md:mb-12 md:text-center">
          <p className="section-kicker mb-2 text-center">Partnered With</p>
          <h2 className="subsection-title text-center">
            <span className="section-title-gradient">Trusted Collaborations</span>
          </h2>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-28 bg-linear-to-r from-black via-black/80 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-28 bg-linear-to-l from-black via-black/80 to-transparent" />

          <div className="overflow-hidden">
            <div ref={trackRef} className="flex w-max gap-6">
              {[...partners, ...partners].map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={`${partner.name}-${index}`}
                    data-partner-item
                    className={`rounded-2xl bg-linear-to-br ${partner.bgGradient} flex h-36 w-52 flex-col items-center justify-center gap-3 border border-white/10 p-6 backdrop-blur-xl`}
                  >
                    <Icon className={`text-4xl lg:text-5xl ${partner.color}`} />
                    <h3 className="text-center text-sm font-bold text-white lg:text-base">
                      {partner.name}
                    </h3>
                    <p className="text-muted text-center text-xs leading-tight">
                      {partner.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
