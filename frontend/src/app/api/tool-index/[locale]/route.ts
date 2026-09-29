import { SUPPORTED_LOCALES, isValidLocale } from '@/lib/localeRouting';
import { getToolIndex } from '@/lib/toolText';

// Static, per-locale [slug, name, description] list for the command palette / recent tools.
// Loaded lazily by src/lib/toolIndexClient.ts so tool names stay out of the initial JS.
export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    return new Response('Not found', { status: 404 });
  }

  return Response.json(getToolIndex(locale), {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
