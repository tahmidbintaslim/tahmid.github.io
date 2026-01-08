"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoHomeOutline, IoPersonOutline, IoBriefcaseOutline, IoNewspaperOutline, IoMailOutline } from "react-icons/io5";

interface NavItem {
  label: string;
  icon: typeof IoHomeOutline;
  href: string;
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

  // Core navigation items - reduced to 5 for better mobile UX
  const navItems: NavItem[] = [
    { label: "Home", icon: IoHomeOutline, href: "#hero" },
    { label: "About", icon: IoPersonOutline, href: "#about-me" },
    { label: "Projects", icon: IoBriefcaseOutline, href: "#projects" },
    { label: "Blog", icon: IoNewspaperOutline, href: "#blog" },
    { label: "Contact", icon: IoMailOutline, href: "#contact" },
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
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="md:hidden fixed bottom-4 left-4 right-4 z-50"
          aria-label="Mobile navigation"
        >
          {/* Liquid Glass Container */}
          <div className="relative">
            {/* Glass background with blur */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0118]/95 via-[#1a0b2e]/95 to-[#0a0118]/95 rounded-[28px] backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/20" />
            
            {/* Animated gradient border glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30 rounded-[28px] blur-sm opacity-50" />
            
            {/* Content */}
            <div className="relative px-4 py-3">
              {/* Navigation Row */}
              <div className="flex items-center justify-between">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeIndex === index;
                  
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(index, item.href);
                      }}
                      className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[56px] group touch-manipulation"
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
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
                            className="absolute inset-1 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-2xl blur-md"
                          />
                        )}
                      </AnimatePresence>
                      
                      {/* Icon container - larger touch target */}
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="relative z-10"
                      >
                        <div className={`
                          flex items-center justify-center w-11 h-11 rounded-xl
                          ${isActive 
                            ? 'bg-gradient-to-br from-purple-500/25 to-cyan-500/25 border border-white/25' 
                            : 'bg-white/5 border border-white/5'
                          }
                          transition-all duration-300
                          active:scale-95
                        `}>
                          <Icon className={`
                            h-5 w-5 transition-all duration-300
                            ${isActive 
                              ? 'text-white' 
                              : 'text-gray-400'
                            }
                          `} />
                        </div>
                      </motion.div>
                      
                      {/* Label - always visible for better UX */}
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-[10px] font-medium mt-1 whitespace-nowrap transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {item.label}
                      </motion.span>
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
