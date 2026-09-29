import type { Metadata } from 'next';
import { CollectionIndexContent } from '@/components/seo/CollectionPages';
import { getHreflangAlternates } from '@/lib/i18nRouting';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

export const metadata: Metadata = {
  title: 'Developer Tool Collections',
  description:
    'Browse curated developer tool collections for API debugging, JSON, authentication, Docker and Kubernetes, AI and LLM development, and databases.',
  alternates: {
    canonical: `${siteUrl}/collections`,
    languages: getHreflangAlternates('/collections', siteUrl),
  },
  openGraph: {
    title: 'Developer Tool Collections',
    description:
      'Browse curated developer tool collections for API debugging, JSON, authentication, Docker and Kubernetes, AI and LLM development, and databases.',
    type: 'website',
    locale: 'en_US',
    url: `${siteUrl}/collections`,
    siteName: 'DevsTools',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'DevsTools - Developer Tool Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Tool Collections',
    description:
      'Browse curated developer tool collections for API debugging, JSON, authentication, Docker and Kubernetes, AI and LLM development, and databases.',
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function CollectionsPage() {
  return <CollectionIndexContent locale="en" />;
}
