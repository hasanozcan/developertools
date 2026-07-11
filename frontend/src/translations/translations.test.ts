import { describe, expect, it } from 'vitest';
import type { Language } from './index';
import { translations } from './index';
import { toolCatalog } from '@/lib/api';

const BASE_LANGUAGE: Language = 'en';
const COVERAGE_THRESHOLD = 0.65;
const PLACEHOLDER_PATTERN = /\{([a-zA-Z0-9_]+)\}/g;

function extractPlaceholders(value: string): string[] {
  return [...value.matchAll(PLACEHOLDER_PATTERN)].map((match) => match[1]).sort();
}

describe('translations', () => {
  it('keeps high key coverage across all languages', () => {
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
      ).toBeGreaterThanOrEqual(COVERAGE_THRESHOLD);
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

  it('defines a name and description for every catalog tool in English', () => {
    const english: Record<string, string> = translations[BASE_LANGUAGE];

    for (const tool of toolCatalog) {
      expect(english[`toolName.${tool.slug}`], `${tool.slug} name`).toBeTruthy();
      expect(english[`toolDesc.${tool.slug}`], `${tool.slug} description`).toBeTruthy();
    }
  });
});
