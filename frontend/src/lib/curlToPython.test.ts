import { describe, expect, it } from 'vitest';
import { curlToPython, parseCurl } from './curlToPython';

describe('curlToPython', () => {
  it('parses basic GET cURL', () => {
    const curl = 'curl https://api.example.com/users -H "Accept: application/json"';
    const parsed = parseCurl(curl);
    expect(parsed.url).toBe('https://api.example.com/users');
    expect(parsed.method).toBe('GET');
    expect(parsed.headers['Accept']).toBe('application/json');
  });

  it('generates python requests code for POST', () => {
    const curl = 'curl -X POST https://api.example.com/items -H "Content-Type: application/json" -d "{\"name\":\"test\"}"';
    const code = curlToPython(curl, 'requests');
    expect(code).toContain('import requests');
    expect(code).toContain('requests.post');
    expect(code).toContain('json=payload');
  });
});
