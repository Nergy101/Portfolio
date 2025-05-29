import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Option } from '../material/option.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  constructor(private readonly themeService: ThemeService) {}

  themeChangeHandler(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }
}
