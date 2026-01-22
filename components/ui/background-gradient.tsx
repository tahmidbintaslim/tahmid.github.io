'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function BackgroundGradient({
  children,
  className,
  containerClassName,
}: BackgroundGradientProps) {
  return (
    <div className={cn('group relative p-1', containerClassName)}>
      <div
        className={cn(
          'absolute inset-0 rounded-3xl bg-linear-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100',
          className
        )}
      />
      <div
        className={cn(
          'relative rounded-[22px] bg-linear-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 p-2',
          className
        )}
      >
        <div className="contrast-light rounded-[18px] bg-white p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
