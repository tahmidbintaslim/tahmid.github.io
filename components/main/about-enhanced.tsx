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
      number: "4+",
      label: "Years Experience",
      description: "Building scalable, high-performance applications with modern technologies and best practices",
      icon: RocketLaunchIcon,
      color: "from-purple-500 to-pink-500",
      bgGradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
    {
      number: "20+",
      label: "Enterprise Projects",
      description: "Successfully delivered complex enterprise solutions across various industries",
      icon: CheckBadgeIcon,
      color: "from-cyan-500 to-blue-500",
      bgGradient: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
    },
    {
      number: "50+",
      label: "Technologies Mastered",
      description: "Expert proficiency in modern frameworks, languages, and development tools",
      icon: CodeBracketIcon,
      color: "from-green-500 to-emerald-500",
      bgGradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    },
    {
      number: "99.9%",
      label: "System Uptime",
      description: "Reliable architecture ensuring maximum availability and performance",
      icon: CloudIconSolid,
      color: "from-yellow-500 to-orange-500",
      bgGradient: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
    },
    {
      number: "10K+",
      label: "Active Users",
      description: "Built applications serving thousands of users worldwide daily",
      icon: SparklesIcon,
      color: "from-pink-500 to-rose-500",
      bgGradient: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
    },
  ];

  const quickFacts = [
    {
      title: "SaaS & Software Architecture Expert",
      description: "Expert in SDLC, Agile methodologies, microservices architecture, scalable SaaS platforms, and end-to-end software development lifecycle management",
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
      description: "AWS, GCP, Azure, Docker, Kubernetes, Terraform, CI/CD pipelines, serverless architecture, and infrastructure as code",
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
      className="flex flex-col items-center justify-center py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20 relative overflow-hidden"
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
          className="absolute -top-20 -right-20 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"
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
          className="absolute -bottom-20 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl"
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
        <h2 className="Welcome-text text-[12px] sm:text-[13px]">
          Get to know me better
        </h2>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[28px] sm:text-[36px] md:text-[40px] lg:text-[50px] text-white font-bold mt-[16px] sm:mt-[20px] text-center mb-[12px] sm:mb-[15px] relative z-10"
      >
        About{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Me
        </span>
      </motion.h2>

      {/* Bento Grid: Statistics Cards with improved layout */}
      <motion.div
        ref={statsRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-7xl mt-6 sm:mt-10 mb-12 sm:mb-20 relative z-10"
      >
        {/* Proper Bento Grid Layout - 3-column responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            // First card (6+ Years) spans 2 columns and 2 rows (large)
            // Next 2 cards (20+, 50+) are normal size on top row
            // Last 2 cards (99.9%, 10K+) are normal size on bottom row beside the large card
            let gridClass = '';
            if (index === 0) {
              gridClass = 'md:col-span-1 md:row-span-2'; // Large card takes 2 rows, 1 column
            } else {
              gridClass = 'md:col-span-1'; // Regular cards
            }
            
            const isLarge = index === 0;
            
            return (
              <motion.div
                key={achievement.label}
                initial={{ y: 100, opacity: 0 }}
                animate={statsInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                }}
                className={`${gridClass} flex flex-col items-center justify-center p-8 ${isLarge ? 'md:p-12' : 'md:p-8'} rounded-3xl ${achievement.bgGradient} border border-purple-500/30 backdrop-blur-xl hover:border-purple-500/60 transition-all duration-500 cursor-pointer group relative overflow-hidden shadow-2xl hover:shadow-purple-500/20`}
              >
                {/* Glassmorphism layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated gradient orb */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.color} opacity-20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon with proper rendering using fill color */}
                  <div className={`p-5 rounded-2xl ${achievement.bgGradient} border border-purple-500/20 mb-6 group-hover:scale-110 transition-all duration-500 flex items-center justify-center`}>
                    <div className={`bg-gradient-to-r ${achievement.color} p-1 rounded-xl`}>
                      <Icon className={`${isLarge ? 'w-14 h-14 md:w-16 md:h-16' : 'w-10 h-10 md:w-12 md:h-12'} text-white`} />
                    </div>
                  </div>
                  
                  <h3 className={`${isLarge ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'} font-bold text-transparent bg-clip-text bg-gradient-to-r ${achievement.color} group-hover:scale-105 transition-transform duration-300 mb-4`}>
                    {achievement.number}
                  </h3>
                  
                  <p className={`text-gray-300 ${isLarge ? 'text-lg md:text-xl' : 'text-base md:text-lg'} font-semibold group-hover:text-white transition-colors duration-300 mb-3`}>
                    {achievement.label}
                  </p>
                  
                  {/* Add descriptive text for all cards */}
                  <p className={`text-gray-400 ${isLarge ? 'text-sm md:text-base' : 'text-xs md:text-sm'} leading-relaxed max-w-xs group-hover:text-gray-300 transition-colors duration-300`}>
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Proper Bento Grid: Quick Facts */}
      <motion.div
        ref={quickFactsRef}
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-7xl mt-12 mb-20 relative z-10"
      >
        <h3 className="text-[32px] md:text-[40px] font-bold text-center mb-10">
          <span className="text-white">Quick </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Facts
          </span>
        </h3>
        
        {/* Proper Bento Grid - First item full width, then 2 columns, last item full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickFacts.map((fact, index) => {
            // First item and last item span full width
            const isWide = index === 0 || index === 3;
            
            return (
              <motion.div
                key={fact.title}
                initial={{ x: -100, opacity: 0 }}
                animate={quickFactsInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                }}
                className={`${isWide ? 'md:col-span-2' : 'md:col-span-1'} group p-8 md:p-10 rounded-3xl ${fact.bgGradient} border ${fact.borderColor} backdrop-blur-xl hover:border-opacity-100 transition-all duration-500 cursor-pointer relative overflow-hidden shadow-2xl hover:shadow-3xl`}
              >
                {/* Glassmorphism layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating gradient orb */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10 flex items-start gap-6">
                  {/* Icon Container */}
                  <div className={`flex-shrink-0 ${fact.colorClass} group-hover:scale-110 transition-all duration-500`}>
                    <div className={`p-5 rounded-2xl ${fact.bgGradient} border ${fact.borderColor}`}>
                      <fact.icon className="w-12 h-12 md:w-14 md:h-14" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-2xl md:text-3xl font-bold mb-4 ${fact.colorClass} transition-all duration-300 leading-tight`}>
                      {fact.title}
                    </h4>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      {fact.description}
                    </p>
                  </div>
                </div>
                
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
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
        className="w-full max-w-7xl mt-12 mb-20 relative z-10"
      >
        <h3 className="text-[32px] md:text-[40px] font-bold text-center mb-10">
          <span className="text-white">Technical </span>
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

      {/* Professional Summary - Same width as Quick Facts */}
      <motion.div
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-7xl text-lg text-gray-300 text-center mb-8 leading-relaxed relative z-10"
      >
        <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-md">
          <p className="mb-4">
            I&apos;m a passionate <span className="text-purple-400 font-semibold">Senior Software Engineer</span> with over 4 years of hands-on experience 
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
