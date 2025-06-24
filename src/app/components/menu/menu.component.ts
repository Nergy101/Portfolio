import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PocketbaseService } from 'src/app/services/pocketbase.service';

import { LoginChoiceDialogComponent } from '../dialogs/login-choice-dialog/login-choice-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule],
})
export class MenuComponent {
  private readonly pocketbaseService = inject(PocketbaseService);
  private readonly dialog = inject(MatDialog);

  get isLoggedIn(): boolean {
    return this.pocketbaseService.pocketbase?.authStore?.isValid ?? false;
  }

  get loggedInAs() {
    return this.pocketbaseService.pocketbase.authStore.model;
  }

  logout(): void {
    this.pocketbaseService.pocketbase.authStore.clear();
  }

  async login(): Promise<void> {
    this.dialog
      .open(LoginChoiceDialogComponent)
      .afterClosed()
      .subscribe(async (chosenOption: string): Promise<void> => {
        let authData;

        if (chosenOption == 'google') {
          authData = await this.pocketbaseService.pocketbase
            .collection('users')
            .authWithOAuth2({ provider: 'google' });
        } else if (chosenOption == 'github') {
          authData = await this.pocketbaseService.pocketbase
            .collection('users')
            .authWithOAuth2({ provider: 'github' });
        } else {
          console.error('Unknown login provider:', chosenOption);
        }

        console.info(`Logged in using ${chosenOption}`, authData);
      });
  }
}
