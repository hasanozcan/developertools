import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
const pageUrl = `${siteUrl}/terms`;
const ogImageUrl = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the DevsTools terms of service for using our free online developer tools.',
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
    title: 'Terms of Service',
    description: 'Review the DevsTools terms of service for using our free online developer tools.',
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
    title: 'Terms of Service',
    description: 'Review the DevsTools terms of service for using our free online developer tools.',
    images: [ogImageUrl],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
