import { describe, expect, it } from 'vitest';
import { convertCurlToPostman } from './curlToPostman';

describe('convertCurlToPostman', () => {
  it('converts basic curl command into Postman Collection format', () => {
    const curl = 'curl -X GET "https://api.github.com/repos/octocat/Hello-World" -H "Accept: application/vnd.github.v3+json"';
    const postman = convertCurlToPostman(curl, 'GitHub Test');
    expect(postman.info.name).toBe('GitHub Test');
    expect(postman.item).toHaveLength(1);
    expect(postman.item[0].request.method).toBe('GET');
    expect(postman.item[0].request.header[0].key).toBe('Accept');
  });
});
