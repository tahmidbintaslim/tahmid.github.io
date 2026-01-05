"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export const About = () => {
  const achievements = [
    {
      number: "6+",
      label: "Years Experience",
    },
    {
      number: "50+",
      label: "Projects Completed",
    },
    {
      number: "20+",
      label: "Technologies",
    },
    {
      number: "100%",
      label: "Client Satisfaction",
    },
  ];

  const timeline = [
    {
      year: "2024 - Present",
      title: "Senior Software Engineer",
      company: "Iglu",
      description:
        "Leading full-stack development initiatives, architecting cloud-native solutions with AI/ML integration.",
    },
    {
      year: "2022 - 2024",
      title: "Full Stack Developer",
      company: "Relevant Audience Co. Ltd",
      description:
        "Developed enterprise e-commerce platforms, headless CMS solutions, and integrated complex API systems.",
    },
    {
      year: "2019 - 2022",
      title: "Software Developer",
      company: "Trienpont",
      description:
        "Built scalable web applications using React, Next.js, and GraphQL. Led team development efforts.",
    },
    {
      year: "2018",
      title: "Started Career",
      company: "Freelance",
      description:
        "Began journey in web development, focusing on modern JavaScript frameworks and responsive design.",
    },
  ];

  return (
    <section
      id="about-me"
      className="flex flex-col items-center justify-center py-20 px-6 md:px-20"
    >
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h2 className="Welcome-text text-[13px]">
          Get to know me better
        </h2>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[40px] md:text-[50px] text-white font-bold mt-[20px] text-center mb-[15px]"
      >
        About{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Me
        </span>
      </motion.h2>

      {/* Statistics */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-5xl mt-10 mb-16"
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.label}
            variants={slideInFromTop}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center justify-center p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {achievement.number}
            </h3>
            <p className="text-gray-300 text-sm md:text-base mt-2 text-center">
              {achievement.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* About Description */}
      <motion.div
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-lg text-gray-300 max-w-4xl text-center mb-16 leading-relaxed"
      >
        <p className="mb-4">
          I&apos;m a passionate <span className="text-purple-400 font-semibold">Senior Software Engineer</span> with over 6 years of hands-on experience 
          in building modern, scalable, and user-centric applications. My expertise spans across the 
          entire technology stack - from crafting beautiful, responsive front-ends to architecting 
          robust, cloud-native back-end systems.
        </p>
        <p className="mb-4">
          Throughout my career, I&apos;ve had the privilege of working with leading companies like{" "}
          <span className="text-cyan-400 font-semibold">Iglu</span>,{" "}
          <span className="text-cyan-400 font-semibold">Relevant Audience</span>, and{" "}
          <span className="text-cyan-400 font-semibold">Trienpont</span>, 
          where I&apos;ve delivered high-impact solutions in e-commerce, SaaS platforms, 
          AI/ML integration, and enterprise applications.
        </p>
        <p>
          I specialize in leveraging cutting-edge technologies like{" "}
          <span className="text-purple-400 font-semibold">React</span>,{" "}
          <span className="text-purple-400 font-semibold">Next.js</span>,{" "}
          <span className="text-purple-400 font-semibold">Node.js</span>,{" "}
          <span className="text-purple-400 font-semibold">TypeScript</span>,{" "}
          and <span className="text-purple-400 font-semibold">GraphQL</span> to 
          transform ideas into reality. I&apos;m driven by challenges and committed to 
          continuous learning and excellence.
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-4xl"
      >
        <h3 className="text-3xl font-bold text-white mb-10 text-center">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Journey
          </span>
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500" />

          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={item.year}
                variants={slideInFromLeft(0.5)}
                transition={{ delay: index * 0.2 }}
                className={cn(
                  "relative mb-10",
                  isEven ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                )}
              >
                <div className={cn(
                  "flex items-start",
                  isEven && "md:flex-row-reverse"
                )}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transform -translate-x-1.5 md:-translate-x-2 border-4 border-[#030014]" />

                  {/* Content */}
                  <div className={cn(
                    "ml-10 md:ml-0 p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300 w-full md:w-5/12",
                    isEven ? "md:mr-12" : "md:ml-12"
                  )}>
                    <span className="text-purple-400 text-sm font-bold">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2">
                      {item.title}
                    </h4>
                    <p className="text-cyan-400 text-sm font-semibold mt-1">
                      {item.company}
                    </p>
                    <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
