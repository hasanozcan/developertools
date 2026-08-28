import { describe, it, expect } from 'vitest';
import { convertCssGridToTailwind } from './cssGridToTailwind';

describe('cssGridToTailwind', () => {
  it('converts css grid to tailwind', () => {
    expect(convertCssGridToTailwind('display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;')).toBe('grid grid-cols-4 gap-4');
  });
});
