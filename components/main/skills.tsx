'use client';

import { useEffect, useRef, useState } from 'react';

import { SkillDataProvider } from '@/components/sub/skill-data-provider';
import { SkillText } from '@/components/sub/skill-text';

import {
  AI_ML_SKILL,
  BACKEND_SKILL,
  CLOUD_DEVOPS_SKILL,
  DATABASE_SKILL,
  ECOMMERCE_SKILL,
  FRONTEND_SKILL,
  LANGUAGES_SKILL,
  TOOLS_OTHER_SKILL,
} from '@/constants';

// Helper to safely extract properties
const getSkillImage = (skill: any): string | undefined => {
  return 'image' in skill ? skill.image : undefined;
};

const getSkillSvgIcon = (skill: any): string | undefined => {
  return 'svgIcon' in skill ? skill.svgIcon : undefined;
};

const getSkillWidth = (skill: any): number => {
  return 'width' in skill ? skill.width : 80;
};

const getSkillHeight = (skill: any): number => {
  return 'height' in skill ? skill.height : 80;
};

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate parallax only when section is in view
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        // Slower parallax effect (0.3 = video moves at 30% of scroll speed)
        const scrollProgress = -sectionTop * 0.3;
        setParallaxY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative min-h-screen">
      {/* Sticky Video Background Container with Parallax */}
      <div className="pointer-events-none sticky top-0 z-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-[120%] w-full object-cover opacity-30 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0)`,
            top: '-10%',
          }}
        >
          <source src="/videos/skills-bg.webm" type="video/webm" />
        </video>
        {/* Darker gradient overlay for better icon visibility */}
        <div className="absolute inset-0 bg-linear-to-b from-[#030014]/80 via-[#030014]/70 to-[#030014]/90" />
        {/* Additional vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030014_70%)] opacity-60" />
      </div>

      {/* Content that scrolls over the video */}
      <div className="relative z-10 -mt-[100vh] flex flex-col items-center justify-center gap-3 px-4 py-20">
        <SkillText />

        {/* Languages */}
        <div className="mx-4 mt-6 w-full max-w-6xl rounded-2xl border border-purple-500/10 bg-[#030014]/50 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-center text-2xl font-semibold text-purple-400">
            Programming Languages
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {LANGUAGES_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={getSkillImage(skill)}
                svgIcon={getSkillSvgIcon(skill)}
                name={skill.skill_name}
                width={getSkillWidth(skill)}
                height={getSkillHeight(skill)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Frontend */}
        <div className="mx-4 mt-6 w-full max-w-6xl rounded-2xl border border-cyan-500/10 bg-[#030014]/50 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-center text-2xl font-semibold text-cyan-400">
            Frontend Development
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {FRONTEND_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={getSkillImage(skill)}
                svgIcon={getSkillSvgIcon(skill)}
                name={skill.skill_name}
                width={getSkillWidth(skill)}
                height={getSkillHeight(skill)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="mx-4 mt-6 w-full max-w-6xl rounded-2xl border border-green-500/10 bg-[#030014]/50 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-center text-2xl font-semibold text-green-400">
            Backend Development
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {BACKEND_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={getSkillImage(skill)}
                svgIcon={getSkillSvgIcon(skill)}
                name={skill.skill_name}
                width={getSkillWidth(skill)}
                height={getSkillHeight(skill)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Databases */}
        <div className="mx-4 mt-6 w-full max-w-6xl rounded-2xl border border-yellow-500/10 bg-[#030014]/50 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-center text-2xl font-semibold text-yellow-400">
            Databases & ORMs
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {DATABASE_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={getSkillImage(skill)}
                svgIcon={getSkillSvgIcon(skill)}
                name={skill.skill_name}
                width={getSkillWidth(skill)}
                height={getSkillHeight(skill)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Cloud & DevOps */}
        <div className="mx-4 mt-6 w-full max-w-6xl rounded-2xl border border-blue-500/10 bg-[#030014]/50 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-center text-2xl font-semibold text-blue-400">
            Cloud & DevOps
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {CLOUD_DEVOPS_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={getSkillImage(skill)}
                svgIcon={getSkillSvgIcon(skill)}
                name={skill.skill_name}
                width={getSkillWidth(skill)}
                height={getSkillHeight(skill)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* E-commerce */}
        <div className="mx-4 mt-6 w-full max-w-6xl rounded-2xl border border-pink-500/10 bg-[#030014]/50 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-center text-2xl font-semibold text-pink-400">
            E-commerce Platforms
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {ECOMMERCE_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={getSkillImage(skill)}
                svgIcon={getSkillSvgIcon(skill)}
                name={skill.skill_name}
                width={getSkillWidth(skill)}
                height={getSkillHeight(skill)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* AI/ML */}
        <div className="mx-4 mt-6 w-full max-w-6xl rounded-2xl border border-red-500/10 bg-[#030014]/50 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-center text-2xl font-semibold text-red-400">
            AI & Machine Learning
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {AI_ML_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={getSkillImage(skill)}
                svgIcon={getSkillSvgIcon(skill)}
                name={skill.skill_name}
                width={getSkillWidth(skill)}
                height={getSkillHeight(skill)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Tools & Other */}
        <div className="mx-4 mt-6 w-full max-w-6xl rounded-2xl border border-gray-500/10 bg-[#030014]/50 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-center text-2xl font-semibold text-gray-400">
            Tools & Others
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {TOOLS_OTHER_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={getSkillImage(skill)}
                svgIcon={getSkillSvgIcon(skill)}
                name={skill.skill_name}
                width={getSkillWidth(skill)}
                height={getSkillHeight(skill)}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
