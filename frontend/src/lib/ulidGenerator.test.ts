import { describe, it, expect } from 'vitest';
import { generateUlid, generateUuidV7, decodeUlidTimestamp } from './ulidGenerator';

describe('ulidGenerator', () => {
  it('should generate 26-character valid ULID', () => {
    const ulid = generateUlid();
    expect(ulid.length).toBe(26);
    expect(/^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/.test(ulid)).toBe(true);
  });

  it('should decode timestamp from ULID accurately', () => {
    const now = 1771500000000;
    const ulid = generateUlid(now);
    const decoded = decodeUlidTimestamp(ulid);

    expect(decoded).not.toBeNull();
    expect(decoded?.getTime()).toBe(now);
  });

  it('should generate valid formatted UUID v7', () => {
    const uuid = generateUuidV7();
    expect(uuid.length).toBe(36);
    // version 7 check
    expect(uuid[14]).toBe('7');
  });
});
