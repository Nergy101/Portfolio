import {
  inject,
  Pipe,
  PipeTransform,
} from '@angular/core';

import { TolgeeService } from '../services/tolgee.service';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  private tolgeeService = inject(TolgeeService);

  transform(key: string, params?: Record<string, string>): string {
    return this.tolgeeService.translate(key, params);
  }
}
