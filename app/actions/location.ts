'use server';

import { z } from 'zod';
import {
  getLocationFromCoords,
  getWeatherFromCoords,
  type LocationData,
  type WeatherData,
} from '@/lib/location';

export type PreciseLocationState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  location?: LocationData;
  weather?: WeatherData | null;
};

const coordsSchema = z.object({
  lat: z.number().finite(),
  lon: z.number().finite(),
});

export async function resolvePreciseLocation(
  _prevState: PreciseLocationState,
  formData: FormData
): Promise<PreciseLocationState> {
  const lat = Number(formData.get('lat'));
  const lon = Number(formData.get('lon'));
  const parsed = coordsSchema.safeParse({ lat, lon });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Invalid coordinates provided.',
    };
  }

  try {
    const location = await getLocationFromCoords(
      parsed.data.lat,
      parsed.data.lon
    );
    if (!location) {
      return {
        status: 'error',
        message: 'Unable to resolve your location.',
      };
    }

    const weather = await getWeatherFromCoords(
      parsed.data.lat,
      parsed.data.lon
    );

    return {
      status: 'success',
      location,
      weather,
    };
  } catch (error) {
    console.error('Precise location error:', error);
    return {
      status: 'error',
      message: 'Failed to fetch precise location data.',
    };
  }
}
