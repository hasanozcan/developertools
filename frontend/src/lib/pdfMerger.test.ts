import { describe, expect, it } from 'vitest';
import {
  parsePdfPageCountFromBytes,
  reorderPdfList,
  validatePdfHeader,
} from './pdfMerger';

describe('pdfMerger', () => {
  it('validates PDF magic header %PDF-', () => {
    const valid = new TextEncoder().encode('%PDF-1.7\n...');
    expect(validatePdfHeader(valid)).toBe(true);

    const invalid = new TextEncoder().encode('GIF89a...');
    expect(validatePdfHeader(invalid)).toBe(false);
  });

  it('parses page count from PDF stream', () => {
    const mockPdf = new TextEncoder().encode(
      '%PDF-1.4\n1 0 obj\n<< /Type /Page >>\nendobj\n2 0 obj\n<< /Type /Page >>\nendobj\n%%EOF'
    );
    expect(parsePdfPageCountFromBytes(mockPdf)).toBe(2);
  });

  it('reorders item list correctly', () => {
    const items = ['A', 'B', 'C', 'D'];
    const reordered = reorderPdfList(items, 0, 2);
    expect(reordered).toEqual(['B', 'C', 'A', 'D']);
  });
});
