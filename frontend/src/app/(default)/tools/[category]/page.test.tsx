import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import { isToolLocaleIndexable, type Language } from '@/lib/i18nRouting';
import { translations } from '@/translations';

vi.mock('@/components/common/AdSense', () => ({ default: () => null }));
vi.mock('@/components/common/InFeedAdCard', () => ({
  default: ({ slot, placement }: { slot: string; placement: string }) => (
    <div data-infeed-ad="true" data-slot={slot} data-placement={placement} />
  ),
}));
vi.mock('@/components/tools/EncodingWorkbench', () => ({ default: () => null }));

import CategoryPage from './page';
import LocalizedCategoryPage, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/tools/[category]/page';

const SITE = 'https://devstools.app';

async function renderCategoryPage(locale: Language, category: string) {
  let element: unknown;
  if (locale === 'en') {
    element = await CategoryPage({ params: Promise.resolve({ category }) });
  } else {
    // The locale route returns <CategoryPage locale=… />; resolve that async
    // server component here because renderToStaticMarkup cannot.
    const routeElement = (await LocalizedCategoryPage({
      params: Promise.resolve({ locale, category }),
    })) as ReactElement<Parameters<typeof CategoryPage>[0]>;
    expect(routeElement.type).toBe(CategoryPage);
    expect(routeElement.props.locale).toBe(locale);
    element = await CategoryPage(routeElement.props);
  }
  const html = renderToStaticMarkup(
    <LanguageProvider initialLocale={locale}>{element as ReactElement}</LanguageProvider>,
  );
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const jsonLd = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((script) =>
    JSON.parse(script.textContent || '{}'),
  );
  const byType = (type: string) => jsonLd.find((node) => node['@type'] === type);
  return { doc, byType };
}

describe('CategoryPage', () => {
  it('keeps English output on the default locale', async () => {
    const { doc, byType } = await renderCategoryPage('en', 'converters');

    expect(doc.querySelector('h1')?.textContent).toBe('Converters');
    const collection = byType('CollectionPage');
    expect(collection.url).toBe(`${SITE}/tools/converters`);
    expect(collection).not.toHaveProperty('inLanguage');
    expect(collection.mainEntity.name).toBe('Converters tools');
    for (const item of collection.mainEntity.itemListElement) {
      expect(item.url).toMatch(/^https:\/\/devstools\.app\/tools\//);
    }
    expect(byType('BreadcrumbList').itemListElement[0]).toMatchObject({
      name: 'Home',
      item: `${SITE}/`,
    });
    expect(doc.querySelector('a[href="/tools/converters/timestamp-converter"]')).not.toBeNull();
  });

  it('renders tool card titles as h3 under a single section h2', async () => {
    for (const locale of ['en', 'tr'] as const) {
      const { doc } = await renderCategoryPage(locale, 'converters');
      const grid = doc.querySelector('[data-related-tools="true"]')!;
      const cards = grid.querySelectorAll('a');

      expect(cards.length).toBeGreaterThan(100);
      expect(grid.querySelectorAll('h2')).toHaveLength(0);
      expect(grid.querySelectorAll('h3')).toHaveLength(cards.length);
      expect(doc.querySelectorAll('h2').length).toBeLessThan(5);
      expect(doc.getElementById('category-tools-heading')?.tagName).toBe('H2');
    }
  });

  it('localizes headings, links, and structured data on non-English locales', async () => {
    const { doc, byType } = await renderCategoryPage('tr', 'converters');

    expect(doc.querySelector('h1')?.textContent).toBe('Dönüştürücüler');
    expect(doc.body.textContent).toContain(translations.tr['categoryPage.description.converters']);
    expect(doc.getElementById('category-tools-heading')?.textContent).toBe(
      'Dönüştürücüler kategorisindeki tüm araçlar',
    );
    expect(doc.body.textContent).not.toContain('Showing all');
    expect(doc.body.textContent).not.toContain('are designed to help developers');

    const cardLinks = [...doc.querySelectorAll('[data-related-tools="true"] a')].map((link) =>
      link.getAttribute('href'),
    );
    expect(cardLinks.length).toBeGreaterThan(100);
    for (const href of cardLinks) {
      expect(href).toMatch(/^\/tr\/tools\//);
    }

    const collection = byType('CollectionPage');
    expect(collection['@id']).toBe(`${SITE}/tr/tools/converters`);
    expect(collection.url).toBe(`${SITE}/tr/tools/converters`);
    expect(collection.inLanguage).toBe('tr');
    expect(collection.description).toBe(translations.tr['categoryPage.description.converters']);
    expect(collection.about.name).toBe('Dönüştürücüler');

    const items = collection.mainEntity.itemListElement as { url: string; position: number }[];
    const indexableCount = cardLinks.filter((href) =>
      isToolLocaleIndexable(href!.split('/').pop()!, 'tr'),
    ).length;
    expect(items.length).toBe(indexableCount);
    expect(items.length).toBeGreaterThan(0);
    // The completed locale now covers every tool visible in this category.
    expect(items.length).toBe(cardLinks.length);
    // Only indexable tools, all under /tr, positions renumbered contiguously.
    items.forEach((item, index) => {
      expect(item.url).toMatch(/^https:\/\/devstools\.app\/tr\/tools\//);
      expect(isToolLocaleIndexable(item.url.split('/').pop()!, 'tr')).toBe(true);
      expect(item.position).toBe(index + 1);
    });

    const breadcrumb = byType('BreadcrumbList');
    expect(breadcrumb.itemListElement[0]).toMatchObject({
      name: 'Ana Sayfa',
      item: `${SITE}/tr`,
    });
    expect(breadcrumb.itemListElement[1].name).toBe('Dönüştürücüler');
  });

  it('omits English-only answer sections and FAQs on locale pages', async () => {
    const en = await renderCategoryPage('en', 'encoding');
    expect(en.byType('FAQPage')).toBeDefined();
    expect(en.doc.body.textContent).toContain('Encoding is not encryption or hashing');

    const tr = await renderCategoryPage('tr', 'encoding');
    expect(tr.byType('FAQPage')).toBeUndefined();
    expect(tr.doc.body.textContent).not.toContain('Encoding is not encryption or hashing');
    expect(tr.doc.body.textContent).not.toContain('Frequently asked questions');
    expect(tr.doc.body.textContent).not.toContain('Open an encoder or decoder');
    expect(tr.doc.querySelector('h1')?.textContent).toBe(translations.tr['cat.encoding']);

    const app = tr.byType('WebApplication');
    expect(app['@id']).toBe(`${SITE}/tr/tools/encoding#application`);
    expect(app.url).toBe(`${SITE}/tr/tools/encoding`);
    expect(app.inLanguage).toBe('tr');
  });

  it('localizes the locale route metadata', async () => {
    const metadata = await generateLocalizedMetadata({
      params: Promise.resolve({ locale: 'tr', category: 'converters' }),
    });

    // 56 chars + the 12-char site suffix would exceed 60, so the suffix is dropped.
    expect(metadata.title).toEqual({
      absolute: 'Dönüştürücüler – Ücretsiz Çevrimiçi Geliştirici Araçları',
    });
    expect(metadata.description).toBe(translations.tr['categoryPage.description.converters']);
    expect(metadata.alternates?.canonical).toBe(`${SITE}/tr/tools/converters`);
  });
});

describe('CategoryPage in-feed ads', () => {
  const cards = (doc: Document) => [
    ...doc.querySelectorAll('[data-topic-interface="true"] > *'),
  ];

  afterEach(() => vi.unstubAllEnvs());

  it('adds none until the category list has its own AdSense unit', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_CATEGORY_INFEED_SLOT', '');
    const { doc } = await renderCategoryPage('en', 'converters');
    expect(doc.querySelectorAll('[data-infeed-ad]')).toHaveLength(0);
  });

  it('places one after every twelfth tool card and never at the very end', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_CATEGORY_INFEED_SLOT', '5555555555');
    const { doc } = await renderCategoryPage('en', 'converters');
    const items = cards(doc);
    const ads = items.filter((item) => item.hasAttribute('data-infeed-ad'));
    const toolCards = items.length - ads.length;

    expect(toolCards).toBeGreaterThan(24);
    expect(ads).toHaveLength(Math.floor((toolCards - 1) / 12));
    ads.forEach((ad, index) => {
      expect(items.indexOf(ad)).toBe((index + 1) * 13 - 1);
      expect(ad.getAttribute('data-slot')).toBe('5555555555');
      expect(ad.getAttribute('data-placement')).toBe('category-converters-infeed');
    });
    expect(items[items.length - 1].hasAttribute('data-infeed-ad')).toBe(false);
  });

  it('rejects an id that the top banner already uses', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_CATEGORY_TOP_SLOT', '4444444444');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_CATEGORY_INFEED_SLOT', '4444444444');
    const { doc } = await renderCategoryPage('en', 'converters');
    expect(doc.querySelectorAll('[data-infeed-ad]')).toHaveLength(0);
  });
});
