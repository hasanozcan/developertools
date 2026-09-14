import { describe, expect, it } from 'vitest';
import { DEFAULT_ADSENSE_FOOTER_SLOT, resolveAdSenseSlot } from './adsenseSlots';

describe('resolveAdSenseSlot', () => {
  it('returns a configured numeric slot', () => {
    expect(resolveAdSenseSlot('1234567890')).toBe('1234567890');
  });

  it('trims a configured slot', () => {
    expect(resolveAdSenseSlot(' 1234567890 ')).toBe('1234567890');
  });

  it('falls back when the slot is empty or malformed', () => {
    expect(resolveAdSenseSlot(undefined)).toBe(DEFAULT_ADSENSE_FOOTER_SLOT);
    expect(resolveAdSenseSlot('')).toBe(DEFAULT_ADSENSE_FOOTER_SLOT);
    expect(resolveAdSenseSlot('collection-top')).toBe(DEFAULT_ADSENSE_FOOTER_SLOT);
  });

  it('uses the supplied fallback when present', () => {
    expect(resolveAdSenseSlot('invalid', '9999999999')).toBe('9999999999');
  });
});
