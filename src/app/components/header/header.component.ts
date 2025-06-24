import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MenuComponent],
})
export class HeaderComponent {}
