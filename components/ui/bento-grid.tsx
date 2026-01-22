import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type BentoGridProps = {
  className?: string;
  children: ReactNode;
};

type BentoGridItemProps = {
  title: string;
  description: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  className?: string;
  showBorders?: boolean;
  'aria-label'?: string;
};

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  title,
  description,
  header,
  icon,
  className,
  showBorders = true,
  ...rest
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        'group/bento bg-space-950/40 relative overflow-hidden rounded-2xl p-4 shadow-2xl backdrop-blur-xl transition-all duration-200 ease-out',
        showBorders &&
          'border border-white/10 hover:border-white/20 hover:shadow-purple-500/20',
        className
      )}
      {...rest}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover/bento:opacity-100" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex-1">{header}</div>
        <div className="text-muted mt-4 flex items-center gap-2 text-sm">
          {icon ? (
            <span className="text-muted rounded-full border border-white/10 bg-white/5 p-2">
              {icon}
            </span>
          ) : null}
          <div>
            <h3 className="text-ink text-base font-semibold">{title}</h3>
            <p className="text-muted">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
