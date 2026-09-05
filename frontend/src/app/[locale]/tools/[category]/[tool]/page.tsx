import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ToolPage from '@/app/tools/[category]/[tool]/page';
import { toolCatalog, findCatalogTool } from '@/lib/api';
import { getCanonicalToolCategory } from '@/lib/toolRoutes';
import {
  NON_DEFAULT_LOCALES,
  isNonDefaultLocale,
  getHreflangAlternates,
  getLocalizedToolMeta,
  type Language,
} from '@/lib/i18nRouting';

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
  const canonicalUrl = `${siteUrl}/${locale}/tools/${canonicalCategory}/${toolSlug}`;
  const localizedMeta = getLocalizedToolMeta(
    toolSlug,
    locale as Language,
    catalogTool.name,
    catalogTool.shortDescription || catalogTool.name,
  );

  const metaTitle = `${localizedMeta.name} – DevsTools`;
  const ogImageUrl = `${siteUrl}/tools/${canonicalCategory}/${toolSlug}/opengraph-image`;

  return {
    title: metaTitle,
    description: localizedMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: getHreflangAlternates(`/tools/${canonicalCategory}/${toolSlug}`, siteUrl),
    },
    openGraph: {
      title: metaTitle,
      description: localizedMeta.description,
      type: 'website',
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
      params={Promise.resolve({
        category: resolvedParams.category,
        tool: resolvedParams.tool,
      })}
    />
  );
}
