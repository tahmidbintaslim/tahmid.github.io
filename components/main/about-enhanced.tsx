"use client";

import { motion, useInView } from "framer-motion";
import { SparklesIcon, CheckBadgeIcon, RocketLaunchIcon, CodeBracketIcon, CloudIcon } from "@heroicons/react/24/solid";
import { CodeBracketSquareIcon, ShoppingCartIcon, CpuChipIcon, CloudIcon as CloudIconSolid } from "@heroicons/react/24/solid";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { useRef, useState } from "react";
import * as SimpleIcons from "simple-icons";

// Helper to get Simple Icon SVG
const getSimpleIconSvg = (iconName: string) => {
  try {
    const icon = (SimpleIcons as any)[iconName];
    if (icon) {
      return icon.svg;
    }
  } catch (e) {
    console.warn(`Icon ${iconName} not found`);
  }
  return null;
};

export const AboutEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expandedSection, setExpandedSection] = useState<string | null>("all"); // Open all by default
  const statsRef = useRef(null);
  const quickFactsRef = useRef(null);
  const expertiseRef = useRef(null);
  
  // Use Framer Motion's useInView for scroll animations
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const quickFactsInView = useInView(quickFactsRef, { once: true, amount: 0.2 });
  const expertiseInView = useInView(expertiseRef, { once: true, amount: 0.2 });

  const achievements = [
    {
      number: "6+",
      label: "Years Experience",
      icon: RocketLaunchIcon,
      color: "from-purple-500 to-pink-500",
      bgGradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
    {
      number: "20+",
      label: "Enterprise Projects",
      icon: CheckBadgeIcon,
      color: "from-cyan-500 to-blue-500",
      bgGradient: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
    },
    {
      number: "50+",
      label: "Technologies Mastered",
      icon: CodeBracketIcon,
      color: "from-green-500 to-emerald-500",
      bgGradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    },
    {
      number: "99.9%",
      label: "System Uptime",
      icon: CloudIconSolid,
      color: "from-yellow-500 to-orange-500",
      bgGradient: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
    },
  ];

  const quickFacts = [
    {
      title: "Full-Stack Mastery",
      description: "React, Vue, Next.js, Remix, Node.js, Python, Ruby on Rails, TypeScript",
      icon: CodeBracketSquareIcon,
      colorClass: "text-purple-400",
      bgGradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      title: "E-commerce Expert",
      description: "Shopify/Plus, WordPress, Headless CMS, ~40% sales growth achieved",
      icon: ShoppingCartIcon,
      colorClass: "text-cyan-400",
      bgGradient: "bg-gradient-to-br from-cyan-500/10 to-blue-500/10",
      borderColor: "border-cyan-500/30",
    },
    {
      title: "AI/ML Integration",
      description: "OpenAI, GPT-3/4, TensorFlow, PyTorch, Custom chatbots",
      icon: CpuChipIcon,
      colorClass: "text-green-400",
      bgGradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/30",
    },
    {
      title: "Cloud Native",
      description: "AWS, GCP, Azure, Docker, Kubernetes, Terraform, CI/CD",
      icon: CloudIconSolid,
      colorClass: "text-blue-400",
      bgGradient: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-500/30",
    },
  ];

  const expertise = [
    {
      id: "languages",
      title: "Programming Languages",
      items: [
        { name: "Python", icon: "siPython" },
        { name: "JavaScript", icon: "siJavascript" },
        { name: "TypeScript", icon: "siTypescript" },
        { name: "PHP", icon: "siPhp" },
        { name: "Rust", icon: "siRust" },
        { name: "Go", icon: "siGo" },
        { name: "Ruby", icon: "siRuby" },
      ],
      titleColor: "text-purple-400",
      badgeBg: "bg-purple-500/10",
      badgeText: "text-purple-300",
      badgeBorder: "border-purple-500/30",
      badgeBgHover: "hover:bg-purple-500/20",
    },
    {
      id: "frontend",
      title: "Frontend Frameworks",
      items: [
        { name: "React", icon: "siReact" },
        { name: "Vue.js", icon: "siVuedotjs" },
        { name: "Next.js", icon: "siNextdotjs" },
        { name: "Remix", icon: "siRemix" },
        { name: "Angular", icon: "siAngular" },
        { name: "Tailwind CSS", icon: "siTailwindcss" },
        { name: "Material UI", icon: "siMui" },
      ],
      titleColor: "text-cyan-400",
      badgeBg: "bg-cyan-500/10",
      badgeText: "text-cyan-300",
      badgeBorder: "border-cyan-500/30",
      badgeBgHover: "hover:bg-cyan-500/20",
    },
    {
      id: "backend",
      title: "Backend Frameworks",
      items: [
        { name: "Node.js", icon: "siNodedotjs" },
        { name: "Django", icon: "siDjango" },
        { name: "Flask", icon: "siFlask" },
        { name: "FastAPI", icon: "siFastapi" },
        { name: "Laravel", icon: "siLaravel" },
        { name: "Ruby on Rails", icon: "siRubyonrails" },
        { name: "Express.js", icon: "siExpress" },
      ],
      titleColor: "text-green-400",
      badgeBg: "bg-green-500/10",
      badgeText: "text-green-300",
      badgeBorder: "border-green-500/30",
      badgeBgHover: "hover:bg-green-500/20",
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      items: [
        { name: "AWS", icon: "siAmazonaws" },
        { name: "GCP", icon: "siGooglecloud" },
        { name: "Azure", icon: "siMicrosoftazure" },
        { name: "Docker", icon: "siDocker" },
        { name: "Kubernetes", icon: "siKubernetes" },
        { name: "Terraform", icon: "siTerraform" },
        { name: "CI/CD", icon: "siGithubactions" },
      ],
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

      {/* Bento Grid: Statistics Cards with varying sizes */}
      <motion.div
        ref={statsRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-7xl mt-10 mb-16 relative z-10"
      >
        {/* Bento Grid Layout - inspired by Apple's design */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-[140px] md:auto-rows-[180px]">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            // Bento Grid varying sizes: Large, Medium, Medium, Large pattern
            const sizes = [
              "md:col-span-3 md:row-span-2", // Large (top-left)
              "md:col-span-2 md:row-span-1", // Medium (top-right)
              "md:col-span-2 md:row-span-1", // Medium (middle-right)
              "md:col-span-3 md:row-span-2", // Large (bottom-left)
            ];
            
            return (
              <motion.div
                key={achievement.label}
                initial={{ y: 100, opacity: 0 }}
                animate={statsInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-md hover:border-purple-500/50 transition-all duration-300 cursor-pointer group relative overflow-hidden ${sizes[index]} col-span-2`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 group-hover:from-white/10 group-hover:to-white/0 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 rounded-2xl transition-all duration-300" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <Icon className={`w-14 h-14 md:w-16 md:h-16 mb-4 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className={`text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${achievement.color} group-hover:scale-110 transition-transform duration-300`}>
                    {achievement.number}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base mt-3 text-center group-hover:text-white transition-colors duration-300 font-medium">
                    {achievement.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bento Grid: Quick Facts with varying sizes */}
      <motion.div
        ref={quickFactsRef}
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-7xl mb-16 relative z-10"
      >
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Quick{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Facts
          </span>
        </h3>
        {/* Bento Grid for Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
          {quickFacts.map((fact, index) => {
            // Bento Grid varying sizes: wide, medium, medium, wide pattern
            const sizes = [
              "md:col-span-2",  // Wide
              "md:col-span-1",  // Medium
              "md:col-span-1",  // Medium
              "md:col-span-2",  // Wide
            ];
            
            return (
              <motion.div
                key={fact.title}
                initial={{ x: -100, opacity: 0 }}
                animate={quickFactsInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                className={`group p-6 rounded-2xl ${fact.bgGradient} border ${fact.borderColor} backdrop-blur-sm hover:border-opacity-80 transition-all duration-300 cursor-pointer relative overflow-hidden ${sizes[index]}`}
              >
                {/* Liquid Glass UI effect */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`${fact.colorClass} group-hover:scale-125 transition-transform duration-300 filter drop-shadow-lg`}>
                    <fact.icon className="w-12 h-12" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-xl md:text-2xl font-bold mb-2 ${fact.colorClass} transition-colors duration-300`}>
                      {fact.title}
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                      {fact.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Technical Expertise with Icons - Open by Default */}
      <motion.div
        ref={expertiseRef}
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-7xl mb-16 relative z-10"
      >
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Technical{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Expertise
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertise.map((category, index) => {
            const isOpen = expandedSection === "all" || expandedSection === category.id;
            
            return (
              <motion.div
                key={category.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={expertiseInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 border border-purple-500/20 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden"
              >
                {/* Liquid Glass effect */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl" />
                
                <button
                  onClick={() => setExpandedSection(expandedSection === category.id ? "all" : category.id)}
                  className="w-full text-left relative z-10"
                >
                  <h4 className={`text-xl font-bold mb-4 ${category.titleColor} flex items-center justify-between hover:scale-105 transition-transform duration-200`}>
                    {category.title}
                    <span className="text-2xl">{isOpen ? "−" : "+"}</span>
                  </h4>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden relative z-10"
                >
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-4 pt-2">
                    {category.items.map((item) => {
                      const iconSvg = getSimpleIconSvg(item.icon);
                      
                      return (
                        <div
                          key={item.name}
                          className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/0 hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer relative"
                          title={item.name}
                        >
                          {/* Icon */}
                          {iconSvg ? (
                            <div 
                              className={`w-10 h-10 ${category.badgeText} group-hover:scale-110 transition-transform duration-300`}
                              dangerouslySetInnerHTML={{ __html: iconSvg }}
                              style={{ fill: "currentColor" }}
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-lg ${category.badgeBg} flex items-center justify-center ${category.badgeText} font-bold text-sm`}>
                              {item.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          
                          {/* Label */}
                          <span className={`text-xs ${category.badgeText} text-center leading-tight group-hover:text-white transition-colors duration-200`}>
                            {item.name}
                          </span>
                          
                          {/* Tooltip */}
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
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
