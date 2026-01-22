'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowingEffectProps {
  children: React.ReactNode;
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  className?: string;
}

export function GlowingEffect({
  children,
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  className,
}: GlowingEffectProps) {
  const [isGlowing, setIsGlowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !glow) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      setIsGlowing(distance < proximity);
    };

    const handleMouseLeave = () => {
      setIsGlowing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, glow, proximity]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative transition-all duration-300 ease-out',
        isGlowing && glow && 'glowing-effect scale-[1.02]',
        className
      )}
      style={
        isGlowing && glow
          ? {
              filter: `drop-shadow(0 0 ${spread}px rgba(168, 85, 247, 0.4))`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
