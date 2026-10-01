import { Component, OnInit, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationsService } from '../../services/translations.service';
import {
  WeatherForecast,
  WeatherPreferences,
  WeatherService,
  WEATHER_CACHE_TTL_MS,
} from '../../services/weather.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-weather-section',
  templateUrl: './weather-section.component.html',
  styleUrls: ['./weather-section.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, WeatherCardComponent, TranslatePipe],
})
export class WeatherSectionComponent implements OnInit {
  private readonly weatherService = inject(WeatherService);
  private readonly translationsService = inject(TranslationsService);
  private requestSequence = 0;

  readonly preferences = signal(this.weatherService.readPreferences());
  readonly locationInput = signal(this.preferences().location);
  readonly selectedUnit = signal(this.preferences().unit);
  readonly forecast = signal<WeatherForecast | null>(null);
  readonly loading = signal(true);
  readonly stale = signal(false);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    void this.loadForecast(false);
  }

  get forecastTitle(): string {
    const location = this.forecast()?.location ?? this.preferences().location;
    return this.translationsService.translate('weather.forecast-for', {
      location,
    });
  }

  get freshnessMessage(): string {
    const forecast = this.forecast();
    if (!forecast) {
      return '';
    }

    const label = this.stale()
      ? 'weather.showing-cached'
      : 'weather.last-updated';
    const timestamp = new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(forecast.fetchedAt);
    return `${this.translationsService.translate(label)}: ${timestamp}`;
  }

  updateLocation(event: Event): void {
    this.locationInput.set((event.target as HTMLInputElement).value);
  }

  updateUnit(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'celsius' || value === 'fahrenheit') {
      this.selectedUnit.set(value);
    }
  }

  async savePreferences(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const location = this.locationInput().trim();
    if (!location) {
      this.errorMessage.set('weather.location-required');
      return;
    }

    const preferences: WeatherPreferences = {
      location,
      unit: this.selectedUnit(),
    };
    this.preferences.set(preferences);
    this.locationInput.set(location);
    this.weatherService.savePreferences(preferences);
    await this.loadForecast(true);
  }

  private async loadForecast(forceRefresh: boolean): Promise<void> {
    const requestId = ++this.requestSequence;
    const preferences = { ...this.preferences() };
    const cached = this.weatherService.getCachedForecast(preferences);
    const cacheIsFresh =
      cached !== null && Date.now() - cached.fetchedAt < WEATHER_CACHE_TTL_MS;

    this.forecast.set(cached);
    this.stale.set(cached !== null && !cacheIsFresh);
    this.errorMessage.set('');

    if (cacheIsFresh && !forceRefresh) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    try {
      const forecast = await this.weatherService.fetchForecast(preferences);
      if (requestId !== this.requestSequence) {
        return;
      }

      this.weatherService.saveForecast(preferences, forecast);
      this.forecast.set(forecast);
      this.stale.set(false);
    } catch (error) {
      if (requestId !== this.requestSequence) {
        return;
      }

      this.stale.set(cached !== null);
      if (
        error instanceof Error &&
        error.message === 'weather.location-not-found'
      ) {
        this.errorMessage.set('weather.location-not-found');
      } else {
        this.errorMessage.set(
          cached ? 'weather.refresh-failed' : 'weather.error-fetching-data',
        );
      }
    } finally {
      if (requestId === this.requestSequence) {
        this.loading.set(false);
      }
    }
  }
}
