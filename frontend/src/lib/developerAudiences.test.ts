import { describe, expect, it } from 'vitest';
import {
  developerAudiences,
  getAudienceCollections,
  getAudienceTools,
  getDeveloperAudience,
  getLocalizedAudience,
} from './developerAudiences';

const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

describe('developer audiences', () => {
  it('has unique role slugs and resolves every role page', () => {
    expect(new Set(developerAudiences.map((audience) => audience.slug)).size).toBe(developerAudiences.length);
    for (const audience of developerAudiences) {
      expect(getDeveloperAudience(audience.slug)?.title).toBe(audience.title);
    }
  });

  it('references only real, unique tools and collections', () => {
    for (const audience of developerAudiences) {
      expect(getAudienceTools(audience).length, audience.slug).toBe(audience.toolSlugs.length);
      expect(getAudienceCollections(audience).length, audience.slug).toBe(audience.collectionSlugs.length);
      expect(new Set(audience.toolSlugs).size, audience.slug).toBe(audience.toolSlugs.length);
      expect(new Set(audience.collectionSlugs).size, audience.slug).toBe(audience.collectionSlugs.length);
    }
  });

  it('has search-snippet-length English descriptions', () => {
    for (const audience of developerAudiences) {
      expect(audience.description.length, audience.slug).toBeGreaterThanOrEqual(120);
      expect(audience.description.length, audience.slug).toBeLessThanOrEqual(165);
    }
  });

  it('has a unique 150–250 word English introduction for every role page', () => {
    const intros = new Set<string>();
    for (const audience of developerAudiences) {
      const text = audience.introParagraphs.join(' ');
      const words = wordCount(text);
      expect(words, audience.slug).toBeGreaterThanOrEqual(150);
      expect(words, audience.slug).toBeLessThanOrEqual(250);
      expect(intros.has(text), audience.slug).toBe(false);
      intros.add(text);
    }
  });

  it('provides localized role copy', () => {
    const audience = developerAudiences[0];
    expect(getLocalizedAudience(audience, 'tr').title).not.toBe(audience.title);
    expect(getLocalizedAudience(audience, 'de').description).toBeTruthy();
  });

  it('never leaks English long-form copy into localized role pages', () => {
    for (const audience of developerAudiences) {
      expect(getLocalizedAudience(audience, 'en')).toBe(audience);
      for (const locale of ['tr', 'de', 'es', 'fr', 'ru', 'zh'] as const) {
        const localized = getLocalizedAudience(audience, locale);
        expect(localized.introParagraphs, `${audience.slug}/${locale}`).toBeUndefined();
        expect(localized.toolSlugs).toEqual(audience.toolSlugs);
        expect(localized.collectionSlugs).toEqual(audience.collectionSlugs);
      }
    }
  });
});
