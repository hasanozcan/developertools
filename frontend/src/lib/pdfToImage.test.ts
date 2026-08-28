import { describe, it, expect } from 'vitest';
import { parsePageRange, calculatePdfRenderScale } from './pdfToImage';

describe('pdfToImage', () => {
  it('parses comma-separated page ranges', () => {
    expect(parsePageRange('1-3, 5, 8-10', 10)).toEqual([1, 2, 3, 5, 8, 9, 10]);
  });

  it('defaults to all pages when range is empty', () => {
    expect(parsePageRange('', 3)).toEqual([1, 2, 3]);
  });

  it('calculates render scale for DPI', () => {
    expect(calculatePdfRenderScale(144)).toBeCloseTo(2.0);
  });
});
