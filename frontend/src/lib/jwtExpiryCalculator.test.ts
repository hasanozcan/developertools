import { describe, expect, it } from 'vitest';
import { calculateJwtLifetime, decodeBase64UrlToUtf8 } from './jwtExpiryCalculator';

function encodeBase64Url(obj: Record<string, unknown>): string {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let binary = '';
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

describe('jwtExpiryCalculator', () => {
  it('calculates jwt expiration using Base64URL without Node Buffer', () => {
    const now = 1_700_000_000;
    const payload = encodeBase64Url({ exp: now + 3600, iat: now - 60, name: 'José' });
    const token = `eyJhbGciOiJIUzI1NiJ9.${payload}.sig`;
    const res = calculateJwtLifetime(token, now);

    expect(res.valid).toBe(true);
    expect(res.hasExpiration).toBe(true);
    expect(res.isExpired).toBe(false);
    expect(res.secondsRemaining).toBe(3600);
    expect(res.issuedAt?.getTime()).toBe((now - 60) * 1000);
    expect(res.payload?.name).toBe('José');
  });

  it('handles missing exp claim without fabricating current-time expiry', () => {
    const payload = encodeBase64Url({ sub: '123', iat: 0 });
    const token = `eyJhbGciOiJIUzI1NiJ9.${payload}.sig`;
    const res = calculateJwtLifetime(token, 1_700_000_000);

    expect(res.valid).toBe(true);
    expect(res.hasExpiration).toBe(false);
    expect(res.isExpired).toBe(false);
    expect(res.secondsRemaining).toBeNull();
    expect(res.expiresAt).toBeUndefined();
    expect(res.issuedAt?.getTime()).toBe(0);
  });

  it('treats exp=0 as epoch expiration (expired) rather than missing', () => {
    const payload = encodeBase64Url({ exp: 0 });
    const token = `eyJhbGciOiJIUzI1NiJ9.${payload}.sig`;
    const res = calculateJwtLifetime(token, 1_700_000_000);

    expect(res.valid).toBe(true);
    expect(res.hasExpiration).toBe(true);
    expect(res.isExpired).toBe(true);
    expect(res.secondsRemaining).toBe(0);
    expect(res.expiresAt?.toISOString()).toBe('1970-01-01T00:00:00.000Z');
  });

  it('decodes Base64URL UTF-8 and rejects malformed tokens', () => {
    expect(decodeBase64UrlToUtf8('eyJhIjoxfQ')).toBe('{"a":1}');
    const invalid = calculateJwtLifetime('not-a-jwt');
    expect(invalid.valid).toBe(false);
    expect(invalid.error).toBeDefined();
  });
});
