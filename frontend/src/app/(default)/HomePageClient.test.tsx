import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { LanguageProvider } from '@/context/LanguageContext';
import type { Language } from '@/translations';
import { translations } from '@/translations';
import HomePageClient from './HomePageClient';

vi.mock('@/components/common/AdSense', () => ({ default: () => null }));
vi.mock('@/components/common/InFeedAdCard', () => ({ default: () => null }));
vi.mock('@/components/common/QuickAccessBar', () => ({ default: () => null }));

describe('homepage CollectionPage structured data', () => {
  it.each(['en', 'tr', 'de', 'es', 'fr', 'ru', 'zh'] as Language[])(
    'matches the visible %s homepage copy and language',
    (locale) => {
      const html = renderToStaticMarkup(
        <LanguageProvider initialLocale={locale}>
          <FavoritesProvider>
            <HomePageClient hubs={{ collections: [], audiences: [] }} />
          </FavoritesProvider>
        </LanguageProvider>,
      );
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const nodes = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((script) =>
        JSON.parse(script.textContent || '{}'),
      );
      const collection = nodes.find((node) => node['@type'] === 'CollectionPage');
      const path = locale === 'en' ? '' : `/${locale}`;

      expect(collection).toMatchObject({
        name: translations[locale]['home.title'],
        description: translations[locale]['home.subtitle'],
        inLanguage: locale,
        url: `https://devstools.app${path}`,
      });
      expect(collection.name).toBe(doc.querySelector('h1')?.textContent);
      expect(collection.description).toBe(doc.querySelector('h1 + p')?.textContent);
    },
  );
});
