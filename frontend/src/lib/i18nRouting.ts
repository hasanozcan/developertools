import 'server-only';
import { translations } from '@/translations';
import { enhancedTools } from '@/translations/enhancedTools';
import { findCatalogTool } from '@/lib/api';
import { DEFAULT_LOCALE, NON_DEFAULT_LOCALES, type Language } from '@/lib/localeRouting';

// Server-only: resolves localized tool text from the full translation catalog and
// enhancedTools (~1 MB). Never import this module from a client component; use
// `@/lib/localeRouting` for path helpers and the lazy tool index for tool names.
// Everything from the client-safe module is re-exported so server code keeps a
// single import path.
export * from '@/lib/localeRouting';

function normalizeToolText(value: string | undefined): string {
  return (value ?? '').trim().toLowerCase();
}

type EnglishToolReference = { names: Set<string>; descriptions: Set<string> };

const englishToolReferenceCache = new Map<string, EnglishToolReference>();

/**
 * Every English value a tool's name/description can take (catalog, EN
 * translations, enhancedTools EN column), normalized. A localized value that
 * matches any of these is an untranslated English placeholder.
 */
function getEnglishToolReference(toolSlug: string): EnglishToolReference {
  const cached = englishToolReferenceCache.get(toolSlug);
  if (cached) return cached;

  const catalogTool = findCatalogTool(toolSlug);
  const enhanced = enhancedTools[toolSlug];
  const names = new Set<string>();
  const descriptions = new Set<string>();
  const add = (target: Set<string>, value: string | undefined) => {
    const normalized = normalizeToolText(value);
    if (normalized) target.add(normalized);
  };

  add(names, catalogTool?.name);
  add(names, enhanced?.name?.en);
  add(names, translations[DEFAULT_LOCALE]?.[`toolName.${toolSlug}`]);

  add(descriptions, catalogTool?.shortDescription);
  // The localized page falls back to the name when no short description exists.
  add(descriptions, catalogTool?.name);
  add(descriptions, enhanced?.description?.en);
  add(descriptions, translations[DEFAULT_LOCALE]?.[`toolDesc.${toolSlug}`]);

  const reference = { names, descriptions };
  englishToolReferenceCache.set(toolSlug, reference);
  return reference;
}

/** First candidate that is non-empty and not an English duplicate. */
function pickTranslated(
  candidates: readonly (string | undefined)[],
  english: Set<string>,
): string | undefined {
  for (const candidate of candidates) {
    const normalized = normalizeToolText(candidate);
    if (normalized && !english.has(normalized)) return candidate;
  }
  return undefined;
}

function resolveTranslatedToolText(
  toolSlug: string,
  locale: Language,
  extraEnglish: { name?: string; description?: string } = {},
): { name?: string; description?: string } {
  const reference = getEnglishToolReference(toolSlug);
  let englishNames = reference.names;
  let englishDescriptions = reference.descriptions;
  const extraName = normalizeToolText(extraEnglish.name);
  const extraDesc = normalizeToolText(extraEnglish.description);
  if (extraName && !englishNames.has(extraName)) {
    englishNames = new Set(englishNames).add(extraName);
  }
  if (extraDesc && !englishDescriptions.has(extraDesc)) {
    englishDescriptions = new Set(englishDescriptions).add(extraDesc);
  }

  const enhanced = enhancedTools[toolSlug];
  const localeTranslations = translations[locale];
  return {
    name: pickTranslated(
      [localeTranslations?.[`toolName.${toolSlug}`], enhanced?.name?.[locale]],
      englishNames,
    ),
    description: pickTranslated(
      [localeTranslations?.[`toolDesc.${toolSlug}`], enhanced?.description?.[locale]],
      englishDescriptions,
    ),
  };
}

/**
 * Resolves localized name and description for a tool.
 *
 * A real translation always wins over an English placeholder: an
 * `enhancedTools` entry whose locale value merely repeats the English text does
 * not shadow a genuine `toolName.<slug>` / `toolDesc.<slug>` translation.
 */
export function getLocalizedToolMeta(
  toolSlug: string,
  locale: Language,
  defaultName: string,
  defaultDescription: string,
): { name: string; description: string } {
  if (locale === DEFAULT_LOCALE) {
    return { name: defaultName, description: defaultDescription };
  }

  const translated = resolveTranslatedToolText(toolSlug, locale, {
    name: defaultName,
    description: defaultDescription,
  });

  return {
    name: translated.name ?? defaultName,
    description: translated.description ?? defaultDescription,
  };
}

const toolLocaleIndexableCache = new Map<string, boolean>();

/**
 * Whether the `locale` version of a tool page carries a real translation and
 * should therefore be indexed (self-canonical, in hreflang and the sitemap).
 *
 * Always true for the default locale. For other locales both the localized
 * name and description must exist and differ (trimmed, case-insensitive) from
 * every English value of that tool. Untranslated pages stay reachable but are
 * served as `noindex, follow` with the English URL as canonical.
 */
export function isToolLocaleIndexable(toolSlug: string, locale: Language): boolean {
  if (locale === DEFAULT_LOCALE) return true;

  const cacheKey = `${locale}:${toolSlug}`;
  const cached = toolLocaleIndexableCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const translated = resolveTranslatedToolText(toolSlug, locale);
  const indexable = Boolean(translated.name && translated.description);
  toolLocaleIndexableCache.set(cacheKey, indexable);
  return indexable;
}

/**
 * hreflang alternates for a tool page: x-default + en, plus only those
 * non-default locales for which {@link isToolLocaleIndexable} is true.
 */
export function getToolHreflangAlternates(
  toolSlug: string,
  canonicalCategory: string,
  siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app',
): Record<string, string> {
  const baseUrl = siteUrl.replace(/\/$/, '');
  const toolPath = `/tools/${canonicalCategory}/${toolSlug}`;
  const defaultUrl = `${baseUrl}${toolPath}`;
  const alternates: Record<string, string> = {
    'x-default': defaultUrl,
    [DEFAULT_LOCALE]: defaultUrl,
  };

  for (const locale of NON_DEFAULT_LOCALES) {
    if (isToolLocaleIndexable(toolSlug, locale)) {
      alternates[locale] = `${baseUrl}/${locale}${toolPath}`;
    }
  }

  return alternates;
}
