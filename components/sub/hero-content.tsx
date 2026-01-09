"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

const DynamicHeroMobileWidgets = dynamic(() => import("@/components/main/hero-mobile-widgets"), {
  ssr: false,
});

interface HeroContentProps {
  onLocationClick?: () => void;
  onNewsClick?: () => void;
  onFeedbackClick?: () => void;
}

export const HeroContent = ({ onLocationClick, onNewsClick, onFeedbackClick }: HeroContentProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col-reverse lg:flex-row items-center justify-center px-4 sm:px-8 lg:px-20 mt-24 sm:mt-32 lg:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-4 sm:gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
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
          className="flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-bold text-white max-w-[600px] w-auto h-auto"
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
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500"
            />
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-sm sm:text-base lg:text-lg text-gray-400 my-3 sm:my-5 max-w-[600px] leading-relaxed"
        >
          I&apos;m a Senior Software Engineer with 4+ years of expertise in full-stack development,
          Shopify/Shopify Plus, AI/ML integration, cloud architecture (AWS, GCP), SaaS platforms,
          e-commerce solutions, and scalable APIs. Proficient in React, Remix, Next.js, Vue, Node.js, Python,
          TypeScript, Ruby, and modern DevOps/CI/CD practices.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center"
        >
          <a
            href="https://iglu.net/talent/senior-software-developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-6 button-primary text-center text-white cursor-pointer rounded-lg w-full sm:w-auto hover:scale-105 transition-transform duration-300 text-sm sm:text-base font-medium min-h-[48px] flex items-center justify-center touch-manipulation"
          >
            Hire Me
          </a>
          <a
            href="mailto:tahmidbintaslimrafi@gmail.com"
            className="py-3 px-6 text-center text-white cursor-pointer rounded-lg border-2 border-purple-500/50 hover:bg-purple-500/10 w-full sm:w-auto hover:scale-105 transition-all duration-300 text-sm sm:text-base font-medium min-h-[48px] flex items-center justify-center touch-manipulation"
          >
            Contact via Email
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex flex-col justify-center items-center mb-8 lg:mb-0"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none w-[280px] sm:w-[400px] md:w-[500px] lg:w-[650px]"
          style={{ height: 'auto' }}
          priority
        />

        {/* Mobile Widgets - Below hero image on mobile */}
        {onLocationClick && onNewsClick && onFeedbackClick && (
          <DynamicHeroMobileWidgets
            onLocationClick={onLocationClick}
            onNewsClick={onNewsClick}
            onFeedbackClick={onFeedbackClick}
          />
        )}
      </motion.div>
    </motion.div>
  );
};
