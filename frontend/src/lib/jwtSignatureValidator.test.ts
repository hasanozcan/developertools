import { describe, it, expect } from 'vitest';
import { validateJwtStructure } from './jwtSignatureValidator';

describe('jwtSignatureValidator', () => {
  it('validates JWT token structure and expiration claim', () => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ sub: '1234567890', name: 'John Doe', exp: 1999999999 }));
    const token = `${header}.${payload}.signature_dummy`;

    const res = validateJwtStructure(token);
    expect(res.isValidStructure).toBe(true);
    expect(res.payload?.name).toBe('John Doe');
    expect(res.isExpired).toBe(false);
  });
});
