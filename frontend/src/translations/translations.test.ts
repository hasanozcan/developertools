import { describe, expect, it } from 'vitest';
import type { Language } from './index';
import { translations } from './index';
import { toolCatalog } from '@/lib/api';
import { CSP_FINDING_CODES } from '@/lib/contentSecurityPolicy';

const BASE_LANGUAGE: Language = 'en';
const COVERAGE_THRESHOLDS: Record<Language, number> = {
  en: 1,
  tr: 0.99,
  de: 0.96,
  es: 0.93,
  fr: 0.89,
  ru: 0.85,
  zh: 0.74,
};
const PLACEHOLDER_PATTERN = /\{([a-zA-Z0-9_]+)\}/g;
const REQUIRED_TOOL_UI_PREFIXES = [
  'tool.pkce.',
  'tool.cidr.',
  'tool.cronParser.description.',
  'tool.jsonpath.',
  'tool.csp.',
  'tool.curl.',
  'tool.sha256Hash.',
] as const;

function extractPlaceholders(value: string): string[] {
  return [...value.matchAll(PLACEHOLDER_PATTERN)].map((match) => match[1]).sort();
}

describe('translations', () => {
  it('keeps language-specific key coverage floors', () => {
    const baseKeys = Object.keys(translations[BASE_LANGUAGE]);

    (Object.keys(translations) as Language[]).forEach((language) => {
      if (language === BASE_LANGUAGE) {
        return;
      }

      const translated = translations[language];
      const coveredKeyCount = baseKeys.filter((key) => key in translated).length;
      const coverage = coveredKeyCount / baseKeys.length;

      expect(
        coverage,
        `${language} translation coverage is ${(coverage * 100).toFixed(1)}%`,
      ).toBeGreaterThanOrEqual(COVERAGE_THRESHOLDS[language]);
    });
  });

  it('keeps interpolation placeholders consistent with English source strings', () => {
    const baseMap = translations[BASE_LANGUAGE];

    (Object.keys(translations) as Language[]).forEach((language) => {
      if (language === BASE_LANGUAGE) {
        return;
      }

      const translatedMap = translations[language];

      Object.entries(baseMap).forEach(([key, baseText]) => {
        const translatedText = translatedMap[key];
        if (!translatedText) {
          return;
        }

        expect(extractPlaceholders(translatedText)).toEqual(extractPlaceholders(baseText));
      });
    });
  });

  it('defines a non-empty name and description for every catalog tool in every language', () => {
    (Object.keys(translations) as Language[]).forEach((language) => {
      for (const tool of toolCatalog) {
        for (const prefix of ['toolName', 'toolDesc'] as const) {
          const key = `${prefix}.${tool.slug}`;
          expect(translations[language][key]?.trim(), `${language}: ${key}`).toBeTruthy();
        }
      }
    });
  });

  it('keeps the new and enhanced tool interfaces localized in every supported language', () => {
    const localizedKeys = Object.keys(translations[BASE_LANGUAGE]).filter((key) =>
      REQUIRED_TOOL_UI_PREFIXES.some((prefix) => key.startsWith(prefix)),
    );

    expect(localizedKeys.length).toBeGreaterThan(0);

    (Object.keys(translations) as Language[]).forEach((language) => {
      for (const key of localizedKeys) {
        expect(translations[language][key]?.trim(), `${language}: ${key}`).toBeTruthy();
      }
    });
  });

  it('localizes every stable CSP finding code with matching placeholders', () => {
    for (const code of CSP_FINDING_CODES) {
      const key = `tool.csp.finding.${code}`;
      const baseText = translations[BASE_LANGUAGE][key];

      expect(baseText?.trim(), `${BASE_LANGUAGE}: ${key}`).toBeTruthy();
      const expectedPlaceholders = extractPlaceholders(baseText ?? '');
      (Object.keys(translations) as Language[]).forEach((language) => {
        const translatedText = translations[language][key];
        expect(translatedText?.trim(), `${language}: ${key}`).toBeTruthy();
        expect(extractPlaceholders(translatedText ?? '')).toEqual(expectedPlaceholders);
      });
    }
  });
});
