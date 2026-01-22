'use client';

import { SparklesIcon } from '@heroicons/react/24/solid';
import { WelcomePill } from '@/components/ui/welcome-pill';

export const SkillText = () => {
  return (
    <div className="flex h-auto w-full flex-col items-center justify-center">
      <WelcomePill icon={<SparklesIcon className="text-brand-300 h-4 w-4" />}>
        Comprehensive Tech Stack & Expertise
      </WelcomePill>

      <div className="subsection-title mt-2.5 mb-3.5 text-start md:text-center">
        Full-Stack Development Excellence
      </div>

      <div className="section-lead mt-2.5 mb-10 max-w-3xl text-start md:mx-auto md:text-center">
        Mastering modern web technologies, cloud platforms, AI/ML integration,
        and scalable architectures across the entire development stack.
      </div>
    </div>
  );
};
