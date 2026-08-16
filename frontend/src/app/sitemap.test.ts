// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { categoryCatalog, toolCatalog } from '@/lib/api';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('lists every canonical page without unverifiable freshness hints', () => {
    const entries = sitemap();

    expect(entries).toHaveLength(1 + categoryCatalog.length + toolCatalog.length + 4);
    expect(entries.every((entry) => !('lastModified' in entry))).toBe(true);
    expect(entries.every((entry) => !('changeFrequency' in entry))).toBe(true);
    expect(entries.every((entry) => !('priority' in entry))).toBe(true);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);
  });
});
