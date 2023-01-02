import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material/app-material.module';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { StyleManagerService } from './material/style-manager.service';
import { ThemeService } from './material/theme.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { FooterComponent } from './footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TechCardComponent } from './tech-card/tech-card.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, HeaderComponent, LandingComponent, FooterComponent, WeatherCardComponent, TechCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [StyleManagerService, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
