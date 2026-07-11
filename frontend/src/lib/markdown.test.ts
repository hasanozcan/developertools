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
    expect(result).toContain('<img src="x">');
  });

  it('removes form controls and inline styles from raw HTML', () => {
    const result = renderSafeMarkdown(
      '<form><input name="secret"></form><p style="position:fixed">Text</p>',
    );

    expect(result).not.toMatch(/form|input|style=/i);
    expect(result).toContain('<p>Text</p>');
  });
});
