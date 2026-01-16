"use client";

import { useEffect, useRef, useState } from "react";

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

import {
  AI_ML_SKILL,
  BACKEND_SKILL,
  CLOUD_DEVOPS_SKILL,
  DATABASE_SKILL,
  ECOMMERCE_SKILL,
  FRONTEND_SKILL,
  LANGUAGES_SKILL,
  TOOLS_OTHER_SKILL,
} from "@/constants";

// Helper to safely extract properties
const getSkillImage = (skill: any): string | undefined => {
  return "image" in skill ? skill.image : undefined;
};

const getSkillSvgIcon = (skill: any): string | undefined => {
  return "svgIcon" in skill ? skill.svgIcon : undefined;
};

const getSkillWidth = (skill: any): number => {
  return "width" in skill ? skill.width : 80;
};

const getSkillHeight = (skill: any): number => {
  return "height" in skill ? skill.height : 80;
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen"
    >
      {/* Sticky Video Background Container with Parallax */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-[120%] object-cover opacity-30 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0)`,
            top: '-10%'
          }}
        >
          <source src="/videos/skills-bg.webm" type="video/webm" />
        </video>
        {/* Darker gradient overlay for better icon visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/80 via-[#030014]/70 to-[#030014]/90" />
        {/* Additional vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030014_70%)] opacity-60" />
      </div>

      {/* Content that scrolls over the video */}
      <div className="relative z-10 -mt-[100vh] flex flex-col items-center justify-center gap-3 py-20 px-4">
        <SkillText />

        {/* Languages */}
        <div className="w-full max-w-6xl mt-6 backdrop-blur-md bg-[#030014]/50 rounded-2xl p-6 mx-4 border border-purple-500/10">
          <h3 className="text-2xl font-semibold text-center text-purple-400 mb-4">
            Programming Languages
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
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
        <div className="w-full max-w-6xl mt-6 backdrop-blur-md bg-[#030014]/50 rounded-2xl p-6 mx-4 border border-cyan-500/10">
          <h3 className="text-2xl font-semibold text-center text-cyan-400 mb-4">
            Frontend Development
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
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
        <div className="w-full max-w-6xl mt-6 backdrop-blur-md bg-[#030014]/50 rounded-2xl p-6 mx-4 border border-green-500/10">
          <h3 className="text-2xl font-semibold text-center text-green-400 mb-4">
            Backend Development
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
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
        <div className="w-full max-w-6xl mt-6 backdrop-blur-md bg-[#030014]/50 rounded-2xl p-6 mx-4 border border-yellow-500/10">
          <h3 className="text-2xl font-semibold text-center text-yellow-400 mb-4">
            Databases & ORMs
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
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
        <div className="w-full max-w-6xl mt-6 backdrop-blur-md bg-[#030014]/50 rounded-2xl p-6 mx-4 border border-blue-500/10">
          <h3 className="text-2xl font-semibold text-center text-blue-400 mb-4">
            Cloud & DevOps
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
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
        <div className="w-full max-w-6xl mt-6 backdrop-blur-md bg-[#030014]/50 rounded-2xl p-6 mx-4 border border-pink-500/10">
          <h3 className="text-2xl font-semibold text-center text-pink-400 mb-4">
            E-commerce Platforms
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
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
        <div className="w-full max-w-6xl mt-6 backdrop-blur-md bg-[#030014]/50 rounded-2xl p-6 mx-4 border border-red-500/10">
          <h3 className="text-2xl font-semibold text-center text-red-400 mb-4">
            AI & Machine Learning
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
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
        <div className="w-full max-w-6xl mt-6 backdrop-blur-md bg-[#030014]/50 rounded-2xl p-6 mx-4 border border-gray-500/10">
          <h3 className="text-2xl font-semibold text-center text-gray-400 mb-4">
            Tools & Others
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
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
