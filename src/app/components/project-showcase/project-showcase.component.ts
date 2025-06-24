import { Component, inject, input, Input, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
} from 'rxjs';

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
export class ProjectShowcaseComponent implements OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroy$ = new Subject<void>();
  private readonly iframeSrcSubject = new BehaviorSubject<string>('');
  private debouncedSafeIframeSrc: string | null = null;

  title = input('');
  subtitle = input('');
  url = input('');
  set iframeSrc(value: string) {
    this.iframeSrcSubject.next(value);
  }
  get iframeSrc(): string {
    return this.iframeSrcSubject.value;
  }
  badges = input<{ url: string; alt: string }[]>([]);
  techs = input<ProjectTech[]>([]);

  constructor() {
    this.iframeSrcSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((src) => {
        this.debouncedSafeIframeSrc =
          this.sanitizer.bypassSecurityTrustResourceUrl(src) as string;
      });
  }

  get safeIframeSrc() {
    return (
      this.debouncedSafeIframeSrc ||
      this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSrc)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
