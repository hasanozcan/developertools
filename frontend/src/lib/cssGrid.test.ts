import { describe, it, expect } from 'vitest';
import { generateCssGrid } from './cssGrid';

describe('cssGrid', () => {
  it('should generate valid CSS Grid rules and HTML structure', () => {
    const { css, html } = generateCssGrid({
      columns: 3,
      rows: 2,
      columnGap: 16,
      rowGap: 16,
      colUnit: 'fr',
      rowUnit: 'fr',
    });

    expect(css).toContain('display: grid;');
    expect(css).toContain('grid-template-columns: 1fr 1fr 1fr;');
    expect(css).toContain('grid-template-rows: 1fr 1fr;');
    expect(css).toContain('column-gap: 16px;');
    expect(html).toContain('<div class="parent">');
    expect(html).toContain('<div class="div6">Item 6</div>');
  });
});
