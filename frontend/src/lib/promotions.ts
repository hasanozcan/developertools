/**
 * Self-hosted promotion data.
 * These are served from the same domain, so content-filtering extensions
 * cannot distinguish them from regular application content.
 *
 * Three layout variants are supported:
 *   – horizontal  → wide banners (728 × 90-ish)
 *   – vertical    → sidebar towers (160 × 600-ish)
 *   – rectangle   → medium rectangles (300 × 250-ish)
 */

export interface Promotion {
    id: string;
    /** URL visitors are sent to when they click */
    href: string;
    /** Image served through /api/content/[id] to avoid filter-list URL rules */
    imageId: string;
    /** Alt text for accessibility */
    alt: string;
    /** Layout variant */
    layout: 'horizontal' | 'vertical' | 'rectangle';
}

// ── Horizontal banners ──────────────────────────────────────────────
const horizontalPromotions: Promotion[] = Array.from({ length: 15 }, (_, i) => ({
    id: `h${i + 1}`,
    href: '/contact',
    imageId: `banner-${i + 1}`,
    alt: 'Sponsored content',
    layout: 'horizontal' as const,
}));

// ── Vertical towers ─────────────────────────────────────────────────
const verticalPromotions: Promotion[] = Array.from({ length: 2 }, (_, i) => ({
    id: `v${i + 1}`,
    href: '/contact',
    imageId: `vertical-${i + 1}`,
    alt: 'Sponsored content',
    layout: 'vertical' as const,
}));

// ── Rectangle / square ──────────────────────────────────────────────
const rectanglePromotions: Promotion[] = Array.from({ length: 2 }, (_, i) => ({
    id: `r${i + 1}`,
    href: '/contact',
    imageId: `square-${i + 1}`,
    alt: 'Sponsored content',
    layout: 'rectangle' as const,
}));

const allPromotions: Promotion[] = [
    ...horizontalPromotions,
    ...verticalPromotions,
    ...rectanglePromotions,
];

/**
 * Pick a random promotion for the requested layout.
 * Falls back to any available promotion if no match.
 */
export function getRandomPromotion(layout: 'horizontal' | 'vertical' | 'rectangle'): Promotion {
    const pool = allPromotions.filter((p) => p.layout === layout);
    const source = pool.length > 0 ? pool : allPromotions;
    return source[Math.floor(Math.random() * source.length)];
}
