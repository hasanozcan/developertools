import type { Metadata } from 'next';
import { getHreflangAlternates } from '@/lib/i18nRouting';
import { RootDocument, rootMetadata } from '../_shell/RootDocument';
import EnDictionary from '@/translations/client/en';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
const pageUrl = `${siteUrl}/contact`;
const ogImageUrl = `${siteUrl}/og-image.png`;

const pageMetadata: Metadata = {
  title: 'Contact',
  description: 'Contact the DevsTools team with feedback, bug reports, or feature requests.',
  keywords: ['contact devstools', 'feedback', 'bug report', 'feature request', 'support', 'developer tools'],
    alternates: {
      canonical: pageUrl,
      languages: getHreflangAlternates('/contact', siteUrl),
    },
  openGraph: {
    title: 'Contact DevsTools',
    description: 'Contact the DevsTools team with feedback, bug reports, or feature requests.',
    url: pageUrl,
    siteName: 'DevsTools',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'DevsTools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact DevsTools',
    description: 'Contact the DevsTools team with feedback, bug reports, or feature requests.',
    images: [ogImageUrl],
  },
};

// Root layout for /contact. It sits outside app/(default) so its opengraph-image keeps the
// plain /contact/opengraph-image URL (Next.js hash-suffixes metadata image routes inside
// route groups). As a root layout it merges the site-wide defaults itself; the title is
// absolute because a root layout's own title is not run through its template.
export const metadata: Metadata = {
  ...rootMetadata,
  ...pageMetadata,
  title: { absolute: 'Contact | DevsTools' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument lang="en" Dictionary={EnDictionary}>{children}</RootDocument>;
}
