import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Option } from '../components/material/option.model';

import { StyleManagerService } from './style-manager.service';

@Injectable()
export class ThemeService {
  private http = inject(HttpClient);
  private styleManager = inject(StyleManagerService);

  getThemeOptions(): Observable<Array<Option>> {
    return this.http.get<Array<Option>>('assets/options.json');
  }

  setTheme(themeToSet: string) {
    this.styleManager.setStyle(
      'theme',
      `assets/prebuilt-themes/${themeToSet}.css`,
    );
  }
}
