import { describe, expect, it } from 'vitest';
import { appendPrefixSuffix } from './textPrefixSuffixAppender';

describe('textPrefixSuffixAppender', () => {
  it('appends prefix and suffix per line', () => {
    expect(appendPrefixSuffix('item1\nitem2', '(', ')')).toBe('(item1)\n(item2)');
  });

  it('skips empty lines when skipEmptyLines is enabled', () => {
    expect(appendPrefixSuffix('apple\n\n  \nbanana', '"', '",', { skipEmptyLines: true })).toBe(
      '"apple",\n\n  \n"banana",',
    );
  });

  it('normalizes CRLF line endings cleanly', () => {
    expect(appendPrefixSuffix('a\r\nb', '- ', ';')).toBe('- a;\n- b;');
  });
});
