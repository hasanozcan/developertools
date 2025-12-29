import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
const pageUrl = `${siteUrl}/contact`;
const ogImageUrl = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact the DevsTools team with feedback, bug reports, or feature requests.',
  keywords: ['contact devstools', 'feedback', 'bug report', 'feature request', 'support', 'developer tools'],
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      tr: `${pageUrl}?lang=tr`,
      de: `${pageUrl}?lang=de`,
      es: `${pageUrl}?lang=es`,
      fr: `${pageUrl}?lang=fr`,
      ru: `${pageUrl}?lang=ru`,
      zh: `${pageUrl}?lang=zh`,
    },
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
