import { describe, expect, it } from 'vitest';
import { convertCurlToHar } from './curlToHar';

describe('convertCurlToHar', () => {
  it('converts simple GET curl to HAR 1.2 format', () => {
    const curl = 'curl "https://api.github.com/users/octocat" -H "Accept: application/json"';
    const har = convertCurlToHar(curl);
    expect(har.log.version).toBe('1.2');
    expect(har.log.entries[0].request.method).toBe('GET');
    expect(har.log.entries[0].request.url).toBe('https://api.github.com/users/octocat');
    expect(har.log.entries[0].request.headers).toEqual([
      { name: 'Accept', value: 'application/json' },
    ]);
  });

  it('converts POST request with payload and query params', () => {
    const curl = `curl -X POST "https://httpbin.org/post?source=cli" \\
      -H "Content-Type: application/json" \\
      -d '{"username": "testuser"}'`;
    const har = convertCurlToHar(curl);
    expect(har.log.entries[0].request.method).toBe('POST');
    expect(har.log.entries[0].request.queryString).toEqual([{ name: 'source', value: 'cli' }]);
    expect(har.log.entries[0].request.postData?.text).toBe('{"username": "testuser"}');
  });
});
