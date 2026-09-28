export const DEFAULT_ADSENSE_FOOTER_SLOT = '7781534087';
export const DEFAULT_ADSENSE_COLLECTION_INDEX_SLOT = '6442607030';
export const DEFAULT_ADSENSE_COLLECTION_TOP_SLOT = '6416143146';
export const DEFAULT_ADSENSE_COLLECTION_BOTTOM_SLOT = '2103906771';

// Separate tool placement IDs allow AdSense reports to attribute performance.
export const DEFAULT_ADSENSE_TOOL_SIDEBAR_SLOT = '2449208552';
export const DEFAULT_ADSENSE_TOOL_ZEN_LEFT_SLOT = '3460899670';
export const DEFAULT_ADSENSE_TOOL_ZEN_RIGHT_SLOT = '1351515156';
// Intentionally empty: these need their own slot id from the AdSense console.
// They stay hidden until configured instead of sharing another placement's ID.
export const DEFAULT_ADSENSE_TOOL_BOTTOM_SLOT = '';
export const DEFAULT_ADSENSE_TOOL_ZEN_BOTTOM_SLOT = '';

const ADSENSE_SLOT_PATTERN = /^\d+$/;

export function resolveAdSenseSlot(
  slot: string | undefined,
  fallback = DEFAULT_ADSENSE_FOOTER_SLOT,
) {
  const normalizedSlot = slot?.trim();

  if (normalizedSlot && ADSENSE_SLOT_PATTERN.test(normalizedSlot)) {
    return normalizedSlot;
  }

  return fallback;
}

/** Reject missing, malformed, or already-used placement IDs without a fallback. */
export function resolveDistinctAdSenseSlot(
  slot: string | undefined,
  usedSlots: readonly (string | undefined)[],
): string | undefined {
  const normalizedSlot = slot?.trim();

  if (
    normalizedSlot &&
    ADSENSE_SLOT_PATTERN.test(normalizedSlot) &&
    !usedSlots.includes(normalizedSlot)
  ) {
    return normalizedSlot;
  }

  return undefined;
}

