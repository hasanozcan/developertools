import { describe, expect, it } from 'vitest';
import { findCatalogTool, toolCatalog } from './api';
import { developerAudiences } from './developerAudiences';
import {
  getCollectionTools,
  getCollectionsForTool,
  getLocalizedCollection,
  getToolCollection,
  toolCollections,
} from './toolCollections';

const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

describe('tool collections', () => {
  it('has unique slugs and resolves every collection', () => {
    expect(new Set(toolCollections.map((collection) => collection.slug)).size).toBe(toolCollections.length);
    for (const collection of toolCollections) {
      expect(getToolCollection(collection.slug)?.title).toBe(collection.title);
    }
  });

  it('contains only real, unique catalog tools in coherent 8–30 tool sets', () => {
    for (const collection of toolCollections) {
      const tools = getCollectionTools(collection);
      expect(tools.length, collection.slug).toBe(collection.toolSlugs.length);
      expect(new Set(collection.toolSlugs).size, collection.slug).toBe(collection.toolSlugs.length);
      expect(tools.length, collection.slug).toBeGreaterThanOrEqual(8);
      expect(tools.length, collection.slug).toBeLessThanOrEqual(30);
    }
  });

  it('provides search intents for every SEO collection', () => {
    for (const collection of toolCollections) {
      expect(collection.searchIntents.length, collection.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it('has unique titles and search-snippet-length English descriptions', () => {
    expect(new Set(toolCollections.map((collection) => collection.title)).size).toBe(toolCollections.length);
    expect(new Set(toolCollections.map((collection) => collection.shortTitle)).size).toBe(toolCollections.length);
    for (const collection of toolCollections) {
      expect(collection.description.length, collection.slug).toBeGreaterThanOrEqual(120);
      expect(collection.description.length, collection.slug).toBeLessThanOrEqual(165);
    }
  });

  it('has a unique 150–250 word English introduction for every collection', () => {
    const intros = new Set<string>();
    for (const collection of toolCollections) {
      const text = collection.introParagraphs.join(' ');
      const words = wordCount(text);
      expect(words, collection.slug).toBeGreaterThanOrEqual(150);
      expect(words, collection.slug).toBeLessThanOrEqual(250);
      for (const paragraph of collection.introParagraphs) {
        expect(paragraph.trim(), collection.slug).not.toBe('');
      }
      expect(intros.has(text), collection.slug).toBe(false);
      intros.add(text);
    }
  });

  it('links 3–5 ordered workflow steps to tools in their collection and the catalog', () => {
    for (const collection of toolCollections) {
      const steps = collection.workflowSteps;
      expect(steps.length, collection.slug).toBeGreaterThanOrEqual(3);
      expect(steps.length, collection.slug).toBeLessThanOrEqual(5);
      expect(new Set(steps.map((step) => step.toolSlug)).size, collection.slug).toBe(steps.length);
      for (const step of steps) {
        expect(collection.toolSlugs, collection.slug).toContain(step.toolSlug);
        expect(findCatalogTool(step.toolSlug), step.toolSlug).toBeDefined();
        expect(step.title.trim()).not.toBe('');
        expect(step.description.trim()).not.toBe('');
      }
    }
    expect(getToolCollection('security-crypto')?.toolSlugs).toContain('sha256-hash');
    expect(getToolCollection('security-crypto')?.toolSlugs).toContain('md5-hash');
  });

  it('places at least 90% of catalog tools in a collection or audience page', () => {
    const covered = new Set<string>();
    for (const collection of toolCollections) collection.toolSlugs.forEach((slug) => covered.add(slug));
    for (const audience of developerAudiences) audience.toolSlugs.forEach((slug) => covered.add(slug));
    const ratio = toolCatalog.filter((tool) => covered.has(tool.slug)).length / toolCatalog.length;
    expect(ratio).toBeGreaterThanOrEqual(0.9);
  });

  it('finds the collections that contain a tool', () => {
    const slugs = getCollectionsForTool('sha256-hash').map((collection) => collection.slug);
    expect(slugs).toContain('security-crypto');
    expect(slugs).toContain('hashing-checksums');
  });

  it('localizes collection copy without changing slugs or tools', () => {
    const collection = toolCollections[0];
    const localized = getLocalizedCollection(collection, 'tr');
    expect(localized.slug).toBe(collection.slug);
    expect(localized.toolSlugs).toEqual(collection.toolSlugs);
    expect(localized.title).not.toBe(collection.title);
  });

  it('never leaks English long-form copy into localized collections', () => {
    for (const collection of toolCollections) {
      expect(getLocalizedCollection(collection, 'en')).toBe(collection);
      for (const locale of ['tr', 'de', 'es', 'fr', 'ru', 'zh'] as const) {
        const localized = getLocalizedCollection(collection, locale);
        expect(localized.introParagraphs, `${collection.slug}/${locale}`).toBeUndefined();
        expect(localized.workflowSteps, `${collection.slug}/${locale}`).toBeUndefined();
        expect(localized.searchIntents).toEqual(collection.searchIntents);
      }
    }
  });
});
