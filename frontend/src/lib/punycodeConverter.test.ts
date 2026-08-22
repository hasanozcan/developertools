import { describe, it, expect } from 'vitest';
import { convertToPunycode } from './punycodeConverter';

describe('convertToPunycode', () => {
  it('converts unicode international domains to ASCII punycode', () => {
    const res = convertToPunycode('münchen.de');
    expect(res).toContain('xn--');
  });
});