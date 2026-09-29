import type { Language } from '@/lib/i18nRouting';
import { deAudiences, deCollections } from '@/lib/collectionCopy.de';
import { esAudiences, esCollections } from '@/lib/collectionCopy.es';
import { frAudiences, frCollections } from '@/lib/collectionCopy.fr';
import { ruAudiences, ruCollections } from '@/lib/collectionCopy.ru';
import { trAudiences, trCollections } from '@/lib/collectionCopy.tr';
import { zhAudiences, zhCollections } from '@/lib/collectionCopy.zh';

/**
 * Per-locale copy for collection (/collections/<slug>) and role (/for/<role>) hub pages.
 *
 * Guidelines for each entry (validated in `collectionCopy.test.ts`):
 * - `description`: meta description, 140-160 characters (roughly 55-110 for zh).
 * - `intro`: 60-100 words (roughly 110-260 characters for zh), conveying the same claims as the
 *   long-form English copy in `toolCollections.ts` / `developerAudiences.ts`.
 *
 * The per-locale data lives in `collectionCopy.<locale>.ts` as compact tuples
 * `[shortTitle, title, description, intro]` keyed by slug.
 */
export type CollectionCopyLocale = Exclude<Language, 'en'>;

export interface LocalizedHubCopy {
  shortTitle: string;
  title: string;
  description: string;
  intro: string;
}

type HubTuple = readonly [string, string, string, string];
type HubCopyTable = Readonly<Record<string, LocalizedHubCopy>>;

function build(source: Readonly<Record<string, HubTuple>>): HubCopyTable {
  return Object.fromEntries(
    Object.entries(source).map(([slug, [shortTitle, title, description, intro]]) => [
      slug,
      { shortTitle, title, description, intro },
    ]),
  );
}

export const collectionCopy: Readonly<Record<CollectionCopyLocale, HubCopyTable>> = {
  tr: build(trCollections),
  de: build(deCollections),
  es: build(esCollections),
  fr: build(frCollections),
  ru: build(ruCollections),
  zh: build(zhCollections),
};

export const audienceCopy: Readonly<Record<CollectionCopyLocale, HubCopyTable>> = {
  tr: build(trAudiences),
  de: build(deAudiences),
  es: build(esAudiences),
  fr: build(frAudiences),
  ru: build(ruAudiences),
  zh: build(zhAudiences),
};
