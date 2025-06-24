import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    MatCardModule,
    MatTooltipModule,
    MatButton
  ],
})
export class FooterComponent {
  faLinkedin = faLinkedin;
  faGithub = faGithub;

  navigateTo(url: string) {
    window.open(url, 'blank');
  }
}
