import { describe, it, expect } from 'vitest';
import { generateUuidV7, parseUuidV7Timestamp } from './uuidV7Generator';

describe('uuidV7Generator', () => {
  it('generates valid time-ordered UUIDv7 and parses timestamp', () => {
    const now = Date.now();
    const uuid = generateUuidV7(now);
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

    const parsed = parseUuidV7Timestamp(uuid);
    expect(parsed.isValid).toBe(true);
    expect(parsed.epochMs).toBe(now);
  });
});
