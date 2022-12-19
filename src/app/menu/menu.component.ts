import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Option } from '../material/option.model';
import { StyleManagerService } from '../material/style-manager.service';

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
    private styleManager: StyleManagerService
  ) {}

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isLight = !this.isLight;
  }

  changeTheme(themeToSet: string) {
    this.themeChange.emit(themeToSet);
  }
}
