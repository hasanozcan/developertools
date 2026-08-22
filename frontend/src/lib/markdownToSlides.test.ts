import { describe, it, expect } from 'vitest';
import { convertMarkdownToSlidesHtml } from './markdownToSlides';

describe('markdownToSlides', () => {
  it('converts markdown horizontal rules (---) to presentation slides', () => {
    const md = '# Slide 1\n---\n# Slide 2';
    const html = convertMarkdownToSlidesHtml(md);
    expect(html).toContain('class="slide" id="slide-1"');
    expect(html).toContain('class="slide" id="slide-2"');
  });
});
