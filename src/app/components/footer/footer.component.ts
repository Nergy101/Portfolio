import { Component, OnInit } from '@angular/core';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faDigitalOcean,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faShare = faShare;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faDigitalOcean = faDigitalOcean;

  constructor() {}

  ngOnInit(): void {}

  navigateTo(url: string){
    window.open(url, "blank")
  }
}
