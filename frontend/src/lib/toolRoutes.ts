import { findCatalogTool } from './api';

export function getCanonicalToolCategory(slug: string, category?: string): string {
  return findCatalogTool(slug)?.categorySlug || category || '';
}

export function buildToolPath(category: string, slug: string): string {
  const canonicalCategory = getCanonicalToolCategory(slug, category);
  return `/tools/${canonicalCategory}/${slug}`;
}
