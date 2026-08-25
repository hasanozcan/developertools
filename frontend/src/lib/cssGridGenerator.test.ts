import { describe, expect, it } from 'vitest';
import { generateCssGrid } from './cssGridGenerator';

describe('cssGridGenerator', () => {
  it('generates grid CSS and tailwind classes', () => {
    const res = generateCssGrid({ columns: 3, rows: 2, columnGap: 16, rowGap: 16 });
    expect(res.css).toContain('grid-template-columns: repeat(3, 1fr)');
    expect(res.tailwind).toContain('grid-cols-3');
  });
});
