import { describe, it, expect } from 'vitest';
import { sortTailwindClasses } from './tailwindClassSorter';

describe('tailwindClassSorter', () => {
  it('sorts and deduplicates Tailwind CSS classes according to layout hierarchy', () => {
    const input = 'p-4 flex bg-blue-500 font-bold items-center p-4';
    const sorted = sortTailwindClasses(input);
    expect(sorted).toBe('flex items-center p-4 font-bold bg-blue-500');
  });
});
