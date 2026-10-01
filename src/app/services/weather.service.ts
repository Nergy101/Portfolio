import { Injectable } from '@angular/core';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherPreferences {
  location: string;
  unit: TemperatureUnit;
}

export interface WeatherForecastDay {
  datetime: string;
  icon: string;
  temperatureHigh: number;
  temperatureLow: number;
}

export interface WeatherForecast {
  location: string;
  unit: TemperatureUnit;
  fetchedAt: number;
  days: WeatherForecastDay[];
}

export const WEATHER_CACHE_TTL_MS = 30 * 60 * 1000;

const PREFERENCES_STORAGE_KEY = 'portfolio-weather-preferences';
const CACHE_STORAGE_KEY = 'portfolio-weather-cache';
const DEFAULT_PREFERENCES: WeatherPreferences = {
  location: 'Utrecht',
  unit: 'celsius',
};

interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
}

interface ForecastResponse {
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
}

function isWeatherDay(value: unknown): value is WeatherForecastDay {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const day = value as Partial<WeatherForecastDay>;
  return (
    typeof day.datetime === 'string' &&
    typeof day.icon === 'string' &&
    typeof day.temperatureHigh === 'number' &&
    Number.isFinite(day.temperatureHigh) &&
    typeof day.temperatureLow === 'number' &&
    Number.isFinite(day.temperatureLow)
  );
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readPreferences(): WeatherPreferences {
    try {
      const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (!stored) {
        return { ...DEFAULT_PREFERENCES };
      }

      const parsed = JSON.parse(stored) as Partial<WeatherPreferences>;
      const location =
        typeof parsed.location === 'string' ? parsed.location.trim() : '';
      const unit = parsed.unit === 'fahrenheit' ? 'fahrenheit' : 'celsius';

      return {
        location: location || DEFAULT_PREFERENCES.location,
        unit,
      };
    } catch {
      return { ...DEFAULT_PREFERENCES };
    }
  }

  savePreferences(preferences: WeatherPreferences): void {
    try {
      localStorage.setItem(
        PREFERENCES_STORAGE_KEY,
        JSON.stringify(preferences),
      );
    } catch {
      // Weather still works for this visit when browser storage is unavailable.
    }
  }

  getCachedForecast(preferences: WeatherPreferences): WeatherForecast | null {
    try {
      const cache = localStorage.getItem(CACHE_STORAGE_KEY);
      if (!cache) {
        return null;
      }

      const cacheEntries = JSON.parse(cache) as Record<string, unknown>;
      const value = cacheEntries[this.cacheKey(preferences)];
      if (!value || typeof value !== 'object') {
        return null;
      }

      const forecast = value as Partial<WeatherForecast>;
      if (
        typeof forecast.location !== 'string' ||
        (forecast.unit !== 'celsius' && forecast.unit !== 'fahrenheit') ||
        typeof forecast.fetchedAt !== 'number' ||
        !Number.isFinite(forecast.fetchedAt) ||
        !Array.isArray(forecast.days)
      ) {
        return null;
      }

      const days = forecast.days.filter(isWeatherDay);
      if (days.length === 0) {
        return null;
      }

      return {
        location: forecast.location,
        unit: forecast.unit,
        fetchedAt: forecast.fetchedAt,
        days,
      };
    } catch {
      return null;
    }
  }

  saveForecast(
    preferences: WeatherPreferences,
    forecast: WeatherForecast,
  ): void {
    try {
      const cache = localStorage.getItem(CACHE_STORAGE_KEY);
      const previousEntries = cache
        ? (JSON.parse(cache) as Record<string, WeatherForecast>)
        : {};
      const entries = {
        ...previousEntries,
        [this.cacheKey(preferences)]: forecast,
      };
      const recentEntries = Object.entries(entries)
        .sort(([, first], [, second]) => first.fetchedAt - second.fetchedAt)
        .slice(-8);

      localStorage.setItem(
        CACHE_STORAGE_KEY,
        JSON.stringify(Object.fromEntries(recentEntries)),
      );
    } catch {
      // A failed cache write must not prevent the forecast from being displayed.
    }
  }

  async fetchForecast(
    preferences: WeatherPreferences,
  ): Promise<WeatherForecast> {
    const geocodingParameters = new URLSearchParams({
      name: preferences.location,
      count: '1',
      language: 'en',
      format: 'json',
    });
    const geocodingResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?${geocodingParameters}`,
    );
    if (!geocodingResponse.ok) {
      throw new Error('weather.geocoding-failed');
    }

    const geocoding = (await geocodingResponse.json()) as {
      results?: GeocodingResult[];
    };
    const location = geocoding.results?.[0];
    if (!location) {
      throw new Error('weather.location-not-found');
    }

    const forecastParameters = new URLSearchParams({
      latitude: String(location.latitude),
      longitude: String(location.longitude),
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      temperature_unit: preferences.unit,
      forecast_days: '7',
      timezone: 'auto',
    });
    const forecastResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?${forecastParameters}`,
    );
    if (!forecastResponse.ok) {
      throw new Error('weather.forecast-failed');
    }

    const response = (await forecastResponse.json()) as ForecastResponse;
    const daily = response.daily;
    if (
      !daily?.time ||
      !daily.weather_code ||
      !daily.temperature_2m_max ||
      !daily.temperature_2m_min
    ) {
      throw new Error('weather.forecast-invalid');
    }

    const days = daily.time.flatMap((datetime, index) => {
      const code = daily.weather_code?.[index];
      const temperatureHigh = daily.temperature_2m_max?.[index];
      const temperatureLow = daily.temperature_2m_min?.[index];
      if (
        typeof code !== 'number' ||
        !Number.isFinite(temperatureHigh) ||
        !Number.isFinite(temperatureLow)
      ) {
        return [];
      }

      return [
        {
          datetime,
          icon: this.weatherIcon(code),
          temperatureHigh: temperatureHigh as number,
          temperatureLow: temperatureLow as number,
        },
      ];
    });
    if (days.length === 0) {
      throw new Error('weather.forecast-invalid');
    }

    return {
      location: location.name,
      unit: preferences.unit,
      fetchedAt: Date.now(),
      days,
    };
  }

  private cacheKey(preferences: WeatherPreferences): string {
    return `${preferences.location.trim().toLocaleLowerCase()}|${preferences.unit}`;
  }

  private weatherIcon(code: number): string {
    if (code === 0) return 'clear-day';
    if (code <= 2) return 'partly-cloudy-day';
    if (code === 3) return 'cloudy';
    if (code === 45 || code === 48) return 'fog';
    if (code >= 51 && code <= 57) return 'rain';
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
      return 'rain';
    }
    if (code >= 71 && code <= 77) return 'snow';
    if (code === 85 || code === 86) return 'snow-showers-day';
    if (code === 95) return 'thunder';
    if (code === 96 || code === 99) return 'thunder-rain';
    return 'cloudy';
  }
}
