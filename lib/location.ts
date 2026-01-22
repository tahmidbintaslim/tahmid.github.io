import 'server-only';

import { cache, cacheKeys, cacheTTL } from '@/lib/cache';

export interface LocationData {
  city: string;
  country: string;
  timezone: string;
  localTime: string;
  latitude: number;
  longitude: number;
  region?: string;
  isExact: boolean;
}

export interface WeatherData {
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

export function getClientIpFromHeaders(headers: Headers): string | null {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || null;
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return null;
}

function formatLocalTime(timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());
}

function getUVLevel(uv: number): string {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}

function getAQILevel(aqi: number): string {
  switch (aqi) {
    case 1:
      return 'Good';
    case 2:
      return 'Moderate';
    case 3:
      return 'Unhealthy for Sensitive';
    case 4:
      return 'Unhealthy';
    case 5:
      return 'Very Unhealthy';
    default:
      return 'Moderate';
  }
}

export async function getLocationFromIp(
  ip: string | null
): Promise<LocationData | null> {
  if (!ip || ip === '127.0.0.1' || ip === '::1') {
    return {
      city: 'Dhaka',
      country: 'Bangladesh',
      timezone: 'Asia/Dhaka',
      localTime: formatLocalTime('Asia/Dhaka'),
      latitude: 23.8103,
      longitude: 90.4125,
      region: 'Dhaka',
      isExact: false,
    };
  }

  return cache.getOrSet(
    cacheKeys.location(ip),
    async () => {
      const response = await fetch(`https://ipapi.co/${ip}/json/`, {
        next: { revalidate: cacheTTL.long },
      });

      if (!response.ok) {
        throw new Error(`IP location failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.reason || 'IP location lookup failed');
      }

      const timezone = data.timezone || 'UTC';

      return {
        city: data.city || 'Unknown',
        country: data.country_name || data.country || 'Unknown',
        timezone,
        localTime: formatLocalTime(timezone),
        latitude: Number(data.latitude) || 0,
        longitude: Number(data.longitude) || 0,
        region: data.region || undefined,
        isExact: true,
      };
    },
    { ttl: cacheTTL.long }
  );
}

export async function getLocationFromCoords(
  latitude: number,
  longitude: number
): Promise<LocationData | null> {
  return cache.getOrSet(
    cacheKeys.locationCoords(latitude, longitude),
    async () => {
      const geoResponse = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      if (!geoResponse.ok) {
        throw new Error(`Reverse geocode failed: ${geoResponse.status}`);
      }

      const geoData = await geoResponse.json();
      const city = geoData.city || geoData.locality || 'Unknown';
      const country = geoData.countryName || 'Unknown';
      const region =
        geoData.principality ||
        geoData.localityInfo?.administrative?.[2]?.name ||
        '';

      const timezoneResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&forecast_days=1`
      );

      if (!timezoneResponse.ok) {
        throw new Error(`Timezone lookup failed: ${timezoneResponse.status}`);
      }

      const timezoneData = await timezoneResponse.json();
      const timezone = timezoneData.timezone || 'UTC';

      return {
        city,
        country,
        timezone,
        localTime: formatLocalTime(timezone),
        latitude,
        longitude,
        region,
        isExact: true,
      };
    },
    { ttl: cacheTTL.long }
  );
}

export async function getWeatherFromCoords(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  return cache.getOrSet(
    cacheKeys.weather(String(latitude), String(longitude)),
    async () => {
      const weatherApiKey = process.env.OPENWEATHERMAP_API_KEY;
      if (!weatherApiKey) {
        throw new Error('OpenWeatherMap API key not configured');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`OpenWeatherMap API error: ${response.status}`);
      }

      const weatherJson = await response.json();
      if (
        !weatherJson.main ||
        !weatherJson.weather ||
        !weatherJson.weather[0]
      ) {
        throw new Error('Invalid weather data received');
      }

      let airQuality: WeatherData['airQuality'];
      try {
        const airResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`
        );
        if (airResponse.ok) {
          const airJson = await airResponse.json();
          const entry = airJson?.list?.[0];
          if (entry?.main?.aqi) {
            airQuality = {
              aqi: entry.main.aqi,
              level: getAQILevel(entry.main.aqi),
              pm25: entry.components?.pm2_5,
              pm10: entry.components?.pm10,
            };
          }
        }
      } catch {
        airQuality = undefined;
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

      const uvIndex = 0;

      return {
        temperature: Math.round(main.temp || 0),
        condition: weatherInfo.main,
        humidity: main.humidity || 0,
        windSpeed: Math.round((wind.speed || 0) * 3.6),
        icon: getIcon(weatherInfo.main),
        uvIndex,
        uvLevel: getUVLevel(uvIndex),
        airQuality,
      };
    },
    { ttl: cacheTTL.short }
  );
}
