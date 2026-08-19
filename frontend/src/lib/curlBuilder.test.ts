import { describe, it, expect } from 'vitest';
import { buildCurlCommand } from './curlBuilder';

describe('curlBuilder', () => {
  it('should generate POST request with json body and auth header', () => {
    const cmd = buildCurlCommand({
      method: 'POST',
      url: 'https://api.example.com/users',
      headers: [{ key: 'Accept', value: 'application/json' }],
      bodyType: 'json',
      bodyContent: '{"username":"dev"}',
      authType: 'bearer',
      bearerToken: 'token_abc123',
      basicUser: '',
      basicPass: '',
      followRedirects: true,
      insecure: false,
      compressed: true,
    });

    expect(cmd).toContain('curl');
    expect(cmd).toContain('-X POST');
    expect(cmd).toContain("'https://api.example.com/users'");
    expect(cmd).toContain("-H 'Authorization: Bearer token_abc123'");
    expect(cmd).toContain("-H 'Content-Type: application/json'");
    expect(cmd).toContain("-d '{\"username\":\"dev\"}'");
    expect(cmd).toContain('-L');
    expect(cmd).toContain('--compressed');
  });

  it('should generate basic GET request', () => {
    const cmd = buildCurlCommand({
      method: 'GET',
      url: 'https://api.example.com/ping',
      headers: [],
      bodyType: 'none',
      bodyContent: '',
      authType: 'none',
      bearerToken: '',
      basicUser: '',
      basicPass: '',
      followRedirects: false,
      insecure: false,
      compressed: false,
    });

    expect(cmd).toContain('curl');
    expect(cmd).toContain("'https://api.example.com/ping'");
  });
});
