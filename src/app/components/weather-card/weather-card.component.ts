import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatTooltipModule],
})
export class WeatherCardComponent {
  weatherInfo = input.required<Record<string, unknown>>();

  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  get dayName(): string {
    const date = new Date(this.weatherInfo()['datetime'] as string);

    if (date.toDateString() === new Date().toDateString()) {
      return 'Today';
    }

    return this.weekdays[date.getDay()];
  }
}
