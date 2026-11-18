import type { Metadata } from 'next';
import { GuidesIndexContent } from '@/components/seo/GuidePages';
import { getGuidesUiCopy } from '@/lib/developerGuides';
import { getHreflangAlternates, getOpenGraphAlternateLocales } from '@/lib/i18nRouting';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app').replace(/\/$/, '');
const ui = getGuidesUiCopy('en');

export const metadata: Metadata = {
  title: { absolute: `${ui.indexMetaTitle} | DevsTools` },
  description: ui.indexMetaDescription,
  alternates: {
    canonical: `${siteUrl}/guides`,
    languages: getHreflangAlternates('/guides', siteUrl),
  },
  openGraph: {
    title: ui.indexMetaTitle,
    description: ui.indexMetaDescription,
    type: 'website',
    locale: 'en_US',
    alternateLocale: getOpenGraphAlternateLocales('en'),
    url: `${siteUrl}/guides`,
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

export default function GuidesPage() {
  return <GuidesIndexContent locale="en" />;
}
