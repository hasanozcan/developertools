import { describe, expect, it } from 'vitest';
import { renderSafeMarkdown } from './markdown';

describe('renderSafeMarkdown', () => {
  it('keeps normal Markdown formatting', () => {
    expect(renderSafeMarkdown('# Safe\n\n**content**')).toContain(
      '<h1>Safe</h1>\n<p><strong>content</strong></p>',
    );
  });

  it('removes executable HTML and dangerous URLs', () => {
    const result = renderSafeMarkdown(
      '<script>alert(1)</script><img src="x" onerror="alert(2)">\n\n[click](javascript:alert(3))',
    );

    expect(result).not.toMatch(/script|onerror|javascript:/i);
    expect(result).not.toContain('<img');
    expect(result).toContain('data-blocked-image="true"');
  });

  it('blocks network-backed images by default', () => {
    const result = renderSafeMarkdown(
      '![Remote diagram](https://cdn.example.test/diagram.png)',
    );

    expect(result).not.toContain('cdn.example.test');
    expect(result).toContain('Linked image blocked: Remote diagram');
  });

  it('allows linked images only when explicitly enabled and applies privacy hints', () => {
    const result = renderSafeMarkdown(
      '![Remote diagram](https://cdn.example.test/diagram.png)',
      { allowNetworkImages: true },
    );
    const template = document.createElement('template');
    template.innerHTML = result;
    const image = template.content.querySelector('img');

    expect(image?.getAttribute('src')).toBe('https://cdn.example.test/diagram.png');
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.getAttribute('decoding')).toBe('async');
    expect(image?.getAttribute('referrerpolicy')).toBe('no-referrer');
  });

  it('keeps embedded raster data images without enabling network access', () => {
    const result = renderSafeMarkdown('![Pixel](data:image/png;base64,AA==)');

    expect(result).toContain('<img');
    expect(result).toContain('data:image/png;base64,AA==');
  });

  it('removes form controls and inline styles from raw HTML', () => {
    const result = renderSafeMarkdown(
      '<form><input name="secret"></form><p style="position:fixed">Text</p>',
    );

    expect(result).not.toMatch(/form|input|style=/i);
    expect(result).toContain('<p>Text</p>');
  });
});
