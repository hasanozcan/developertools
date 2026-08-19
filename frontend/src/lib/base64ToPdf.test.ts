import { describe, it, expect } from 'vitest';
import { cleanBase64PdfString, base64ToPdfBlob, isValidBase64Pdf } from './base64ToPdf';

describe('base64ToPdf', () => {
  // Minimal valid Base64 PDF header (%PDF-1.4...)
  const validPdfB64 = 'JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwKL0xlbmd0aCAzNDUKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCg==';

  it('should clean data URI prefix', () => {
    const raw = `data:application/pdf;base64,${validPdfB64}`;
    expect(cleanBase64PdfString(raw)).toBe(validPdfB64);
  });

  it('should identify valid PDF base64 headers', () => {
    expect(isValidBase64Pdf(validPdfB64)).toBe(true);
    expect(isValidBase64Pdf('not-a-pdf-header')).toBe(false);
  });

  it('should create valid application/pdf Blob', () => {
    const blob = base64ToPdfBlob(validPdfB64);
    expect(blob.type).toBe('application/pdf');
    expect(blob.size).toBeGreaterThan(0);
  });
});
