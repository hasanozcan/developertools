import { describe, expect, it } from 'vitest';
import { curlToAxios, parseCurlCommand } from './curlToAxios';

describe('curlToAxios', () => {
  it('parses basic GET curl command', () => {
    const curl = 'curl https://api.example.com/users';
    const parsed = parseCurlCommand(curl);
    expect(parsed.method).toBe('GET');
    expect(parsed.url).toBe('https://api.example.com/users');
  });

  it('parses POST command with headers and json body', () => {
    const curl = `curl -X POST https://api.example.com/users -H "Content-Type: application/json" -H "Authorization: Bearer token123" -d '{"name":"John","role":"admin"}'`;
    const parsed = parseCurlCommand(curl);
    expect(parsed.method).toBe('POST');
    expect(parsed.headers['Content-Type']).toBe('application/json');
    expect(parsed.headers['Authorization']).toBe('Bearer token123');
    expect(parsed.data).toEqual({ name: 'John', role: 'admin' });
  });

  it('generates TypeScript async/await code', () => {
    const curl = `curl -X POST https://api.example.com/items -H "Content-Type: application/json" -d '{"item":"test"}'`;
    const code = curlToAxios(curl, { language: 'typescript', asyncAwait: true });
    expect(code).toContain("import axios, { AxiosResponse } from 'axios';");
    expect(code).toContain('await axios(');
    expect(code).toContain('"method": "post"');
  });

  it('generates JavaScript promise-based code', () => {
    const curl = 'curl https://api.example.com/status';
    const code = curlToAxios(curl, { language: 'javascript', asyncAwait: false });
    expect(code).toContain("const axios = require('axios');");
    expect(code).toContain('.then(response => {');
  });
});
