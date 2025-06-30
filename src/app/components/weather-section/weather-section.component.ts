import { Component, Input, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-weather-section',
  templateUrl: './weather-section.component.html',
  styleUrls: ['./weather-section.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, WeatherCardComponent, TranslatePipe],
})
export class WeatherSectionComponent {
  @Input() loading = false;
  @Input() weatherResultAsArray!: Signal<Record<string, unknown>[]>;
}
