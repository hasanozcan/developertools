import { MetadataRoute } from 'next';
import { categoryCatalog, toolCatalog } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
// Update this only after a meaningful site-wide content or structured-data revision.
const CONTENT_LAST_MODIFIED = new Date('2026-07-13T00:00:00.000Z');

// Static pages
const staticPages = ['about', 'privacy', 'terms', 'contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = toolCatalog.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.categorySlug}/${tool.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryUrls = categoryCatalog.map((category) => ({
    url: `${BASE_URL}/tools/${category.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = staticPages.map((page) => ({
    url: `${BASE_URL}/${page}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryUrls,
    ...toolUrls,
    ...staticUrls,
  ];
}
