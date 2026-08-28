import { describe, it, expect } from 'vitest';
import { convertCurlToPhpGuzzle } from './curlToPhpGuzzle';

describe('curlToPhpGuzzle', () => {
  it('converts curl to PHP Guzzle', () => {
    expect(convertCurlToPhpGuzzle('curl https://api.com')).toContain('$client->request');
  });
});
