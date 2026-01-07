"use client";

import { useState, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll to show/hide navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navigation when scrolling down past 100px
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: NavItem[] = [
    { label: "Home", icon: IoHomeOutline, href: "#hero" },
    { label: "About", icon: IoPersonOutline, href: "#about-me" },
    { label: "Projects", icon: IoBriefcaseOutline, href: "#projects" },
    { label: "Blog", icon: IoNewspaperOutline, href: "#blog" },
    { label: "Contact", icon: IoMailOutline, href: "#contact" },
    { label: "Info", icon: IoLocationSharp, href: "#", action: onLocationClick },
    { label: "News", icon: IoNewspaperOutline, href: "#", action: onNewsClick },
  ];

  const handleNavClick = (index: number, href: string, action?: () => void) => {
    if (action) {
      action();
      return;
    }
    setActiveIndex(index);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="md:hidden fixed bottom-4 left-4 right-4 z-50"
        >
      {/* Liquid Glass Container */}
      <div className="relative">
        {/* Glass background with blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0118]/90 via-[#1a0b2e]/90 to-[#0a0118]/90 rounded-[24px] backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/20" />
        
        {/* Animated gradient border glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30 rounded-[24px] blur-sm opacity-60 animate-pulse" />
        
        {/* Content */}
        <div className="relative px-2 py-3">
          {/* Single Navigation Row with all icons */}
          <div className="flex items-center justify-around">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      handleNavClick(index, item.href, item.action);
                    } else {
                      handleNavClick(index, item.href);
                    }
                  }}
                  className="relative flex flex-col items-center justify-center w-12 h-12 group"
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
                      flex items-center justify-center w-9 h-9 rounded-xl
                      ${isActive 
                        ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/20' 
                        : 'bg-white/5 border border-white/5'
                      }
                      transition-all duration-300
                      group-active:scale-90
                    `}>
                      <Icon className={`
                        h-4 w-4 transition-all duration-300
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
                        className="absolute -bottom-1 text-[9px] font-medium text-white whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
      )}
    </AnimatePresence>
  );
}
