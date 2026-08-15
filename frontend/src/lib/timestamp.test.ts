// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { dateToTimestamp, timestampToIso } from './timestamp';

describe('timestamp conversion', () => {
  it('interprets the same input according to the selected unit', () => {
    expect(timestampToIso('1700000000', 'seconds')).toBe('2023-11-14T22:13:20.000Z');
    expect(timestampToIso('1700000000', 'milliseconds')).toBe('1970-01-20T16:13:20.000Z');
  });

  it('validates the whole timestamp instead of accepting a numeric prefix', () => {
    expect(timestampToIso('1700000000junk', 'seconds')).toBe('');
  });

  it('converts ISO dates to either unit', () => {
    expect(dateToTimestamp('2023-11-14T22:13:20.000Z', 'seconds')).toBe('1700000000');
    expect(dateToTimestamp('2023-11-14T22:13:20.000Z', 'milliseconds')).toBe('1700000000000');
  });
});
