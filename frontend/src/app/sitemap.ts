import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

// Tool definitions for sitemap - ALL tools must be listed here
const tools = [
  // JSON Tools
  { category: 'json', slug: 'json-formatter' },
  { category: 'json', slug: 'json-validator' },
  { category: 'json', slug: 'json-csv' },
  { category: 'json', slug: 'json-to-typescript' },
  { category: 'json', slug: 'yaml-json' },
  // Encoding Tools
  { category: 'encoding', slug: 'base64' },
  { category: 'encoding', slug: 'url-encoder' },
  { category: 'encoding', slug: 'jwt-decoder' },
  { category: 'encoding', slug: 'html-entity' },
  { category: 'encoding', slug: 'image-to-base64' },
  { category: 'encoding', slug: 'hex-encoder' },
  { category: 'encoding', slug: 'binary-encoder' },
  // Generator Tools
  { category: 'generators', slug: 'uuid-generator' },
  { category: 'generators', slug: 'password-generator' },
  { category: 'generators', slug: 'lorem-ipsum' },
  { category: 'generators', slug: 'qr-code' },
  { category: 'generators', slug: 'slug-generator' },
  { category: 'generators', slug: 'css-gradient' },
  { category: 'generators', slug: 'meta-tags' },
  // Crypto Tools
  { category: 'crypto', slug: 'md5-hash' },
  { category: 'crypto', slug: 'sha256-hash' },
  { category: 'crypto', slug: 'sha512-hash' },
  // Text Tools
  { category: 'text', slug: 'regex-tester' },
  { category: 'text', slug: 'text-diff' },
  { category: 'text', slug: 'markdown-preview' },
  { category: 'text', slug: 'case-converter' },
  { category: 'text', slug: 'word-counter' },
  { category: 'text', slug: 'remove-duplicates' },
  { category: 'text', slug: 'sort-lines' },
  // Converter Tools
  { category: 'converters', slug: 'timestamp-converter' },
  { category: 'converters', slug: 'color-converter' },
  { category: 'converters', slug: 'roman-numeral-converter' },
  { category: 'converters', slug: 'number-base-converter' },
  // Formatter Tools
  { category: 'formatters', slug: 'sql-formatter' },
  { category: 'formatters', slug: 'css-minifier' },
  { category: 'formatters', slug: 'js-minifier' },
  { category: 'formatters', slug: 'html-formatter' },
  { category: 'formatters', slug: 'html-minifier' },
  { category: 'formatters', slug: 'xml-formatter' },
  // Utility Tools
  { category: 'utilities', slug: 'cron-parser' },
];

const categories = ['json', 'encoding', 'generators', 'crypto', 'text', 'converters', 'formatters', 'utilities'];

// Static pages
const staticPages = ['about', 'privacy', 'terms', 'contact'];

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

  const staticUrls = staticPages.map((page) => ({
    url: `${BASE_URL}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
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
    ...staticUrls,
  ];
}
