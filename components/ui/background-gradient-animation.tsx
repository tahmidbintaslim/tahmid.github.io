'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundGradientAnimationProps {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundGradientAnimation({
  children,
  className,
}: BackgroundGradientAnimationProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-3xl', className)}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 animate-pulse bg-linear-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20" />

      {/* Animated gradient overlay */}
      <div className="animate-shimmer absolute inset-0 bg-linear-to-r from-transparent via-purple-500/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-8">{children}</div>
    </div>
  );
}
