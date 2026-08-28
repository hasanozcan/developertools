import { describe, it, expect } from 'vitest';
import { calculateHmac } from './hmacSha384Sha512Calculator';

describe('hmacSha384Sha512Calculator', () => {
  it('computes HMAC-SHA512', () => {
    const res = calculateHmac('msg', 'secret', 'sha512');
    expect(res.hex.length).toBe(128);
  });
});
