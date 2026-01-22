import 'server-only';

import { cache, cacheKeys, cacheTTL } from '@/lib/cache';

export interface NewsArticle {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  description: string;
  image?: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  uvIndex?: number;
  uvLevel?: string;
  airQuality?: {
    aqi: number;
    level: string;
    pm25?: number;
    pm10?: number;
  };
}

interface LocationData {
  city: string;
  country: string;
  timezone: string;
  localTime: string;
  latitude?: number;
  longitude?: number;
  region?: string;
  isExact?: boolean;
}

// Server actions for client components

export async function fetchLocationData(): Promise<LocationData | null> {
  return getLocationData();
}

export async function fetchWeatherData(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  return getWeatherData(lat, lon);
}

export async function fetchNewsData(): Promise<NewsArticle[]> {
  return getNewsData();
}

// Server-side weather fetching with caching
export async function getWeatherData(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  try {
    const cacheKey = cacheKeys.weather(String(lat), String(lon));

    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return cachedData as WeatherData;
    }

    const weatherApiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!weatherApiKey) {
      console.error('OpenWeatherMap API key not configured');
      return null;
    }

    // Fetch weather data from OpenWeatherMap
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`,
      {
        next: { revalidate: cacheTTL.medium }, // 30 minutes
      }
    );

    if (!response.ok) {
      console.error(`OpenWeatherMap API error: ${response.status}`);
      return null;
    }

    const weatherJson = await response.json();

    if (!weatherJson.main || !weatherJson.weather || !weatherJson.weather[0]) {
      console.error('Invalid weather data received');
      return null;
    }

    const main = weatherJson.main;
    const weatherInfo = weatherJson.weather[0];
    const wind = weatherJson.wind || {};

    const getIcon = (condition: string) => {
      const lower = condition.toLowerCase();
      if (lower.includes('clear')) return '☀️';
      if (lower.includes('cloud')) return '☁️';
      if (lower.includes('rain')) return '🌧️';
      if (lower.includes('snow')) return '❄️';
      if (lower.includes('storm') || lower.includes('thunder')) return '⛈️';
      if (lower.includes('fog') || lower.includes('mist')) return '🌫️';
      return '🌤️';
    };

    const weather: WeatherData = {
      temperature: Math.round(main.temp || 0),
      condition: weatherInfo.main,
      humidity: main.humidity || 0,
      windSpeed: Math.round((wind.speed || 0) * 3.6), // Convert m/s to km/h
      icon: getIcon(weatherInfo.main),
      uvIndex: 0, // Would need separate UV API call
      uvLevel: 'Unknown',
    };

    // Cache the result
    await cache.set(cacheKey, weather, { ttl: cacheTTL.medium });

    return weather;
  } catch (error) {
    console.error('Weather API error:', error);
    return null;
  }
}

// Server-side location fetching with caching
export async function getLocationData(): Promise<LocationData | null> {
  try {
    const cacheKey = cacheKeys.location('default'); // Using 'default' as client IP not available here

    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return cachedData as LocationData;
    }

    const geoapifyKey = process.env.GEOAPIFY_API_KEY;
    if (!geoapifyKey) {
      console.error('Geoapify API key not configured');
      return null;
    }

    // Fetch location data from Geoapify
    const response = await fetch(
      `https://api.geoapify.com/v1/ipinfo?&apiKey=${geoapifyKey}`,
      {
        next: { revalidate: cacheTTL.medium }, // 30 minutes
      }
    );

    if (!response.ok) {
      console.error(`Geoapify API error: ${response.status}`);
      return null;
    }

    const locationJson = await response.json();

    if (!locationJson.city || !locationJson.country) {
      console.error('Invalid location data received');
      return null;
    }

    const location: LocationData = {
      city:
        typeof locationJson.city === 'string'
          ? locationJson.city
          : locationJson.city?.name || 'Unknown',
      country:
        typeof locationJson.country === 'string'
          ? locationJson.country
          : locationJson.country?.name || 'Unknown',
      timezone:
        typeof locationJson.timezone === 'string'
          ? locationJson.timezone
          : locationJson.timezone?.name || 'UTC',
      localTime: new Date().toLocaleTimeString('en-US', {
        timeZone:
          typeof locationJson.timezone === 'string'
            ? locationJson.timezone
            : locationJson.timezone?.name || 'UTC',
        hour12: false,
      }),
      latitude: locationJson.latitude || locationJson.location?.latitude,
      longitude: locationJson.longitude || locationJson.location?.longitude,
      region:
        typeof locationJson.state === 'string'
          ? locationJson.state
          : locationJson.state?.name,
      isExact: true,
    };

    // Cache the result
    await cache.set(cacheKey, location, { ttl: cacheTTL.long });

    return location;
  } catch (error) {
    console.error('Location API error:', error);
    return null;
  }
}

// Server-side news fetching with caching
export async function getNewsData(): Promise<NewsArticle[]> {
  try {
    const cacheKey = cacheKeys.news();
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return cachedData as NewsArticle[];
    }

    const newsApiKey = process.env.NEWSAPI_KEY;
    if (!newsApiKey) {
      console.error('NewsAPI key not configured');
      return getFallbackNews();
    }

    // Fetch news data from NewsAPI
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${newsApiKey}`,
      {
        next: { revalidate: cacheTTL.medium }, // 30 minutes
      }
    );

    if (!response.ok) {
      console.error(`NewsAPI error: ${response.status}`);
      return getFallbackNews();
    }

    const newsJson = await response.json();

    if (newsJson.status !== 'ok' || !newsJson.articles) {
      console.error('Invalid news data received');
      return getFallbackNews();
    }

    const articles: NewsArticle[] = newsJson.articles
      .filter((item: any) => item.title && item.url)
      .slice(0, 5)
      .map((item: any) => ({
        title: item.title,
        source: item.source?.name || 'Unknown',
        url: item.url,
        publishedAt: item.publishedAt,
        description: item.description?.slice(0, 150) + '...' || '',
        image: item.urlToImage,
      }));

    // Cache the result
    await cache.set(cacheKey, articles, { ttl: cacheTTL.long });

    return articles;
  } catch (error) {
    console.error('News API error:', error);
    return getFallbackNews();
  }
}

// Fallback news data
function getFallbackNews(): NewsArticle[] {
  return [
    {
      title: 'The Future of Web Development in 2026',
      source: 'The Verge',
      url: 'https://www.theverge.com/tech',
      publishedAt: new Date().toISOString(),
      description:
        "Exploring the latest trends in web development and what's next for the industry.",
    },
    {
      title: 'AI and Machine Learning Continue to Transform Tech',
      source: 'TechCrunch',
      url: 'https://techcrunch.com',
      publishedAt: new Date().toISOString(),
      description:
        'How artificial intelligence is reshaping the technology landscape.',
    },
    {
      title: 'Cloud Computing Trends for Enterprise',
      source: 'Ars Technica',
      url: 'https://arstechnica.com',
      publishedAt: new Date().toISOString(),
      description:
        'The latest developments in cloud infrastructure and services.',
    },
  ];
}
