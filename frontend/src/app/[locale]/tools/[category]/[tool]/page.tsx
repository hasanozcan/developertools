import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ToolPage from '@/app/(default)/tools/[category]/[tool]/page';
import { toolCatalog, findCatalogTool } from '@/lib/api';
import { getCanonicalToolCategory } from '@/lib/toolRoutes';
import {
  NON_DEFAULT_LOCALES,
  isNonDefaultLocale,
  getLocalizedToolMeta,
  getToolHreflangAlternates,
  isToolLocaleIndexable,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
  type Language,
} from '@/lib/i18nRouting';
import { translations } from '@/translations';
import { buildLocalizedToolTitle } from '@/lib/toolTitle';

interface LocalizedToolPageProps {
  params: Promise<{ locale: string; category: string; tool: string }>;
}

export async function generateStaticParams() {
  return NON_DEFAULT_LOCALES.flatMap((locale) =>
    toolCatalog.map((tool) => ({
      locale,
      category: tool.categorySlug,
      tool: tool.slug,
    })),
  );
}

export async function generateMetadata({ params }: LocalizedToolPageProps): Promise<Metadata> {
  const { locale, category, tool: toolSlug } = await params;
  if (!isNonDefaultLocale(locale)) {
    return { title: 'Not Found' };
  }

  const catalogTool = findCatalogTool(toolSlug);
  if (!catalogTool) {
    return { title: 'Tool Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const canonicalCategory = getCanonicalToolCategory(toolSlug, category);
  const englishUrl = `${siteUrl}/tools/${canonicalCategory}/${toolSlug}`;
  // Locale pages without a real translation would be near-duplicates of the
  // English page: keep them reachable, but noindex them and point the canonical
  // at the English URL. They also drop out of hreflang and the sitemap.
  const indexable = isToolLocaleIndexable(toolSlug, locale as Language);
  const canonicalUrl = indexable
    ? `${siteUrl}/${locale}/tools/${canonicalCategory}/${toolSlug}`
    : englishUrl;
  const localizedMeta = getLocalizedToolMeta(
    toolSlug,
    locale as Language,
    catalogTool.name,
    catalogTool.shortDescription || catalogTool.name,
  );

  // Absolute title, always <= 60 chars (see src/lib/toolTitle.ts).
  const metaTitle = buildLocalizedToolTitle(
    localizedMeta.name,
    translations[locale as Language]['meta.freeOnlineTool'] || 'Free Online Tool',
  );
  const ogImageUrl = `${siteUrl}/tools/${canonicalCategory}/${toolSlug}/opengraph-image`;

  return {
    title: { absolute: metaTitle },
    description: localizedMeta.description,
    alternates: indexable
      ? {
          canonical: canonicalUrl,
          languages: getToolHreflangAlternates(toolSlug, canonicalCategory, siteUrl),
        }
      : { canonical: canonicalUrl },
    ...(indexable
      ? {}
      : {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }),
    openGraph: {
      title: metaTitle,
      description: localizedMeta.description,
      type: 'website',
      locale: getOpenGraphLocale(locale as Language),
      alternateLocale: getOpenGraphAlternateLocales(locale as Language),
      url: canonicalUrl,
      siteName: 'DevsTools',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: localizedMeta.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: localizedMeta.description,
      images: [ogImageUrl],
    },
  };
}

export default async function LocalizedToolPageRoute({ params }: LocalizedToolPageProps) {
  const resolvedParams = await params;
  if (!isNonDefaultLocale(resolvedParams.locale)) {
    notFound();
  }
  const canonicalCategory = getCanonicalToolCategory(resolvedParams.tool, resolvedParams.category);
  if (canonicalCategory !== resolvedParams.category) {
    permanentRedirect(`/${resolvedParams.locale}/tools/${canonicalCategory}/${resolvedParams.tool}`);
  }

  return (
    <ToolPage
      locale={resolvedParams.locale as Language}
      params={Promise.resolve({
        category: resolvedParams.category,
        tool: resolvedParams.tool,
      })}
    />
  );
}
