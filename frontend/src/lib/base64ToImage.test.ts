import { describe, it, expect } from 'vitest';
import { parseBase64Image } from './base64ToImage';

describe('base64ToImage', () => {
  it('should parse data URI image correctly', () => {
    const dataUri =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const decoded = parseBase64Image(dataUri);
    expect(decoded).not.toBeNull();
    expect(decoded?.mimeType).toBe('image/png');
    expect(decoded?.extension).toBe('png');
    expect(decoded?.dataUrl.startsWith('data:image/png;base64,')).toBe(true);
  });

  it('should detect raw PNG prefix', () => {
    const raw =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const decoded = parseBase64Image(raw);
    expect(decoded?.mimeType).toBe('image/png');
    expect(decoded?.dataUrl).toContain('data:image/png;base64,');
  });

  it('should return null for empty string or invalid base64 payloads', () => {
    expect(parseBase64Image('')).toBeNull();
    expect(parseBase64Image('data:image/png;base64,   ')).toBeNull();
    expect(parseBase64Image('data:image/png;base64,not!valid*base64')).toBeNull();
    expect(parseBase64Image('data:image/png;base64,YWJj=')).toBeNull();
    expect(parseBase64Image('not-valid-base64!')).toBeNull();
  });

  it('should sanitize XSS payloads inside image/svg+xml data URIs and raw base64 SVGs', () => {
    const xssSvg =
      '<svg viewBox="0 0 100 100" onload="alert(1)"><script>alert(2)</script><style>@import "https://evil.example/a.css";</style><animate attributeName="x" /><image href="https://evil.example/p.png" /><circle cx="50" cy="50" r="40" fill="#4f46e5" onclick="alert(3)" /></svg>';
    const encodedXss = Buffer.from(xssSvg, 'utf8').toString('base64');

    const fromDataUri = parseBase64Image(`data:image/svg+xml;base64,${encodedXss}`);
    expect(fromDataUri).not.toBeNull();
    expect(fromDataUri?.mimeType).toBe('image/svg+xml');
    expect(fromDataUri?.extension).toBe('svg');

    const decodedCleanFromUri = Buffer.from(
      fromDataUri!.dataUrl.replace('data:image/svg+xml;base64,', ''),
      'base64',
    ).toString('utf8');
    expect(decodedCleanFromUri).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(decodedCleanFromUri).toContain('<circle cx="50" cy="50" r="40" fill="#4f46e5"');
    expect(decodedCleanFromUri).not.toMatch(/<script/i);
    expect(decodedCleanFromUri).not.toMatch(/<style/i);
    expect(decodedCleanFromUri).not.toMatch(/<animate/i);
    expect(decodedCleanFromUri).not.toMatch(/\bon(?:load|click)\s*=/i);
    expect(decodedCleanFromUri).not.toContain('evil.example');

    const fromRaw = parseBase64Image(encodedXss);
    expect(fromRaw).not.toBeNull();
    expect(fromRaw?.mimeType).toBe('image/svg+xml');
    expect(fromRaw?.dataUrl).toBe(fromDataUri?.dataUrl);
  });

  it('should reject SVG payloads that sanitize to empty or non-SVG markup', () => {
    const onlyScript = Buffer.from('<script>alert(1)</script>', 'utf8').toString('base64');
    expect(parseBase64Image(`data:image/svg+xml;base64,${onlyScript}`)).toBeNull();
  });
});
