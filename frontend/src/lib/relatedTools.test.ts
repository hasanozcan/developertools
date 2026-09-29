import { describe, expect, it } from 'vitest';
import { toolCatalog } from './api';
import {
  buildRelatedToolGraph,
  curatedRelatedToolSlugs,
  getRelatedToolGraph,
  getRelatedTools,
  isSequentialFiller,
  MIN_INBOUND_RELATED_LINKS,
  RELATED_TOOL_COUNT,
} from './relatedTools';

const catalogBySlug = new Map<string, (typeof toolCatalog)[number]>(
  toolCatalog.map((tool) => [tool.slug, tool]),
);

function describeTool(slug: string): string {
  const tool = catalogBySlug.get(slug);
  return `${slug} ${tool?.name ?? ''} ${tool?.shortDescription ?? ''}`.toLowerCase();
}

function linkStats(relatedSlugs: ReadonlyMap<string, readonly string[]>) {
  const inbound = new Map<string, number>(toolCatalog.map((tool) => [tool.slug, 0]));
  let links = 0;
  let crossCategory = 0;
  for (const tool of toolCatalog) {
    for (const related of relatedSlugs.get(tool.slug) ?? []) {
      inbound.set(related, (inbound.get(related) ?? 0) + 1);
      links += 1;
      if (catalogBySlug.get(related)?.categorySlug !== tool.categorySlug) crossCategory += 1;
    }
  }
  const counts = [...inbound.values()].sort((left, right) => left - right);
  return {
    min: counts[0],
    median: counts[Math.floor(counts.length / 2)],
    max: counts[counts.length - 1],
    crossCategoryShare: crossCategory / links,
  };
}

describe('related tool graph', () => {
  const graph = getRelatedToolGraph();

  it(`gives every tool ${RELATED_TOOL_COUNT} unique, non-self related tools`, () => {
    for (const tool of toolCatalog) {
      const related = graph.relatedSlugs.get(tool.slug) ?? [];
      expect(related, tool.slug).toHaveLength(RELATED_TOOL_COUNT);
      expect(new Set(related).size, tool.slug).toBe(RELATED_TOOL_COUNT);
      expect(related, tool.slug).not.toContain(tool.slug);
      for (const slug of related) expect(catalogBySlug.has(slug), slug).toBe(true);
    }
  });

  it('is deterministic across rebuilds', () => {
    const rebuilt = buildRelatedToolGraph();
    for (const tool of toolCatalog) {
      expect(rebuilt.relatedSlugs.get(tool.slug), tool.slug).toEqual(
        graph.relatedSlugs.get(tool.slug),
      );
    }
  });

  it('spreads inbound links so every tool gets a minimum number of related links', () => {
    const stats = linkStats(graph.relatedSlugs);
    expect(stats.min).toBeGreaterThanOrEqual(MIN_INBOUND_RELATED_LINKS);
    expect(stats.max).toBeLessThanOrEqual(RELATED_TOOL_COUNT * 5);
    expect(stats.crossCategoryShare).toBeLessThan(0.4);
  });

  it('pins genuine hand-curated picks to the top of the list', () => {
    for (const [slug, curated] of Object.entries(curatedRelatedToolSlugs)) {
      expect(graph.relatedSlugs.get(slug)?.slice(0, curated.length), slug).toEqual(curated);
    }
  });

  it('keeps curated entries free of catalog-order filler', () => {
    for (const [slug, curated] of Object.entries(curatedRelatedToolSlugs)) {
      expect(catalogBySlug.has(slug), slug).toBe(true);
      expect(isSequentialFiller(slug, curated), slug).toBe(false);
    }
  });

  it('detects entries that merely repeat catalog order', () => {
    const slugs = toolCatalog.map((tool) => tool.slug);
    expect(isSequentialFiller(slugs[10], slugs.slice(11, 14))).toBe(true);
    expect(isSequentialFiller(slugs[slugs.length - 1], slugs.slice(0, 3))).toBe(true);
    const categoryOrder = toolCatalog.filter((tool) => tool.categorySlug === 'crypto');
    expect(
      isSequentialFiller(
        categoryOrder[0].slug,
        categoryOrder.slice(1, 4).map((tool) => tool.slug),
      ),
    ).toBe(true);
    expect(isSequentialFiller('json-formatter', ['json-validator', 'json-to-typescript'])).toBe(
      false,
    );
  });

  it('ignores filler curated entries and falls back to scored relations', () => {
    const slugs = toolCatalog.map((tool) => tool.slug);
    const index = slugs.indexOf('sha256-hash');
    const filler = { 'sha256-hash': slugs.slice(index + 1, index + 4) };
    const withFiller = buildRelatedToolGraph(toolCatalog, filler);
    const withoutCuration = buildRelatedToolGraph(toolCatalog, {});
    expect(withFiller.relatedSlugs.get('sha256-hash')).toEqual(
      withoutCuration.relatedSlugs.get('sha256-hash'),
    );
  });

  it('puts explicit workflow targets in the related list', () => {
    const related = graph.relatedSlugs.get('json-to-json-schema') ?? [];
    expect(related).toContain('json-schema-validator');
    expect(related).toContain('json-schema-to-zod');
  });

  it.each([
    ['sha256-hash', /hash|sha|md5|hmac|blake|keccak|checksum|digest|bcrypt|argon|crc/],
    ['timestamp-converter', /time|date|epoch|cron|timezone|duration|schedule/],
    ['json-formatter', /json/],
  ])('relates %s to tools on the same topic', (slug, topic) => {
    const related = getRelatedTools(slug);
    expect(related).toHaveLength(RELATED_TOOL_COUNT);
    for (const tool of related) {
      expect(describeTool(tool.slug), `${slug} -> ${tool.slug}`).toMatch(topic);
    }
  });
});
