import { describe, expect, it } from 'vitest';
import { fetchToCurl } from './fetchToCurl';

describe('fetchToCurl', () => {
  it('converts basic GET fetch call', () => {
    const code = `fetch('https://api.example.com/users');`;
    const curl = fetchToCurl(code, { multiline: false });
    expect(curl).toBe("curl 'https://api.example.com/users'");
  });

  it('converts POST fetch with headers and body', () => {
    const code = `fetch('https://api.example.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer abc123xyz'
      },
      body: JSON.stringify({ "user": "admin", "pass": "secret" })
    });`;
    const curl = fetchToCurl(code, { multiline: false });
    expect(curl).toContain("-X POST");
    expect(curl).toContain("'https://api.example.com/login'");
    expect(curl).toContain("-H 'Content-Type: application/json'");
    expect(curl).toContain("-H 'Authorization: Bearer abc123xyz'");
    expect(curl).toContain("-d '{\"user\":\"admin\",\"pass\":\"secret\"}'");
  });
});
