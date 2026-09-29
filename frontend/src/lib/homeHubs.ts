import { developerAudiences, getLocalizedAudience } from '@/lib/developerAudiences';
import type { Language } from '@/lib/i18nRouting';
import { getLocalizedCollection, toolCollections } from '@/lib/toolCollections';

/**
 * Minimal, serialisable hub data for the homepage cards.
 *
 * `toolCollections` / `developerAudiences` transitively import the ~400 KB per-locale copy
 * tables, so they must stay out of client bundles. The homepage server routes call
 * `getHomeHubs(locale)` and pass the result to the client component as props; the client only
 * ever `import type`s from this file.
 */
export interface HomeHubLink {
  slug: string;
  title: string;
  description: string;
}

export interface HomeHubs {
  collections: HomeHubLink[];
  audiences: HomeHubLink[];
}

export const HOME_COLLECTION_LIMIT = 9;
export const HOME_AUDIENCE_LIMIT = 6;

export function getHomeHubs(locale: Language): HomeHubs {
  return {
    collections: toolCollections.slice(0, HOME_COLLECTION_LIMIT).map((collection) => {
      const localized = getLocalizedCollection(collection, locale);
      return { slug: collection.slug, title: localized.shortTitle, description: localized.description };
    }),
    audiences: developerAudiences.slice(0, HOME_AUDIENCE_LIMIT).map((audience) => {
      const localized = getLocalizedAudience(audience, locale);
      return { slug: audience.slug, title: localized.shortTitle, description: localized.description };
    }),
  };
}
