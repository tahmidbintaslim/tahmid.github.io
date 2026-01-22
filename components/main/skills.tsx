'use client';

import { useRef } from 'react';

import { SkillDataProvider } from '@/components/sub/skill-data-provider';
import { SkillText } from '@/components/sub/skill-text';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

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
  return 'width' in skill ? skill.width : 48;
};

const getSkillHeight = (skill: any): number => {
  return 'height' in skill ? skill.height : 48;
};

// Component to render skill icons grid
const SkillIconsGrid = ({ skills }: { skills: readonly any[] }) => (
  <div className="flex flex-wrap items-center justify-center gap-6 p-6">
    {skills.slice(0, 6).map((skill) => (
      <SkillDataProvider
        key={skill.skill_name}
        src={getSkillImage(skill)}
        svgIcon={getSkillSvgIcon(skill)}
        name={skill.skill_name}
        width={getSkillWidth(skill)}
        height={getSkillHeight(skill)}
      />
    ))}
  </div>
);

// Bento grid items for skills
const skillBentoItems = [
  {
    title: 'Programming Languages',
    description: 'Core languages powering modern development',
    header: <SkillIconsGrid skills={LANGUAGES_SKILL} />,
    icon: <span className="text-purple-400">💻</span>,
  },
  {
    title: 'Frontend Development',
    description: 'Building beautiful, interactive user interfaces',
    header: <SkillIconsGrid skills={FRONTEND_SKILL} />,
    icon: <span className="text-cyan-400">🎨</span>,
  },
  {
    title: 'Backend Development',
    description: 'Robust server-side architectures and APIs',
    header: <SkillIconsGrid skills={BACKEND_SKILL} />,
    icon: <span className="text-green-400">⚙️</span>,
  },
  {
    title: 'Databases & ORMs',
    description: 'Data storage, management, and optimization',
    header: <SkillIconsGrid skills={DATABASE_SKILL} />,
    icon: <span className="text-yellow-400">🗄️</span>,
  },
  {
    title: 'Cloud & DevOps',
    description: 'Scalable infrastructure and deployment pipelines',
    header: <SkillIconsGrid skills={CLOUD_DEVOPS_SKILL} />,
    icon: <span className="text-blue-400">☁️</span>,
  },
  {
    title: 'E-commerce Platforms',
    description: 'Specialized platforms for online business',
    header: <SkillIconsGrid skills={ECOMMERCE_SKILL} />,
    icon: <span className="text-pink-400">🛒</span>,
  },
  {
    title: 'AI & Machine Learning',
    description: 'Intelligent systems and data-driven solutions',
    header: <SkillIconsGrid skills={AI_ML_SKILL} />,
    icon: <span className="text-red-400">🤖</span>,
  },
  {
    title: 'Tools & Others',
    description: 'Essential utilities and development tools',
    header: <SkillIconsGrid skills={TOOLS_OTHER_SKILL} />,
    icon: <span className="text-muted">🔧</span>,
  },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-cursor="book"
      className="relative min-h-screen"
    >
      {/* Sticky Video Background Container with Parallax */}
      <div className="pointer-events-none sticky top-0 z-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="skills-video-offset h-120p absolute inset-0 w-full object-cover opacity-30"
        >
          <source src="/videos/skills-bg.webm" type="video/webm" />
        </video>
      </div>

      {/* Content that scrolls over the video */}
      <div className="-mt-screen relative z-10 flex flex-col items-center justify-center gap-3 px-4 py-20">
        <SkillText />

        {/* Bento Grid: Skills Categories */}
        <div className="relative z-10 mt-6 mb-16 w-full max-w-7xl sm:mt-10 sm:mb-20">
          <BentoGrid className="mx-auto max-w-4xl">
            {skillBentoItems.map((item, index) => (
              <BackgroundGradient
                key={item.title}
                className="from-purple-500/20 via-cyan-500/20 to-purple-500/20"
              >
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  showBorders={false}
                  className={index === 3 || index === 6 ? 'md:col-span-2' : ''}
                  aria-label={`Skill category ${index + 1}: ${item.title}`}
                />
              </BackgroundGradient>
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
};
