export const DEFAULT_ADSENSE_FOOTER_SLOT = '7781534087';
export const DEFAULT_ADSENSE_COLLECTION_INDEX_SLOT = '6442607030';
export const DEFAULT_ADSENSE_COLLECTION_TOP_SLOT = '6416143146';
export const DEFAULT_ADSENSE_COLLECTION_BOTTOM_SLOT = '2103906771';

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

