'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  IoBriefcaseOutline,
  IoHomeOutline,
  IoMailOutline,
  IoNewspaperOutline,
  IoPersonOutline,
} from 'react-icons/io5';

interface NavItem {
  label: string;
  icon: typeof IoHomeOutline; // Can be any IconType from react-icons
  href?: string;
  onClick?: () => void;
}

export default function MobileBottomNav() {
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
    { label: 'Home', icon: IoHomeOutline, href: '#hero' },
    { label: 'About', icon: IoPersonOutline, href: '#about-me' },
    { label: 'Services', icon: IoNewspaperOutline, href: '#services' },
    { label: 'Projects', icon: IoBriefcaseOutline, href: '#projects' },
    { label: 'Contact', icon: IoMailOutline, href: '#contact' },
  ];

  const handleNavClick = (index: number, item: NavItem) => {
    if (item.onClick) {
      item.onClick();
      return;
    }

    setActiveIndex(index);
    // Smooth scroll to section
    if (item.href) {
      // Special handling for home - scroll to top
      if (item.href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'auto' });
      }
    }
  };

  return (
    <>
      {isVisible && (
        <nav
          className="contrast-dark fixed right-4 bottom-4 left-4 z-50 md:hidden"
          aria-label="Mobile navigation"
        >
          {/* Liquid Glass Container */}
          <div className="relative">
            {/* Glass background with blur */}
            <div className="rounded-7 from-space-940/95 via-space-930/95 to-space-940/95 absolute inset-0 border border-white/10 bg-linear-to-r shadow-2xl shadow-purple-500/20 backdrop-blur-xl" />

            {/* Animated gradient border glow */}
            <div className="rounded-7 absolute -inset-px bg-linear-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30 opacity-50 blur-sm" />

            {/* Content */}
            <div className="relative px-4 py-3">
              {/* Navigation Row */}
              <div className="flex items-center justify-between">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeIndex === index && !item.onClick;

                  // Conditional rendering for Link or Button
                  if (item.href) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          handleNavClick(index, item);
                        }}
                        className="group relative flex min-h-14 min-w-14 touch-manipulation flex-col items-center justify-center"
                        aria-label={item.label}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute inset-1 rounded-2xl bg-linear-to-r from-purple-500/30 to-cyan-500/30 blur-md" />
                        )}

                        {/* Icon container - larger touch target */}
                        <div className="relative z-10">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                              isActive
                                ? 'border border-white/25 bg-linear-to-br from-purple-500/25 to-cyan-500/25'
                                : 'border border-white/5 bg-white/5'
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                isActive ? 'text-white' : 'text-muted'
                              } `}
                            />
                          </div>
                        </div>

                        {/* Label - always visible for better UX */}
                        <span
                          className={`text-2.5 mt-1 font-medium whitespace-nowrap ${
                            isActive ? 'text-white' : 'text-muted'
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    );
                  } else {
                    return (
                      <button
                        key={item.label}
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          handleNavClick(index, item);
                        }}
                        className="group relative flex min-h-14 min-w-14 touch-manipulation flex-col items-center justify-center"
                        aria-label={item.label}
                        aria-current={isActive ? 'page' : undefined}
                        type="button" // Always set type to button for buttons
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute inset-1 rounded-2xl bg-linear-to-r from-purple-500/30 to-cyan-500/30 blur-md" />
                        )}

                        {/* Icon container - larger touch target */}
                        <div className="relative z-10">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                              isActive
                                ? 'border border-white/25 bg-linear-to-br from-purple-500/25 to-cyan-500/25'
                                : 'border border-white/5 bg-white/5'
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                isActive ? 'text-white' : 'text-muted'
                              } `}
                            />
                          </div>
                        </div>

                        {/* Label - always visible for better UX */}
                        <span
                          className={`text-2.5 mt-1 font-medium whitespace-nowrap ${
                            isActive ? 'text-white' : 'text-muted'
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
