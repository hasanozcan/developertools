import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudienceDetailContent } from '@/components/seo/AudiencePages';
import { developerAudiences, getDeveloperAudience, getLocalizedAudience } from '@/lib/developerAudiences';
import { NON_DEFAULT_LOCALES, getHreflangAlternates, isNonDefaultLocale } from '@/lib/i18nRouting';

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.flatMap((locale) => developerAudiences.map((audience) => ({ locale, audience: audience.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; audience: string }> }): Promise<Metadata> {
  const { locale, audience: slug } = await params;
  if (!isNonDefaultLocale(locale)) return { title: 'Not Found' };
  const audience = getDeveloperAudience(slug);
  if (!audience) return { title: 'Not Found' };
  const localized = getLocalizedAudience(audience, locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  return {
    title: localized.title,
    description: localized.description,
    alternates: { canonical: `${siteUrl}/${locale}/for/${slug}`, languages: getHreflangAlternates(`/for/${slug}`, siteUrl) },
    openGraph: { title: localized.title, description: localized.description, type: 'website' },
  };
}

export default async function LocalizedAudiencePage({ params }: { params: Promise<{ locale: string; audience: string }> }) {
  const { locale, audience: slug } = await params;
  if (!isNonDefaultLocale(locale)) notFound();
  const audience = getDeveloperAudience(slug);
  if (!audience) notFound();
  return <AudienceDetailContent locale={locale} audience={audience} />;
}
