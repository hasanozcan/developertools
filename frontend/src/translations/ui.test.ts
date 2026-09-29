import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { Language } from './index';
import { translations } from './index';
import { enUi } from './ui/en';
import { trUi } from './ui/tr';
import { deUi } from './ui/de';
import { esUi } from './ui/es';
import { frUi } from './ui/fr';
import { ruUi } from './ui/ru';
import { zhUi } from './ui/zh';

const ui: Record<Language, Record<string, string>> = {
  en: enUi,
  tr: trUi,
  de: deUi,
  es: esUi,
  fr: frUi,
  ru: ruUi,
  zh: zhUi,
};
const LOCALES = Object.keys(ui) as Language[];
const isToolText = (key: string) => key.startsWith('toolName.') || key.startsWith('toolDesc.');

/** toolName.<slug> keys that the header navigation and footer resolve through `t()`. */
function shellToolKeys(): string[] {
  const keys = new Set<string>();
  for (const file of ['components/layout/Header.tsx', 'components/layout/Footer.tsx']) {
    const source = readFileSync(path.resolve(__dirname, '..', file), 'utf8');
    for (const match of source.matchAll(/(toolName\.[a-z0-9-]+)['`)]/g)) keys.add(match[1]);
  }
  return [...keys];
}

describe('client UI dictionaries (src/translations/ui)', () => {
  it('cover every non-tool-text key of the full dictionary with identical values', () => {
    for (const locale of LOCALES) {
      const expected = Object.entries(translations[locale]).filter(([key]) => !isToolText(key));
      const missing = expected.filter(([key]) => !(key in ui[locale])).map(([key]) => key);
      const different = expected
        .filter(([key, value]) => key in ui[locale] && ui[locale][key] !== value)
        .map(([key]) => key);
      expect(missing, `${locale}: keys missing from ui dictionary`).toEqual([]);
      expect(different, `${locale}: ui values differing from the full dictionary`).toEqual([]);
    }
  });

  it('keep key parity with English and never ship empty strings', () => {
    const base = Object.keys(enUi);
    for (const locale of LOCALES) {
      // `t()` no longer falls back to English at runtime, so every English key must exist.
      expect(
        base.filter((key) => !(key in ui[locale])),
        `${locale}: keys missing compared to English`,
      ).toEqual([]);
      const empty = Object.entries(ui[locale])
        .filter(([, value]) => !value.trim())
        .map(([key]) => key);
      expect(empty, `${locale}: empty values`).toEqual([]);
    }
  });

  it('contain only the tool names the shell (header nav, footer) renders through t()', () => {
    const shell = shellToolKeys().sort();
    expect(shell.length).toBeGreaterThan(40);
    for (const locale of LOCALES) {
      const toolKeys = Object.keys(ui[locale]).filter(isToolText).sort();
      expect(toolKeys, locale).toEqual(shell);
      for (const key of shell) {
        expect(ui[locale][key], `${locale}: ${key}`).toBe(translations[locale][key]);
      }
    }
  });
});
