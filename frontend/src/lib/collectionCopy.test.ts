import { describe, expect, it } from 'vitest';
import { audienceCopy, collectionCopy, type CollectionCopyLocale } from './collectionCopy';
import { developerAudiences } from './developerAudiences';
import { getLocalizedAudience } from './developerAudiences';
import { getLocalizedCollection, toolCollections } from './toolCollections';

const LOCALES: readonly CollectionCopyLocale[] = ['tr', 'de', 'es', 'fr', 'ru', 'zh'];

const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

/** Length of an intro in "words"; Chinese has no spaces, so it is measured in characters. */
function introSize(locale: CollectionCopyLocale, text: string) {
  return locale === 'zh' ? text.length : wordCount(text);
}

const INTRO_RANGE = { latin: [60, 100], zh: [110, 260] } as const;
const DESCRIPTION_RANGE = { latin: [120, 165], zh: [50, 110] } as const;

function checkEntries(kind: 'collection' | 'audience') {
  const table = kind === 'collection' ? collectionCopy : audienceCopy;
  const slugs = (kind === 'collection' ? toolCollections : developerAudiences).map((entry) => entry.slug);

  for (const locale of LOCALES) {
    const entries = table[locale];
    const shortTitles = new Set<string>();
    const titles = new Set<string>();
    const intros = new Set<string>();

    it(`${kind}: ${locale} has complete, correctly sized copy for every slug and nothing extra`, () => {
      expect(Object.keys(entries).sort()).toEqual([...slugs].sort());
      const [introMin, introMax] = locale === 'zh' ? INTRO_RANGE.zh : INTRO_RANGE.latin;
      const [descMin, descMax] = locale === 'zh' ? DESCRIPTION_RANGE.zh : DESCRIPTION_RANGE.latin;

      for (const slug of slugs) {
        const copy = entries[slug];
        const id = `${locale}/${slug}`;
        expect(copy.shortTitle.trim(), id).not.toBe('');
        expect(copy.title.trim(), id).not.toBe('');
        expect(copy.description.length, `${id} description length`).toBeGreaterThanOrEqual(descMin);
        expect(copy.description.length, `${id} description length`).toBeLessThanOrEqual(descMax);
        const size = introSize(locale, copy.intro);
        expect(size, `${id} intro size`).toBeGreaterThanOrEqual(introMin);
        expect(size, `${id} intro size`).toBeLessThanOrEqual(introMax);
        expect(copy.intro, id).not.toMatch(/\{(topic|role)\}/);

        expect(shortTitles.has(copy.shortTitle), `${id} duplicate shortTitle`).toBe(false);
        expect(titles.has(copy.title), `${id} duplicate title`).toBe(false);
        expect(intros.has(copy.intro), `${id} duplicate intro`).toBe(false);
        shortTitles.add(copy.shortTitle);
        titles.add(copy.title);
        intros.add(copy.intro);
      }
    });
  }
}

describe('localized collection and audience copy', () => {
  checkEntries('collection');
  checkEntries('audience');

  it('wires localized collections to the real per-locale copy instead of the template', () => {
    for (const collection of toolCollections) {
      for (const locale of LOCALES) {
        const localized = getLocalizedCollection(collection, locale);
        const copy = collectionCopy[locale][collection.slug];
        expect(localized.title).toBe(copy.title);
        expect(localized.shortTitle).toBe(copy.shortTitle);
        expect(localized.description).toBe(copy.description);
        expect(localized.intro).toBe(copy.intro);
        expect(localized.toolSlugs).toEqual(collection.toolSlugs);
      }
    }
  });

  it('wires localized audiences to the real per-locale copy instead of the template', () => {
    for (const audience of developerAudiences) {
      for (const locale of LOCALES) {
        const localized = getLocalizedAudience(audience, locale);
        const copy = audienceCopy[locale][audience.slug];
        expect(localized.title).toBe(copy.title);
        expect(localized.description).toBe(copy.description);
        expect(localized.intro).toBe(copy.intro);
        expect(localized.collectionSlugs).toEqual(audience.collectionSlugs);
      }
    }
  });

  it('does not repeat an intro across locales', () => {
    const seen = new Set<string>();
    for (const table of [collectionCopy, audienceCopy]) {
      for (const locale of LOCALES) {
        for (const copy of Object.values(table[locale])) {
          expect(seen.has(copy.intro)).toBe(false);
          seen.add(copy.intro);
        }
      }
    }
  });
});
