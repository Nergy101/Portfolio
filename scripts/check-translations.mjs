import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function findMissingKeys(source, locale) {
  return Object.keys(source)
    .filter((key) => !Object.hasOwn(locale, key))
    .sort((first, second) => first.localeCompare(second));
}

async function reportTranslations() {
  const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
  const translationDirectory = path.resolve(
    scriptDirectory,
    '../src/assets/translations',
  );
  const source = JSON.parse(
    await readFile(path.join(translationDirectory, 'en-US.json'), 'utf8'),
  );
  const localeFiles = (await readdir(translationDirectory))
    .filter((file) => file.endsWith('.json') && file !== 'en-US.json')
    .sort((first, second) => first.localeCompare(second));
  let hasMissingKeys = false;

  console.log(
    `Checking ${Object.keys(source).length} en-US source keys against ${localeFiles.length} locale files.`,
  );
  for (const file of localeFiles) {
    const locale = JSON.parse(
      await readFile(path.join(translationDirectory, file), 'utf8'),
    );
    const missingKeys = findMissingKeys(source, locale);
    if (missingKeys.length === 0) {
      console.log(`${file}: complete`);
      continue;
    }

    hasMissingKeys = true;
    console.log(`${file}: ${missingKeys.length} missing key(s)`);
    for (const key of missingKeys) {
      console.log(`  - ${key}`);
    }
  }

  if (hasMissingKeys && process.argv.includes('--strict')) {
    process.exitCode = 1;
  } else if (hasMissingKeys) {
    console.log(
      'Report-only mode: missing translations are informational; locale files were not changed.',
    );
  }
}

const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  await reportTranslations();
}
