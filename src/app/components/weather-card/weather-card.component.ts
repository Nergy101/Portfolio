import { Component, input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TolgeeService } from '../../services/tolgee.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatTooltipModule],
})
export class WeatherCardComponent {
  weatherInfo = input.required<Record<string, unknown>>();
  private tolgeeService = inject(TolgeeService);

  get dayName(): string {
    const date = new Date(this.weatherInfo()['datetime'] as string);

    if (date.toDateString() === new Date().toDateString()) {
      return this.tolgeeService.translate('weather.today');
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

    return this.tolgeeService.translate(weekdays[date.getDay()]);
  }
}
