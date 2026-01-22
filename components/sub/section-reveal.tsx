'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { getMotionScale } from '@/lib/motion-scale';

type SectionRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export const SectionReveal = ({
  children,
  className,
  delay = 0,
}: SectionRevealProps) => {
  const shouldReduce = useReducedMotion();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (shouldReduce) return;
    setScale(getMotionScale());
  }, [shouldReduce]);

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 * scale, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
};
