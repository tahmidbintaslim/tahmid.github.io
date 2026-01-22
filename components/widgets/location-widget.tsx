'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  IoClose,
  IoEyeOutline,
  IoLeafOutline,
  IoLocationSharp,
  IoPeopleOutline,
  IoPersonOutline,
  IoSunnyOutline,
  IoTimeOutline,
  IoWaterOutline,
} from 'react-icons/io5';
import { WiStrongWind } from 'react-icons/wi';

import {
  resolvePreciseLocation,
  type PreciseLocationState,
} from '@/app/actions/location';
import type { LocationData, WeatherData } from '@/lib/location';
import type { VisitorStatsSummary } from '@/app/actions/visitors';

export interface LocationWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialLocation: LocationData | null;
  initialWeather: WeatherData | null;
  visitorStats: VisitorStatsSummary | null;
  initialError?: string | null;
  onLocationUpdate?: (
    lat: number,
    lon: number,
    city: string,
    weather: WeatherData | null
  ) => void;
}

const initialPreciseState: PreciseLocationState = {
  status: 'idle',
};

export default function LocationWidget({
  isOpen,
  setIsOpen,
  initialLocation,
  initialWeather,
  visitorStats,
  onLocationUpdate,
}: LocationWidgetProps) {
  const [locationData, setLocationData] = useState<LocationData | null>(
    initialLocation
  );
  const [weatherData, setWeatherData] = useState<WeatherData | null>(
    initialWeather
  );
  const [visitorStatsState] = useState<VisitorStatsSummary | null>(
    visitorStats
  );
  const [error, setError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<
    'prompt' | 'granted' | 'denied' | 'unknown'
  >('unknown');
  const [isRequestingPrecise, setIsRequestingPrecise] = useState(false);
  const hasRequestedPreciseRef = useRef(false);

  const [preciseState, preciseAction] = React.useActionState(
    resolvePreciseLocation,
    initialPreciseState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (preciseState.status === 'success' && preciseState.location) {
      setLocationData(preciseState.location);
      setWeatherData(preciseState.weather ?? null);
      setError(null);
      setIsRequestingPrecise(false);

      onLocationUpdate?.(
        preciseState.location.latitude,
        preciseState.location.longitude,
        preciseState.location.city,
        preciseState.weather ?? null
      );
    }

    if (preciseState.status === 'error') {
      setError(preciseState.message || 'Unable to fetch precise location.');
      setIsRequestingPrecise(false);
    }
  }, [preciseState, onLocationUpdate]);

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

  const requestPreciseLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    setIsRequestingPrecise(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (formRef.current) {
          const latInput = formRef.current.querySelector(
            'input[name="lat"]'
          ) as HTMLInputElement | null;
          const lonInput = formRef.current.querySelector(
            'input[name="lon"]'
          ) as HTMLInputElement | null;

          if (latInput && lonInput) {
            latInput.value = String(latitude);
            lonInput.value = String(longitude);
            formRef.current.requestSubmit();
          } else {
            setError('Unable to submit precise location request.');
            setIsRequestingPrecise(false);
          }
        }
      },
      (err) => {
        setPermissionState(err.code === 1 ? 'denied' : 'prompt');
        setError(err.message || 'Failed to get precise location.');
        setIsRequestingPrecise(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    if (!isOpen) {
      hasRequestedPreciseRef.current = false;
      return;
    }

    if (hasRequestedPreciseRef.current) {
      return;
    }

    if (permissionState === 'denied') {
      return;
    }

    hasRequestedPreciseRef.current = true;
    requestPreciseLocation();
  }, [isOpen, permissionState, requestPreciseLocation]);

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
        return 'text-muted';
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
        return 'text-muted bg-panel';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-40 cursor-pointer bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="contrast-dark bg-space-950/95 fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-purple-500/20 backdrop-blur-xl md:top-16 md:bottom-0 md:w-96"
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-widget-title"
            aria-describedby="location-widget-subtitle"
            id="location-widget-dialog"
          >
            {/* Header - Fixed */}
            <div className="bg-space-950/80 shrink-0 border-b border-purple-500/20 p-5 backdrop-blur-xl">
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
                  <p
                    id="location-widget-subtitle"
                    className="text-muted text-xs"
                  >
                    Location and weather based on your current data
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="group rounded-xl border border-white/10 bg-white/5 p-2.5 transition-colors duration-200 ease-out hover:border-red-500/30 hover:bg-white/10"
                  aria-label="Close location widget"
                  type="button"
                  autoFocus
                >
                  <IoClose className="text-muted h-5 w-5 transition-colors duration-200 ease-out group-hover:text-red-400" />
                </button>
              </div>
            </div>

            {/* Hidden form for precise location */}
            <form ref={formRef} action={preciseAction} className="hidden">
              <input type="hidden" name="lat" defaultValue="" />
              <input type="hidden" name="lon" defaultValue="" />
            </form>

            {/* Content - Scrollable */}
            <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-5">
              {isRequestingPrecise && !locationData ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16">
                  <div className="h-10 w-10 rounded-full border-3 border-purple-500 border-t-transparent" />
                  <p className="text-muted text-sm">
                    Detecting precise location...
                  </p>
                </div>
              ) : error && !locationData ? (
                <div className="text-muted py-12 text-start">
                  <p className="mb-4">{error}</p>
                  <p className="text-muted text-xs">
                    Please allow location access in your browser settings and
                    reopen the panel.
                  </p>
                </div>
              ) : locationData ? (
                <>
                  {/* Visitor Stats */}
                  {visitorStatsState && (
                    <div className="rounded-2xl border border-amber-500/20 bg-linear-to-br from-amber-500/10 to-orange-500/10 p-4 backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-xl border border-amber-500/30 bg-amber-500/20 p-2.5">
                            <IoPeopleOutline className="h-5 w-5 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-muted text-xs">
                              Total Visitors
                            </p>
                            <p className="text-xl font-bold text-white">
                              {visitorStatsState.totalVisitors.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1.5">
                          <IoEyeOutline className="h-4 w-4 text-green-400" />
                          <span className="text-sm font-medium text-green-400">
                            {visitorStatsState.activeVisitors} online
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Location Info */}
                  <div className="rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-4 backdrop-blur-md">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-xl border border-purple-500/30 bg-purple-500/20 p-2">
                        <IoLocationSharp className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-muted text-xs">Location</p>
                        <p className="text-sm font-semibold text-white">
                          {locationData.city}, {locationData.country}
                        </p>
                      </div>
                    </div>
                    <div className="text-muted flex items-center gap-2 text-xs">
                      <IoTimeOutline className="h-4 w-4" />
                      <span>{locationData.localTime}</span>
                      {!locationData.isExact && (
                        <>
                          <span className="text-muted">•</span>
                          <span className="text-muted">
                            Using IP fallback
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Weather Info */}
                  {weatherData && (
                    <div className="grid gap-3 rounded-2xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 to-blue-500/10 p-4 backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-muted text-xs">Weather</p>
                          <p className="text-2xl font-bold text-white">
                            {weatherData.temperature}°C
                          </p>
                          <p className="text-sm font-semibold text-ink">
                            {weatherData.condition}
                          </p>
                        </div>
                        <div className="text-3xl">{weatherData.icon}</div>
                      </div>

                      <div className="text-muted grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <IoSunnyOutline className="h-4 w-4 text-yellow-400" />
                          {weatherData.condition}
                        </div>
                        <div className="flex items-center gap-2">
                          <IoWaterOutline className="h-4 w-4 text-cyan-400" />
                          {weatherData.humidity}% humidity
                        </div>
                        <div className="flex items-center gap-2">
                          <WiStrongWind className="h-4 w-4 text-blue-400" />
                          {weatherData.windSpeed} km/h wind
                        </div>
                        <div className="flex items-center gap-2">
                          <IoLeafOutline
                            className={`h-4 w-4 ${getUVColor(weatherData.uvLevel)}`}
                          />
                          UV {weatherData.uvLevel}
                        </div>
                      </div>

                      {weatherData.airQuality && (
                        <div
                          className={`rounded-xl px-3 py-2 text-xs ${getAQIColor(
                            weatherData.airQuality.level
                          )}`}
                        >
                          AQI {weatherData.airQuality.aqi} -{' '}
                          {weatherData.airQuality.level}
                        </div>
                      )}
                    </div>
                  )}

                  {permissionState === 'denied' && (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-200">
                      Location permission is blocked. Enable it in your browser
                      settings and reopen this panel.
                    </div>
                  )}
                </>
              ) : (
                <div className="text-muted py-12 text-start">
                  <p className="mb-2">Waiting for location permission...</p>
                  <p className="text-muted text-xs">
                    Please allow location access to view your visitor and
                    weather details.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-space-950/90 sticky bottom-0 z-10 border-t border-purple-500/20 p-4 backdrop-blur-xl">
              <button
                onClick={handleClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-linear-to-r from-purple-500/20 to-cyan-500/20 px-4 py-3 font-medium text-white transition-colors duration-200 ease-out hover:border-cyan-500/50 hover:from-purple-500/30 hover:to-cyan-500/30"
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
  );
}
