import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { KofiDialogComponent } from './components/dialogs/kofi-dialog/kofi-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuComponent,
    LandingComponent,
    FooterComponent,
    KofiDialogComponent,
  ],
})
export class AppComponent {
  title = 'Nergy.space';
}
