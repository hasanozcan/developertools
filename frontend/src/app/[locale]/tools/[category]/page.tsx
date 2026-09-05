import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPage from '@/app/tools/[category]/page';
import { categoryCatalog } from '@/lib/api';
import {
  NON_DEFAULT_LOCALES,
  isNonDefaultLocale,
  getHreflangAlternates,
  type Language,
} from '@/lib/i18nRouting';
import { translations } from '@/translations';

interface LocalizedCategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateStaticParams() {
  return NON_DEFAULT_LOCALES.flatMap((locale) =>
    categoryCatalog.map((category) => ({
      locale,
      category: category.slug,
    })),
  );
}

export async function generateMetadata({ params }: LocalizedCategoryPageProps): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  if (!isNonDefaultLocale(locale)) {
    return { title: 'Not Found' };
  }

  const category = categoryCatalog.find((c) => c.slug === categorySlug);
  if (!category) {
    return { title: 'Category Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const canonicalUrl = `${siteUrl}/${locale}/tools/${categorySlug}`;
  const translatedName = translations[locale as Language]?.[`cat.${categorySlug}`] || category.name;
  const pageTitle = `${translatedName} – DevsTools`;
  const description = category.description || `${translatedName} developer tools and utilities.`;
  const ogImageUrl = `${siteUrl}/tools/${categorySlug}/opengraph-image`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getHreflangAlternates(`/tools/${categorySlug}`, siteUrl),
    },
    openGraph: {
      title: pageTitle,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'DevsTools',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${translatedName} - DevsTools`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function LocalizedCategoryPageRoute({ params }: LocalizedCategoryPageProps) {
  const resolvedParams = await params;
  if (!isNonDefaultLocale(resolvedParams.locale)) {
    notFound();
  }

  return <CategoryPage params={Promise.resolve({ category: resolvedParams.category })} />;
}
