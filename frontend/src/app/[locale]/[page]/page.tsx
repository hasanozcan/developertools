import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutPage from '@/app/about/page';
import PrivacyPage from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';
import ContactPage from '@/app/contact/page';
import { translations } from '@/translations';
import {
  getHreflangAlternates,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
  isNonDefaultLocale,
  LOCALIZED_PAGES,
  NON_DEFAULT_LOCALES,
  type Language,
} from '@/lib/i18nRouting';

const pages = { about: AboutPage, privacy: PrivacyPage, terms: TermsPage, contact: ContactPage };
type Props = { params: Promise<{ locale: string; page: string }> };

const fallbackDescriptions: Record<string, string> = {
  about:
    'Learn about DevsTools and the free online developer tools available for JSON, Base64, UUID, and more.',
  privacy:
    'Read the DevsTools privacy policy and learn how data is handled in our client-side tools.',
  terms: 'Review the DevsTools terms of service for using our free online developer tools.',
  contact: 'Contact the DevsTools team with feedback, bug reports, or feature requests.',
};

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.flatMap((locale) => LOCALIZED_PAGES.map((page) => ({ locale, page })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await params;
  if (!isNonDefaultLocale(locale) || !LOCALIZED_PAGES.some((slug) => slug === page)) notFound();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const pageTitle = `${translations[locale][`${page}.title`] || page}`;
  const title = `${pageTitle} – DevsTools`;
  const description =
    translations[locale][`${page}.subtitle`] || fallbackDescriptions[page] || pageTitle;
  const canonicalUrl = `${siteUrl}/${locale}/${page}`;
  const ogImageUrl = `${siteUrl}/og-image.png`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getHreflangAlternates(`/${page}`, siteUrl),
    },
    openGraph: {
      title,
      description,
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
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function LocalizedInfoPage({ params }: Props) {
  const { locale, page } = await params;
  if (!isNonDefaultLocale(locale) || !LOCALIZED_PAGES.some((slug) => slug === page)) notFound();
  const Page = pages[page as keyof typeof pages];
  return <Page />;
}
