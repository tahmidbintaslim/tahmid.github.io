'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WelcomePillProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const WelcomePill = ({
  icon,
  children,
  className = '',
}: WelcomePillProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-linear-to-br from-purple-500/12 to-cyan-500/12 px-3 py-1.5',
        'opacity-95 backdrop-blur-sm',
        'transition-colors duration-200',
        className
      )}
      role="status"
      aria-live="polite"
      tabIndex={0}
      aria-label="Informational label"
    >
      {icon ? <span className="flex-none">{icon}</span> : null}
      <span className="text-xs leading-none font-medium text-white sm:text-sm">
        {children}
      </span>
    </div>
  );
};
