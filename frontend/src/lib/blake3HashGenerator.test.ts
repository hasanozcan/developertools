import { describe, it, expect } from 'vitest';
import { calculateBlake3 } from './blake3HashGenerator';

describe('blake3HashGenerator', () => {
  it('computes official BLAKE3 256-bit test vectors', async () => {
    await expect(calculateBlake3('')).resolves.toBe(
      'af1349b9f5f9a1a6a0404dea36dcc9499bcb25c9adc112b7cc9a93cae41f3262',
    );
    await expect(calculateBlake3('The quick brown fox jumps over the lazy dog')).resolves.toBe(
      '2f1514181aadccd913abd94cfa592701a5686ab23f8df1dff1b74710febc6d4a',
    );
  });

  it('supports extended BLAKE3 XOF output lengths', async () => {
    const digest512 = await calculateBlake3('hello', 512);
    expect(digest512).toHaveLength(128);
    expect(digest512.slice(0, 64)).toBe(await calculateBlake3('hello', 256));
  });
});
