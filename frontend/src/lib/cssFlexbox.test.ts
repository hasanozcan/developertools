import { describe, it, expect } from 'vitest';
import { generateFlexboxCode } from './cssFlexbox';

describe('cssFlexbox', () => {
  it('should generate standard flex container css and tailwind', () => {
    const res = generateFlexboxCode({
      direction: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      alignContent: 'center',
      gap: 16,
      itemCount: 4,
    });

    expect(res.css).toContain('display: flex;');
    expect(res.css).toContain('flex-direction: row;');
    expect(res.css).toContain('justify-content: center;');
    expect(res.css).toContain('align-items: center;');
    expect(res.css).toContain('flex-wrap: wrap;');
    expect(res.css).toContain('gap: 16px;');
    expect(res.tailwind).toContain('flex-row justify-center items-center flex-wrap gap-[16px]');
  });
});
