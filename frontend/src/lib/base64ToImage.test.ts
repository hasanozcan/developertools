import { describe, it, expect } from 'vitest';
import { parseBase64Image } from './base64ToImage';

describe('base64ToImage', () => {
  it('should parse data URI image correctly', () => {
    const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const decoded = parseBase64Image(dataUri);
    expect(decoded).not.toBeNull();
    expect(decoded?.mimeType).toBe('image/png');
    expect(decoded?.extension).toBe('png');
    expect(decoded?.dataUrl.startsWith('data:image/png;base64,')).toBe(true);
  });

  it('should detect raw PNG prefix', () => {
    const raw = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const decoded = parseBase64Image(raw);
    expect(decoded?.mimeType).toBe('image/png');
    expect(decoded?.dataUrl).toContain('data:image/png;base64,');
  });

  it('should return null for empty string', () => {
    expect(parseBase64Image('')).toBeNull();
  });
});
