 'use client';

import { SparklesIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TypeAnimation } from '@/components/sub/type-animation';

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/lib/motion';

interface HeroContentProps {
  onFeedbackClick?: () => void;
  onLocationClick?: () => void;
  onNewsClick?: () => void;
}

export const HeroContent = ({
  onFeedbackClick,
  onLocationClick,
  onNewsClick,
}: HeroContentProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="z-[20] mt-24 flex w-full flex-col-reverse items-center justify-center px-4 sm:mt-32 sm:px-8 lg:mt-40 lg:flex-row lg:px-20"
    >
      <div className="m-auto flex h-full w-full flex-col justify-center gap-4 text-start sm:gap-5">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box border border-[#7042f88b] px-[7px] py-[8px] opacity-[0.9]"
        >
          <SparklesIcon className="mr-[10px] h-5 w-5 text-[#b49bff]" />
          <h1 className="Welcome-text text-[12px] sm:text-[13px]">
            <TypeAnimation
              sequence={[
                'Fullstack Developer / Engineer',
                2000,
                'Expert Software Developer',
                2000,
                'Data and ML Expert',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-bold mt-4 flex h-auto w-auto max-w-[600px] flex-col gap-4 text-2xl text-white sm:mt-6 sm:gap-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
        >
          <span>
            <TypeAnimation
              sequence={[
                "Welcome to Tahmid's world.",
                2000,
                'Expert Software Developer.',
                2000,
                'Data and ML Expert.',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent"
            />
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="my-3 max-w-[600px] text-sm leading-relaxed text-gray-400 sm:my-5 sm:text-base lg:text-lg"
        >
          I&apos;m a Senior Software Engineer with 4+ years of expertise in
          full-stack development, Shopify/Shopify Plus, AI/ML integration, cloud
          architecture (AWS, GCP), SaaS platforms, e-commerce solutions, and
          scalable APIs. Proficient in React, Remix, Next.js, Vue, Node.js,
          Python, TypeScript, Ruby, and modern DevOps/CI/CD practices.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href="https://iglu.net/talent/senior-software-developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary flex min-h-[48px] w-full cursor-pointer touch-manipulation items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-medium text-white transition-transform duration-300 hover:scale-105 sm:w-auto sm:text-base"
          >
            Hire Me
          </a>
          <a
            href="mailto:tahmidbintaslimrafi@gmail.com"
            className="flex min-h-[48px] w-full cursor-pointer touch-manipulation items-center justify-center rounded-lg border-2 border-purple-500/50 px-6 py-3 text-center text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-purple-500/10 sm:w-auto sm:text-base"
          >
            Contact via Email
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="mb-8 flex h-full w-full flex-col items-center justify-center lg:mb-0"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="w-[280px] select-none sm:w-[400px] md:w-[500px] lg:w-[650px]"
          style={{ height: 'auto' }}
          priority
        />

        {/* Mobile widgets omitted (component not present in repo) */}
      </motion.div>
    </motion.div>
  );
};
