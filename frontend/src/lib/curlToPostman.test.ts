import { describe, it, expect } from 'vitest';
import { curlToPostmanCollection } from './curlToPostman';

describe('curlToPostman', () => {
  it('converts cURL command into Postman v2.1 collection format', () => {
    const curl = 'curl -X POST https://api.example.com/login -H "Content-Type: application/json" --data "{\\"user\\":\\"test\\"}"';
    const jsonStr = curlToPostmanCollection(curl);
    const parsed = JSON.parse(jsonStr);
    expect(parsed.info.name).toBe('Imported cURL');
    expect(parsed.item[0].request.method).toBe('POST');
    expect(parsed.item[0].request.url.raw).toBe('https://api.example.com/login');
  });
});
