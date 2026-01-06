"use client";

import { motion, useInView } from "framer-motion";
import { SparklesIcon, CheckBadgeIcon, RocketLaunchIcon, CodeBracketIcon, CloudIcon } from "@heroicons/react/24/solid";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { useRef, useState } from "react";

export const AboutEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const achievements = [
    {
      number: "6+",
      label: "Years Experience",
      icon: RocketLaunchIcon,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "20+",
      label: "Enterprise Projects",
      icon: CheckBadgeIcon,
      color: "from-cyan-500 to-blue-500",
    },
    {
      number: "50+",
      label: "Technologies Mastered",
      icon: CodeBracketIcon,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "99.9%",
      label: "System Uptime",
      icon: CloudIcon,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const quickFacts = [
    {
      title: "Full-Stack Mastery",
      description: "React, Vue, Next.js, Remix, Node.js, Python, Ruby on Rails, TypeScript",
      icon: "💻",
      colorClass: "text-purple-400 group-hover:text-purple-300",
    },
    {
      title: "E-commerce Expert",
      description: "Shopify/Plus, WordPress, Headless CMS, ~40% sales growth achieved",
      icon: "🛒",
      colorClass: "text-cyan-400 group-hover:text-cyan-300",
    },
    {
      title: "AI/ML Integration",
      description: "OpenAI, GPT-3/4, TensorFlow, PyTorch, Custom chatbots",
      icon: "🤖",
      colorClass: "text-green-400 group-hover:text-green-300",
    },
    {
      title: "Cloud Native",
      description: "AWS, GCP, Azure, Docker, Kubernetes, Terraform, CI/CD",
      icon: "☁️",
      colorClass: "text-blue-400 group-hover:text-blue-300",
    },
  ];

  const expertise = [
    {
      id: "languages",
      title: "Programming Languages",
      items: ["Python", "JavaScript", "TypeScript", "PHP", "Rust", "Go", "Ruby"],
      titleColor: "text-purple-400",
      badgeBg: "bg-purple-500/10",
      badgeText: "text-purple-300",
      badgeBorder: "border-purple-500/30",
      badgeBgHover: "hover:bg-purple-500/20",
    },
    {
      id: "frontend",
      title: "Frontend Frameworks",
      items: ["React", "Vue.js", "Next.js", "Remix", "Angular", "Tailwind CSS", "Material UI"],
      titleColor: "text-cyan-400",
      badgeBg: "bg-cyan-500/10",
      badgeText: "text-cyan-300",
      badgeBorder: "border-cyan-500/30",
      badgeBgHover: "hover:bg-cyan-500/20",
    },
    {
      id: "backend",
      title: "Backend Frameworks",
      items: ["Node.js", "Django", "Flask", "FastAPI", "Laravel", "Ruby on Rails", "Express.js"],
      titleColor: "text-green-400",
      badgeBg: "bg-green-500/10",
      badgeText: "text-green-300",
      badgeBorder: "border-green-500/30",
      badgeBgHover: "hover:bg-green-500/20",
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      items: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      titleColor: "text-blue-400",
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-300",
      badgeBorder: "border-blue-500/30",
      badgeBgHover: "hover:bg-blue-500/20",
    },
  ];

  return (
    <section
      id="about-me"
      ref={ref}
      className="flex flex-col items-center justify-center py-20 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] relative z-10"
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
        className="text-[40px] md:text-[50px] text-white font-bold mt-[20px] text-center mb-[15px] relative z-10"
      >
        About{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Me
        </span>
      </motion.h2>

      {/* 3D Animated Statistics Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl mt-10 mb-16 relative z-10"
      >
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.label}
              variants={slideInFromTop}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                rotateX: 10,
              }}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-md hover:border-purple-500/50 transition-all duration-300 cursor-pointer group perspective-1000"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300" />
              <Icon className={`w-12 h-12 mb-3 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`} />
              <h3 className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${achievement.color} group-hover:scale-110 transition-transform duration-300`}>
                {achievement.number}
              </h3>
              <p className="text-gray-300 text-sm md:text-base mt-2 text-center group-hover:text-white transition-colors duration-300">
                {achievement.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Facts Grid */}
      <motion.div
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-6xl mb-16 relative z-10"
      >
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Quick{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Facts
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickFacts.map((fact, index) => (
            <motion.div
              key={fact.title}
              variants={slideInFromLeft(0.5)}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 border border-purple-500/20 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {fact.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`text-xl font-bold mb-2 ${fact.colorClass} transition-colors duration-300`}>
                    {fact.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                    {fact.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Expertise Sections with Progress Bars */}
      <motion.div
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-6xl mb-16 relative z-10"
      >
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Technical{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Expertise
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertise.map((category, index) => (
            <motion.div
              key={category.id}
              variants={slideInFromRight(0.5)}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 border border-purple-500/20 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
            >
              <button
                onClick={() => setExpandedSection(expandedSection === category.id ? null : category.id)}
                className="w-full text-left"
              >
                <h4 className={`text-lg font-bold mb-4 ${category.titleColor} flex items-center justify-between`}>
                  {category.title}
                  <span className="text-2xl">{expandedSection === category.id ? "−" : "+"}</span>
                </h4>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: expandedSection === category.id ? "auto" : "0",
                  opacity: expandedSection === category.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className={`px-3 py-1 rounded-full text-xs ${category.badgeBg} ${category.badgeText} border ${category.badgeBorder} ${category.badgeBgHover} transition-colors duration-200`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Professional Summary */}
      <motion.div
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-lg text-gray-300 max-w-5xl text-center mb-8 leading-relaxed relative z-10"
      >
        <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-md">
          <p className="mb-4">
            I&apos;m a passionate <span className="text-purple-400 font-semibold">Senior Software Engineer</span> with over 6 years of hands-on experience 
            in building modern, scalable, and user-centric applications. I transform complex challenges into elegant solutions through 
            clean architecture, scalable design, and measurable business impact.
          </p>
          <p className="mb-4">
            Throughout my career at{" "}
            <span className="text-cyan-400 font-semibold">Marion&apos;s Kitchen Group</span>,{" "}
            <span className="text-cyan-400 font-semibold">Trienpont International</span>, and{" "}
            <span className="text-cyan-400 font-semibold">Relevant Audience</span>, I&apos;ve delivered impactful solutions including 
            <span className="text-purple-400 font-semibold"> ~40% sales growth</span> through e-commerce optimizations, 
            served <span className="text-purple-400 font-semibold">10,000+ users</span>, and achieved{" "}
            <span className="text-purple-400 font-semibold">99.9% system uptime</span>.
          </p>
          <p>
            I also offer specialized services through <span className="text-cyan-400 font-semibold">Iglu</span> as a freelancing partner, 
            focusing on <span className="text-purple-400 font-semibold">Shopify/Plus development</span>,{" "}
            <span className="text-purple-400 font-semibold">AI/ML integration</span>, and{" "}
            <span className="text-purple-400 font-semibold">cloud-native architectures</span>.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
