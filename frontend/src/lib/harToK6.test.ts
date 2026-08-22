import { describe, it, expect } from 'vitest';
import { convertHarToK6Script } from './harToK6';

describe('convertHarToK6Script', () => {
  it('generates k6 test script', () => {
    const har = JSON.stringify({
      log: {
        entries: [{ request: { method: 'GET', url: 'https://api.example.com/health' } }]
      }
    });
    const res = convertHarToK6Script(har);
    expect(res).toContain("import http from 'k6/http';");
    expect(res).toContain("http.get('https://api.example.com/health');");
  });
});