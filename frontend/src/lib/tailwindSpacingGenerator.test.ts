import { describe, expect, it } from 'vitest';
import { generateTailwindSpacingScale } from './tailwindSpacingGenerator';

describe('tailwindSpacingGenerator', () => {
  it('generates spacing scale in rem units', () => {
    const scale = generateTailwindSpacingScale(4, 4);
    expect(scale['1']).toBe('0.25rem');
    expect(scale['4']).toBe('1rem');
  });
});
