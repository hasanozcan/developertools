import { MetadataRoute } from 'next';
import { categoryCatalog, toolCatalog } from '@/lib/api';
import { toolCollections } from '@/lib/toolCollections';
import { developerAudiences } from '@/lib/developerAudiences';
import { developerGuides } from '@/lib/developerGuides';
import {
  DEFAULT_LOCALE,
  LOCALIZED_PAGES,
  type Language,
  getHreflangAlternates,
  getToolHreflangAlternates,
  isNonDefaultLocale,
  isToolLocaleIndexable,
} from '@/lib/i18nRouting';
import { SITEMAP_IDS } from '@/lib/sitemapIds';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

// Note: lastModified/changeFrequency/priority are intentionally omitted. The
// catalog carries no per-entry modification date, so any value here would be
// fabricated, and Google ignores freshness hints that are not trustworthy.

// Static pages
const staticPages = LOCALIZED_PAGES;

// One child sitemap per locale, listed by the sitemap index at /sitemap.xml.
export async function generateSitemaps() {
  return SITEMAP_IDS.map((id) => ({ id }));
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  if (id === DEFAULT_LOCALE) return englishEntries();
  if (isNonDefaultLocale(id)) return localizedEntries(id);
  return [];
}

function englishEntries(): MetadataRoute.Sitemap {
  // English canonical entries
  const englishHome = {
    url: BASE_URL,
    alternates: {
      languages: getHreflangAlternates('/', BASE_URL),
    },
  };

  const englishCategories = categoryCatalog.map((category) => ({
    url: `${BASE_URL}/tools/${category.slug}`,
    alternates: {
      languages: getHreflangAlternates(`/tools/${category.slug}`, BASE_URL),
    },
  }));

  const englishTools = toolCatalog.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.categorySlug}/${tool.slug}`,
    alternates: {
      languages: getToolHreflangAlternates(tool.slug, tool.categorySlug, BASE_URL),
    },
  }));

  const staticUrls = staticPages.map((page) => ({
    url: `${BASE_URL}/${page}`,
    alternates: { languages: getHreflangAlternates(`/${page}`, BASE_URL) },
  }));

  const collectionUrls = [
    {
      url: `${BASE_URL}/collections`,
      alternates: { languages: getHreflangAlternates('/collections', BASE_URL) },
    },
    ...toolCollections.map((collection) => ({
      url: `${BASE_URL}/collections/${collection.slug}`,
      alternates: {
        languages: getHreflangAlternates(`/collections/${collection.slug}`, BASE_URL),
      },
    })),
  ];

  const audienceUrls = [
    {
      url: `${BASE_URL}/for`,
      alternates: { languages: getHreflangAlternates('/for', BASE_URL) },
    },
    ...developerAudiences.map((audience) => ({
      url: `${BASE_URL}/for/${audience.slug}`,
      alternates: {
        languages: getHreflangAlternates(`/for/${audience.slug}`, BASE_URL),
      },
    })),
  ];

  return [
    englishHome,
    ...englishCategories,
    ...englishTools,
    ...collectionUrls,
    ...audienceUrls,
    ...staticUrls,
    { url: `${BASE_URL}/guides` },
    ...developerGuides.map((guide) => ({ url: `${BASE_URL}/guides/${guide.slug}` })),
  ];
}

function localizedEntries(locale: Language): MetadataRoute.Sitemap {
  const home = {
    url: `${BASE_URL}/${locale}`,
    alternates: {
      languages: getHreflangAlternates('/', BASE_URL),
    },
  };

  const categories = categoryCatalog.map((category) => ({
    url: `${BASE_URL}/${locale}/tools/${category.slug}`,
    alternates: {
      languages: getHreflangAlternates(`/tools/${category.slug}`, BASE_URL),
    },
  }));

  // Untranslated locale×tool pages are noindex (canonical → English), so
  // they are left out of the sitemap and out of every hreflang cluster.
  const tools = toolCatalog
    .filter((tool) => isToolLocaleIndexable(tool.slug, locale))
    .map((tool) => ({
      url: `${BASE_URL}/${locale}/tools/${tool.categorySlug}/${tool.slug}`,
      alternates: {
        languages: getToolHreflangAlternates(tool.slug, tool.categorySlug, BASE_URL),
      },
    }));

  const pages = staticPages.map((page) => ({
    url: `${BASE_URL}/${locale}/${page}`,
    alternates: { languages: getHreflangAlternates(`/${page}`, BASE_URL) },
  }));
  const collections = [
    {
      url: `${BASE_URL}/${locale}/collections`,
      alternates: { languages: getHreflangAlternates('/collections', BASE_URL) },
    },
    ...toolCollections.map((collection) => ({
      url: `${BASE_URL}/${locale}/collections/${collection.slug}`,
      alternates: { languages: getHreflangAlternates(`/collections/${collection.slug}`, BASE_URL) },
    })),
  ];
  const audiences = [
    {
      url: `${BASE_URL}/${locale}/for`,
      alternates: { languages: getHreflangAlternates('/for', BASE_URL) },
    },
    ...developerAudiences.map((audience) => ({
      url: `${BASE_URL}/${locale}/for/${audience.slug}`,
      alternates: { languages: getHreflangAlternates(`/for/${audience.slug}`, BASE_URL) },
    })),
  ];
  return [home, ...categories, ...tools, ...pages, ...collections, ...audiences];
}
