import { describe, it, expect } from 'vitest';
import { appendPrefixSuffix } from './textPrefixSuffixAppender';

describe('textPrefixSuffixAppender', () => {
  it('appends prefix and suffix per line', () => {
    expect(appendPrefixSuffix('item1\nitem2', '(', ')')).toBe('(item1)\n(item2)');
  });
});
