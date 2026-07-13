import { describe, expect, it } from 'vitest';
import {
  analyzeCsp,
  CspError,
  formatCsp,
  parseCsp,
  setCspDirective,
} from './contentSecurityPolicy';

describe('Content Security Policy helpers', () => {
  it('parses a full header and normalizes duplicate values', () => {
    const parsed = parseCsp(
      "Content-Security-Policy: default-src 'self'; img-src 'self' data: data:; upgrade-insecure-requests",
    );
    expect(parsed).toEqual([
      { name: 'default-src', values: ["'self'"] },
      { name: 'img-src', values: ["'self'", 'data:', 'data:'] },
      { name: 'upgrade-insecure-requests', values: [] },
    ]);
    expect(formatCsp(parsed)).toBe(
      "default-src 'self'; img-src 'self' data:; upgrade-insecure-requests",
    );
  });

  it('replaces all duplicate instances of a directive in place', () => {
    const directives = parseCsp("default-src 'self'; script-src https:; script-src 'none'");
    expect(formatCsp(setCspDirective(directives, 'script-src', ["'self'", "'nonce-demo'"]))).toBe(
      "default-src 'self'; script-src 'self' 'nonce-demo'",
    );
  });

  it('reports dangerous sources, duplicates, and missing baseline directives', () => {
    const messages = analyzeCsp(
      parseCsp(
        "script-src * 'unsafe-inline' 'unsafe-eval' data:; script-src 'self'; img-src http:",
      ),
    ).map((finding) => `${finding.severity}:${finding.message}`);

    expect(messages.some((message) => message.includes('script-src appears 2 times'))).toBe(true);
    expect(messages.some((message) => message.includes("'unsafe-eval'"))).toBe(true);
    expect(messages.some((message) => message.includes("'unsafe-inline'"))).toBe(true);
    expect(messages.some((message) => message.includes('Missing default-src'))).toBe(true);
    expect(messages.some((message) => message.includes("object-src 'none'"))).toBe(true);
  });

  it('accepts a strict baseline without high or medium findings', () => {
    const findings = analyzeCsp(
      parseCsp(
        "default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
      ),
    );
    expect(findings).toEqual([
      {
        severity: 'info',
        message:
          'No common baseline issue was detected. Test the policy in Report-Only mode before enforcing it.',
      },
    ]);
  });

  it('does not treat an empty or malformed nonce as an unsafe-inline mitigation', () => {
    expect(() =>
      parseCsp(
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'nonce-'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
      ),
    ).toThrow(/Invalid quoted source expression/);
  });

  it('flags scheme-wide script sources as high risk', () => {
    const findings = analyzeCsp(
      parseCsp(
        "default-src 'self'; script-src https:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
      ),
    );
    expect(findings).toContainEqual(
      expect.objectContaining({ severity: 'high', message: expect.stringContaining('https:') }),
    );
  });

  it.each([
    "default-src 'self'\r\nX-Injected: true",
    "default-src 'self'\0script-src *",
    'upgrade-insecure-requests yes',
    "script-src 'unsafe-inline",
    '@invalid value',
    '',
  ])('rejects unsafe or malformed input %j', (input) => {
    expect(() => parseCsp(input)).toThrow(CspError);
  });
});
