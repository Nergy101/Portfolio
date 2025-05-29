import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  @Input() weatherInfo: any = {};

  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor() {}

  ngOnInit(): void {}

  get dayName(): string {
    return this.weekdays[new Date(this.weatherInfo.datetime).getDay()];
  }
}
