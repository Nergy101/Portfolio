import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

const routes: Routes = [];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        width: '50vw',
        minWidth: '20em',
        maxWidth: '75vw',
      } as MatDialogConfig,
    },
  ],
}).catch((err) => console.error(err));
