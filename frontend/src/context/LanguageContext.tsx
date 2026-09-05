'use client';

import { createContext, useContext, useEffect, ReactNode, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations, type Language } from '@/translations';
import {
  isValidLocale,
  stripLocaleFromPath,
  getLocalizedPath,
  DEFAULT_LOCALE,
} from '@/lib/i18nRouting';

export type { Language };

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

// Twemoji SVG URLs for consistent cross-browser rendering
export const languageFlagUrls: Record<Language, string> = {
  en: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1fa-1f1f8.svg', // US
  tr: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f9-1f1f7.svg',
  de: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e9-1f1ea.svg',
  es: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ea-1f1f8.svg',
  fr: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1eb-1f1f7.svg',
  ru: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f7-1f1fa.svg',
  zh: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e8-1f1f3.svg',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Language;
}) {
  const pathname = usePathname();
  const router = useRouter();

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
      const translation = translations[language]?.[key];
      if (translation !== undefined && translation !== '') {
        return translation;
      }
      const fallback = translations[DEFAULT_LOCALE]?.[key];
      if (fallback !== undefined && fallback !== '') {
        return fallback;
      }
      return '';
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
