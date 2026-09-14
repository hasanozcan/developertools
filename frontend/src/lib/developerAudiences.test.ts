import { describe, expect, it } from 'vitest';
import {
  developerAudiences,
  getAudienceCollections,
  getAudienceTools,
  getDeveloperAudience,
  getLocalizedAudience,
} from './developerAudiences';

describe('developer audiences', () => {
  it('has unique role slugs and resolves every role page', () => {
    expect(new Set(developerAudiences.map((audience) => audience.slug)).size).toBe(developerAudiences.length);
    for (const audience of developerAudiences) {
      expect(getDeveloperAudience(audience.slug)?.title).toBe(audience.title);
    }
  });

  it('references only real tools and collections', () => {
    for (const audience of developerAudiences) {
      expect(getAudienceTools(audience).length, audience.slug).toBe(audience.toolSlugs.length);
      expect(getAudienceCollections(audience).length, audience.slug).toBe(audience.collectionSlugs.length);
    }
  });

  it('provides localized role copy', () => {
    const audience = developerAudiences[0];
    expect(getLocalizedAudience(audience, 'tr').title).not.toBe(audience.title);
    expect(getLocalizedAudience(audience, 'de').description).toBeTruthy();
  });
});
