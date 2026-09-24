import { describe, expect, it } from 'vitest';
import { getCollectionTools, getLocalizedCollection, getToolCollection, toolCollections } from './toolCollections';

describe('tool collections', () => {
  it('has unique slugs and resolves every collection', () => {
    expect(new Set(toolCollections.map((collection) => collection.slug)).size).toBe(toolCollections.length);
    for (const collection of toolCollections) {
      expect(getToolCollection(collection.slug)?.title).toBe(collection.title);
    }
  });

  it('contains only real, unique catalog tools', () => {
    for (const collection of toolCollections) {
      const tools = getCollectionTools(collection);
      expect(tools.length, collection.slug).toBe(collection.toolSlugs.length);
      expect(new Set(collection.toolSlugs).size, collection.slug).toBe(collection.toolSlugs.length);
      expect(tools.length, collection.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it('provides search intents for every SEO collection', () => {
    for (const collection of toolCollections) {
      expect(collection.searchIntents.length, collection.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it('links curated workflow steps to tools in their collection', () => {
    for (const collection of toolCollections) {
      if (!('workflowSteps' in collection)) continue;
      for (const step of collection.workflowSteps) {
        expect(collection.toolSlugs, collection.slug).toContain(step.toolSlug);
        expect(step.title.trim()).not.toBe('');
        expect(step.description.trim()).not.toBe('');
      }
    }
    expect(getToolCollection('security-crypto')?.toolSlugs).toContain('sha256-hash');
    expect(getToolCollection('security-crypto')?.toolSlugs).toContain('md5-hash');
  });

  it('localizes collection copy without changing slugs or tools', () => {
    const collection = toolCollections[0];
    const localized = getLocalizedCollection(collection, 'tr');
    expect(localized.slug).toBe(collection.slug);
    expect(localized.toolSlugs).toEqual(collection.toolSlugs);
    expect(localized.title).not.toBe(collection.title);
  });
});
