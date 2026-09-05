import { translations, type Language } from '@/translations';
import { enhancedTools } from '@/translations/enhancedTools';

export type { Language };

export const SUPPORTED_LOCALES: readonly Language[] = [
  'en',
  'tr',
  'de',
  'es',
  'fr',
  'ru',
  'zh',
] as const;
export const DEFAULT_LOCALE: Language = 'en';
export const NON_DEFAULT_LOCALES: readonly Language[] = [
  'tr',
  'de',
  'es',
  'fr',
  'ru',
  'zh',
] as const;
export const LOCALIZED_PAGES = ['about', 'privacy', 'terms', 'contact'] as const;

export function isValidLocale(locale: string): locale is Language {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export function isNonDefaultLocale(locale: string): locale is (typeof NON_DEFAULT_LOCALES)[number] {
  return (NON_DEFAULT_LOCALES as readonly string[]).includes(locale);
}

/**
 * Strips any supported locale prefix from a pathname.
 * e.g. "/tr/tools/json/json-formatter" -> "/tools/json/json-formatter"
 * e.g. "/tr" -> "/"
 * e.g. "/tools/json/json-formatter" -> "/tools/json/json-formatter"
 */
export function stripLocaleFromPath(pathname: string): { cleanPath: string; locale: Language } {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isValidLocale(segments[0])) {
    const locale = segments[0];
    const remaining = '/' + segments.slice(1).join('/');
    return {
      cleanPath: remaining === '' ? '/' : remaining,
      locale,
    };
  }
  return {
    cleanPath: pathname.startsWith('/') ? pathname : `/${pathname}`,
    locale: DEFAULT_LOCALE,
  };
}

/**
 * Returns the localized URL path for a given target locale.
 * e.g. getLocalizedPath('/tools/json/json-formatter', 'tr') -> '/tr/tools/json/json-formatter'
 * e.g. getLocalizedPath('/tr/tools/json/json-formatter', 'en') -> '/tools/json/json-formatter'
 * e.g. getLocalizedPath('/', 'de') -> '/de'
 */
export function getLocalizedPath(href: string, targetLocale: Language = DEFAULT_LOCALE): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;

  const suffixIndex = href.search(/[?#]/);
  const pathname = suffixIndex < 0 ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex < 0 ? '' : href.slice(suffixIndex);
  const { cleanPath } = stripLocaleFromPath(pathname);
  if (
    cleanPath !== '/' &&
    !cleanPath.startsWith('/tools/') &&
    !LOCALIZED_PAGES.some((page) => cleanPath === `/${page}`)
  )
    return href;

  const normalizedClean = cleanPath === '/' ? '' : cleanPath;

  if (targetLocale === DEFAULT_LOCALE) {
    return `${cleanPath}${suffix}`;
  }

  return `/${targetLocale}${normalizedClean}${suffix}`;
}

/**
 * Generates hreflang alternate URLs for SEO metadata.
 */
export function getHreflangAlternates(
  pathname: string,
  siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app',
): Record<string, string> {
  const { cleanPath } = stripLocaleFromPath(pathname);
  const normalizedClean = cleanPath === '/' ? '' : cleanPath;
  const baseUrl = siteUrl.replace(/\/$/, '');

  const defaultUrl = `${baseUrl}${cleanPath}`;
  const alternates: Record<string, string> = {
    'x-default': defaultUrl,
  };

  for (const locale of SUPPORTED_LOCALES) {
    alternates[locale] =
      locale === DEFAULT_LOCALE ? defaultUrl : `${baseUrl}/${locale}${normalizedClean}`;
  }

  return alternates;
}

/**
 * Resolves localized name and description for a tool.
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

  const enhanced = enhancedTools[toolSlug];
  const translatedName =
    enhanced?.name?.[locale] || translations[locale]?.[`toolName.${toolSlug}`] || defaultName;

  const translatedDesc =
    enhanced?.description?.[locale] ||
    translations[locale]?.[`toolDesc.${toolSlug}`] ||
    defaultDescription;

  return {
    name: translatedName,
    description: translatedDesc,
  };
}
