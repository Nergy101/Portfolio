import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './components/material/app-material.module';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { StyleManagerService } from './services/style-manager.service';
import { ThemeService } from './services/theme.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { FooterComponent } from './components/footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TechCardComponent } from './components/tech-card/tech-card.component';
import { PocketbaseService } from './services/pocketbase.service';
import { MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogModule as MatDialogModule, MAT_LEGACY_DIALOG_DEFAULT_OPTIONS as MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/legacy-dialog';
import { LoginChoiceDialogComponent } from './components/dialogs/login-choice-dialog/login-choice-dialog.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, HeaderComponent, LandingComponent, FooterComponent, WeatherCardComponent, TechCardComponent, LoginChoiceDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FontAwesomeModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [StyleManagerService, ThemeService, PocketbaseService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        width: "50vw",
        minWidth: "20em",
        maxWidth: "75vw",
      } as MatDialogConfig,
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
