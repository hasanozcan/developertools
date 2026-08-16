import { MetadataRoute } from 'next';
import { categoryCatalog, toolCatalog } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

// Static pages
const staticPages = ['about', 'privacy', 'terms', 'contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = toolCatalog.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.categorySlug}/${tool.slug}`,
  }));

  const categoryUrls = categoryCatalog.map((category) => ({
    url: `${BASE_URL}/tools/${category.slug}`,
  }));

  const staticUrls = staticPages.map((page) => ({
    url: `${BASE_URL}/${page}`,
  }));

  return [
    {
      url: BASE_URL,
    },
    ...categoryUrls,
    ...toolUrls,
    ...staticUrls,
  ];
}
