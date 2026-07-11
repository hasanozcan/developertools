import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
const pageUrl = `${siteUrl}/privacy`;
const ogImageUrl = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the DevsTools privacy policy and learn how data is handled in our client-side tools.',
  keywords: ['privacy policy', 'data privacy', 'client-side processing', 'gdpr', 'user data', 'developer tools privacy'],
    alternates: {
      canonical: pageUrl,
    },
  openGraph: {
    title: 'Privacy Policy',
    description: 'Read the DevsTools privacy policy and learn how data is handled in our client-side tools.',
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
    title: 'Privacy Policy',
    description: 'Read the DevsTools privacy policy and learn how data is handled in our client-side tools.',
    images: [ogImageUrl],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
