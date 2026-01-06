import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

import {
  LANGUAGES_SKILL,
  FRONTEND_SKILL,
  BACKEND_SKILL,
  DATABASE_SKILL,
  CLOUD_DEVOPS_SKILL,
  ECOMMERCE_SKILL,
  AI_ML_SKILL,
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
  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText />

      {/* Languages */}
      <div className="w-full max-w-6xl mt-6">
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
      <div className="w-full max-w-6xl mt-6">
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
      <div className="w-full max-w-6xl mt-6">
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
      <div className="w-full max-w-6xl mt-6">
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
      <div className="w-full max-w-6xl mt-6">
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
      <div className="w-full max-w-6xl mt-6">
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
      <div className="w-full max-w-6xl mt-6">
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
      <div className="w-full max-w-6xl mt-6">
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

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
