"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col-reverse lg:flex-row items-center justify-center px-8 lg:px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[12px]">
            Fullstack Developer / Engineer
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Tahmid&apos;s
            </span>{" "}
            world.
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          I&apos;m a Senior Software Engineer with 6+ years of expertise in full-stack development, 
          AI/ML integration, cloud-native architecture (AWS, GCP, Azure), microservices, SaaS platforms, 
          e-commerce solutions, and scalable APIs. Proficient in React, Next.js, Node.js, Python, 
          TypeScript, and modern DevOps practices.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <a
            href="https://iglu.net/talent/senior-software-developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg w-full sm:w-auto hover:scale-105 transition-transform duration-300"
          >
            Hire Me
          </a>
          <a
            href="mailto:tahmidbintaslimrafi@gmail.com"
            className="py-2 px-6 text-center text-white cursor-pointer rounded-lg border-2 border-purple-500/50 hover:bg-purple-500/10 w-full sm:w-auto hover:scale-105 transition-all duration-300"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};
