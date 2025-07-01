import { Component, inject, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationsService } from '../../services/translations.service';

interface LanguageOption {
  value: string;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, TranslatePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent implements OnInit {
  @Input() showOnlyFlag = false;

  private translationsService = inject(TranslationsService);

  languages: LanguageOption[] = [
    { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { value: 'nl-NL', label: 'Nederlands', flag: '🇳🇱' },
    { value: 'en-GB', label: 'English (GB)', flag: '🇬🇧' },
    { value: 'de-DE', label: 'Deutsch', flag: '🇩🇪' },
  ];

  selectedLanguage: string = 'en-US';

  ngOnInit(): void {
    // Translations are already loaded in main.ts, so we can directly get the current language
    this.selectedLanguage = this.translationsService.getCurrentLanguage();
  }

  onLanguageChange(event: MatSelectChange<string>): void {
    const newLanguage = event.value;
    console.log('Language switcher: Changing language to:', newLanguage);

    this.translationsService.setLanguage(newLanguage);
    this.selectedLanguage = newLanguage;

    console.log(
      'Language switcher: Language changed, current language is now:',
      this.translationsService.getCurrentLanguage(),
    );

    // Trigger change detection to update all translated text
    // The page will automatically update with new translations
  }

  getSelectedLanguageFlag(): string {
    const selectedLang = this.languages.find(
      (lang) => lang.value === this.selectedLanguage,
    );
    return selectedLang?.flag || '🇺🇸';
  }
}
