import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://developertools.com';

// Tool definitions for sitemap
const tools = [
  { category: 'json', slug: 'json-formatter' },
  { category: 'encoding', slug: 'base64' },
  { category: 'encoding', slug: 'url-encoder' },
  { category: 'encoding', slug: 'jwt-decoder' },
  { category: 'generators', slug: 'uuid-generator' },
  { category: 'generators', slug: 'password-generator' },
  { category: 'crypto', slug: 'md5-hash' },
  { category: 'crypto', slug: 'sha256-hash' },
  { category: 'text', slug: 'regex-tester' },
  { category: 'converters', slug: 'timestamp-converter' },
];

const categories = ['json', 'encoding', 'generators', 'crypto', 'text', 'converters'];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.category}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${BASE_URL}/tools/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryUrls,
    ...toolUrls,
  ];
}
