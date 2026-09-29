import type { Metadata } from 'next';
import { getHreflangAlternates } from '@/lib/i18nRouting';
import { RootDocument, rootMetadata } from '../_shell/RootDocument';
import EnDictionary from '@/translations/client/en';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
const pageUrl = `${siteUrl}/about`;
const ogImageUrl = `${siteUrl}/og-image.png`;

const pageMetadata: Metadata = {
  title: 'About',
  description: 'Learn about DevsTools and the free online developer tools available for JSON, Base64, UUID, and more.',
  keywords: ['about devstools', 'developer tools', 'online tools', 'free tools', 'json formatter', 'base64 encoder', 'uuid generator', 'web development tools'],
    alternates: {
      canonical: pageUrl,
      languages: getHreflangAlternates('/about', siteUrl),
    },
  openGraph: {
    title: 'About DevsTools',
    description: 'Learn about DevsTools and the free online developer tools available for JSON, Base64, UUID, and more.',
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
    title: 'About DevsTools',
    description: 'Learn about DevsTools and the free online developer tools available for JSON, Base64, UUID, and more.',
    images: [ogImageUrl],
  },
};

// Root layout for /about. It sits outside app/(default) so its opengraph-image keeps the
// plain /about/opengraph-image URL (Next.js hash-suffixes metadata image routes inside
// route groups). As a root layout it merges the site-wide defaults itself; the title is
// absolute because a root layout's own title is not run through its template.
export const metadata: Metadata = {
  ...rootMetadata,
  ...pageMetadata,
  title: { absolute: 'About | DevsTools' },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument lang="en" Dictionary={EnDictionary}>{children}</RootDocument>;
}
