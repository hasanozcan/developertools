import { describe, it, expect } from 'vitest';
import { convertTailwindToCss } from './tailwindToCss';

describe('tailwindToCss', () => {
  it('converts Tailwind utility classes back to vanilla CSS rules', () => {
    const tailwind = 'flex items-center justify-between font-bold cursor-pointer';
    const result = convertTailwindToCss(tailwind);

    expect(result.css).toContain('display: flex;');
    expect(result.css).toContain('align-items: center;');
    expect(result.css).toContain('justify-content: space-between;');
    expect(result.css).toContain('font-weight: 700;');
  });
});
