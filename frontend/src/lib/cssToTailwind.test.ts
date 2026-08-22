import { describe, it, expect } from 'vitest';
import { convertCssToTailwind } from './cssToTailwind';

describe('cssToTailwind', () => {
  it('converts common CSS rules to Tailwind CSS classes', () => {
    const css = 'display: flex; justify-content: center; align-items: center; font-weight: bold; cursor: pointer;';
    const result = convertCssToTailwind(css);

    expect(result.classes).toContain('flex');
    expect(result.classes).toContain('justify-center');
    expect(result.classes).toContain('items-center');
    expect(result.classes).toContain('font-bold');
    expect(result.classes).toContain('cursor-pointer');
  });
});
