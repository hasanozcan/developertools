import { describe, it, expect } from 'vitest';
import { analyzeSecurityHeaders } from './httpSecurityHeadersAnalyzer';

describe('httpSecurityHeadersAnalyzer', () => {
  it('grades A+ for complete secure headers', () => {
    const raw = `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=()`;

    const result = analyzeSecurityHeaders(raw);
    expect(result.grade).toBe('A+');
    expect(result.score).toBe(100);
    expect(result.passedCount).toBe(6);
  });

  it('fails with Grade F when no security headers are present', () => {
    const raw = 'Server: nginx/1.18.0\nContent-Type: text/html; charset=UTF-8';
    const result = analyzeSecurityHeaders(raw);
    expect(result.grade).toBe('F');
    expect(result.failedCount).toBe(4);
  });
});
