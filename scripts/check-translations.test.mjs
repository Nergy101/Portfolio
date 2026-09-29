import assert from 'node:assert/strict';
import test from 'node:test';

import { findMissingKeys } from './check-translations.mjs';

test('reports absent source keys in stable order without changing either dictionary', () => {
  const source = {
    'weather.title': 'Forecast',
    'landing.search-technologies': 'Search technologies',
    'projects.case-study-label': 'Case study',
  };
  const locale = {
    'weather.title': '',
    'projects.case-study-label': 'Projectuitwerking',
  };
  const originalSource = structuredClone(source);
  const originalLocale = structuredClone(locale);

  assert.deepEqual(findMissingKeys(source, locale), [
    'landing.search-technologies',
  ]);
  assert.deepEqual(source, originalSource);
  assert.deepEqual(locale, originalLocale);
});

test('does not report extra keys that are not in the source locale', () => {
  assert.deepEqual(
    findMissingKeys(
      { 'weather.title': 'Forecast' },
      {
        'weather.title': 'Verwachting',
        'custom.local-key': 'Local value',
      },
    ),
    [],
  );
});
