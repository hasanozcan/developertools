import { describe, it, expect } from 'vitest';
import { toUrlSafeBase64 } from './urlSafeBase64Converter';

describe('urlSafeBase64Converter', () => {
  it('converts standard base64 to url-safe variant', () => {
    expect(toUrlSafeBase64('a+b/c==')).toBe('a-b_c');
  });
});
