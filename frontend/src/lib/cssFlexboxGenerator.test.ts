import { describe, expect, it } from 'vitest';
import { generateCssFlexbox } from './cssFlexboxGenerator';

describe('cssFlexboxGenerator', () => {
  it('generates flexbox css and tailwind utilities', () => {
    const res = generateCssFlexbox({ direction: 'row', justify: 'center', align: 'center', wrap: 'wrap', gap: 12 });
    expect(res.css).toContain('justify-content: center');
    expect(res.tailwind).toContain('justify-center items-center');
  });
});
