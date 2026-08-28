import { describe, it, expect } from 'vitest';
import { convertToPunycode } from './punycodeIdnConverter';

describe('punycodeIdnConverter', () => {
  it('converts unicode domains to punycode', () => {
    expect(convertToPunycode('münchen.de')).toContain('xn--');
  });
});
