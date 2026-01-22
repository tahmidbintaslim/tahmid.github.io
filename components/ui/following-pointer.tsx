'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';

type FollowerPointerCardProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export const FollowerPointerCard = ({
  title,
  children,
  className,
}: FollowerPointerCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      setPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    node.addEventListener('mousemove', handleMove);
    return () => node.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {children}
      <AnimatePresence>
        {isActive ? (
          <motion.div
            className="pointer-events-none absolute z-50 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ left: position.x, top: position.y }}
          >
            <div className="flex items-center gap-2 rounded-full bg-space-950/90 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              {title}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
