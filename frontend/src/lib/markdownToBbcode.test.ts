import { describe, it, expect } from 'vitest';
import { convertMarkdownToBbcode } from './markdownToBbcode';

describe('markdownToBbcode', () => {
  it('converts md to bbcode', () => {
    expect(convertMarkdownToBbcode('**bold**')).toBe('[b]bold[/b]');
  });
});
