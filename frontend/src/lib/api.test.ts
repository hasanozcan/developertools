import { describe, expect, it } from 'vitest';
import { getToolBySlug, getTools } from './api';

describe('static tool relationships', () => {
  it('gives every canonical tool three unique, non-self related tools', async () => {
    const tools = await getTools();

    for (const tool of tools) {
      const detail = await getToolBySlug(tool.slug);
      const relatedSlugs = detail?.relatedTools?.map((related) => related.slug) || [];

      expect(relatedSlugs, tool.slug).toHaveLength(3);
      expect(new Set(relatedSlugs).size, tool.slug).toBe(3);
      expect(relatedSlugs, tool.slug).not.toContain(tool.slug);
    }
  });

  it('gives every canonical tool at least two contextual inbound links', async () => {
    const tools = await getTools();
    const inbound = new Map(tools.map((tool) => [tool.slug, new Set<string>()]));

    for (const tool of tools) {
      const detail = await getToolBySlug(tool.slug);
      for (const related of detail?.relatedTools || []) {
        inbound.get(related.slug)?.add(tool.slug);
      }
    }

    for (const [slug, sources] of inbound) {
      expect(sources.size, slug).toBeGreaterThanOrEqual(2);
    }
  });

  it.each([
    ['json-formatter', ['json-validator', 'json-to-typescript', 'json-csv']],
    ['jwt-decoder', ['base64', 'json-formatter', 'url-encoder']],
    ['regex-tester', ['regex-escape', 'text-diff', 'case-converter']],
    ['uuid-generator', ['password-generator', 'qr-code', 'slug-generator']],
  ])('uses the curated topic cluster for %s', async (slug, expected) => {
    const detail = await getToolBySlug(slug);
    expect(detail?.relatedTools?.map((related) => related.slug)).toEqual(expected);
  });
});
