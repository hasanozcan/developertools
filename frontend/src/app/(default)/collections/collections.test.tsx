import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { getToolCollection, toolCollections } from '@/lib/toolCollections';
import { developerAudiences } from '@/lib/developerAudiences';
import { isToolLocaleIndexable, type Language } from '@/lib/i18nRouting';

vi.mock('@/components/common/AdSense', () => ({ default: () => null }));

import CollectionPage from './[slug]/page';
import CollectionsIndexPage from './page';
import LocalizedCollectionPage from '@/app/[locale]/collections/[slug]/page';
import LocalizedCollectionsIndexPage from '@/app/[locale]/collections/page';
import AudiencePage from '../for/[audience]/page';
import LocalizedAudiencePage from '@/app/[locale]/for/[audience]/page';

const SITE = 'https://devstools.app';

function parse(element: unknown) {
  const html = renderToStaticMarkup(element as ReactElement);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const jsonLd = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((script) =>
    JSON.parse(script.textContent || '{}'),
  );
  return { doc, jsonLd };
}

async function renderCollection(locale: Language, slug: string) {
  const element =
    locale === 'en'
      ? await CollectionPage({ params: Promise.resolve({ slug }) })
      : await LocalizedCollectionPage({ params: Promise.resolve({ locale, slug }) });
  return parse(element);
}

async function renderAudience(locale: Language, audience: string) {
  const element =
    locale === 'en'
      ? await AudiencePage({ params: Promise.resolve({ audience }) })
      : await LocalizedAudiencePage({ params: Promise.resolve({ locale, audience }) });
  return parse(element);
}

describe('collection detail page', () => {
  it('renders EN long-form intro, tools as h3 cards and an ordered workflow', async () => {
    const collection = getToolCollection('api-debugging')!;
    const { doc, jsonLd } = await renderCollection('en', 'api-debugging');

    expect(doc.querySelectorAll('h1')).toHaveLength(1);
    expect(doc.querySelector('h1')?.textContent).toBe(collection.title);
    expect(doc.querySelectorAll('[data-collection-intro] p')).toHaveLength(collection.introParagraphs!.length);
    expect(doc.querySelector('#collection-tools-heading')?.textContent).toBe('Tools in this collection');

    const grid = doc.querySelector('[data-collection-tools]')!;
    expect(grid.querySelectorAll('h2')).toHaveLength(0);
    expect(grid.querySelectorAll('h3')).toHaveLength(grid.querySelectorAll('a').length);

    const workflow = doc.querySelector('ol[data-collection-workflow]')!;
    expect(workflow).not.toBeNull();
    expect(doc.querySelector('#collection-workflow-heading')?.textContent).toBe('Recommended workflow');
    expect(workflow.querySelectorAll('li')).toHaveLength(collection.workflowSteps!.length);
    for (const step of collection.workflowSteps!) {
      expect(workflow.querySelector(`a[href$="/${step.toolSlug}"]`), step.toolSlug).not.toBeNull();
    }

    const list = jsonLd.find((node) => node['@type'] === 'ItemList');
    expect(list.itemListElement.length).toBe(collection.toolSlugs.length);
    for (const item of list.itemListElement) {
      expect(item.url).toMatch(new RegExp(`^${SITE}/tools/`));
    }
  });

  it('renders tr with the short intro, no workflow, and locale-prefixed indexable JSON-LD urls', async () => {
    const { doc, jsonLd } = await renderCollection('tr', 'api-debugging');
    const collection = getToolCollection('api-debugging')!;

    expect(doc.querySelectorAll('h1')).toHaveLength(1);
    expect(doc.querySelectorAll('[data-collection-intro] p')).toHaveLength(1);
    expect(doc.querySelector('ol[data-collection-workflow]')).toBeNull();
    expect(doc.querySelector('#collection-workflow-heading')).toBeNull();

    const grid = doc.querySelector('[data-collection-tools]')!;
    expect(grid.querySelectorAll('h2')).toHaveLength(0);
    // Every tool stays visible even when its localized page is not indexable.
    expect(grid.querySelectorAll('a')).toHaveLength(collection.toolSlugs.length);
    expect(grid.querySelector('a')?.getAttribute('href')).toMatch(/^\/tr\/tools\//);

    const list = jsonLd.find((node) => node['@type'] === 'ItemList');
    const expected = collection.toolSlugs.filter((slug) => isToolLocaleIndexable(slug, 'tr')).length;
    expect(list.itemListElement).toHaveLength(expected);
    for (const item of list.itemListElement) {
      expect(item.url).toMatch(new RegExp(`^${SITE}/tr/tools/`));
    }
  });

  it('every EN collection renders exactly one h1 and its long-form intro', async () => {
    for (const collection of toolCollections) {
      const { doc } = await renderCollection('en', collection.slug);
      expect(doc.querySelectorAll('h1'), collection.slug).toHaveLength(1);
      expect(doc.querySelectorAll('[data-collection-intro] p'), collection.slug).toHaveLength(
        collection.introParagraphs?.length ?? 1,
      );
    }
  });
});

describe('collections index', () => {
  it('groups all collections under h2 headings with h3 card titles (EN and de)', async () => {
    for (const locale of ['en', 'de'] as const) {
      const element =
        locale === 'en'
          ? CollectionsIndexPage()
          : await LocalizedCollectionsIndexPage({ params: Promise.resolve({ locale }) });
      const { doc } = parse(element);
      const prefix = locale === 'en' ? '' : `/${locale}`;

      expect(doc.querySelectorAll('h1')).toHaveLength(1);
      expect(doc.querySelectorAll('h2').length).toBeGreaterThanOrEqual(6);
      expect(doc.querySelectorAll('h3')).toHaveLength(toolCollections.length);
      const hrefs = [...doc.querySelectorAll(`a[href^="${prefix}/collections/"]`)].map((a) => a.getAttribute('href'));
      expect(new Set(hrefs).size).toBe(toolCollections.length);
    }
  });
});

describe('audience detail page', () => {
  it('renders EN long-form intro paragraphs and h3 tool cards', async () => {
    const audience = developerAudiences.find((item) => item.slug === 'api-developers')!;
    const { doc, jsonLd } = await renderAudience('en', 'api-developers');

    expect(doc.querySelectorAll('h1')).toHaveLength(1);
    expect(doc.querySelector('h1')?.textContent).toBe(audience.title);
    expect(doc.querySelectorAll('[data-audience-intro] p')).toHaveLength(audience.introParagraphs!.length);
    const featured = doc.querySelector('#audience-featured-tools')!.parentElement!;
    expect(featured.querySelectorAll('h3').length).toBeGreaterThan(0);
    expect(featured.querySelectorAll('h2')).toHaveLength(1);
    const list = jsonLd.find((node) => node['@type'] === 'ItemList');
    for (const item of list.itemListElement) expect(item.url).toMatch(new RegExp(`^${SITE}/tools/`));
  });

  it('renders de with the localized short intro and de-prefixed urls', async () => {
    const { doc, jsonLd } = await renderAudience('de', 'api-developers');

    expect(doc.querySelectorAll('h1')).toHaveLength(1);
    expect(doc.querySelectorAll('[data-audience-intro] p')).toHaveLength(1);
    expect(doc.querySelector('a[href^="/de/collections/"]')).not.toBeNull();
    const list = jsonLd.find((node) => node['@type'] === 'ItemList');
    for (const item of list.itemListElement) expect(item.url).toMatch(new RegExp(`^${SITE}/de/tools/`));
  });
});
