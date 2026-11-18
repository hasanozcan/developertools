import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuideDetailContent } from '@/components/seo/GuidePages';
import { developerGuides, getLocalizedGuide } from '@/lib/developerGuides';
import {
  NON_DEFAULT_LOCALES,
  getHreflangAlternates,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
  isNonDefaultLocale,
  type Language,
} from '@/lib/i18nRouting';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.flatMap((locale) =>
    developerGuides.map((guide) => ({ locale, slug: guide.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isNonDefaultLocale(locale)) return { title: 'Not Found' };
  const guide = developerGuides.find((item) => item.slug === slug);
  if (!guide) notFound();

  const localized = getLocalizedGuide(guide, locale as Language);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app').replace(/\/$/, '');
  const url = `${siteUrl}/${locale}/guides/${localized.slug}`;

  return {
    title: localized.title,
    description: localized.description,
    alternates: {
      canonical: url,
      languages: getHreflangAlternates(`/guides/${localized.slug}`, siteUrl),
    },
    openGraph: {
      title: localized.title,
      description: localized.description,
      type: 'article',
      url,
      locale: getOpenGraphLocale(locale as Language),
      alternateLocale: getOpenGraphAlternateLocales(locale as Language),
      siteName: 'DevsTools',
      images: [`${siteUrl}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title: localized.title,
      description: localized.description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

export default async function LocalizedGuidePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isNonDefaultLocale(locale)) notFound();
  const guide = developerGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return <GuideDetailContent guide={guide} locale={locale} />;
}
