import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudienceIndexContent, getAudienceIndexCopy } from '@/components/seo/AudiencePages';
import { NON_DEFAULT_LOCALES, getHreflangAlternates, getOpenGraphAlternateLocales, getOpenGraphLocale, isNonDefaultLocale, type Language } from '@/lib/i18nRouting';

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) return { title: 'Not Found' };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const localizedCopy = getAudienceIndexCopy(locale);
  const canonicalUrl = `${siteUrl}/${locale}/for`;
  return {
    title: localizedCopy.title,
    description: localizedCopy.description,
    alternates: { canonical: canonicalUrl, languages: getHreflangAlternates('/for', siteUrl) },
    openGraph: {
      title: localizedCopy.title,
      description: localizedCopy.description,
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
          alt: localizedCopy.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedCopy.title,
      description: localizedCopy.description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export default async function LocalizedAudienceIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) notFound();
  return <AudienceIndexContent locale={locale} />;
}
