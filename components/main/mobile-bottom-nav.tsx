"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoHomeOutline, IoPersonOutline, IoBriefcaseOutline, IoNewspaperOutline, IoLocationSharp, IoMailOutline } from "react-icons/io5";

interface NavItem {
  label: string;
  icon: typeof IoHomeOutline;
  href: string;
  action?: () => void;
}

interface MobileBottomNavProps {
  onLocationClick: () => void;
  onNewsClick: () => void;
}

export default function MobileBottomNav({ onLocationClick, onNewsClick }: MobileBottomNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems: NavItem[] = [
    { label: "Home", icon: IoHomeOutline, href: "#hero" },
    { label: "About", icon: IoPersonOutline, href: "#about" },
    { label: "Projects", icon: IoBriefcaseOutline, href: "#projects" },
    { label: "Blog", icon: IoNewspaperOutline, href: "#blog" },
    { label: "Contact", icon: IoMailOutline, href: "#contact" },
  ];

  // Widget buttons for the bottom nav
  const widgetItems = [
    { label: "Info", icon: IoLocationSharp, action: onLocationClick, gradient: "from-purple-500 to-pink-500" },
    { label: "News", icon: IoNewspaperOutline, action: onNewsClick, gradient: "from-cyan-500 to-blue-500" },
  ];

  const handleNavClick = (index: number, href: string) => {
    setActiveIndex(index);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="md:hidden fixed bottom-4 left-4 right-4 z-50"
    >
      {/* Liquid Glass Container */}
      <div className="relative">
        {/* Glass background with blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0118]/90 via-[#1a0b2e]/90 to-[#0a0118]/90 rounded-[24px] backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/20" />
        
        {/* Animated gradient border glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30 rounded-[24px] blur-sm opacity-60 animate-pulse" />
        
        {/* Content */}
        <div className="relative px-4 py-3">
          {/* Main Navigation Row */}
          <div className="flex items-center justify-around mb-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(index, item.href)}
                  className="relative flex flex-col items-center justify-center w-14 h-14 group"
                >
                  {/* Active indicator with liquid effect */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-2xl blur-md"
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Icon container */}
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className="relative z-10"
                  >
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-xl
                      ${isActive 
                        ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/20' 
                        : 'bg-white/5 border border-white/5'
                      }
                      transition-all duration-300
                      group-active:scale-90
                    `}>
                      <Icon className={`
                        h-5 w-5 transition-all duration-300
                        ${isActive 
                          ? 'text-white' 
                          : 'text-gray-400 group-hover:text-white'
                        }
                      `} />
                    </div>
                  </motion.div>
                  
                  {/* Label - only show for active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute -bottom-1 text-[10px] font-medium text-white whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-2" />

          {/* Widget Buttons Row */}
          <div className="flex items-center justify-center gap-3">
            {widgetItems.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.label}
                  onClick={item.action}
                  whileTap={{ scale: 0.9 }}
                  className="group relative"
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-xl blur opacity-0 group-hover:opacity-50 group-active:opacity-70 transition-opacity duration-300`} />
                  
                  {/* Button */}
                  <div className={`
                    relative flex items-center gap-2 px-6 py-2.5 rounded-xl
                    bg-gradient-to-r ${item.gradient} bg-opacity-10
                    border border-white/20
                    backdrop-blur-sm
                    transition-all duration-300
                    group-hover:border-white/30
                    group-active:scale-95
                  `}>
                    <Icon className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">{item.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
