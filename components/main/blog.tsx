'use client';

import { useMemo } from 'react';

import { Carousel, Card } from '@/components/ui/apple-cards-carousel';

export type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  platform: 'Medium' | 'Dev.to';
  readTime?: string;
  coverImage?: string;
};

interface BlogProps {
  initialPosts: BlogPost[];
  lastUpdated?: string;
}

const Blog = ({ initialPosts, lastUpdated }: BlogProps) => {
  const posts = useMemo(() => {
    return [...initialPosts].sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });
  }, [initialPosts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const cards = posts.map((post, index) => (
    <Card
      key={`${post.link}-${index}`}
      index={index}
      card={{
        category: post.platform,
        title: post.title,
        src: post.coverImage || '/og-image.png',
        href: post.link,
        content: (
          <div className="space-y-3">
            <p className="text-muted line-clamp-4 text-sm">
              {post.description}
            </p>
            <div className="text-muted flex items-center justify-between text-xs">
              <span>{formatDate(post.pubDate)}</span>
              {post.readTime ? <span>{post.readTime}</span> : null}
            </div>
            <span className="text-xs tracking-wide text-cyan-300 uppercase">
              Read more in the card
            </span>
          </div>
        ),
      }}
    />
  ));

  return (
    <section
      id="blog"
      className="flex flex-col items-center justify-center px-4 py-12 md:py-16 lg:py-20"
    >
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-start md:mb-12 md:text-center">
          <div>
            <h2 className="section-title mb-3 md:mb-4 md:text-center">
              <span className="text-white">Latest Articles </span>
              <span className="section-title-gradient">& Insights</span>
            </h2>
            <p className="section-lead max-w-2xl md:mx-auto md:text-center">
              Sharing knowledge and experiences on full-stack development, cloud
              architecture, and modern web technologies
            </p>
            {lastUpdated && (
              <p className="text-muted mt-3 text-xs md:text-center md:text-sm">
                Updated {new Date(lastUpdated).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-muted py-16 text-start">
            No articles available right now.
          </div>
        ) : (
          <div className="py-6">
            <Carousel items={cards} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
