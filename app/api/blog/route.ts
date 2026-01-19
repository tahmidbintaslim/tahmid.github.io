import { NextResponse } from 'next/server';
import { cache, cacheKeys, cacheTTL } from '@/lib/cache';

type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  platform: 'Medium' | 'Dev.to';
  readTime: string;
  coverImage?: string;
};

type RSSItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
  thumbnail?: string;
  enclosure?: { link?: string };
};

// Fallback data in case RSS feeds fail
const fallbackPosts: BlogPost[] = [
  {
    title: 'Building Scalable E-commerce Platforms with Shopify Plus',
    link: 'https://medium.com/@tahmidbintaslimrafi',
    pubDate: '2024-01-15',
    description:
      'Learn how to architect and develop high-performance e-commerce solutions using Shopify Plus, Remix, and modern web technologies.',
    platform: 'Medium',
    readTime: '8 min read',
  },
  {
    title: 'Modern Full-Stack Development with Next.js',
    link: 'https://dev.to/tahmidbintaslim',
    pubDate: '2024-01-10',
    description:
      'Discover the latest features and best practices for building full-stack applications with Next.js, TypeScript, and Tailwind CSS.',
    platform: 'Dev.to',
    readTime: '12 min read',
  },
];

async function fetchAndProcessFeed(
  url: string,
  platform: 'Medium' | 'Dev.to'
): Promise<BlogPost[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`,
      {
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      logger.error(`RSS fetch failed for ${platform}`, { status: response.status });
      return [];
    }

    const data = await response.json();

    if (data.status !== 'ok' || !data.items) {
      logger.error(`RSS parse failed for ${platform}`, { message: data.message });
      return [];
    }

    return data.items.map((item: RSSItem) => {
      let coverImage = item.thumbnail || item.enclosure?.link || '';

      if (platform === 'Medium' && !coverImage && item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) coverImage = imgMatch[1];
      }

      if (
        coverImage &&
        (coverImage.includes('/_/stat') ||
          coverImage.includes('/stat?') ||
          coverImage.includes('tracking') ||
          (!coverImage.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)/i) &&
            !coverImage.includes('miro.medium.com') &&
            !coverImage.includes('cdn-images-1.medium.com') &&
            !coverImage.includes('dev-to-uploads') &&
            !coverImage.includes('media2.dev.to')))
      ) {
        coverImage = '';
      }

      const cleanDescription =
        item.description
          ?.replace(/<[^>]*>/g, '')
          ?.replace(/&nbsp;/g, ' ')
          ?.replace(/&amp;/g, '&')
          ?.replace(/&lt;/g, '<')
          ?.replace(/&gt;/g, '>')
          ?.replace(/&quot;/g, '"')
          ?.replace(/&#39;/g, "'")
          ?.trim()
          ?.slice(0, 200) + '...' || '';

      const wordCount = item.content?.split(/\s+/).length || 0;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: cleanDescription,
        platform,
        readTime: `${readTime} min read`,
        coverImage: coverImage || undefined,
      };
    });
  } catch (error) {
    logger.error(`Error fetching ${platform} RSS`, error);
    return [];
  }
}

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const newsApiKey = process.env.NEWSAPI_KEY;

  if (newsApiKey) {
    try {
      const response = await fetch(`https://newsapi.org/v/top-headlines?category=technology&language=en&pageSize=&apiKey=${newsApiKey}`, { next: { revalidate:  } });

      if (response.ok) {
        const newsData = await response.json();

        if (newsData.status === 'ok' && newsData.articles) {
          const articles = newsData.articles.map((item: any) => ({
            title: item.title,
            link: item.url,
            pubDate: item.publishedAt,
            source: item.source.name,
            description: item.description?.slice(, ) + '...' || '',
            thumbnail: item.urlToImage,
          }));

          return NextResponse.json({ success:, articles, count: articles.length, lastUpdated: new Date().toISOString() }, { headers: { 'Cache-Control': 'public, s-maxage=, stale-while-revalidate=' } });
        }
      }
    } catch (error) {
      logger.error('NewsAPI error', error);
    }
  }

  const results = await Promise.all(RSS_SOURCES.map(async (src) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), );

      const response = await fetch(`https://api.rssjson.com/v/api.json?rss_url=${encodeURIComponent(src.url)}&count=`, { signal: controller.signal });

      clearTimeout(timeoutId);

      if (!response.ok) return [];

      const data = await response.json();

      if (data.status !== 'ok' || !data.items) return [];

      return data.items.slice(, ).map((item: RSSItem) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: src.source,
        description: item.description?.replace(/<[^>]*>/g, '')?.slice(, ) + '...' || '',
        thumbnail: item.thumbnail || item.enclosure?.link || undefined,
      }));
    } catch (error) {
      logger.error(`Error fetching ${src.source}`, error);
      return [];
    }
  }));

  let allNews = results.flat();

  allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  allNews = allNews.slice(, );

  if (allNews.length === ) {
    logger.warn('No news fetched, using fallback data');
    allNews = fallbackNews;
  }

  return NextResponse.json({ success:, articles: allNews, count: allNews.length, lastUpdated: new Date().toISOString() }, { headers: { 'Cache-Control': 'public, s-maxage=, stale-while-revalidate=' } });
}
  try {
    const data = await cache.getOrSet(
      cacheKeys.allBlog(),
      async () => {
        const [mediumPosts, devtoPosts] = await Promise.all([
          fetchAndProcessFeed(
            'https://medium.com/feed/@tahmidbintaslimrafi',
            'Medium'
          ),
          fetchAndProcessFeed('https://dev.to/feed/tahmidbintaslim', 'Dev.to'),
        ]);

        let allPosts = [...mediumPosts, ...devtoPosts];

        allPosts.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        if (allPosts.length === 0) {
          console.warn('No posts fetched, using fallback data');
          allPosts = fallbackPosts;
        }

        return {
          posts: allPosts,
          count: allPosts.length,
        };
      },
      { ttl: cacheTTL.long }
    );

    return NextResponse.json(
      {
        success: true,
        ...data,
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Blog API error:', error);

    return NextResponse.json(
      {
        success: true,
        posts: fallbackPosts,
        count: fallbackPosts.length,
        lastUpdated: new Date().toISOString(),
        fallback: true,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
        },
      }
    );
  }
}
