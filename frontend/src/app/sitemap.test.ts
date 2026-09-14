// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { categoryCatalog, toolCatalog } from '@/lib/api';
import { SUPPORTED_LOCALES } from '@/lib/i18nRouting';
import { toolCollections } from '@/lib/toolCollections';
import { developerAudiences } from '@/lib/developerAudiences';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('lists every canonical and localized page with hreflang alternates and without unverifiable freshness hints', () => {
    const entries = sitemap();

    const expectedLength =
      (
        1 +
        categoryCatalog.length +
        toolCatalog.length +
        4 +
        1 + toolCollections.length +
        1 + developerAudiences.length
      ) * SUPPORTED_LOCALES.length;

    expect(entries).toHaveLength(expectedLength);
    expect(entries.every((entry) => !('lastModified' in entry))).toBe(true);
    expect(entries.every((entry) => !('changeFrequency' in entry))).toBe(true);
    expect(entries.every((entry) => !('priority' in entry))).toBe(true);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);

    // Verify localized URLs exist
    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain('https://devstools.app/tr');
    expect(urls).toContain('https://devstools.app/de');
    expect(urls).toContain('https://devstools.app/tr/contact');
    expect(urls.some((u) => u.startsWith('https://devstools.app/tr/tools/'))).toBe(true);
    expect(urls.some((u) => u.startsWith('https://devstools.app/zh/tools/'))).toBe(true);
    expect(urls).toContain('https://devstools.app/collections');
    expect(urls).toContain('https://devstools.app/collections/api-debugging');
    expect(urls).toContain('https://devstools.app/tr/collections/api-debugging');
    expect(urls).toContain('https://devstools.app/for/api-developers');
    expect(urls).toContain('https://devstools.app/de/for/devops-engineers');
  });
});
