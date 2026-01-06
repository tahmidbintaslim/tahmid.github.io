"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { slideInFromTop } from "@/lib/motion";
import { SparklesIcon, BuildingOfficeIcon, CalendarIcon, BriefcaseIcon } from "@heroicons/react/24/solid";

export const JourneyHorizontal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const timeline = [
    {
      year: "March 2024 - Present",
      title: "Senior Software Developer",
      company: "Marion's Kitchen Group",
      location: "Bangkok, Thailand",
      description:
        "Leading full-stack Shopify Headless development with Remix, Node.js, TypeScript, and Rust. Pioneered Shopify app development, optimized e-commerce pipelines achieving ~40% sales boost, architected internal SaaS solutions, and built scalable Klaviyo integration APIs for advanced marketing automation.",
      technologies: ["Remix", "Node.js", "TypeScript", "Rust", "Shopify", "Klaviyo"],
      achievements: ["~40% sales boost", "Internal SaaS architecture", "Klaviyo API integration"],
      color: "purple",
      logo: "🍴",
    },
    {
      year: "May 2023 - February 2024",
      title: "Senior Software Developer",
      company: "Trienpont International",
      location: "Bangkok, Thailand",
      description:
        "Led Full Stack Development team for real estate project, architecting robust Node.js APIs and Next.js/React front-ends. Optimized cloud deployments for enhanced performance, developed custom WordPress APIs/plugins, contributed to Ruby on Rails projects, and implemented comprehensive CI/CD workflows.",
      technologies: ["Node.js", "Next.js", "React", "Ruby on Rails", "WordPress", "CI/CD"],
      achievements: ["Led Full Stack team", "Cloud optimization", "CI/CD implementation"],
      color: "cyan",
      logo: "🏢",
    },
    {
      year: "November 2021 - May 2023",
      title: "Full Stack Developer",
      company: "Relevant Audience",
      location: "Bangkok, Thailand",
      description:
        "Directed technical team on high-impact projects. Engineered complex TCAS System using Node.js, TypeScript, Vue.js, TypeORM, Redis, MongoDB, AWS. Built custom e-commerce on WordPress/Shopify, developed AI-driven SEO tools in Python, and integrated enterprise solutions (Cal.com, Chatwoot, Outline).",
      technologies: ["Vue.js", "TypeScript", "TypeORM", "Redis", "MongoDB", "AWS", "Python"],
      achievements: ["TCAS System architecture", "AI-driven SEO tools", "Enterprise integrations"],
      color: "green",
      logo: "📊",
    },
    {
      year: "June 2021 - September 2021",
      title: "Full Stack Developer",
      company: "INFINITE AGENCY BKK",
      location: "Bangkok, Thailand",
      description:
        "Drove 20% sales increase through e-commerce pipeline optimization on Shopify. Developed custom themes, executed comprehensive architectural revamp of Bettr Men's Facial Care website, and managed full website architecture for various e-commerce projects.",
      technologies: ["Shopify", "JavaScript", "CSS", "E-commerce"],
      achievements: ["20% sales increase", "Bettr website revamp", "Custom theme development"],
      color: "blue",
      logo: "🎨",
    },
    {
      year: "April 2021 - September 2021",
      title: "Full Stack Developer",
      company: "Adaptivity",
      location: "Bangkok, Thailand",
      description:
        "Led strategic redesign of Adaptivity's brand website, revitalized WordPress theme. Developed custom chat application using OpenAI API and Python, integrated GPT-3/GPT-3.5 models into internal systems, and implemented comprehensive performance improvements.",
      technologies: ["OpenAI", "Python", "GPT-3", "WordPress"],
      achievements: ["GPT chat application", "Website redesign", "OpenAI integration"],
      color: "pink",
      logo: "💬",
    },
    {
      year: "September 2020 - June 2021",
      title: "Software Developer",
      company: "Scalia Ventures",
      location: "Bangkok, Thailand",
      description:
        "Successfully delivered 20+ custom web development projects for leading conglomerate agency. Demonstrated expertise in WordPress, Shopify, and custom solutions across restaurants, real estate, fashion, finance, and trading sectors.",
      technologies: ["WordPress", "Shopify", "HTML", "CSS", "JavaScript"],
      achievements: ["20+ projects delivered", "Multi-sector expertise", "Custom solutions"],
      color: "yellow",
      logo: "🚀",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center py-20 px-6 md:px-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] relative z-10 mb-6"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h2 className="Welcome-text text-[13px]">Professional Timeline</h2>
      </motion.div>

      <motion.h2
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[40px] md:text-[50px] text-white font-bold text-center mb-[15px] relative z-10"
      >
        My{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Journey
        </span>
      </motion.h2>

      <motion.p
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-gray-300 text-center max-w-2xl mb-12 relative z-10"
      >
        6 years of professional growth across cutting-edge technologies and diverse industries
      </motion.p>

      {/* Desktop: Horizontal Scrolling Timeline */}
      <div className="hidden md:block w-full max-w-7xl relative z-10">
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden pb-8 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-purple-500/10"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex gap-8 px-8 min-w-max relative">
            {/* Timeline line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 via-green-500 via-blue-500 via-pink-500 to-yellow-500" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative flex-shrink-0 w-96"
              >
                {/* Timeline dot */}
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-6 h-6 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 border-4 border-[#030014] cursor-pointer shadow-lg shadow-${item.color}-500/50`}
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                  className="mt-36 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Company Logo/Icon */}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.logo}
                  </div>

                  {/* Year Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${item.color}-500/20 border border-${item.color}-500/30 mb-4`}>
                    <CalendarIcon className="w-4 h-4 text-${item.color}-400" />
                    <span className={`text-xs font-bold text-${item.color}-300`}>{item.year}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {item.title}
                  </h4>

                  {/* Company */}
                  <div className="flex items-center gap-2 mb-3">
                    <BuildingOfficeIcon className={`w-5 h-5 text-${item.color}-400`} />
                    <p className={`text-${item.color}-400 font-semibold`}>{item.company}</p>
                  </div>

                  {/* Location */}
                  <p className="text-gray-400 text-sm mb-4">{item.location}</p>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 rounded-md text-xs bg-${item.color}-500/10 text-${item.color}-300 border border-${item.color}-500/30`}
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-xs bg-gray-500/10 text-gray-300">
                        +{item.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Achievements (on hover/click) */}
                  {selectedJob === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-purple-500/20 pt-4"
                    >
                      <h5 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <BriefcaseIcon className="w-4 h-4 text-cyan-400" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement) => (
                          <li key={achievement} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">✓</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center mt-6 text-gray-400 text-sm"
        >
          ← Scroll horizontally to explore timeline →
        </motion.div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden w-full max-w-xl relative z-10">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 via-green-500 via-blue-500 via-pink-500 to-yellow-500" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative mb-8 pl-12"
            >
              {/* Timeline dot */}
              <div className={`absolute left-4 top-8 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 border-4 border-[#030014] shadow-lg shadow-${item.color}-500/50`} />

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
              >
                {/* Logo */}
                <div className="text-4xl mb-3">{item.logo}</div>

                {/* Year */}
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-${item.color}-500/20 border border-${item.color}-500/30 mb-3`}>
                  <CalendarIcon className="w-3 h-3" />
                  <span className="text-xs font-bold">{item.year}</span>
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>

                {/* Company */}
                <div className="flex items-center gap-2 mb-3">
                  <BuildingOfficeIcon className={`w-4 h-4 text-${item.color}-400`} />
                  <p className={`text-${item.color}-400 font-semibold text-sm`}>{item.company}</p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 rounded-md text-xs bg-${item.color}-500/10 text-${item.color}-300 border border-${item.color}-500/30`}
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="px-2 py-1 rounded-md text-xs bg-gray-500/10 text-gray-300">
                      +{item.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Achievements (expanded) */}
                {selectedJob === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-purple-500/20 pt-3 mt-3"
                  >
                    <h5 className="text-sm font-bold text-white mb-2">Key Achievements</h5>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement) => (
                        <li key={achievement} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
