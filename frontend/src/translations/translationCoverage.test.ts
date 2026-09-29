import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { Language } from './index';
import { translations } from './index';
import { enhancedToolTranslations, enhancedTools } from './enhancedTools';

const NON_EN_LOCALES = ['tr', 'de', 'es', 'fr', 'ru', 'zh'] as const satisfies readonly Language[];

/**
 * Keys where a hand-written locale value is intentionally shipped as the English
 * string. Add entries as `${locale}:${key}` only with a reason.
 */
const ENGLISH_OVERRIDE_ALLOWLIST = new Set<string>([]);

/** Minimum number of tools per locale whose name AND description differ from English. */
const MIN_FULLY_LOCALIZED_TOOLS = 100;

const TOOL_KEY_PATTERN =
  /'(tool(?:Name|Desc)\.[^']+)':\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;

function unescape(value: string): string {
  return value.replace(/\\(.)/g, '$1');
}

/** Reads the hand-written toolName.* / toolDesc.* entries straight from a locale source file. */
function readHandWrittenToolKeys(locale: string): Map<string, string> {
  const source = readFileSync(path.join(__dirname, `${locale}.ts`), 'utf8');
  const entries = new Map<string, string>();
  for (const match of source.matchAll(TOOL_KEY_PATTERN)) {
    entries.set(match[1], unescape(match[2] ?? match[3] ?? ''));
  }
  return entries;
}

describe('translation coverage', () => {
  it('parses hand-written tool keys from every locale source', () => {
    for (const locale of NON_EN_LOCALES) {
      expect(readHandWrittenToolKeys(locale).size, locale).toBeGreaterThan(50);
    }
  });

  it('never overrides a hand-written tool translation with the English string', () => {
    const en = translations.en;

    for (const locale of NON_EN_LOCALES) {
      const handWritten = readHandWrittenToolKeys(locale);
      const clobbered: string[] = [];

      for (const [key, handWrittenValue] of handWritten) {
        const finalValue = translations[locale][key];
        if (
          finalValue === en[key] &&
          handWrittenValue !== en[key] &&
          !ENGLISH_OVERRIDE_ALLOWLIST.has(`${locale}:${key}`)
        ) {
          clobbered.push(key);
        }
      }

      expect(clobbered, `${locale}: hand-written translations replaced by English`).toEqual([]);
    }
  });

  it('keeps known hand-written tool names', () => {
    expect(translations.de['toolName.json-formatter']).toBe('JSON-Formatierer');
    expect(translations.tr['toolName.json-formatter']).not.toBe(
      translations.en['toolName.json-formatter'],
    );
  });

  it('does not ship English placeholders as enhanced translations', () => {
    for (const locale of NON_EN_LOCALES) {
      const placeholders = Object.entries(enhancedToolTranslations[locale]).filter(
        ([key, value]) => value === enhancedToolTranslations.en[key],
      );
      expect(
        placeholders.map(([key]) => key),
        locale,
      ).toEqual([]);
    }

    for (const [slug, entry] of Object.entries(enhancedTools)) {
      for (const locale of NON_EN_LOCALES) {
        expect(entry.name[locale], `${slug} name.${locale}`).not.toBe(entry.name.en);
        expect(entry.description[locale], `${slug} description.${locale}`).not.toBe(
          entry.description.en,
        );
      }
    }
  });

  it('keeps a minimum number of tools fully localized per locale', () => {
    const en = translations.en;
    const slugs = Object.keys(en)
      .filter((key) => key.startsWith('toolName.'))
      .map((key) => key.slice('toolName.'.length));

    for (const locale of NON_EN_LOCALES) {
      const localized = slugs.filter(
        (slug) =>
          translations[locale][`toolName.${slug}`] !== en[`toolName.${slug}`] &&
          translations[locale][`toolDesc.${slug}`] !== en[`toolDesc.${slug}`],
      );
      expect(localized.length, locale).toBeGreaterThanOrEqual(MIN_FULLY_LOCALIZED_TOOLS);
    }
  });
});
