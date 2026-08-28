import { describe, it, expect } from 'vitest';
import { extractUuidV7Date } from './uuidV7TimestampExtractor';

describe('uuidV7TimestampExtractor', () => {
  it('extracts date from UUIDv7 hex prefix', () => {
    const date = extractUuidV7Date('0188e6a1-9a74-7800-8480-e37452d3a39e');
    expect(date).not.toBeNull();
    expect(date?.getFullYear()).toBeGreaterThan(2020);
  });
});
