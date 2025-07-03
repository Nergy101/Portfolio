import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig,
} from '@angular/material/dialog';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// import {
//   DevTools,
//   NgxTolgeeModule,
//   Tolgee,
//   TOLGEE_INSTANCE,
//   FormatSimple
// } from '@tolgee/ngx';

// Extend Window interface to include translations
declare global {
  interface Window {
    __TRANSLATIONS__?: Record<string, Record<string, string>>;
  }
}

const routes: Routes = [];

if (environment.production) {
  enableProdMode();
}

// Show loading spinner
const spinner = document.createElement('div');
spinner.innerHTML = `
  <div style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #090f11;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    font-family: Arial, sans-serif;
  ">
    <div style="
      text-align: center;
      color: #ffffff;
    ">
      <div style="
        width: 40px;
        height: 40px;
        border: 4px solid #2a2a2a;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      "></div>
      <div>Loading...</div>
    </div>
  </div>
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
`;
document.body.appendChild(spinner);

// Translation initializer
async function initializeTranslations(): Promise<void> {
  try {
    // Load all translation files
    const [enUS, nlNL, enGB, deDE, esES, frFR, ptPT] = await Promise.all([
      import('./assets/translations/en-US.json'),
      import('./assets/translations/nl-NL.json'),
      import('./assets/translations/en-GB.json'),
      import('./assets/translations/de-DE.json'),
      import('./assets/translations/es-ES.json'),
      import('./assets/translations/fr-FR.json'),
      import('./assets/translations/pt-PT.json'),
    ]);

    // Store translations in a global object for the service to access
    window.__TRANSLATIONS__ = {
      'en-US': enUS.default,
      'nl-NL': nlNL.default,
      'en-GB': enGB.default,
      'de-DE': deDE.default,
      'es-ES': esES.default,
      'fr-FR': frFR.default,
      'pt-PT': ptPT.default,
    };

    console.log('Translations loaded successfully:', window.__TRANSLATIONS__);
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
}

// Initialize app after translations are loaded
async function bootstrapApp(): Promise<void> {
  await initializeTranslations();

  // Remove spinner
  if (spinner.parentNode) {
    spinner.parentNode.removeChild(spinner);
  }

  // Bootstrap the application
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
}

// Start the initialization process
bootstrapApp();
