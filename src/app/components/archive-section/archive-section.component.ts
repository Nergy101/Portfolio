import { Component, Input, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TranslatePipe } from '../../pipes/translate.pipe';

interface TechItem {
  name: string;
  icon: string;
  score?: number;
  isNonBadged?: boolean;
  url?: string;
}

@Component({
  selector: 'app-archive-section',
  templateUrl: './archive-section.component.html',
  styleUrls: ['./archive-section.component.scss'],
  standalone: true,
  imports: [
    MatBadgeModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    TranslatePipe,
  ],
})
export class ArchiveSectionComponent {
  @Input() archiveTechs: TechItem[] = [];
  @Input() sortBy = signal<'alphabet' | 'custom'>('custom');
  @Input() archiveExpanded = false;

  toggleSort(): void {
    this.sortBy.set(this.sortBy() === 'alphabet' ? 'custom' : 'alphabet');
  }

  sortedArchiveTechs(): TechItem[] {
    if (this.sortBy() === 'alphabet') {
      return [...this.archiveTechs].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }
    return this.archiveTechs;
  }

  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
