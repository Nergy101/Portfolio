import { Component, input, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  standalone: false
})
export class WeatherCardComponent {

  weatherInfo = input.required<Record<string, unknown>>();

  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor() { }

  get dayName(): string {
    const date = new Date(this.weatherInfo()['datetime'] as string);

    if (date.toDateString() === new Date().toDateString()) {
      return 'Today';
    }

    return this.weekdays[date.getDay()];
  }
}
