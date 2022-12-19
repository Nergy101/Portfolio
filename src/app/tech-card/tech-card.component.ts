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

  constructor() {}

  ngOnInit(): void {}

  open() {
    window.open(this.url, 'blank');
  }
}
