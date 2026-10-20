// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { categoryCatalog, toolCatalog } from '@/lib/api';
import { NON_DEFAULT_LOCALES, SUPPORTED_LOCALES, isToolLocaleIndexable } from '@/lib/i18nRouting';
import { SITEMAP_IDS } from '@/lib/sitemapIds';
import { toolCollections } from '@/lib/toolCollections';
import { developerAudiences } from '@/lib/developerAudiences';
import { developerGuides } from '@/lib/developerGuides';
import sitemap, { generateSitemaps } from './sitemap';
import { GET as getSitemapIndex } from './sitemap-index/route';

const BASE = 'https://devstools.app';

async function sitemapFor(id: string) {
  return sitemap({ id: Promise.resolve(id) });
}

// Union of every child sitemap: the full URL set the old single sitemap held.
async function allEntries() {
  const ids = await generateSitemaps();
  const children = await Promise.all(ids.map(({ id }) => sitemapFor(id)));
  return children.flat();
}

describe('sitemap', () => {
  it('lists every canonical and indexable localized page with hreflang alternates and without unverifiable freshness hints', async () => {
    const entries = await allEntries();

    const nonToolPagesPerLocale =
      1 + categoryCatalog.length + 4 + 1 + toolCollections.length + 1 + developerAudiences.length;
    const indexableLocalizedTools = NON_DEFAULT_LOCALES.reduce(
      (sum, locale) =>
        sum + toolCatalog.filter((tool) => isToolLocaleIndexable(tool.slug, locale)).length,
      0,
    );
    const expectedLength =
      nonToolPagesPerLocale * SUPPORTED_LOCALES.length +
      toolCatalog.length +
      indexableLocalizedTools +
      1 +
      developerGuides.length;

    expect(entries).toHaveLength(expectedLength);
    expect(entries.every((entry) => !('lastModified' in entry))).toBe(true);
    expect(entries.every((entry) => !('changeFrequency' in entry))).toBe(true);
    expect(entries.every((entry) => !('priority' in entry))).toBe(true);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);

    // Verify localized URLs exist
    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain(`${BASE}/tr`);
    expect(urls).toContain(`${BASE}/de`);
    expect(urls).toContain(`${BASE}/tr/contact`);
    expect(urls).toContain(`${BASE}/tr/tools/json/json-formatter`);
    expect(urls).toContain(`${BASE}/zh/tools/json/json-formatter`);
    expect(urls).toContain(`${BASE}/collections`);
    expect(urls).toContain(`${BASE}/collections/api-debugging`);
    expect(urls).toContain(`${BASE}/tr/collections/api-debugging`);
    expect(urls).toContain(`${BASE}/for/api-developers`);
    expect(urls).toContain(`${BASE}/de/for/devops-engineers`);
    expect(urls).toContain(`${BASE}/guides`);
    for (const guide of developerGuides) {
      expect(urls).toContain(`${BASE}/guides/${guide.slug}`);
    }
  });

  it('always includes every English tool page', async () => {
    const urls = new Set((await allEntries()).map((entry) => entry.url));
    for (const tool of toolCatalog) {
      expect(urls.has(`${BASE}/tools/${tool.categorySlug}/${tool.slug}`)).toBe(true);
    }
  });

  it('excludes locale×tool pages without a real translation', async () => {
    const urls = new Set((await allEntries()).map((entry) => entry.url));

    let excluded = 0;
    for (const locale of NON_DEFAULT_LOCALES) {
      for (const tool of toolCatalog) {
        const url = `${BASE}/${locale}/tools/${tool.categorySlug}/${tool.slug}`;
        expect(urls.has(url)).toBe(isToolLocaleIndexable(tool.slug, locale));
        if (!urls.has(url)) excluded += 1;
      }
    }
    // All supported catalog locales now have reviewed names and descriptions.
    expect(excluded).toBe(0);
  });

  it('never references an excluded URL from hreflang alternates', async () => {
    const entries = await allEntries();
    // The origin root is equivalent with or without a trailing slash.
    const normalize = (url: string) => (url === `${BASE}/` ? BASE : url);
    const urls = new Set(entries.map((entry) => normalize(entry.url)));

    for (const entry of entries) {
      const languages = entry.alternates?.languages ?? {};
      for (const href of Object.values(languages)) {
        expect(urls.has(normalize(href as string)), `${entry.url} -> ${href}`).toBe(true);
      }
    }

    const toolEntries = entries.filter((entry) => /\/tools\/[^/]+\/[^/]+$/.test(entry.url));
    for (const entry of toolEntries) {
      const languages = entry.alternates?.languages as Record<string, string>;
      expect(languages['x-default']).toBeDefined();
      expect(languages.en).toBeDefined();
      // Each tool entry must be part of its own hreflang cluster.
      expect(Object.values(languages)).toContain(entry.url);
    }
  });

  it('keeps each locale URL in its own child sitemap', async () => {
    for (const id of SITEMAP_IDS) {
      const entries = await sitemapFor(id);
      expect(entries.length, id).toBeGreaterThan(0);
      for (const entry of entries) {
        const locale =
          NON_DEFAULT_LOCALES.find(
            (candidate) =>
              entry.url === `${BASE}/${candidate}` || entry.url.startsWith(`${BASE}/${candidate}/`),
          ) ?? 'en';
        expect(locale, entry.url).toBe(id);
      }
    }
  });

  it('lists the per-locale children in the sitemap index and nothing else', async () => {
    const response = await getSitemapIndex();
    expect(response.headers.get('content-type')).toBe('application/xml');
    const body = await response.text();

    const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(locs).toEqual(SITEMAP_IDS.map((id) => `${BASE}/sitemap/${id}.xml`));
    expect(body).not.toContain('<url>');
  });

  it('returns no entries for an unknown sitemap id', async () => {
    expect(await sitemapFor('xx')).toEqual([]);
  });
});
