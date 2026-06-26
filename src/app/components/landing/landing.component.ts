import { Component, computed, inject, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationsService } from '../../services/translations.service';
import { KofiDialogComponent } from '../dialogs/kofi-dialog/kofi-dialog.component';
import { ProfileComponent } from '../profile/profile.component';
import {
  ProjectShowcaseComponent,
  ProjectTech,
} from '../project-showcase/project-showcase.component';
import { TechGridComponent } from '../tech-grid/tech-grid.component';

interface TechItem {
  name: string;
  icon: string;
  score?: number;
  isNonBadged?: boolean;
  url?: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ProfileComponent,
    ProjectShowcaseComponent,
    TechGridComponent,
    TranslatePipe,
  ],
})
export class LandingComponent {
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly translationsService = inject(TranslationsService);

  faGithubAlt = faGithubAlt;

  loading = false;
  sortBy = signal<'custom' | 'alphabet'>('custom');

  // Tech data
  professionalTechs = signal<TechItem[]>([
    {
      name: 'Azure',
      icon: 'azure',
      isNonBadged: true,
      url: 'https://azure.microsoft.com/',
    },
    {
      name: 'Azure DevOps',
      icon: 'azure_devops',
      isNonBadged: true,
      url: 'https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines?view=azure-devops',
    },
    {
      name: 'C#',
      icon: 'csharp',
      isNonBadged: true,
      url: 'https://dotnet.microsoft.com/en-us/languages/csharp',
    },
    {
      name: 'TypeScript',
      icon: 'typescript',
      isNonBadged: true,
      url: 'https://www.typescriptlang.org/',
    },
    {
      name: 'REST',
      icon: 'restapi',
      isNonBadged: true,
      url: 'https://restfulapi.net/',
    },
    {
      name: 'Docker',
      icon: 'docker',
      isNonBadged: true,
      url: 'https://www.docker.com/',
    },
    {
      name: 'MSSQL',
      icon: 'azure_sql',
      isNonBadged: true,
      url: 'https://www.microsoft.com/en-us/sql-server',
    },
    {
      name: 'SQLite',
      icon: 'sqlite',
      isNonBadged: true,
      url: 'https://www.sqlite.org/',
    },
    {
      name: 'RabbitMQ',
      icon: 'rabbitmq',
      isNonBadged: true,
      url: 'https://www.rabbitmq.com/',
    },
    {
      name: 'Angular',
      icon: 'angular',
      isNonBadged: true,
      url: 'https://angular.io/',
    },
    {
      name: 'Playwright',
      icon: 'playwright',
      isNonBadged: true,
      url: 'https://playwright.dev/',
    },
    { name: 'Nx', icon: 'nx_dark', isNonBadged: true, url: 'https://nx.dev/' },
    { name: 'RxJS', icon: 'rxjs', isNonBadged: true, url: 'https://rxjs.dev/' },
    {
      name: 'Git',
      icon: 'git',
      isNonBadged: true,
      url: 'https://git-scm.com/',
    },
    {
      name: 'GitHub',
      icon: 'github_dark',
      isNonBadged: true,
      url: 'https://github.com/',
    },
    { name: 'YAML', icon: 'yaml', isNonBadged: true, url: 'https://yaml.org/' },
    {
      name: 'Bicep',
      icon: 'bicep',
      isNonBadged: true,
      url: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview?tabs=bicep',
    },
  ]);

  hobbyTechs = signal<TechItem[]>([
    {
      name: 'Deno',
      icon: 'deno_dark',
      isNonBadged: true,
      url: 'https://deno.com/',
    },
    {
      name: 'Node.js',
      icon: 'nodejs',
      isNonBadged: true,
      url: 'https://nodejs.org/',
    },

    {
      name: 'Fresh',
      icon: 'fresh',
      isNonBadged: true,
      url: 'https://fresh.deno.dev/',
    },
    {
      name: 'Preact',
      icon: 'preact',
      isNonBadged: true,
      url: 'https://preactjs.com/',
    },
    { name: 'Vue', icon: 'vue', isNonBadged: true, url: 'https://vuejs.org/' },

    {
      name: 'PocketBase',
      icon: 'pocketbase',
      isNonBadged: true,
      url: 'https://pocketbase.io/',
    },
    {
      name: 'MongoDB',
      icon: 'mongodb',
      isNonBadged: true,
      url: 'https://www.mongodb.com/',
    },
    {
      name: 'Redis',
      icon: 'redis',
      isNonBadged: true,
      url: 'https://redis.io/',
    },

    {
      name: 'Python',
      icon: 'python',
      isNonBadged: true,
      url: 'https://www.python.org/',
    },
    {
      name: 'GraphQL',
      icon: 'graphql',
      isNonBadged: true,
      url: 'https://graphql.org/',
    },

    {
      name: 'Linux',
      icon: 'linux',
      isNonBadged: true,
      url: 'https://www.linux.org/',
    },
    {
      name: 'Ubuntu',
      icon: 'ubuntu',
      isNonBadged: true,
      url: 'https://ubuntu.com/',
    },
    {
      name: 'Bash',
      icon: 'bash_dark',
      isNonBadged: true,
      url: 'https://www.gnu.org/software/bash/',
    },
    {
      name: 'OTel',
      icon: 'otel',
      isNonBadged: true,
      url: 'https://opentelemetry.io/',
    },

    {
      name: 'Vite',
      icon: 'vite',
      isNonBadged: true,
      url: 'https://vitejs.dev/',
    },
    {
      name: 'Chart.js',
      icon: 'chartjs',
      isNonBadged: true,
      url: 'https://www.chartjs.org/',
    },
    {
      name: 'PicoCSS',
      icon: 'pico',
      isNonBadged: true,
      url: 'https://picocss.com/',
    },
    {
      name: 'Bootstrap',
      icon: 'bootstrap',
      isNonBadged: true,
      url: 'https://getbootstrap.com/',
    },
    {
      name: 'Material UI',
      icon: 'materialui',
      isNonBadged: true,
      url: 'https://material.angular.dev/',
    },
    {
      name: 'JavaScript',
      icon: 'javascript',
      isNonBadged: true,
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'CSS',
      icon: 'css_old',
      isNonBadged: true,
      url: 'https://www.w3.org/Style/CSS/Overview.en.html',
    },
    {
      name: 'HTML',
      icon: 'html5',
      isNonBadged: true,
      url: 'https://www.w3.org/html/',
    },
  ]);

  otherTechs = signal<TechItem[]>([
    {
      name: 'Scalar',
      icon: 'scalar',
      isNonBadged: true,
      url: 'https://www.scalar.com/',
    },
    {
      name: 'Bruno',
      icon: 'bruno',
      isNonBadged: true,
      url: 'https://www.usebruno.com/',
    },

    {
      name: 'daily.dev',
      icon: 'daily_dev_dark',
      isNonBadged: true,
      url: 'https://daily.dev/',
    },
    {
      name: 'Discord',
      icon: 'discord',
      isNonBadged: true,
      url: 'https://discord.com/',
    },
    {
      name: 'Bluesky',
      icon: 'bluesky',
      isNonBadged: true,
      url: 'https://bsky.app/',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      isNonBadged: true,
      url: 'https://www.linkedin.com/',
    },

    {
      name: 'SigmaOS',
      icon: 'sigmaos',
      isNonBadged: true,
      url: 'https://sigmaos.com/',
    },

    {
      name: 'Visual Studio',
      icon: 'visual-studio',
      isNonBadged: true,
      url: 'https://visualstudio.microsoft.com/',
    },
    {
      name: 'Zed',
      icon: 'zed_dark',
      isNonBadged: true,
      url: 'https://zed.dev/',
    },
    {
      name: 'Cursor',
      icon: 'cursor_dark',
      isNonBadged: true,
      url: 'https://www.cursor.com/',
    },
    {
      name: 'GitHub Copilot',
      icon: 'github_copilot_dark',
      isNonBadged: true,
      url: 'https://github.com/features/copilot',
    },
    {
      name: 'VS Code',
      icon: 'vscode',
      isNonBadged: true,
      url: 'https://code.visualstudio.com/',
    },
    {
      name: 'Rider',
      icon: 'rider',
      isNonBadged: true,
      url: 'https://www.jetbrains.com/rider/',
    },
    {
      name: 'PyCharm',
      icon: 'pycharm',
      isNonBadged: true,
      url: 'https://www.jetbrains.com/pycharm/',
    },

    {
      name: 'Prettier',
      icon: 'prettier_dark',
      isNonBadged: true,
      url: 'https://prettier.io/',
    },

    {
      name: 'npm',
      icon: 'npm',
      isNonBadged: true,
      url: 'https://www.npmjs.com/',
    },
    {
      name: 'NuGet',
      icon: 'nuget',
      isNonBadged: true,
      url: 'https://www.nuget.org/',
    },
    {
      name: 'Homebrew',
      icon: 'homebrew',
      isNonBadged: true,
      url: 'https://brew.sh/',
    },

    {
      name: 'Affinity Designer',
      icon: 'affinity_designer',
      isNonBadged: true,
      url: 'https://affinity.serif.com/en-gb/designer/',
    },
    {
      name: 'Affinity Photo',
      icon: 'affinity_photo',
      isNonBadged: true,
      url: 'https://affinity.serif.com/en-gb/photo/',
    },
    {
      name: 'Hetzner',
      icon: 'hetzner',
      isNonBadged: true,
      url: 'https://www.hetzner.com/',
    },
  ]);

  // Archived technologies section removed from template.

  // Computed sorted techs
  sortedProfessionalTechs = computed(() =>
    this.sortTechs(this.professionalTechs()),
  );
  sortedHobbyTechs = computed(() => this.sortTechs(this.hobbyTechs()));
  sortedOtherTechs = computed(() => this.sortTechs(this.otherTechs()));

  // Project showcase data
  muorgTechs: ProjectTech[] = [
    {
      title: 'tech-cards.vue.title',
      subtitle: 'tech-cards.vue.subtitle',
      imagePath: 'vue',
      url: 'https://vuejs.org/',
      rippleColor: '#42b88333',
    },
    {
      title: 'tech-cards.tauri.title',
      subtitle: 'tech-cards.tauri.subtitle',
      imagePath: 'tauri',
      url: 'https://tauri.app/',
      rippleColor: '#FFC13133',
    },
    {
      title: 'tech-cards.typescript.title',
      subtitle: 'tech-cards.typescript.subtitle',
      imagePath: 'typescript',
      url: 'https://www.typescriptlang.org/',
      rippleColor: '#3178c633',
    },
    {
      title: 'tech-cards.sqlite.title',
      subtitle: 'tech-cards.sqlite.subtitle',
      imagePath: 'sqlite',
      url: 'https://www.sqlite.org/',
      rippleColor: '#003B5733',
    },
  ];

  astrodonTechs: ProjectTech[] = [
    {
      title: 'tech-cards.deno.title',
      subtitle: 'tech-cards.deno.subtitle',
      imagePath: 'deno',
      url: 'https://blog.nergy.space',
      rippleColor: '#86efac',
    },
    {
      title: 'tech-cards.typescript.title',
      subtitle: 'tech-cards.typescript.subtitle',
      imagePath: 'typescript',
      url: 'https://www.typescriptlang.org/',
      rippleColor: '#3178c633',
    },
  ];

  retrorankerTechs: ProjectTech[] = [
    {
      title: 'tech-cards.deno.title',
      subtitle: 'tech-cards.deno.subtitle',
      imagePath: 'deno',
      url: 'https://deno.com/',
      rippleColor: '#86efac',
    },
    {
      title: 'tech-cards.fresh.title',
      subtitle: 'tech-cards.fresh.subtitle',
      imagePath: 'fresh',
      url: 'https://fresh.deno.com/',
      rippleColor: '#FFD80D',
    },
    {
      title: 'tech-cards.pico.title',
      subtitle: 'tech-cards.pico.subtitle',
      imagePath: 'pico',
      url: 'https://picocss.com/',
      rippleColor: '#FF9502',
    },
    {
      title: 'tech-cards.pocketbase.title',
      subtitle: 'tech-cards.pocketbase.subtitle',
      imagePath: 'pocketbase',
      url: 'https://pocketbase.io/',
      rippleColor: '#FFFFFF40',
    },
  ];

  tovedemBadges = [
    {
      url: 'https://github.com/Nergy101/tovedem/actions/workflows/build.yml/badge.svg',
      alt: 'badges.build-angular-webapp',
    },
    {
      url: 'https://github.com/Nergy101/tovedem/actions/workflows/pipeline.yml/badge.svg',
      alt: 'badges.deploy-docker-image',
    },
    {
      url: 'https://github.com/Nergy101/tovedem/actions/workflows/replace_pbhooks.yml/badge.svg',
      alt: 'badges.replace-hooks',
    },
  ];

  tovedemTechs: ProjectTech[] = [
    {
      title: 'tech-cards.pocketbase.title',
      subtitle: 'tech-cards.pocketbase.subtitle',
      imagePath: 'pocketbase',
      url: 'https://pocketbase.io/',
      rippleColor: '#FFFFFF40',
    },
    {
      title: 'tech-cards.angular.title',
      subtitle: 'tech-cards.angular.subtitle',
      imagePath: 'angular',
      url: 'https://www.angular.io/',
      rippleColor: '#bc114220',
    },
  ];

  private sortTechs(techs: TechItem[]): TechItem[] {
    const sorted = [...techs];
    if (this.sortBy() === 'alphabet') {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Custom order - return as they are in the original list
      return sorted;
    }
  }

  toggleSort(): void {
    this.sortBy.update((current) =>
      current === 'alphabet' ? 'custom' : 'alphabet',
    );
  }

  openKofiDialog(): void {
    this.dialog.open(KofiDialogComponent);
  }

  navigateTo(url: string) {
    window.open(url, 'blank');
  }
}
