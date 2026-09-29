import { useEffect, useState } from 'react';
import type { Language } from '@/lib/localeRouting';

// Lazy, current-locale-only tool text (name + description per slug). The initial bundle
// carries no tool names; this index is fetched from /api/tool-index/<locale> the first
// time something needs it (command palette opening, recent tools, favorites) and is then
// shared by every consumer on the page.

export interface ToolIndexItem {
  name: string;
  description: string;
}

export type ToolIndex = ReadonlyMap<string, ToolIndexItem>;

const cache = new Map<Language, Promise<ToolIndex>>();
const resolved = new Map<Language, ToolIndex>();

export function loadToolIndex(locale: Language): Promise<ToolIndex> {
  const cached = cache.get(locale);
  if (cached) return cached;

  const request = fetch(`/api/tool-index/${locale}`)
    .then((response) => {
      if (!response.ok) throw new Error(`tool index ${locale}: ${response.status}`);
      return response.json() as Promise<[string, string, string][]>;
    })
    .then((entries) => {
      const index = new Map<string, ToolIndexItem>();
      for (const [slug, name, description] of entries) index.set(slug, { name, description });
      resolved.set(locale, index);
      return index as ToolIndex;
    })
    .catch((error) => {
      // Allow a retry on the next request; consumers keep their catalog fallback text.
      cache.delete(locale);
      throw error;
    });

  cache.set(locale, request);
  return request;
}

/** Fire-and-forget warm-up (e.g. on hover/focus of the search button). */
export function prefetchToolIndex(locale: Language): void {
  loadToolIndex(locale).catch(() => undefined);
}

/**
 * Returns the localized tool index once loaded (null until then / when disabled).
 * Nothing is fetched while `enabled` is false.
 */
export function useToolIndex(locale: Language, enabled = true): ToolIndex | null {
  const [index, setIndex] = useState<ToolIndex | null>(() => resolved.get(locale) ?? null);

  useEffect(() => {
    if (!enabled) return;
    const existing = resolved.get(locale);
    if (existing) {
      setIndex(existing);
      return;
    }
    let active = true;
    loadToolIndex(locale)
      .then((loaded) => {
        if (active) setIndex(loaded);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [locale, enabled]);

  return index;
}
