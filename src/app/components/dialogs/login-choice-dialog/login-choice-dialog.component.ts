import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { TechCardComponent } from '../../tech-card/tech-card.component';

@Component({
  selector: 'app-login-choice-dialog',
  templateUrl: './login-choice-dialog.component.html',
  styleUrls: ['./login-choice-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    TechCardComponent,
  ],
})
export class LoginChoiceDialogComponent {
  private dialogRef =
    inject<MatDialogRef<LoginChoiceDialogComponent>>(MatDialogRef);

  choose(option: 'google' | 'github'): void {
    this.dialogRef.close(option);
  }
}
