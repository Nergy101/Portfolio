import { Component, Input, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface TechItem {
  name: string;
  icon: string;
  score?: number;
  isNonBadged?: boolean;
  url?: string;
}

@Component({
  selector: 'app-tech-grid',
  templateUrl: './tech-grid.component.html',
  styleUrls: ['./tech-grid.component.scss'],
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatTooltipModule],
})
export class TechGridComponent {
  @Input() title = '';
  @Input() techs: TechItem[] = [];
  @Input() sortBy = signal<'alphabet' | 'custom'>('custom');
  @Input() showSortButton = false;

  toggleSort(): void {
    this.sortBy.set(this.sortBy() === 'alphabet' ? 'custom' : 'alphabet');
  }

  sortedTechs(): TechItem[] {
    if (this.sortBy() === 'alphabet') {
      return [...this.techs].sort((a, b) => a.name.localeCompare(b.name));
    }
    return this.techs;
  }

  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
