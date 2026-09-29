'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Language } from '@/translations';
import {
  isValidLocale,
  stripLocaleFromPath,
  getLocalizedPath,
} from '@/lib/localeRouting';

export type { Language };

// This module runs in the browser bundle of every page, so it must never import the
// full translation catalog (`@/translations`, `enhancedTools`): the active locale's UI
// dictionary is supplied by the server layout through a per-locale client module
// (see src/translations/client/*) and rendered as <DictionaryProvider>.

type Dictionary = Readonly<Record<string, string>>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const languageNames: Record<Language, string> = {
  en: 'English',
  tr: 'Türkçe',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  ru: 'Русский',
  zh: '中文',
};

// Use text codes for consistent rendering across browsers
export const languageFlags: Record<Language, string> = {
  en: 'EN',
  tr: 'TR',
  de: 'DE',
  es: 'ES',
  fr: 'FR',
  ru: 'RU',
  zh: 'ZH',
};

// Self-hosted flag SVGs (public/flags) keep the header free of third-party requests.
export const languageFlagUrls: Record<Language, string> = {
  en: '/flags/us.svg',
  tr: '/flags/tr.svg',
  de: '/flags/de.svg',
  es: '/flags/es.svg',
  fr: '/flags/fr.svg',
  ru: '/flags/ru.svg',
  zh: '/flags/zh.svg',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const DictionaryContext = createContext<Dictionary | null>(null);
// Page-scoped `toolName.*` / `toolDesc.*` text supplied by server pages that render many tools.
const ToolTextContext = createContext<Dictionary | null>(null);

const EMPTY_DICTIONARY: Dictionary = {};

/** Supplies the active locale's UI dictionary. Rendered by src/translations/client/<locale>.tsx. */
export function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: ReactNode;
}) {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}

/**
 * Makes `t('toolName.<slug>')` / `t('toolDesc.<slug>')` resolve for the pages that render
 * tool lists (home page). Tool names are intentionally not part of the client dictionary.
 */
export function ToolTextProvider({ text, children }: { text: Dictionary; children: ReactNode }) {
  return <ToolTextContext.Provider value={text}>{children}</ToolTextContext.Provider>;
}

function isToolTextKey(key: string): boolean {
  return key.startsWith('toolName.') || key.startsWith('toolDesc.');
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Language;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dictionary = useContext(DictionaryContext) ?? EMPTY_DICTIONARY;

  const language = initialLocale ?? stripLocaleFromPath(pathname || '/').locale;

  // Keep previously shared language links working without losing tool input.
  useEffect(() => {
    const url = new URL(window.location.href);
    const legacyLocale = url.searchParams.get('lang');
    if (!legacyLocale || !isValidLocale(legacyLocale)) return;
    url.searchParams.delete('lang');
    router.replace(`${getLocalizedPath(url.pathname, legacyLocale)}${url.search}${url.hash}`);
  }, [pathname, router]);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('language', language);
    } catch {
      // Navigation also works when browser storage is unavailable.
    }
  }, [language]);

  // Switching language crosses root layouts (/x <-> /tr/x), so Next performs a full page
  // load and the new page arrives with its own dictionary.
  const setLanguage = useCallback(
    (lang: Language) => {
      try {
        localStorage.setItem('language', lang);
      } catch {
        // ignore
      }

      const url = new URL(window.location.href);
      url.searchParams.delete('lang');
      const target = `${getLocalizedPath(pathname || url.pathname, lang)}${url.search}${url.hash}`;
      if (target !== `${url.pathname}${url.search}${url.hash}`) router.push(target);
    },
    [pathname, router],
  );

  const t = useCallback(
    (key: string): string => {
      const translation = dictionary[key];
      return translation !== undefined && translation !== '' ? translation : '';
    },
    [dictionary],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  const toolText = useContext(ToolTextContext);
  const tWithToolText = useMemo(() => {
    if (!context || !toolText) return null;
    const baseT = context.t;
    return {
      ...context,
      t: (key: string): string => {
        if (isToolTextKey(key)) {
          const text = toolText[key];
          if (text) return text;
        }
        return baseT(key);
      },
    };
  }, [context, toolText]);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return tWithToolText ?? context;
}
