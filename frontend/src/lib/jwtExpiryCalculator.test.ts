import { describe, it, expect } from 'vitest';
import { calculateJwtLifetime } from './jwtExpiryCalculator';

describe('jwtExpiryCalculator', () => {
  it('calculates jwt expiration', () => {
    const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64');
    const token = 'header.' + payload + '.sig';
    const res = calculateJwtLifetime(token);
    expect(res.isExpired).toBe(false);
    expect(res.secondsRemaining).toBeGreaterThan(3000);
  });
});
