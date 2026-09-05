import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutPage from '@/app/about/page';
import PrivacyPage from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';
import ContactPage from '@/app/contact/page';
import { translations } from '@/translations';
import {
  getHreflangAlternates,
  isNonDefaultLocale,
  LOCALIZED_PAGES,
  NON_DEFAULT_LOCALES,
} from '@/lib/i18nRouting';

const pages = { about: AboutPage, privacy: PrivacyPage, terms: TermsPage, contact: ContactPage };
type Props = { params: Promise<{ locale: string; page: string }> };

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.flatMap((locale) => LOCALIZED_PAGES.map((page) => ({ locale, page })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await params;
  if (!isNonDefaultLocale(locale) || !LOCALIZED_PAGES.some((slug) => slug === page)) notFound();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  return {
    title: `${translations[locale][`${page}.title`] || page} – DevsTools`,
    alternates: {
      canonical: `${siteUrl}/${locale}/${page}`,
      languages: getHreflangAlternates(`/${page}`, siteUrl),
    },
  };
}

export default async function LocalizedInfoPage({ params }: Props) {
  const { locale, page } = await params;
  if (!isNonDefaultLocale(locale) || !LOCALIZED_PAGES.some((slug) => slug === page)) notFound();
  const Page = pages[page as keyof typeof pages];
  return <Page />;
}
