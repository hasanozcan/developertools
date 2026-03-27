export const canonicalToolCategories: Record<string, string> = {
  'json-csv': 'json',
  'yaml-json': 'json',
  'yaml-validator': 'json',
  'image-to-base64': 'encoding',
  'lorem-ipsum': 'generators',
  'slug-generator': 'generators',
  'qr-code': 'generators',
  'markdown-preview': 'text',
  'hash-generator': 'crypto',
  'sql-insert-generator': 'generators',
  'random-string-generator': 'generators',
  'js-beautifier': 'formatters',
  'html-validator': 'text',
  'regex-generator': 'text',
  'xpath-tester': 'text',
  'curl-generator': 'encoding',
  'jwt-generator': 'encoding',
  'cron-generator': 'utilities',
};

export function getCanonicalToolCategory(slug: string, category?: string): string {
  return canonicalToolCategories[slug] || category || '';
}

export function buildToolPath(category: string, slug: string): string {
  const canonicalCategory = getCanonicalToolCategory(slug, category);
  return `/tools/${canonicalCategory}/${slug}`;
}
