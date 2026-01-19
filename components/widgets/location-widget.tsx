'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import {
  IoClose,
  IoEyeOutline,
  IoLeafOutline,
  IoLocationSharp,
  IoNavigate,
  IoPeopleOutline,
  IoPersonOutline,
  IoRefresh,
  IoSunnyOutline,
  IoTimeOutline,
  IoWaterOutline,
} from 'react-icons/io5';
import { WiStrongWind } from 'react-icons/wi';

// Cache keys
const WEATHER_CACHE_KEY = 'portfolio_weather_cache';
const LOCATION_CACHE_KEY = 'portfolio_location_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

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

interface VisitorStats {
  totalVisitors: number;
  activeVisitors: number;
}

interface LocationWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLocationUpdate?: (
    lat: number,
    lon: number,
    city: string,
    weather: WeatherData | null
  ) => void;
}

export default function LocationWidget({
  isOpen,
  setIsOpen,
  onLocationUpdate,
}: LocationWidgetProps) {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<
    'prompt' | 'granted' | 'denied' | 'unknown'
  >('unknown');

  // Load cached data on mount
  useEffect(() => {
    try {
      const cachedWeather = localStorage.getItem(WEATHER_CACHE_KEY);
      const cachedLocation = localStorage.getItem(LOCATION_CACHE_KEY);

      if (cachedWeather) {
        const { data, timestamp } = JSON.parse(cachedWeather);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setWeatherData(data);
        }
      }

      if (cachedLocation) {
        const { data, timestamp } = JSON.parse(cachedLocation);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setLocationData(data);
        }
      }
    } catch (e) {
      console.error('Error loading cache:', e);
    }
  }, []);

  // Track visitor on mount
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await fetch('/api/visitors', { method: 'POST' });
        const data = await response.json();
        if (data.success) {
          setVisitorStats({
            totalVisitors: data.totalVisitors,
            activeVisitors: data.activeVisitors,
          });
        }
      } catch (e) {
        console.error('Visitor tracking error:', e);
      }
    };
    trackVisitor();
  }, []);

  const fetchWeatherData = useCallback(
    async (latitude: number, longitude: number, city: string) => {
      try {
        // Try cached API first
        const response = await fetch(
          `/api/weather?lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();

        if (data.success && data.weather) {
          const weather = data.weather as WeatherData;
          setWeatherData(weather);
          onLocationUpdate?.(latitude, longitude, city, weather);

          // Cache the weather data
          localStorage.setItem(
            WEATHER_CACHE_KEY,
            JSON.stringify({
              data: weather,
              timestamp: Date.now(),
            })
          );
          return weather;
        }
      } catch (error) {
        console.error('Failed to fetch weather from API:', error);
      }

      // Fallback to direct Open-Meteo call
      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,uv_index&temperature_unit=celsius&timezone=auto`
        );
        const weatherJson = await weatherResponse.json();

        const getWeatherCondition = (code: number) => {
          if (code === 0) return { condition: 'Clear', icon: '☀️' };
          if (code <= 3) return { condition: 'Partly Cloudy', icon: '⛅' };
          if (code <= 48) return { condition: 'Foggy', icon: '🌫️' };
          if (code <= 67) return { condition: 'Rainy', icon: '🌧️' };
          if (code <= 77) return { condition: 'Snowy', icon: '❄️' };
          if (code <= 99) return { condition: 'Stormy', icon: '⛈️' };
          return { condition: 'Unknown', icon: '🌤️' };
        };

        const getUVLevel = (uv: number): string => {
          if (uv <= 2) return 'Low';
          if (uv <= 5) return 'Moderate';
          if (uv <= 7) return 'High';
          if (uv <= 10) return 'Very High';
          return 'Extreme';
        };

        const weatherCode = weatherJson.current?.weather_code || 0;
        const weatherInfo = getWeatherCondition(weatherCode);
        const uvIndex = Math.round(weatherJson.current?.uv_index || 0);

        const weather: WeatherData = {
          temperature: Math.round(weatherJson.current?.temperature_2m || 0),
          condition: weatherInfo.condition,
          humidity: weatherJson.current?.relative_humidity_2m || 0,
          windSpeed: Math.round(weatherJson.current?.wind_speed_10m || 0),
          icon: weatherInfo.icon,
          uvIndex,
          uvLevel: getUVLevel(uvIndex),
        };

        setWeatherData(weather);
        onLocationUpdate?.(latitude, longitude, city, weather);

        // Cache the weather data
        localStorage.setItem(
          WEATHER_CACHE_KEY,
          JSON.stringify({
            data: weather,
            timestamp: Date.now(),
          })
        );
        return weather;
      } catch (weatherError) {
        console.error('Failed to fetch weather:', weatherError);
        return null;
      }
    },
    [onLocationUpdate]
  );

  const fetchIPBasedLocation = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      const localTime = new Intl.DateTimeFormat('en-US', {
        timeZone: data.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date());

      const location: LocationData = {
        city: data.city || 'Unknown',
        country: data.country_name || 'Unknown',
        timezone: data.timezone || 'UTC',
        localTime,
        latitude: data.latitude,
        longitude: data.longitude,
        region: data.region,
        isExact: false,
      };

      setLocationData(location);

      // Cache location data
      localStorage.setItem(
        LOCATION_CACHE_KEY,
        JSON.stringify({
          data: location,
          timestamp: Date.now(),
        })
      );

      if (data.latitude && data.longitude) {
        await fetchWeatherData(data.latitude, data.longitude, data.city);
      }

      return location;
    } catch (error) {
      console.error('Failed to fetch IP-based location:', error);
      throw error;
    }
  }, [fetchWeatherData]);

  const requestPreciseLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return fetchIPBasedLocation();
    }

    return new Promise<LocationData>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const geoResponse = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
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
            const timezoneData = await timezoneResponse.json();
            const timezone = timezoneData.timezone || 'UTC';

            const localTime = new Intl.DateTimeFormat('en-US', {
              timeZone: timezone,
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }).format(new Date());

            const location: LocationData = {
              city,
              country,
              timezone,
              localTime,
              latitude,
              longitude,
              region,
              isExact: true,
            };

            setLocationData(location);

            // Cache location data
            localStorage.setItem(
              LOCATION_CACHE_KEY,
              JSON.stringify({
                data: location,
                timestamp: Date.now(),
              })
            );

            await fetchWeatherData(latitude, longitude, city);
            setPermissionState('granted');
            resolve(location);
          } catch (err) {
            console.error('Error fetching location details:', err);
            reject(err);
          }
        },
        (err) => {
          console.log('Geolocation error:', err.message);
          setPermissionState(err.code === 1 ? 'denied' : 'prompt');
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }, [fetchIPBasedLocation, fetchWeatherData]);

  const fetchLocationData = useCallback(
    async (requestPrecise = false) => {
      setLoading(true);
      setError(null);

      try {
        if (requestPrecise) {
          await requestPreciseLocation();
        } else {
          await fetchIPBasedLocation();
        }
      } catch (error) {
        console.error('Location fetch failed, trying IP fallback:', error);
        try {
          await fetchIPBasedLocation();
        } catch {
          setError('Unable to detect location');
          setLocationData({
            city: 'Unknown',
            country: 'Worldwide',
            timezone: 'UTC',
            localTime: new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }),
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchIPBasedLocation, requestPreciseLocation]
  );

  // Check permission state on mount
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          setPermissionState(result.state as 'prompt' | 'granted' | 'denied');
        })
        .catch(() => {
          setPermissionState('unknown');
        });
    }
  }, []);

  // Fetch IP-based location initially when widget opens
  useEffect(() => {
    if (isOpen && !locationData && !loading) {
      fetchLocationData(false);
    }
  }, [isOpen, locationData, loading, fetchLocationData]);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLocationData((prevData) => {
        if (!prevData) return prevData;
        const localTime = new Intl.DateTimeFormat('en-US', {
          timeZone: prevData.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        return { ...prevData, localTime };
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(!isOpen);
    },
    [isOpen, setIsOpen]
  );

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
    },
    [setIsOpen]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
    },
    [setIsOpen]
  );

  const handleRequestPreciseLocation = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      fetchLocationData(true);
    },
    [fetchLocationData]
  );

  const getUVColor = (level?: string) => {
    switch (level) {
      case 'Low':
        return 'text-green-400';
      case 'Moderate':
        return 'text-yellow-400';
      case 'High':
        return 'text-orange-400';
      case 'Very High':
        return 'text-red-400';
      case 'Extreme':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getAQIColor = (level?: string) => {
    switch (level) {
      case 'Good':
        return 'text-green-400 bg-green-500/20';
      case 'Moderate':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'Unhealthy for Sensitive':
        return 'text-orange-400 bg-orange-500/20';
      case 'Unhealthy':
        return 'text-red-400 bg-red-500/20';
      case 'Very Unhealthy':
        return 'text-purple-400 bg-purple-500/20';
      case 'Hazardous':
        return 'text-rose-400 bg-rose-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <>
      {/* Desktop Floating Button - Bigger with Animation */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1, type: 'spring', stiffness: 400 }}
        onClick={handleToggle}
        className="group fixed top-20 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-linear-to-br from-purple-600/30 to-cyan-600/30 shadow-lg shadow-purple-500/20 backdrop-blur-xl transition-all duration-300 hover:border-purple-400/60 hover:shadow-purple-500/40 md:flex"
        aria-label="Toggle location widget"
        type="button"
      >
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <IoLocationSharp className="h-7 w-7 text-purple-400 transition-colors group-hover:text-purple-300" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
              className="fixed inset-0 z-44 cursor-pointer bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-60 flex h-full w-full max-w-md flex-col border-l border-purple-500/20 bg-[#030014]/95 backdrop-blur-xl md:top-16 md:z-45 md:h-[calc(100vh-65px)] md:w-96"
              role="dialog"
              aria-modal="true"
              aria-labelledby="location-widget-title"
            >
              {/* Header - Fixed */}
              <div className="shrink-0 border-b border-purple-500/20 bg-[#030014]/80 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-purple-500/30 bg-linear-to-br from-purple-500/20 to-cyan-500/20 p-2">
                      <IoPersonOutline className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3
                      id="location-widget-title"
                      className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent"
                    >
                      Visitor Info
                    </h3>
                  </div>
                  <button
                    onClick={handleClose}
                    className="group rounded-xl border border-white/10 bg-white/5 p-2.5 transition-all duration-200 hover:border-red-500/30 hover:bg-white/10"
                    aria-label="Close location widget"
                    type="button"
                  >
                    <IoClose className="h-5 w-5 text-gray-400 transition-colors group-hover:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-5">
                {loading && !locationData ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-16">
                    <div className="h-10 w-10 animate-spin rounded-full border-3 border-purple-500 border-t-transparent" />
                    <p className="text-sm text-gray-400">
                      Detecting location...
                    </p>
                  </div>
                ) : error && !locationData ? (
                  <div className="py-12 text-center text-gray-400">
                    <p className="mb-4">{error}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        fetchLocationData(false);
                      }}
                      className="rounded-xl border border-purple-500/30 bg-purple-500/20 px-5 py-2.5 text-white transition-colors hover:bg-purple-500/30"
                      type="button"
                    >
                      Retry
                    </button>
                  </div>
                ) : locationData ? (
                  <>
                    {/* Visitor Stats */}
                    {visitorStats && (
                      <div className="rounded-2xl border border-amber-500/20 bg-linear-to-br from-amber-500/10 to-orange-500/10 p-4 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-xl border border-amber-500/30 bg-amber-500/20 p-2.5">
                              <IoPeopleOutline className="h-5 w-5 text-amber-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">
                                Total Visitors
                              </p>
                              <p className="text-xl font-bold text-white">
                                {visitorStats.totalVisitors.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1.5">
                            <IoEyeOutline className="h-4 w-4 text-green-400" />
                            <span className="text-sm font-medium text-green-400">
                              {visitorStats.activeVisitors} online
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Precise Location Request */}
                    {!locationData.isExact && permissionState !== 'denied' && (
                      <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={handleRequestPreciseLocation}
                        className="group w-full rounded-xl border border-purple-500/30 bg-linear-to-r from-purple-500/20 to-cyan-500/20 p-4 transition-all duration-300 hover:border-cyan-500/50"
                        type="button"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IoNavigate className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300" />
                            <span className="text-sm text-gray-300 group-hover:text-white">
                              Get precise location
                            </span>
                          </div>
                          <span className="rounded-lg bg-white/5 px-2 py-1 text-xs text-gray-500">
                            Browser API
                          </span>
                        </div>
                      </motion.button>
                    )}

                    {/* Location Card */}
                    <div className="rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-5 backdrop-blur-md">
                      <div className="flex items-start space-x-4">
                        <div className="rounded-xl border border-purple-500/30 bg-purple-500/20 p-2.5">
                          <IoLocationSharp className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-400">
                              Your Location
                            </p>
                            {locationData.isExact && (
                              <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-0.5 text-[10px] text-green-400">
                                Precise
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xl font-semibold text-white">
                            {locationData.city}
                          </p>
                          <p className="text-sm text-gray-300">
                            {locationData.country}
                          </p>
                          {locationData.region && (
                            <p className="mt-1 text-xs text-gray-400">
                              {locationData.region}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Time Card */}
                    <div className="rounded-2xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 to-blue-500/10 p-5 backdrop-blur-md">
                      <div className="flex items-start space-x-4">
                        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/20 p-2.5">
                          <IoTimeOutline className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">
                            Your Local Time
                          </p>
                          <p className="mt-1 text-3xl font-bold text-white">
                            {locationData.localTime}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {locationData.timezone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Weather Card */}
                    {weatherData && (
                      <div className="rounded-2xl border border-blue-500/20 bg-linear-to-br from-blue-500/10 to-indigo-500/10 p-5 backdrop-blur-md">
                        <div className="flex items-start space-x-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/20 p-2.5 text-xl">
                            {weatherData.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-400">
                              Current Weather
                            </p>
                            <p className="mt-1 text-3xl font-bold text-white">
                              {weatherData.temperature}°C
                            </p>
                            <p className="text-sm text-gray-300">
                              {weatherData.condition}
                            </p>

                            {/* Basic Weather Info */}
                            <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                              <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2 py-1">
                                <IoWaterOutline className="text-blue-400" />
                                <span>{weatherData.humidity}%</span>
                              </div>
                              <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2 py-1">
                                <WiStrongWind className="text-lg text-cyan-400" />
                                <span>{weatherData.windSpeed} km/h</span>
                              </div>
                            </div>

                            {/* UV Index */}
                            {weatherData.uvIndex !== undefined && (
                              <div className="mt-2 flex items-center gap-3 text-xs">
                                <div
                                  className={`flex items-center gap-1.5 rounded-lg bg-white/5 px-2 py-1 ${getUVColor(weatherData.uvLevel)}`}
                                >
                                  <IoSunnyOutline className="text-sm" />
                                  <span>UV {weatherData.uvIndex}</span>
                                  {weatherData.uvLevel && (
                                    <span className="opacity-70">
                                      ({weatherData.uvLevel})
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Air Quality Section */}
                        {weatherData.airQuality && (
                          <div className="mt-4 border-t border-white/10 pt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <IoLeafOutline className="h-4 w-4 text-green-400" />
                                <span className="text-xs text-gray-400">
                                  Air Quality Index
                                </span>
                              </div>
                              <span
                                className={`rounded-full px-2 py-1 text-xs ${getAQIColor(weatherData.airQuality.level)}`}
                              >
                                AQI {weatherData.airQuality.aqi} ·{' '}
                                {weatherData.airQuality.level}
                              </span>
                            </div>
                            {(weatherData.airQuality.pm25 ||
                              weatherData.airQuality.pm10) && (
                              <div className="mt-2 flex gap-4 text-xs text-gray-400">
                                {weatherData.airQuality.pm25 && (
                                  <span>
                                    PM2.5: {weatherData.airQuality.pm25} µg/m³
                                  </span>
                                )}
                                {weatherData.airQuality.pm10 && (
                                  <span>
                                    PM10: {weatherData.airQuality.pm10} µg/m³
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Welcome Message */}
                    <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/10 p-5 backdrop-blur-md">
                      <p className="text-sm leading-relaxed text-gray-300">
                        Welcome to my portfolio! 👋 <br />
                        You&apos;re viewing from{' '}
                        <span className="font-semibold text-purple-400">
                          {locationData.city}
                        </span>
                        . Thanks for stopping by!
                      </p>
                    </div>

                    {/* Refresh Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        fetchLocationData(locationData.isExact);
                      }}
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 transition-all duration-200 hover:border-purple-500/30 hover:bg-white/10 hover:text-white disabled:opacity-50"
                      type="button"
                    >
                      <IoRefresh
                        className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                      />
                      <span className="text-sm">
                        {loading ? 'Refreshing...' : 'Refresh data'}
                      </span>
                    </button>
                  </>
                ) : (
                  <div className="py-12 text-center text-gray-400">
                    Unable to detect location
                  </div>
                )}
              </div>

              {/* Footer Navigation - Fixed at Bottom */}
              <div className="shrink-0 border-t border-purple-500/20 bg-[#030014]/80 p-4 backdrop-blur-xl">
                <button
                  onClick={handleClose}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-linear-to-r from-purple-500/20 to-cyan-500/20 px-4 py-3 font-medium text-white transition-all duration-300 hover:border-cyan-500/50 hover:from-purple-500/30 hover:to-cyan-500/30"
                  type="button"
                >
                  <IoClose className="h-5 w-5" />
                  Close Panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
