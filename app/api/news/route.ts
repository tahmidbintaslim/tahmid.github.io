import { NextResponse } from 'next/server';
import { cache, cacheKeys, cacheTTL } from '@/lib/cache';
import { logger } from '@/lib/logger'; // Import logger

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description?: string;
  thumbnail?: string;
};

type RSSItem = {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  thumbnail?: string;
  enclosure?: { link?: string };
};

// Fallback news data
const fallbackNews: NewsItem[] = [
  {
    title: 'The Future of Web Development in 2026',
    link: 'https://www.theverge.com/tech',
    pubDate: new Date().toISOString(),
    source: 'The Verge',
    description:
      "Exploring the latest trends in web development and what's next for the industry.",
  },
  {
    title: 'AI and Machine Learning Continue to Transform Tech',
    link: 'https://techcrunch.com',
    pubDate: new Date().toISOString(),
    source: 'TechCrunch',
    description:
      'How artificial intelligence is reshaping the technology landscape.',
  },
  {
    title: 'Cloud Computing Trends for Enterprise',
    link: 'https://arstechnica.com',
    pubDate: new Date().toISOString(),
    source: 'Ars Technica',
    description:
      'The latest developments in cloud infrastructure and services.',
  },
];

// Tech news RSS sources
const RSS_SOURCES = [
  { url: 'https://www.theverge.com/rss/index.xml', source: 'The Verge' },
  { url: 'https://techcrunch.com/feed/', source: 'TechCrunch' },
  {
    url: 'https://feeds.arstechnica.com/arstechnica/technology-lab',
    source: 'Ars Technica',
  },
  { url: 'https://www.wired.com/feed/rss', source: 'Wired' },
];

export async function GET() {
  try {
    const data = await cache.getOrSet(
      cacheKeys.news(),
      async () => {
        const newsApiKey = process.env.NEWSAPI_KEY;

        if (newsApiKey) {
          // Use NewsAPI for better news data
          try {
            const response = await fetch(
              `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=15&apiKey=${newsApiKey}`,
              { next: { revalidate: 1800 } } // 30 minutes
            );

            if (response.ok) {
              const newsData = await response.json();

              if (newsData.status === 'ok' && newsData.articles) {
                const articles = newsData.articles.map((item: any) => ({
                  title: item.title,
                  link: item.url,
                  pubDate: item.publishedAt,
                  source: item.source.name,
                  description: item.description?.slice(0, 150) + '...' || '',
                  thumbnail: item.urlToImage,
                }));

                return {
                  articles,
                  count: articles.length,
                };
              }
            }
          } catch (error) {
            logger.error('NewsAPI error', error);
            // Fall back to RSS
          }
        }

        // Fallback to RSS sources
        const results = await Promise.all(
          RSS_SOURCES.map(async (src) => {
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

              const response = await fetch(
                `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
                  src.url
                )}&count=5`,
                {
                  signal: controller.signal,
                }
              );

              clearTimeout(timeoutId);

              if (!response.ok) return [];

              const data = await response.json();

              if (data.status !== 'ok' && !data.items) return []; // Fixed condition

              return data.items.slice(0, 5).map((item: RSSItem) => ({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                source: src.source,
                description:
                  item.description?.replace(/<[^>]*>/g, '')?.slice(0, 150) +
                    '...' || '',
                thumbnail: item.thumbnail || item.enclosure?.link || undefined,
              }));
            } catch (error) {
              logger.error(`Error fetching ${src.source}`, error);
              return [];
            }
          })
        );

        let allNews = results.flat();

        // Sort by date (newest first)
        allNews.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        // Limit to 15 articles
        allNews = allNews.slice(0, 15);

        // Use fallback if no news fetched
        if (allNews.length === 0) {
          console.warn('No news fetched, using fallback data');
          allNews = fallbackNews;
        }

        return {
          articles: allNews,
          count: allNews.length,
        };
      },
      { ttl: cacheTTL.medium }
    );

    return NextResponse.json(
      {
        success: true,
        ...data,
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    logger.error('News API error:', error);

    return NextResponse.json(
      {
        success: true,
        articles: fallbackNews,
        count: fallbackNews.length,
        lastUpdated: new Date().toISOString(),
        fallback: true,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=1800',
        },
      }
    );
  }
}
