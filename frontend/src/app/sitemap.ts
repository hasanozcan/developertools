import { MetadataRoute } from 'next';
import { categoryCatalog, toolCatalog } from '@/lib/api';
import { toolCollections } from '@/lib/toolCollections';
import { developerAudiences } from '@/lib/developerAudiences';
import {
  LOCALIZED_PAGES,
  NON_DEFAULT_LOCALES,
  getHreflangAlternates,
} from '@/lib/i18nRouting';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

// Static pages
const staticPages = LOCALIZED_PAGES;

export default function sitemap(): MetadataRoute.Sitemap {
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
      languages: getHreflangAlternates(`/tools/${tool.categorySlug}/${tool.slug}`, BASE_URL),
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

  // Localized entries for non-default locales
  const localizedEntries: MetadataRoute.Sitemap = NON_DEFAULT_LOCALES.flatMap((locale) => {
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

    const tools = toolCatalog.map((tool) => ({
      url: `${BASE_URL}/${locale}/tools/${tool.categorySlug}/${tool.slug}`,
      alternates: {
        languages: getHreflangAlternates(`/tools/${tool.categorySlug}/${tool.slug}`, BASE_URL),
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
  });

  return [
    englishHome,
    ...englishCategories,
    ...englishTools,
    ...collectionUrls,
    ...audienceUrls,
    ...staticUrls,
    ...localizedEntries,
  ];
}
