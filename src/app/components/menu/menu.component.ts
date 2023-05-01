import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Option } from '../material/option.model';
import { StyleManagerService } from '../../services/style-manager.service';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginChoiceDialogComponent } from '../dialogs/login-choice-dialog/login-choice-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() options: Array<Option> | null = [];
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  isLight = this.styleManager.isLight;

  constructor(
    private styleManager: StyleManagerService,
    private readonly pocketbaseService: PocketbaseService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) { }

  get isLoggedIn(): boolean {
    return this.pocketbaseService.pocketbase?.authStore?.isValid ?? false;
  }

  get loggedInAs() {
    return this.pocketbaseService.pocketbase.authStore.model;
  }

  toggleDarkTheme(): void {
    this.styleManager.toggleDarkTheme();
    this.isLight = !this.isLight;
  }

  changeTheme(themeToSet: string): void {
    this.themeChange.emit(themeToSet);
  }

  logout(): void {
    this.pocketbaseService.pocketbase.authStore.clear();
  }

  async login(): Promise<void> {

    this.dialog.open(LoginChoiceDialogComponent)
      .afterClosed()
      .subscribe(async (chosenOption): Promise<void> => {

        let authData;

        if (chosenOption == "google") {
          authData = await this.pocketbaseService.pocketbase
            .collection('users')
            .authWithOAuth2({ provider: 'google' });
        } else if (chosenOption == "github") {
          authData = await this.pocketbaseService.pocketbase
            .collection('users')
            .authWithOAuth2({ provider: 'github' });
        } else {
          this.snackBar.open("Unknown login provider...", "Retry?", { duration: 3000 })
            .onAction()
            .subscribe(async () => await this.login())
        }


        console.info(`Logged in using ${chosenOption}`, authData)
      })
  }
}
