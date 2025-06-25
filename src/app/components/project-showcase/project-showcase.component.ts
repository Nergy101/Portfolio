import { Component, inject, input, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { TechCardComponent } from '../tech-card/tech-card.component';

export interface ProjectTech {
  title: string;
  subtitle: string;
  imagePath: string;
  url: string;
  rippleColor: string;
}

@Component({
  selector: 'app-project-showcase',
  templateUrl: './project-showcase.component.html',
  styleUrls: ['./project-showcase.component.scss'],
  standalone: true,
  imports: [MatIconModule, TechCardComponent],
})
export class ProjectShowcaseComponent {
  private readonly sanitizer = inject(DomSanitizer);

  title = input('');
  subtitle = input('');
  url = input('');
  iframeSrc = input('');
  badges = input<{ url: string; alt: string }[]>([]);
  techs = input<ProjectTech[]>([]);

  safeIframeSrc = computed(() => {
    const src = this.iframeSrc();
    return src ? this.sanitizer.bypassSecurityTrustResourceUrl(src) : null;
  });
}
