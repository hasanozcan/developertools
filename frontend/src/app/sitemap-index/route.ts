import { SITEMAP_IDS } from '@/lib/sitemapIds';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

export const dynamic = 'force-static';

export function GET() {
  const children = SITEMAP_IDS.map(
    (id) => `  <sitemap><loc>${BASE_URL}/sitemap/${id}.xml</loc></sitemap>`,
  );
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...children,
    '</sitemapindex>',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
