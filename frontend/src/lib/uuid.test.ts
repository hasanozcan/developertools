import { describe, expect, it } from 'vitest';
import { formatUuid, generateUuidV4, generateUuidV7 } from './uuid';

function fixedBytes(hex: string): Uint8Array {
  return Uint8Array.from(hex.match(/.{2}/g) ?? [], (pair) => Number.parseInt(pair, 16));
}

describe('UUID generators', () => {
  it('sets the RFC version and variant bits for UUID v4', () => {
    const uuid = generateUuidV4(() => Uint8Array.from({ length: 16 }, (_, index) => index));
    expect(uuid).toBe('00010203-0405-4607-8809-0a0b0c0d0e0f');
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('encodes the 48-bit Unix millisecond timestamp in UUID v7', () => {
    const timestamp = 0x0123456789ab;
    const uuid = generateUuidV7(timestamp, () => new Uint8Array(16));
    expect(uuid).toBe('01234567-89ab-7000-8000-000000000000');
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('reproduces the RFC 9562 UUID v7 test vector', () => {
    const vector = '017f22e279b07cc398c4dc0c0c07398f';
    const uuid = generateUuidV7(1645557742000, () => fixedBytes(vector));
    expect(uuid).toBe('017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
  });

  it('sorts UUID v7 values from different milliseconds lexicographically', () => {
    const random = () => new Uint8Array(16);
    const earlier = generateUuidV7(1_700_000_000_000, random);
    const later = generateUuidV7(1_700_000_000_001, random);
    expect(later > earlier).toBe(true);
  });

  it('rejects timestamps outside the UUID v7 field', () => {
    expect(() => generateUuidV7(-1, () => new Uint8Array(16))).toThrow(RangeError);
    expect(() => generateUuidV7(1.5, () => new Uint8Array(16))).toThrow(RangeError);
    expect(() => generateUuidV7(0x1000000000000, () => new Uint8Array(16))).toThrow(RangeError);
  });

  it('validates and does not mutate supplied entropy', () => {
    const entropy = new Uint8Array(16).fill(0xff);
    generateUuidV7(0, () => entropy);
    expect(entropy).toEqual(new Uint8Array(16).fill(0xff));
    expect(() => generateUuidV4(() => new Uint8Array(15))).toThrow(/exactly 16 bytes/);
  });

  it('changes only UUID presentation when formatting', () => {
    expect(formatUuid('01234567-89ab-7cde-8f01-23456789abcd', {
      uppercase: true,
      includeHyphens: false,
      includeBraces: true,
    })).toBe('{0123456789AB7CDE8F0123456789ABCD}');
  });
});
