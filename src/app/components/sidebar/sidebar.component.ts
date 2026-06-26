import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    TranslatePipe,
  ],
})
export class SidebarComponent {
  navItems = [
    {
      label: 'sidebar.techs-and-tools',
      icon: 'build',
      fragment: 'techs-and-tools',
    },
    {
      label: 'sidebar.projects',
      icon: 'work',
      fragment: 'projects',
    },
    {
      label: 'sidebar.other',
      icon: 'more_horiz',
      fragment: 'other',
    },
  ];

  navigateToFragment(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
