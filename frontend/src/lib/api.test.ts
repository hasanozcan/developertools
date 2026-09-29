import { describe, expect, it } from 'vitest';
import { categoryCatalog, getToolBySlug, getTools, toolCatalog } from './api';
import { toolComponentSlugs } from '@/components/tools/ToolRenderer';
import { getToolSources } from './toolSources';
import { MIN_INBOUND_RELATED_LINKS, RELATED_TOOL_COUNT } from './relatedTools';

describe('static tool relationships', () => {
  it('keeps catalog identifiers unique and category counts accurate', () => {
    expect(new Set(toolCatalog.map((tool) => tool.id)).size).toBe(toolCatalog.length);
    expect(new Set(toolCatalog.map((tool) => tool.slug)).size).toBe(toolCatalog.length);

    for (const category of categoryCatalog) {
      const canonicalToolCount = toolCatalog.filter(
        (tool) => tool.categorySlug === category.slug,
      ).length;
      expect(category.toolCount, category.slug).toBe(canonicalToolCount);
    }
  });

  it('keeps a renderable component registered for every catalog tool', () => {
    expect([...toolComponentSlugs].sort()).toEqual(toolCatalog.map((tool) => tool.slug).sort());
  });

  it('keeps at least one primary reference for every catalog tool', () => {
    for (const tool of toolCatalog) {
      const sources = getToolSources(tool.slug);
      expect(sources.length, tool.slug).toBeGreaterThan(0);
      expect(
        sources.every((source) => source.url.startsWith('https://')),
        tool.slug,
      ).toBe(true);
    }
  });

  it('gives every canonical tool a full set of unique, non-self related tools', async () => {
    const tools = await getTools();

    for (const tool of tools) {
      const detail = await getToolBySlug(tool.slug);
      const relatedSlugs = detail?.relatedTools?.map((related) => related.slug) || [];

      expect(relatedSlugs, tool.slug).toHaveLength(RELATED_TOOL_COUNT);
      expect(new Set(relatedSlugs).size, tool.slug).toBe(RELATED_TOOL_COUNT);
      expect(relatedSlugs, tool.slug).not.toContain(tool.slug);
    }
  });

  it('gives every canonical tool a minimum number of contextual inbound links', async () => {
    const tools = await getTools();
    const inbound = new Map(tools.map((tool) => [tool.slug, new Set<string>()]));

    for (const tool of tools) {
      const detail = await getToolBySlug(tool.slug);
      for (const related of detail?.relatedTools || []) {
        inbound.get(related.slug)?.add(tool.slug);
      }
    }

    for (const [slug, sources] of inbound) {
      expect(sources.size, slug).toBeGreaterThanOrEqual(MIN_INBOUND_RELATED_LINKS);
    }
  });

  it.each([
    ['json-formatter', ['json-validator', 'json-to-typescript', 'json-csv']],
    ['jwt-decoder', ['certificate-decoder', 'hmac-generator', 'base64']],
    ['regex-tester', ['regex-escape', 'text-diff', 'case-converter']],
  ])('keeps the curated topic cluster first for %s', async (slug, expected) => {
    const detail = await getToolBySlug(slug);
    const relatedSlugs = detail?.relatedTools?.map((related) => related.slug) || [];
    expect(relatedSlugs.slice(0, expected.length)).toEqual(expected);
  });
});
