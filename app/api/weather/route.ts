import { NextResponse } from 'next/server';
import { cache, cacheKeys, cacheTTL } from '@/lib/cache';
import { logger } from '@/lib/logger'; // Assuming logger exists or needs to be added

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  uvIndex: number;
  uvLevel: string;
  airQuality?: {
    aqi: number;
    level: string;
    pm25?: number;
    pm10?: number;
  };
}

const getUVLevel = (uv: number): string => {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { success: false, error: 'Missing latitude or longitude' },
      { status: 400 }
    );
  }

  try {
    const data = await cache.getOrSet(
      cacheKeys.weather(lat, lon),
      async () => {
        const weatherApiKey = process.env.OPENWEATHERMAP_API_KEY;

        if (!weatherApiKey) {
          logger.error('OpenWeatherMap API key not configured');
          throw new Error('OpenWeatherMap API key not configured');
        }

        // Fetch weather data from OpenWeatherMap
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`,
          {
            next: { revalidate: cacheTTL.short / 1000 }, // Revalidate after short TTL
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          logger.error(
            `OpenWeatherMap API error: ${response.status} - ${errorText}`
          );
          throw new Error(
            `OpenWeatherMap API responded with ${response.status}`
          );
        }

        const weatherJson = await response.json();

        if (
          !weatherJson.main ||
          !weatherJson.weather ||
          !weatherJson.weather[0]
        ) {
          logger.error('Invalid weather data received from OpenWeatherMap');
          throw new Error('Invalid weather data received');
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

        // For UV index and air quality, we'd need separate API calls to OpenWeatherMap's UV and air pollution APIs
        // For now, we'll set defaults
        const uvIndex = 0;
        const airQuality = undefined;

        const weather: WeatherData = {
          temperature: Math.round(main.temp || 0),
          condition: weatherInfo.main,
          humidity: main.humidity || 0,
          windSpeed: Math.round((wind.speed || 0) * 3.6), // Convert m/s to km/h
          icon: getIcon(weatherInfo.main),
          uvIndex,
          uvLevel: getUVLevel(uvIndex),
          airQuality,
        };

        return {
          success: true,
          weather,
        };
      },
      { ttl: cacheTTL.short }
    );

    return NextResponse.json(
      { ...data, lastUpdated: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${cacheTTL.short / 1000}, stale-while-revalidate=${cacheTTL.medium / 1000}`,
        },
      }
    );
  } catch (error) {
    logger.error('Weather API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
