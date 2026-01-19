'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBrain } from 'react-icons/fa';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  return (
    <section className="w-full overflow-hidden bg-linear-to-b from-transparent via-[#030014] to-transparent py-12 md:py-16">
      <div className="w-full px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center md:mb-12"
        >
          <p className="mb-2 text-sm tracking-wider text-gray-400 uppercase">
            Partnered With
          </p>
          <h2 className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent md:text-2xl lg:text-3xl">
            Trusted Collaborations
          </h2>
        </motion.div>

        {/* Mobile: Single Card with Navigation */}
        <div className="mx-auto max-w-sm md:hidden">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl bg-linear-to-br ${partners[currentIndex].bgGradient} flex h-36 flex-col items-center justify-center gap-3 border border-white/10 p-6 backdrop-blur-xl`}
          >
            {(() => {
              const Icon = partners[currentIndex].icon;
              return (
                <>
                  <Icon
                    className={`text-5xl ${partners[currentIndex].color}`}
                  />
                  <h4 className="text-center text-lg font-bold text-white">
                    {partners[currentIndex].name}
                  </h4>
                  <p className="text-center text-xs leading-tight text-gray-400">
                    {partners[currentIndex].label}
                  </p>
                </>
              );
            })()}
          </motion.div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prevSlide}
              className="touch-manipulation rounded-full border border-purple-500/30 bg-purple-500/20 p-3 text-white transition-colors hover:bg-purple-500/30"
              aria-label="Previous partner"
            >
              <IoChevronBackOutline className="h-5 w-5" />
            </button>

            {/* Slide Counter instead of dots */}
            <div className="flex items-center gap-2 text-gray-400">
              <span className="font-semibold text-purple-400">
                {currentIndex + 1}
              </span>
              <span>/</span>
              <span>{partners.length}</span>
            </div>

            <button
              onClick={nextSlide}
              className="touch-manipulation rounded-full border border-purple-500/30 bg-purple-500/20 p-3 text-white transition-colors hover:bg-purple-500/30"
              aria-label="Next partner"
            >
              <IoChevronForwardOutline className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop: Full-width Infinite Scrolling */}
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-linear-to-r from-[#030014] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-linear-to-l from-[#030014] to-transparent" />

          <div className="animate-scroll flex hover:[animation-play-state:paused]">
            {[...Array(3)].map((_, setIndex) =>
              partners.map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={`partner-${setIndex}-${index}`}
                    className={`mx-4 flex-shrink-0 rounded-2xl bg-linear-to-br ${partner.bgGradient} group flex h-36 w-48 flex-col items-center justify-center gap-3 border border-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/5 hover:shadow-2xl`}
                  >
                    <Icon
                      className={`text-4xl lg:text-5xl ${partner.color} transition-transform duration-300 group-hover:scale-110`}
                    />
                    <h4 className="text-center text-sm font-bold text-white lg:text-base">
                      {partner.name}
                    </h4>
                    <p className="text-center text-xs leading-tight text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                      {partner.label}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
