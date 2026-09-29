import { describe, expect, it, vi } from 'vitest';
import {
  SUPPORTED_LOCALES,
  NON_DEFAULT_LOCALES,
  isValidLocale,
  stripLocaleFromPath,
  getLocalizedPath,
  getHreflangAlternates,
  getLocalizedToolMeta,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
  getToolHreflangAlternates,
  isToolLocaleIndexable,
} from './i18nRouting';

// Synthetic fixture tool layered on top of the real data so the indexability
// rules are tested independently of the (evolving) translation files.
const FIXTURE_SLUG = 'zz-fixture-tool';
const FIXTURE_EN_NAME = 'Fixture Tool';
const FIXTURE_EN_DESC = 'Does fixture things locally.';

vi.mock('@/translations/enhancedTools', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/translations/enhancedTools')>();
  return {
    ...actual,
    enhancedTools: {
      ...actual.enhancedTools,
      'zz-fixture-tool': {
        name: {
          en: 'Fixture Tool',
          tr: 'Fikstür Aracı',
          de: 'Fixture Tool', // English placeholder, real value lives in translations.de
          es: '  fixture TOOL ', // English placeholder modulo case/whitespace
          fr: 'Outil de fixture',
          ru: '',
          zh: '夹具工具',
        },
        description: {
          en: 'Does fixture things locally.',
          tr: 'Fikstür işlerini yerel olarak yapar.',
          de: 'Does fixture things locally.',
          es: 'Hace cosas de fixture localmente.',
          fr: 'Does fixture things locally.', // untranslated description
          ru: '',
          zh: '在本地完成夹具任务。',
        },
      },
    },
  };
});

vi.mock('@/translations', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/translations')>();
  return {
    ...actual,
    translations: {
      ...actual.translations,
      de: {
        ...actual.translations.de,
        'toolName.zz-fixture-tool': 'Fixture-Werkzeug',
        'toolDesc.zz-fixture-tool': 'Erledigt Fixture-Aufgaben lokal.',
      },
    },
  };
});

describe('i18nRouting', () => {
  it('identifies supported and non-default locales correctly', () => {
    expect(SUPPORTED_LOCALES).toContain('en');
    expect(SUPPORTED_LOCALES).toContain('tr');
    expect(NON_DEFAULT_LOCALES).not.toContain('en');
    expect(NON_DEFAULT_LOCALES).toContain('tr');
    expect(isValidLocale('tr')).toBe(true);
    expect(isValidLocale('xx')).toBe(false);
  });

  it('strips locale prefixes from paths correctly', () => {
    expect(stripLocaleFromPath('/tools/json/json-formatter')).toEqual({
      cleanPath: '/tools/json/json-formatter',
      locale: 'en',
    });

    expect(stripLocaleFromPath('/tr/tools/json/json-formatter')).toEqual({
      cleanPath: '/tools/json/json-formatter',
      locale: 'tr',
    });

    expect(stripLocaleFromPath('/de')).toEqual({
      cleanPath: '/',
      locale: 'de',
    });

    expect(stripLocaleFromPath('/')).toEqual({
      cleanPath: '/',
      locale: 'en',
    });
  });

  it('generates localized paths correctly', () => {
    expect(getLocalizedPath('/tools/json/json-formatter', 'tr')).toBe(
      '/tr/tools/json/json-formatter',
    );
    expect(getLocalizedPath('/tr/tools/json/json-formatter', 'en')).toBe(
      '/tools/json/json-formatter',
    );
    expect(getLocalizedPath('/tr/tools/json/json-formatter', 'de')).toBe(
      '/de/tools/json/json-formatter',
    );
    expect(getLocalizedPath('/', 'tr')).toBe('/tr');
    expect(getLocalizedPath('/tr', 'en')).toBe('/');
    expect(getLocalizedPath('/tr/contact', 'de')).toBe('/de/contact');
    expect(getLocalizedPath('/collections', 'tr')).toBe('/tr/collections');
    expect(getLocalizedPath('/collections/api-debugging', 'de')).toBe('/de/collections/api-debugging');
    expect(getLocalizedPath('/for/api-developers', 'es')).toBe('/es/for/api-developers');
    expect(getLocalizedPath('/#categories', 'tr')).toBe('/tr#categories');
    expect(getLocalizedPath('/tools/json/json-formatter?q=a%2Bb#input=c%23d', 'tr')).toBe(
      '/tr/tools/json/json-formatter?q=a%2Bb#input=c%23d',
    );
    for (const href of [
      'https://example.com',
      '//example.com',
      'mailto:devstoolsapp@gmail.com',
      '#input=abc',
      '/api/contact',
      '/icon.svg',
    ]) {
      expect(getLocalizedPath(href, 'tr')).toBe(href);
    }
  });

  it('generates complete hreflang alternates', () => {
    const alternates = getHreflangAlternates('/tools/json/json-formatter', 'https://devstools.app');
    expect(alternates['x-default']).toBe('https://devstools.app/tools/json/json-formatter');
    expect(alternates['en']).toBe('https://devstools.app/tools/json/json-formatter');
    expect(alternates['tr']).toBe('https://devstools.app/tr/tools/json/json-formatter');
    expect(alternates['de']).toBe('https://devstools.app/de/tools/json/json-formatter');
    expect(alternates['es']).toBe('https://devstools.app/es/tools/json/json-formatter');
    expect(alternates['fr']).toBe('https://devstools.app/fr/tools/json/json-formatter');
    expect(alternates['ru']).toBe('https://devstools.app/ru/tools/json/json-formatter');
    expect(alternates['zh']).toBe('https://devstools.app/zh/tools/json/json-formatter');
  });

  it('resolves localized tool metadata with fallbacks', () => {
    const metaEn = getLocalizedToolMeta('json-formatter', 'en', 'JSON Formatter', 'Default desc');
    expect(metaEn.name).toBe('JSON Formatter');

    const metaTr = getLocalizedToolMeta('json-formatter', 'tr', 'JSON Formatter', 'Default desc');
    expect(metaTr.name).toBeTruthy();
    expect(metaTr.description).toBeTruthy();
  });

  it('prefers a real translation over an English placeholder in enhancedTools', () => {
    const de = getLocalizedToolMeta(FIXTURE_SLUG, 'de', FIXTURE_EN_NAME, FIXTURE_EN_DESC);
    expect(de).toEqual({
      name: 'Fixture-Werkzeug',
      description: 'Erledigt Fixture-Aufgaben lokal.',
    });

    const tr = getLocalizedToolMeta(FIXTURE_SLUG, 'tr', FIXTURE_EN_NAME, FIXTURE_EN_DESC);
    expect(tr).toEqual({
      name: 'Fikstür Aracı',
      description: 'Fikstür işlerini yerel olarak yapar.',
    });

    // Placeholder (case/whitespace variant) with no real translation → English default.
    const es = getLocalizedToolMeta(FIXTURE_SLUG, 'es', FIXTURE_EN_NAME, FIXTURE_EN_DESC);
    expect(es).toEqual({ name: FIXTURE_EN_NAME, description: 'Hace cosas de fixture localmente.' });

    const ru = getLocalizedToolMeta(FIXTURE_SLUG, 'ru', FIXTURE_EN_NAME, FIXTURE_EN_DESC);
    expect(ru).toEqual({ name: FIXTURE_EN_NAME, description: FIXTURE_EN_DESC });
  });

  it('treats a tool locale as indexable only when name and description are both translated', () => {
    expect(isToolLocaleIndexable(FIXTURE_SLUG, 'en')).toBe(true);
    expect(isToolLocaleIndexable(FIXTURE_SLUG, 'tr')).toBe(true);
    expect(isToolLocaleIndexable(FIXTURE_SLUG, 'de')).toBe(true);
    expect(isToolLocaleIndexable(FIXTURE_SLUG, 'zh')).toBe(true);
    expect(isToolLocaleIndexable(FIXTURE_SLUG, 'es')).toBe(false); // name is English
    expect(isToolLocaleIndexable(FIXTURE_SLUG, 'fr')).toBe(false); // description is English
    expect(isToolLocaleIndexable(FIXTURE_SLUG, 'ru')).toBe(false); // nothing translated
    // Memoized result is stable.
    expect(isToolLocaleIndexable(FIXTURE_SLUG, 'fr')).toBe(false);

    // Unknown tools are only indexable in the default locale.
    expect(isToolLocaleIndexable('does-not-exist', 'en')).toBe(true);
    expect(isToolLocaleIndexable('does-not-exist', 'tr')).toBe(false);

    // Real data: a fully translated tool.
    for (const locale of NON_DEFAULT_LOCALES) {
      expect(isToolLocaleIndexable('json-formatter', locale)).toBe(true);
    }
  });

  it('limits tool hreflang alternates to x-default, en and indexable locales', () => {
    const alternates = getToolHreflangAlternates(FIXTURE_SLUG, 'utilities', 'https://devstools.app/');
    expect(alternates).toEqual({
      'x-default': 'https://devstools.app/tools/utilities/zz-fixture-tool',
      en: 'https://devstools.app/tools/utilities/zz-fixture-tool',
      tr: 'https://devstools.app/tr/tools/utilities/zz-fixture-tool',
      de: 'https://devstools.app/de/tools/utilities/zz-fixture-tool',
      zh: 'https://devstools.app/zh/tools/utilities/zz-fixture-tool',
    });

    const untranslated = getToolHreflangAlternates('does-not-exist', 'text', 'https://devstools.app');
    expect(untranslated).toEqual({
      'x-default': 'https://devstools.app/tools/text/does-not-exist',
      en: 'https://devstools.app/tools/text/does-not-exist',
    });

    expect(Object.keys(getToolHreflangAlternates('json-formatter', 'json', 'https://devstools.app'))).toEqual(
      ['x-default', ...SUPPORTED_LOCALES],
    );
  });

  it('maps every supported locale to an Open Graph locale tag', () => {
    expect(getOpenGraphLocale('en')).toBe('en_US');
    expect(getOpenGraphLocale('tr')).toBe('tr_TR');
    expect(getOpenGraphLocale('de')).toBe('de_DE');
    expect(getOpenGraphLocale('es')).toBe('es_ES');
    expect(getOpenGraphLocale('fr')).toBe('fr_FR');
    expect(getOpenGraphLocale('ru')).toBe('ru_RU');
    expect(getOpenGraphLocale('zh')).toBe('zh_CN');

    const alternates = getOpenGraphAlternateLocales('tr');
    expect(alternates).toHaveLength(SUPPORTED_LOCALES.length - 1);
    expect(alternates).not.toContain('tr_TR');
    expect(alternates).toContain('en_US');
  });
});
