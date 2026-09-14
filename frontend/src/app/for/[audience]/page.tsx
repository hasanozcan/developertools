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
    openGraph: { title: audience.title, description: audience.description, type: 'website' },
  };
}

export default async function AudiencePage({ params }: { params: Promise<{ audience: string }> }) {
  const { audience: slug } = await params;
  const audience = getDeveloperAudience(slug);
  if (!audience) notFound();
  return <AudienceDetailContent locale="en" audience={audience} />;
}
