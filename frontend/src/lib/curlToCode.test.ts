import { describe, it, expect } from 'vitest';
import { parseCurlCommand, generateCodeFromCurl } from './curlToCode';

describe('curlToCode generator', () => {
  const curlCmd = `curl -X POST https://api.example.com/login -H "Content-Type: application/json" -d '{"user":"admin"}'`;

  it('parses cURL command correctly', () => {
    const parsed = parseCurlCommand(curlCmd);
    expect(parsed.method).toBe('POST');
    expect(parsed.url).toBe('https://api.example.com/login');
    expect(parsed.headers['Content-Type']).toBe('application/json');
    expect(parsed.data).toBe('{"user":"admin"}');
  });

  it('generates JavaScript Fetch code', () => {
    const parsed = parseCurlCommand(curlCmd);
    const code = generateCodeFromCurl(parsed, 'javascript_fetch');
    expect(code).toContain('fetch("https://api.example.com/login"');
    expect(code).toContain('method: "POST"');
    expect(code).toContain('application/json');
  });

  it('generates Python requests code', () => {
    const parsed = parseCurlCommand(curlCmd);
    const code = generateCodeFromCurl(parsed, 'python_requests');
    expect(code).toContain('import requests');
    expect(code).toContain('requests.post');
  });

  it('generates Go net/http code', () => {
    const parsed = parseCurlCommand(curlCmd);
    const code = generateCodeFromCurl(parsed, 'go');
    expect(code).toContain('http.NewRequest');
    expect(code).toContain('package main');
  });
});
