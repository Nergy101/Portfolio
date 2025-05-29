import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tech-card',
  templateUrl: './tech-card.component.html',
  styleUrls: ['./tech-card.component.scss'],
})
export class TechCardComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

  async open(): Promise<void> {
    if (this.url) {
      window.open(this.url, 'blank');
    }
  }

  get tooltip(): string {
    return this.url ? `Go to ${this.title}'s website` : '';
  }
}
