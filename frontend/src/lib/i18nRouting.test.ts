import { describe, expect, it } from 'vitest';
import {
  SUPPORTED_LOCALES,
  NON_DEFAULT_LOCALES,
  isValidLocale,
  stripLocaleFromPath,
  getLocalizedPath,
  getHreflangAlternates,
  getLocalizedToolMeta,
} from './i18nRouting';

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
});
