import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tech-card',
  templateUrl: './tech-card.component.html',
  styleUrls: ['./tech-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatRippleModule,
    MatTooltipModule,
  ],
})
export class TechCardComponent {
  @Input()
  title?: string;

  @Input()
  subtitle?: string;

  @Input()
  imagePath?: string;

  @Input()
  description?: string;

  @Input()
  url?: string;

  @Input()
  rippleColor?: string;

  @Input()
  stopOpen: boolean = false;

  async open(): Promise<void> {
    if (this.url) {
      window.open(this.url, 'blank');
    }
  }

  get tooltip(): string {
    return this.url ? `Go to ${this.title}'s website` : '';
  }
}
