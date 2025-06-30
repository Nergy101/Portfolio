import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { KofiDialogComponent } from '../dialogs/kofi-dialog/kofi-dialog.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MenuComponent,
    MatButton,
    MatIcon,
    LanguageSwitcherComponent,
    TranslatePipe,
  ],
})
export class HeaderComponent {
  private readonly dialog = inject(MatDialog);

  openKofiDialog(): void {
    this.dialog.open(KofiDialogComponent, {
      width: '400px',
    });
  }
}
