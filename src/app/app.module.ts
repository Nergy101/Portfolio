import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { AppMaterialModule } from './components/material/app-material.module';
import { MenuComponent } from './components/menu/menu.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { StyleManagerService } from './services/style-manager.service';
import { ThemeService } from './services/theme.service';

import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginChoiceDialogComponent } from './components/dialogs/login-choice-dialog/login-choice-dialog.component';
import { TechCardComponent } from './components/tech-card/tech-card.component';
import { PocketbaseService } from './services/pocketbase.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    LandingComponent,
    FooterComponent,
    WeatherCardComponent,
    TechCardComponent,
    LoginChoiceDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FontAwesomeModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [
    StyleManagerService,
    ThemeService,
    PocketbaseService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        width: '50vw',
        minWidth: '20em',
        maxWidth: '75vw',
      } as MatDialogConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
