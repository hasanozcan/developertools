import { describe, it, expect } from 'vitest';
import { FAVICON_SIZES, generateFaviconHtmlTags, generateWebManifest } from './faviconGenerator';

describe('faviconGenerator', () => {
  it('contains essential icon sizes', () => {
    const sizes = FAVICON_SIZES.map((s) => s.size);
    expect(sizes).toContain(16);
    expect(sizes).toContain(32);
    expect(sizes).toContain(180);
    expect(sizes).toContain(192);
    expect(sizes).toContain(512);
  });

  it('generates valid HTML favicon tags', () => {
    const tags = generateFaviconHtmlTags();
    expect(tags).toContain('apple-touch-icon');
    expect(tags).toContain('favicon-32x32.png');
    expect(tags).toContain('manifest');
  });

  it('generates valid webmanifest JSON', () => {
    const manifest = JSON.parse(generateWebManifest('Test App'));
    expect(manifest.name).toBe('Test App');
    expect(manifest.icons.length).toBeGreaterThan(0);
  });
});
