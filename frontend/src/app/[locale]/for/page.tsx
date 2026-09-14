import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudienceIndexContent, getAudienceIndexCopy } from '@/components/seo/AudiencePages';
import { NON_DEFAULT_LOCALES, getHreflangAlternates, isNonDefaultLocale } from '@/lib/i18nRouting';

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) return { title: 'Not Found' };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const localizedCopy = getAudienceIndexCopy(locale);
  return {
    title: localizedCopy.title,
    description: localizedCopy.description,
    alternates: { canonical: `${siteUrl}/${locale}/for`, languages: getHreflangAlternates('/for', siteUrl) },
  };
}

export default async function LocalizedAudienceIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) notFound();
  return <AudienceIndexContent locale={locale} />;
}
