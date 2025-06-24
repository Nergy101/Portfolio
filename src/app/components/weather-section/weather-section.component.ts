import { Component, Input, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-weather-section',
  templateUrl: './weather-section.component.html',
  styleUrls: ['./weather-section.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, WeatherCardComponent],
})
export class WeatherSectionComponent {
  @Input() loading = false;
  @Input() weatherResultAsArray!: Signal<Record<string, unknown>[]>;
}
