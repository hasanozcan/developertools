import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuidesIndexContent } from '@/components/seo/GuidePages';
import { getGuidesUiCopy } from '@/lib/developerGuides';
import {
  NON_DEFAULT_LOCALES,
  getHreflangAlternates,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
  isNonDefaultLocale,
  type Language,
} from '@/lib/i18nRouting';

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) return { title: 'Not Found' };

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app').replace(/\/$/, '');
  const ui = getGuidesUiCopy(locale as Language);
  const canonicalUrl = `${siteUrl}/${locale}/guides`;

  return {
    title: { absolute: `${ui.indexMetaTitle} | DevsTools` },
    description: ui.indexMetaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: getHreflangAlternates('/guides', siteUrl),
    },
    openGraph: {
      title: ui.indexMetaTitle,
      description: ui.indexMetaDescription,
      type: 'website',
      locale: getOpenGraphLocale(locale as Language),
      alternateLocale: getOpenGraphAlternateLocales(locale as Language),
      url: canonicalUrl,
      siteName: 'DevsTools',
      images: [`${siteUrl}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title: ui.indexMetaTitle,
      description: ui.indexMetaDescription,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

export default async function LocalizedGuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) notFound();
  return <GuidesIndexContent locale={locale} />;
}
