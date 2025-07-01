import { inject, Pipe, PipeTransform } from '@angular/core';

import { TranslationsService } from '../services/translations.service';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  private translationsService = inject(TranslationsService);

  transform(key: string, params?: Record<string, string>): string {
    return this.translationsService.translate(key, params);
  }
}
