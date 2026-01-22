'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FollowerPointerCard } from '@/components/ui/following-pointer';

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
  techStack?: readonly string[];
  role?: string;
  company?: string;
  year?: number;
  className?: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
  role,
  company,
  year,
  className,
}: ProjectCardProps) => {
  const authorTitle = company || 'Project';
  const authorAvatar = '/logo.png';
  return (
    <div className={cn('h-full w-full', className)}>
      <FollowerPointerCard
        title={<TitleComponent title={authorTitle} avatar={authorAvatar} />}
        className="h-full"
      >
        <Link
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          className="h-full"
        >
          <div className="contrast-light group relative flex h-full flex-col overflow-hidden rounded-2xl border border-subtle bg-white transition duration-200 hover:shadow-xl">
            <div className="relative aspect-16/10 w-full flex-shrink-0 overflow-hidden rounded-tl-lg rounded-tr-lg bg-panel">
              <Image
                src={src}
                alt={title}
                fill
                className="h-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h2 className="card-title mb-2">{title}</h2>
              <p className="text-muted mb-4 flex-grow text-sm font-normal">
                {description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-muted text-sm">
                  {year ? year : role || 'Featured'}
                </span>
                <div className="relative z-10 block rounded-xl bg-space-950 px-6 py-2 text-xs font-bold text-white">
                  Read More
                </div>
              </div>
            </div>
          </div>
        </Link>
      </FollowerPointerCard>
    </div>
  );
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex items-center space-x-2">
    <Image
      src={avatar}
      height={20}
      width={20}
      alt={`${title} logo`}
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
