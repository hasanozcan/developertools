import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuideDetailContent } from '@/components/seo/GuidePages';
import { developerGuides } from '@/lib/developerGuides';
import { getHreflangAlternates, getOpenGraphAlternateLocales } from '@/lib/i18nRouting';

type Props = { params: Promise<{ slug: string }> };
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app').replace(/\/$/, '');

export function generateStaticParams() {
  return developerGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = developerGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const url = `${siteUrl}/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: url,
      languages: getHreflangAlternates(`/guides/${guide.slug}`, siteUrl),
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url,
      locale: 'en_US',
      alternateLocale: getOpenGraphAlternateLocales('en'),
      siteName: 'DevsTools',
      images: [`${siteUrl}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = developerGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return <GuideDetailContent guide={guide} locale="en" />;
}
