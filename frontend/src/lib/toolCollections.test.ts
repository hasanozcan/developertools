import { describe, expect, it } from 'vitest';
import { getCollectionTools, getToolCollection, toolCollections } from './toolCollections';

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
});
