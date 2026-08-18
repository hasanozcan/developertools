import { describe, it, expect } from 'vitest';
import { generateSitemapXml, parseUrlList } from './sitemapGenerator';

describe('sitemapGenerator', () => {
  it('should parse url list text', () => {
    const raw = `https://example.com/
https://example.com/about
# comment
example.com/blog`;

    const entries = parseUrlList(raw, { priority: 0.9, changefreq: 'daily' });
    expect(entries.length).toBe(3);
    expect(entries[0].loc).toBe('https://example.com/');
    expect(entries[2].loc).toBe('https://example.com/blog');
    expect(entries[0].priority).toBe(0.9);
    expect(entries[0].changefreq).toBe('daily');
  });

  it('should generate valid XML sitemap string', () => {
    const xml = generateSitemapXml([
      { loc: 'https://example.com/', priority: 1.0, changefreq: 'daily', lastmod: '2026-08-18' },
    ]);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('<loc>https://example.com/</loc>');
    expect(xml).toContain('<lastmod>2026-08-18</lastmod>');
    expect(xml).toContain('<priority>1.0</priority>');
  });
});
