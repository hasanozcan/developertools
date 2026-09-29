import type { Metadata } from 'next';
import { CollectionDetailContent } from '@/components/seo/CollectionPages';
import { notFound } from 'next/navigation';
import { getToolCollection, toolCollections } from '@/lib/toolCollections';
import { getHreflangAlternates } from '@/lib/i18nRouting';

export function generateStaticParams() {
  return toolCollections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getToolCollection(slug);
  if (!collection) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  return {
    title: collection.title,
    description: collection.description,
    alternates: {
      canonical: `${siteUrl}/collections/${collection.slug}`,
      languages: getHreflangAlternates(`/collections/${collection.slug}`, siteUrl),
    },
    openGraph: {
      title: collection.title,
      description: collection.description,
      type: 'website',
      locale: 'en_US',
      url: `${siteUrl}/collections/${collection.slug}`,
      siteName: 'DevsTools',
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: collection.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: collection.title,
      description: collection.description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getToolCollection(slug);
  if (!collection) notFound();
  return <CollectionDetailContent locale="en" collection={collection} />;
}
