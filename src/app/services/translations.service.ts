import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private translations: Record<string, Record<string, string>> = {
    'en-US': {},
    'en-GB': {},
    'de-DE': {},
    'nl-NL': {},
    'es-ES': {},
    'fr-FR': {},
    'pt-PT': {},
  };

  private currentLanguage = this.getStoredLanguage() || 'en-US';
  private translationsLoaded = false;

  constructor() {
    this.loadTranslations();
  }

  /**
   * Get stored language from localStorage
   */
  private getStoredLanguage(): string | null {
    try {
      return localStorage.getItem('tolgee-language');
    } catch (error) {
      void error;
      return null;
    }
  }

  /**
   * Save language to localStorage
   */
  private saveLanguageToStorage(language: string): void {
    try {
      localStorage.setItem('tolgee-language', language);
    } catch (error) {
      void error;
    }
  }

  /**
   * Load translations from global object (pre-loaded in main.ts)
   */
  public loadTranslations(): void {
    if (this.translationsLoaded) {
      return;
    }

    // Get translations from global object (loaded in main.ts)
    const globalTranslations = window.__TRANSLATIONS__;

    if (globalTranslations) {
      this.translations = globalTranslations;
      this.translationsLoaded = true;
    } else {
      this.translationsLoaded = true;
    }
  }

  /**
   * Check if translations are loaded
   */
  public areTranslationsLoaded(): boolean {
    return this.translationsLoaded;
  }

  /**
   * Get translation for a key
   */
  translate(key: string, params?: Record<string, string>): string {
    if (!this.translationsLoaded) {
      return key;
    }

    const translation =
      this.translations[this.currentLanguage]?.[key] ||
      this.translations['en-US']?.[key] ||
      key;

    if (params) {
      return this.interpolate(translation, params);
    }

    return translation;
  }

  /**
   * Interpolate parameters into translation string
   */
  private interpolate(text: string, params: Record<string, string>): string {
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] || match;
    });
  }

  /**
   * Set current language
   */
  setLanguage(language: string): void {
    if (this.translations[language]) {
      this.currentLanguage = language;
      this.saveLanguageToStorage(language);
      window.location.reload();
    }
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * Get available languages
   */
  getAvailableLanguages(): string[] {
    return Object.keys(this.translations);
  }

  /**
   * Check if translation exists
   */
  hasTranslation(key: string): boolean {
    return (
      !!this.translations[this.currentLanguage]?.[key] ||
      !!this.translations['en-US']?.[key]
    );
  }
}
