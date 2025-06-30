# Tolgee Translation Files

This directory contains translation files compatible with [Tolgee](https://tolgee.io/), a modern localization platform for developers.

## File Structure

- `en-US.json` - English (US) translations (default language)
- `de-DE.json` - German (DE) translations
- `nl.json` - Dutch translations
- `README.md` - This documentation file

## Translation Structure

The translation files use a flat structure with dot notation for organization:

### Key Naming Convention

- **Sections**: Use dots to separate major sections (e.g., `common`, `header`, `profile`)
- **Multi-word keys**: Use hyphens instead of camelCase (e.g., `buy-me-coffee` instead of `buyMeCoffee`)
- **Nested items**: Use dots for hierarchy (e.g., `projects.retro-ranker.title`)

### Key Categories

#### Common UI Elements

```
common.loading
common.error
common.close
common.return
common.sort
common.archive
```

#### Component-Specific Content

```
header.brand
header.buy-me-coffee
header.buy-me-coffee-short
profile.greeting
profile.intro
profile.currently-working-on
```

#### Dynamic Content

```
landing.go-to-website  // Supports interpolation: "Go to {name}'s website"
```

## Tolgee Integration

### 1. Install Tolgee

```bash
npm install @tolgee/core @tolgee/react
# or for Angular
npm install @tolgee/angular
```

### 2. Initialize Tolgee

```typescript
import { Tolgee } from '@tolgee/core';

const tolgee = Tolgee().init({
  apiKey: 'your-api-key',
  apiUrl: 'https://app.tolgee.io',
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  observerOptions: {
    interval: 1000,
  },
});
```

### 3. Use in Components

```typescript
// Angular component
import { T } from '@tolgee/angular';

@Component({
  template: `
    <h1>{{ 'profile.greeting' | t }}</h1>
    <p>{{ 'profile.intro' | t }}</p>
    <button>{{ 'header.buy-me-coffee' | t }}</button>
  `,
})
export class ProfileComponent {}
```

### 4. Dynamic Content with Interpolation

```typescript
// For keys with variables
const tooltip = t('landing.go-to-website', { name: 'Angular' });
// Result: "Go to Angular's website"
```

## Tolgee Features

### In-Context Translation

Tolgee provides in-context translation capabilities, allowing translators to edit text directly in your application.

### Translation Memory

Tolgee automatically suggests translations based on previously translated content.

### Pluralization Support

```json
{
  "items-count": "{{count}} item",
  "items-count_plural": "{{count}} items"
}
```

### Formatting

```json
{
  "price": "Price: {{price, currency}}",
  "date": "Date: {{date, date}}"
}
```

## Uploading to Tolgee

### 1. Create a Project

1. Go to [Tolgee](https://app.tolgee.io)
2. Create a new project
3. Get your API key

### 2. Upload Translations

```bash
# Using Tolgee CLI
npm install -g @tolgee/cli

# Upload English translations
tolgee upload --api-key YOUR_API_KEY --project-id YOUR_PROJECT_ID en.json

# Upload Dutch translations
tolgee upload --api-key YOUR_API_KEY --project-id YOUR_PROJECT_ID nl.json
```

### 3. Download Translations

```bash
# Download all translations
tolgee download --api-key YOUR_API_KEY --project-id YOUR_PROJECT_ID --output-dir ./src/assets/translations
```

## Best Practices

### Key Naming

- Use descriptive, hierarchical keys
- Keep keys consistent across languages
- Use hyphens for multi-word keys
- Group related keys with dot notation

### Content Organization

- Separate UI elements from content
- Group by component or feature
- Use consistent prefixes for similar content types

### Translation Guidelines

- Maintain consistent terminology
- Consider cultural differences
- Test with different text lengths
- Preserve formatting and HTML tags when necessary

## Development Workflow

1. **Development**: Use English keys in your code
2. **Translation**: Upload to Tolgee for translation
3. **Review**: Review translations in Tolgee interface
4. **Download**: Download translated files
5. **Deploy**: Include translation files in your build

## Environment Setup

```typescript
// environment.ts
export const environment = {
  production: false,
  tolgee: {
    apiKey: 'your-dev-api-key',
    apiUrl: 'https://app.tolgee.io',
  },
};

// environment.prod.ts
export const environment = {
  production: true,
  tolgee: {
    apiKey: 'your-prod-api-key',
    apiUrl: 'https://app.tolgee.io',
  },
};
```

## Troubleshooting

### Common Issues

- **Missing translations**: Check key names match exactly
- **Interpolation errors**: Ensure variable names match
- **Loading issues**: Verify API key and project ID

### Debug Mode

```typescript
const tolgee = Tolgee().init({
  // ... other options
  observerOptions: {
    interval: 1000,
  },
  devMode: true, // Enable debug logging
});
```

For more information, visit the [Tolgee documentation](https://tolgee.io/docs).
