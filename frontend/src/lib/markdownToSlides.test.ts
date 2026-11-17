import { describe, it, expect } from 'vitest';
import { convertMarkdownToSlidesHtml } from './markdownToSlides';

describe('markdownToSlides', () => {
  it('converts markdown horizontal rules (---) to presentation slides', () => {
    const md = '# Slide 1\n---\n# Slide 2';
    const html = convertMarkdownToSlidesHtml(md);
    expect(html).toContain('class="slide" id="slide-1"');
    expect(html).toContain('class="slide" id="slide-2"');
  });

  it('sanitizes XSS payloads and unsafe URLs inside slides', () => {
    const md =
      '# Safe Title\n<script>alert(1)</script>\n<img src="x" onerror="alert(2)">\n---\n[click](javascript:alert(3))\n[vb](vbscript:msgbox(4))\n[data](data:text/html,<script>alert(5)</script>)';
    const html = convertMarkdownToSlidesHtml(md);

    expect(html).toContain('<h1>Safe Title</h1>');
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/onerror\s*=/i);
    expect(html).not.toMatch(/javascript:/i);
    expect(html).not.toMatch(/vbscript:/i);
    expect(html).not.toMatch(/data:text\/html/i);
  });
});
