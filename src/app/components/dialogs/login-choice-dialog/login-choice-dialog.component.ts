import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-choice-dialog',
  templateUrl: './login-choice-dialog.component.html',
  styleUrls: ['./login-choice-dialog.component.scss'],
})
export class LoginChoiceDialogComponent {
  constructor(private dialogRef: MatDialogRef<LoginChoiceDialogComponent>) {}

  choose(option: 'google' | 'github'): void {
    this.dialogRef.close(option);
  }
}
