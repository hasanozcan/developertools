import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { translations, type Language } from './index';
import { toolCatalog } from '@/lib/api';
import { getLocalizedToolMeta } from '@/lib/i18nRouting';
import { getToolIndex, getToolTextMap } from '@/lib/toolText';
import { getToolPageCopyDictionary, localizeToolPageCopy } from '@/lib/localizedToolPageCopy';
import { toolPageContent } from '@/lib/toolPageContent';
import { removeTemplatedDefinitionFaq } from '@/lib/toolSeoContent';
import { textTranslationKey } from '@/lib/localizedText';
import { intentionalEnglish } from './intentionalEnglish';

const locales = Object.keys(translations) as Language[];
const sourceRoot = path.resolve(__dirname, '..');
function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory()
      ? sources(file)
      : /\.tsx?$/.test(file) && !/\.test\./.test(file)
        ? [file]
        : [];
  });
}

describe('translation runtime coverage', () => {
  it('resolves every literal interface key in every supported dictionary', () => {
    const keys = new Set<string>();
    for (const file of sources(sourceRoot).filter(
      (file) => !file.includes(`${path.sep}translations${path.sep}`),
    )) {
      const source = ts.createSourceFile(
        file,
        readFileSync(file, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
      );
      const visit = (node: ts.Node) => {
        if (ts.isCallExpression(node)) {
          const callee = node.expression.getText(source);
          const position = callee === 'translate' ? 1 : 0;
          const argument = node.arguments[position];
          if (
            (callee === 't' ||
              callee.endsWith('.t') ||
              callee === 'translateOr' ||
              callee === 'translate') &&
            argument &&
            ts.isStringLiteralLike(argument)
          )
            keys.add(argument.text);
        }
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
    const unresolved = locales.flatMap((locale) =>
      [...keys]
        .filter((key) => !translations[locale][key]?.trim())
        .map((key) => `${locale}:${key}`),
    );
    expect(unresolved).toEqual([]);
    expect(keys.size).toBeGreaterThan(1_000);
  });

  it('contains no replacement characters in effective dictionaries', () => {
    const corrupt = locales.flatMap((locale) =>
      Object.entries(translations[locale])
        .filter(([, value]) => value.includes('\uFFFD'))
        .map(([key]) => `${locale}:${key}`),
    );
    expect(corrupt).toEqual([]);
  });

  it('allows identical English interface text only at reviewed exact keys and values', () => {
    for (const locale of locales.filter((locale): locale is Exclude<Language, 'en'> => locale !== 'en')) {
      const reviewed = intentionalEnglish[locale];
      expect(new Set(reviewed.map((entry) => entry.key)).size).toBe(reviewed.length);
      expect(reviewed.every((entry) => entry.reason.trim().length > 0)).toBe(true);
      expect(reviewed.some((entry) => /^tool(Name|Desc)\./.test(entry.key))).toBe(false);
      const actual = Object.entries(translations[locale])
        .filter(([key, value]) => value === translations.en[key])
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => a.key.localeCompare(b.key));
      expect(actual, locale).toEqual(reviewed.map(({ key, value }) => ({ key, value })));
    }
  });

  it('preserves named placeholders and every required plural form in all interface dictionaries', () => {
    const placeholders = (value: string) =>
      [...value.matchAll(/\{([A-Za-z0-9_]+)\}/g)].map((match) => match[1]).sort();
    const issues: string[] = [];
    for (const locale of locales) {
      for (const [key, value] of Object.entries(translations.en)) {
        if (
          !translations[locale][key]?.trim() ||
          JSON.stringify(placeholders(value)) !==
            JSON.stringify(placeholders(translations[locale][key]))
        ) {
          issues.push(`${locale}:${key}`);
        }
      }
      for (const stem of [
        'home.loadMoreTools',
        'tool.httpStatus.resultCount',
        'tool.byteCounter.exceeded',
        'tool.byteCounter.remaining',
        'tool.textObfuscator.hiddenCount',
      ]) {
        for (const category of new Intl.PluralRules(locale).resolvedOptions().pluralCategories) {
          if (!translations[locale][`${stem}.${category}`]?.trim())
            issues.push(`${locale}:${stem}.${category}`);
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it.each(locales.filter((locale) => locale !== 'en'))(
    'uses the same winning %s metadata on pages, lists, and search',
    (locale) => {
      const text = getToolTextMap(locale);
      const index = new Map(
        getToolIndex(locale).map(([slug, name, description]) => [slug, { name, description }]),
      );
      for (const tool of toolCatalog) {
        const name = translations[locale][`toolName.${tool.slug}`];
        const description = translations[locale][`toolDesc.${tool.slug}`];
        expect(
          getLocalizedToolMeta(tool.slug, locale, tool.name, tool.shortDescription),
          `${locale}:${tool.slug}`,
        ).toEqual({ name, description });
        expect(index.get(tool.slug)).toEqual({ name, description });
        expect(text[`toolName.${tool.slug}`]).toBe(name);
        expect(text[`toolDesc.${tool.slug}`]).toBe(description);
      }
    },
  );

  it.each(locales.filter((locale) => locale !== 'en'))(
    'fully localizes retained %s FAQs and explanations while preserving code examples',
    async (locale) => {
      const dictionary = await getToolPageCopyDictionary(locale);
      expect(
        Object.values(dictionary).some((value) => !value.trim() || value.includes('\uFFFD')),
      ).toBe(false);
      const missing = new Set<string>();
      const expectedKeys = new Set<string>();
      for (const tools of Object.values(toolPageContent)) {
        for (const tool of Object.values(tools)) {
          const content = {
            faqs: removeTemplatedDefinitionFaq(tool.faqs, tool.name, [
              tool.description,
              tool.longDescription,
            ]),
            answerSections: tool.answerSections,
          };
          const text = [
            ...content.faqs.flatMap((faq) => [faq.question, faq.answer]),
            ...(content.answerSections?.flatMap((section) => [
              section.heading,
              ...(section.paragraphs || []),
              ...(section.bullets || []),
            ]) || []),
          ];
          for (const value of text) {
            const key = textTranslationKey(value, 'pageText');
            expectedKeys.add(key);
            if (!dictionary[key]?.trim()) missing.add(value);
            expect(dictionary[key], `${locale}:${key}: untranslated page copy`).not.toBe(value);
          }
          const localized = await localizeToolPageCopy(content, locale);
          expect(localized.answerSections?.map((section) => section.codeExamples)).toEqual(
            content.answerSections?.map((section) => section.codeExamples),
          );
        }
      }
      expect([...missing].slice(0, 10), `${locale}: ${missing.size} missing page texts`).toEqual(
        [],
      );
      expect(Object.keys(dictionary).sort()).toEqual([...expectedKeys].sort());
    },
  );
});
