'use client';

import dynamic from 'next/dynamic';

const StarsCanvas = dynamic(
  () => import('./star-background').then((mod) => mod.StarsCanvas),
  { ssr: false }
);

export { StarsCanvas };
