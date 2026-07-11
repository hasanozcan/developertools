import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

/**
 * Serves self-hosted promotional images through a clean URL path
 * so that content-filtering browser extensions cannot match them
 * against common ad-URL patterns (e.g. /ads/, /ad-banner).
 *
 * Route:  GET /api/content/[id]
 * Maps:
 *   banner-1   → /public/ads/ad-banner-1.png
 *   vertical-1 → /public/ads/ad-vertical-1.png
 *   square-1   → /public/ads/ad-square-1.png
 */

const ALLOWED_IDS = new Set([
  ...Array.from({ length: 15 }, (_, i) => `banner-${i + 1}`),
  ...Array.from({ length: 2 }, (_, i) => `vertical-${i + 1}`),
  ...Array.from({ length: 2 }, (_, i) => `square-${i + 1}`),
]);

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!ALLOWED_IDS.has(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Map clean id → actual filename
  const filename = `ad-${id}.png`;
  const filePath = path.join(process.cwd(), 'public', 'ads', filename);

  try {
    const buffer = await readFile(filePath);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
