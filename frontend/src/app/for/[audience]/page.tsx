import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudienceDetailContent } from '@/components/seo/AudiencePages';
import { developerAudiences, getDeveloperAudience } from '@/lib/developerAudiences';
import { getHreflangAlternates } from '@/lib/i18nRouting';

export function generateStaticParams() {
  return developerAudiences.map((audience) => ({ audience: audience.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const { audience: slug } = await params;
  const audience = getDeveloperAudience(slug);
  if (!audience) return { title: 'Not Found' };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  return {
    title: audience.title,
    description: audience.description,
    alternates: { canonical: `${siteUrl}/for/${slug}`, languages: getHreflangAlternates(`/for/${slug}`, siteUrl) },
    openGraph: {
      title: audience.title,
      description: audience.description,
      type: 'website',
      locale: 'en_US',
      url: `${siteUrl}/for/${slug}`,
      siteName: 'DevsTools',
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: audience.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: audience.title,
      description: audience.description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export default async function AudiencePage({ params }: { params: Promise<{ audience: string }> }) {
  const { audience: slug } = await params;
  const audience = getDeveloperAudience(slug);
  if (!audience) notFound();
  return <AudienceDetailContent locale="en" audience={audience} />;
}
