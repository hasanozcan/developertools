import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
const pageUrl = `${siteUrl}/about`;
const ogImageUrl = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about DevsTools and the free online developer tools available for JSON, Base64, UUID, and more.',
  keywords: ['about devstools', 'developer tools', 'online tools', 'free tools', 'json formatter', 'base64 encoder', 'uuid generator', 'web development tools'],
    alternates: {
      canonical: pageUrl,
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
