import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CollectionDetailContent } from '@/components/seo/CollectionPages';
import {
  NON_DEFAULT_LOCALES,
  getHreflangAlternates,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
  isNonDefaultLocale,
  type Language,
} from '@/lib/i18nRouting';
import {
  getLocalizedCollection,
  getToolCollection,
  toolCollections,
} from '@/lib/toolCollections';

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.flatMap((locale) =>
    toolCollections.map((collection) => ({ locale, slug: collection.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isNonDefaultLocale(locale)) return { title: 'Not Found' };
  const collection = getToolCollection(slug);
  if (!collection) return { title: 'Not Found' };
  const localized = getLocalizedCollection(collection, locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const canonicalUrl = `${siteUrl}/${locale}/collections/${slug}`;
  return {
    title: localized.title,
    description: localized.description,
    alternates: {
      canonical: canonicalUrl,
      languages: getHreflangAlternates(`/collections/${slug}`, siteUrl),
    },
    openGraph: {
      title: localized.title,
      description: localized.description,
      type: 'website',
      locale: getOpenGraphLocale(locale as Language),
      alternateLocale: getOpenGraphAlternateLocales(locale as Language),
      url: canonicalUrl,
      siteName: 'DevsTools',
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: localized.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localized.title,
      description: localized.description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export default async function LocalizedCollectionPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isNonDefaultLocale(locale)) notFound();
  const collection = getToolCollection(slug);
  if (!collection) notFound();
  return <CollectionDetailContent locale={locale} collection={collection} />;
}
