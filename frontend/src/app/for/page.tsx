import type { Metadata } from 'next';
import { AudienceIndexContent } from '@/components/seo/AudiencePages';
import { getHreflangAlternates } from '@/lib/i18nRouting';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

export const metadata: Metadata = {
  title: 'Developer Tools by Role',
  description: 'Role-focused developer toolboxes for API, frontend, backend, DevOps, security, data, AI, mobile, database, and QA work.',
  alternates: { canonical: `${siteUrl}/for`, languages: getHreflangAlternates('/for', siteUrl) },
  openGraph: {
    title: 'Developer Tools by Role',
    description: 'Role-focused developer toolboxes for API, frontend, backend, DevOps, security, data, AI, mobile, database, and QA work.',
    type: 'website',
    locale: 'en_US',
    url: `${siteUrl}/for`,
    siteName: 'DevsTools',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'DevsTools - Developer Tools by Role',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Tools by Role',
    description: 'Role-focused developer toolboxes for API, frontend, backend, DevOps, security, data, AI, mobile, database, and QA work.',
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function AudienceIndexPage() {
  return <AudienceIndexContent locale="en" />;
}
