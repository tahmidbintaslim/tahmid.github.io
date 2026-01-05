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
      number: "20+",
      label: "Enterprise Projects",
    },
    {
      number: "50+",
      label: "Technologies Mastered",
    },
    {
      number: "99.9%",
      label: "System Uptime",
    },
  ];

  const timeline = [
    {
      year: "2024 - Present",
      title: "Senior Software Engineer",
      company: "Iglu",
      description:
        "Leading full-stack development initiatives, architecting cloud-native SaaS solutions with AI/ML integration. Building GPT-powered automation systems and scalable microservices on AWS serving 10,000+ users.",
    },
    {
      year: "2022 - 2024",
      title: "Full Stack Developer",
      company: "Relevant Audience Co. Ltd",
      description:
        "Developed enterprise e-commerce platforms using Shopify Plus and headless WordPress. Integrated complex API systems (Python, PHP, Ruby), CRM automation, and achieved 99.9% uptime for Fortune 500 clients.",
    },
    {
      year: "2019 - 2022",
      title: "Software Developer",
      company: "Trienpont",
      description:
        "Built scalable real estate web applications using React, Next.js, and GraphQL with Algolia AI search. Led team development efforts and managed full-stack headless CMS implementations.",
    },
    {
      year: "2018",
      title: "Started Career",
      company: "Freelance",
      description:
        "Began journey in web development, focusing on modern JavaScript frameworks, responsive design, and WordPress/Shopify customizations. Built foundation in full-stack development and cloud technologies.",
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
          in building modern, scalable, and user-centric applications. My expertise spans the 
          entire technology stack - from crafting beautiful, responsive front-ends with{" "}
          <span className="text-cyan-400 font-semibold">React, Vue, Next.js, Angular</span> to architecting 
          robust, cloud-native back-end systems with{" "}
          <span className="text-cyan-400 font-semibold">Node.js, Django, Flask, FastAPI, Laravel</span>.
        </p>
        <p className="mb-4">
          Throughout my career, I&apos;ve delivered <span className="text-purple-400 font-semibold">20+ enterprise projects</span>{" "}
          across fintech, SaaS, and real estate, working with leading companies like{" "}
          <span className="text-cyan-400 font-semibold">Iglu</span>,{" "}
          <span className="text-cyan-400 font-semibold">Relevant Audience</span>, and{" "}
          <span className="text-cyan-400 font-semibold">Trienpont</span>. 
          I specialize in <span className="text-purple-400 font-semibold">AI/ML integration</span> with OpenAI and TensorFlow, 
          building <span className="text-purple-400 font-semibold">cloud-native solutions</span> on AWS and GCP, 
          and creating <span className="text-purple-400 font-semibold">scalable microservices architectures</span>.
        </p>
        <p className="mb-4">
          My technical arsenal includes <span className="text-cyan-400 font-semibold">Python, JavaScript, TypeScript, PHP, Rust, Go, Ruby</span> with 
          expertise in databases like <span className="text-purple-400 font-semibold">PostgreSQL, MongoDB, Redis</span>, 
          and DevOps tools including <span className="text-purple-400 font-semibold">Docker, Kubernetes, Terraform</span>. 
          I&apos;ve successfully architected systems serving <span className="text-cyan-400 font-semibold">10,000+ users</span>, 
          achieved <span className="text-cyan-400 font-semibold">99.9% uptime</span>, and reduced infrastructure costs by{" "}
          <span className="text-cyan-400 font-semibold">40%</span> through optimization.
        </p>
        <p>
          I&apos;m driven by challenges and committed to continuous learning and excellence. 
          Whether it&apos;s building <span className="text-purple-400 font-semibold">GPT-powered chatbots</span>,{" "}
          <span className="text-purple-400 font-semibold">e-commerce platforms</span> for Fortune 500 clients, or{" "}
          <span className="text-purple-400 font-semibold">Web3 solutions</span> with Solidity and Ethereum, 
          I transform ideas into reality with clean architecture and scalable design.
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
