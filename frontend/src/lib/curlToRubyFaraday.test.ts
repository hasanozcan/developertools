import { describe, it, expect } from 'vitest';
import { convertCurlToRubyFaraday } from './curlToRubyFaraday';

describe('curlToRubyFaraday', () => {
  it('converts curl to Faraday', () => {
    expect(convertCurlToRubyFaraday('curl https://api.com')).toContain('Faraday.new');
  });
});
