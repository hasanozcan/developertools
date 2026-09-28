import { describe, expect, it } from 'vitest';
import {
  DEFAULT_ADSENSE_FOOTER_SLOT,
  DEFAULT_ADSENSE_TOOL_BOTTOM_SLOT,
  DEFAULT_ADSENSE_TOOL_SIDEBAR_SLOT,
  DEFAULT_ADSENSE_TOOL_ZEN_BOTTOM_SLOT,
  DEFAULT_ADSENSE_TOOL_ZEN_LEFT_SLOT,
  DEFAULT_ADSENSE_TOOL_ZEN_RIGHT_SLOT,
  resolveAdSenseSlot,
  resolveDistinctAdSenseSlot,
} from './adsenseSlots';

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

describe('resolveDistinctAdSenseSlot', () => {
  it('returns a configured numeric slot', () => {
    expect(
      resolveDistinctAdSenseSlot('1234567890', [DEFAULT_ADSENSE_FOOTER_SLOT, undefined]),
    ).toBe('1234567890');
  });

  it('trims a configured slot', () => {
    expect(resolveDistinctAdSenseSlot('  1234567890  ', [])).toBe('1234567890');
  });

  it('never falls back to another ad unit', () => {
    expect(resolveDistinctAdSenseSlot(undefined, [])).toBeUndefined();
    expect(resolveDistinctAdSenseSlot('', [])).toBeUndefined();
    expect(resolveDistinctAdSenseSlot('   ', [])).toBeUndefined();
    expect(resolveDistinctAdSenseSlot('not-a-slot', [])).toBeUndefined();
  });

  it.each([
    DEFAULT_ADSENSE_FOOTER_SLOT,
    DEFAULT_ADSENSE_TOOL_SIDEBAR_SLOT,
    DEFAULT_ADSENSE_TOOL_ZEN_LEFT_SLOT,
    DEFAULT_ADSENSE_TOOL_ZEN_RIGHT_SLOT,
  ])('rejects already-used slot %s, including whitespace', (slot) => {
    expect(resolveDistinctAdSenseSlot(slot, [slot])).toBeUndefined();
    expect(resolveDistinctAdSenseSlot(`  ${slot}  `, [slot])).toBeUndefined();
  });
});

describe('tool page ad slot defaults', () => {
  it('gives every tool page placement that ships a default its own slot id', () => {
    const shippedDefaults = [
      DEFAULT_ADSENSE_FOOTER_SLOT,
      DEFAULT_ADSENSE_TOOL_SIDEBAR_SLOT,
      DEFAULT_ADSENSE_TOOL_ZEN_LEFT_SLOT,
      DEFAULT_ADSENSE_TOOL_ZEN_RIGHT_SLOT,
    ];

    expect(new Set(shippedDefaults).size).toBe(shippedDefaults.length);
  });

  it('leaves the tool bottom placements unconfigured instead of reusing another slot', () => {
    // Keep these empty until dedicated placement IDs are configured.
    expect(DEFAULT_ADSENSE_TOOL_BOTTOM_SLOT).toBe('');
    expect(DEFAULT_ADSENSE_TOOL_ZEN_BOTTOM_SLOT).toBe('');
    expect(resolveDistinctAdSenseSlot(DEFAULT_ADSENSE_TOOL_BOTTOM_SLOT, [])).toBeUndefined();
    expect(resolveDistinctAdSenseSlot(DEFAULT_ADSENSE_TOOL_ZEN_BOTTOM_SLOT, [])).toBeUndefined();
  });
});
