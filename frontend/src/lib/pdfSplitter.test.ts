import { describe, expect, it } from 'vitest';
import { formatPageRangeString, parsePageRangeString } from './pdfSplitter';

describe('pdfSplitter', () => {
  it('parses page ranges such as 1-3, 5, 8-10', () => {
    const pages = parsePageRangeString('1-3, 5, 8-10', 20);
    expect(pages).toEqual([1, 2, 3, 5, 8, 9, 10]);
  });

  it('clamps to maxPages', () => {
    const pages = parsePageRangeString('1-100', 5);
    expect(pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('formats array of page numbers back into concise range string', () => {
    const formatted = formatPageRangeString([1, 2, 3, 5, 8, 9, 10]);
    expect(formatted).toBe('1-3, 5, 8-10');
  });
});
