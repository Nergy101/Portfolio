import { Component } from '@angular/core';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faDigitalOcean, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faShare = faShare;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faDigitalOcean = faDigitalOcean;

  constructor() {}

  navigateTo(url: string) {
    window.open(url, 'blank');
  }
}
