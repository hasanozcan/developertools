import 'server-only';
import { translations, type Language } from '@/translations';
import { toolCatalog } from '@/lib/api';

// Server-only access to the localized tool names/descriptions. The client dictionary does not
// contain toolName.* / toolDesc.* (about 1,000 strings per locale); pages and the lazy search
// index get exactly the text they need from here instead.

/** [slug, name, description] for one tool in one locale. */
export type ToolIndexEntry = readonly [slug: string, name: string, description: string];

/** Same lookup the client `t()` used to do: locale value, then the English value. */
function lookup(locale: Language, key: string): string {
  return translations[locale]?.[key] || translations.en[key] || '';
}

/** `toolName.<slug>` / `toolDesc.<slug>` entries for every catalog tool (home page tool grid). */
export function getToolTextMap(locale: Language): Record<string, string> {
  const map: Record<string, string> = {};
  for (const tool of toolCatalog) {
    const name = lookup(locale, `toolName.${tool.slug}`);
    const description = lookup(locale, `toolDesc.${tool.slug}`);
    if (name) map[`toolName.${tool.slug}`] = name;
    if (description) map[`toolDesc.${tool.slug}`] = description;
  }
  return map;
}

/** Compact current-locale search index served lazily to the command palette and tool lists. */
export function getToolIndex(locale: Language): ToolIndexEntry[] {
  return toolCatalog.map((tool) => [
    tool.slug,
    lookup(locale, `toolName.${tool.slug}`) || tool.name,
    lookup(locale, `toolDesc.${tool.slug}`) || tool.shortDescription || '',
  ]);
}
