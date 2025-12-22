export const canonicalToolCategories: Record<string, string> = {
  'json-csv': 'json',
  'yaml-json': 'json',
  'image-to-base64': 'encoding',
  'lorem-ipsum': 'generators',
  'slug-generator': 'generators',
  'qr-code': 'generators',
  'markdown-preview': 'text',
};

export function getCanonicalToolCategory(slug: string, category?: string): string {
  return canonicalToolCategories[slug] || category || '';
}

export function buildToolPath(category: string, slug: string): string {
  const canonicalCategory = getCanonicalToolCategory(slug, category);
  return `/tools/${canonicalCategory}/${slug}`;
}
