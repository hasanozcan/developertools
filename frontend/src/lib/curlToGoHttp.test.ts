import { describe, it, expect } from 'vitest';
import { convertCurlToGoHttp } from './curlToGoHttp';

describe('curlToGoHttp', () => {
  it('converts curl to Go http', () => {
    expect(convertCurlToGoHttp('curl https://api.com')).toContain('http.Get');
  });
});
