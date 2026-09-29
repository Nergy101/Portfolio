import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TranslationsService } from '../../services/translations.service';
import {
  TemperatureUnit,
  WeatherForecastDay,
} from '../../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatTooltipModule],
})
export class WeatherCardComponent {
  weatherInfo = input.required<WeatherForecastDay>();
  unit = input.required<TemperatureUnit>();
  private translationsService = inject(TranslationsService);

  get dayName(): string {
    const date = new Date(`${this.weatherInfo().datetime}T12:00:00`);

    if (date.toDateString() === new Date().toDateString()) {
      return this.translationsService.translate('weather.today');
    }

    const weekdays = [
      'weather.sunday',
      'weather.monday',
      'weather.tuesday',
      'weather.wednesday',
      'weather.thursday',
      'weather.friday',
      'weather.saturday',
    ];

    return this.translationsService.translate(weekdays[date.getDay()]);
  }

  get highTemperature(): string {
    return this.formatTemperature(this.weatherInfo().temperatureHigh);
  }

  get lowTemperature(): string {
    return this.formatTemperature(this.weatherInfo().temperatureLow);
  }

  private formatTemperature(value: number): string {
    const unit = this.unit() === 'celsius' ? 'C' : 'F';
    return `${Math.round(value)}°${unit}`;
  }
}
