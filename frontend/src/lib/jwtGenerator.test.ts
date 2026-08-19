import { describe, it, expect } from 'vitest';
import { generateJwtToken, base64UrlEncode } from './jwtGenerator';

describe('jwtGenerator', () => {
  it('should base64url encode without padding', () => {
    const encoded = base64UrlEncode('{"alg":"HS256","typ":"JWT"}');
    expect(encoded).not.toContain('=');
    expect(encoded).not.toContain('+');
    expect(encoded).not.toContain('/');
  });

  it('should generate valid 3-part signed JWT token', async () => {
    const res = await generateJwtToken({
      header: { alg: 'HS256', typ: 'JWT' },
      payload: { sub: '1234567890', name: 'John Doe', admin: true },
      secret: 'my-super-secret-key-12345',
      algorithm: 'HS256',
    });

    const parts = res.token.split('.');
    expect(parts.length).toBe(3);
    expect(res.headerB64).toBe(parts[0]);
    expect(res.payloadB64).toBe(parts[1]);
    expect(res.signatureB64).toBe(parts[2]);
    expect(res.signatureB64.length).toBeGreaterThan(10);
  });
});
