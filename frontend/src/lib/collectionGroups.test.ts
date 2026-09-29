import { describe, expect, it } from 'vitest';
import { collectionGroups, groupCollectionSlugs } from './collectionGroups';
import { toolCollections } from './toolCollections';
import { NON_DEFAULT_LOCALES } from './i18nRouting';

describe('collectionGroups', () => {
  it('places every collection in exactly one group', () => {
    const counts = new Map<string, number>();
    for (const group of collectionGroups) {
      for (const slug of group.slugs) counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
    for (const collection of toolCollections) {
      expect(counts.get(collection.slug), collection.slug).toBe(1);
    }
    for (const slug of counts.keys()) {
      expect(toolCollections.some((collection) => collection.slug === slug), slug).toBe(true);
    }
  });

  it('has a heading for every locale and returns all slugs when grouped', () => {
    for (const locale of ['en', ...NON_DEFAULT_LOCALES] as const) {
      const grouped = groupCollectionSlugs(toolCollections.map((c) => c.slug), locale);
      expect(grouped.flatMap((group) => group.slugs)).toHaveLength(toolCollections.length);
      for (const group of grouped) expect(group.title.length).toBeGreaterThan(2);
    }
  });

  it('appends unknown slugs to a trailing group instead of dropping them', () => {
    const grouped = groupCollectionSlugs(['api-debugging', 'brand-new'], 'en');
    expect(grouped.at(-1)).toMatchObject({ id: 'more', slugs: ['brand-new'] });
  });
});
