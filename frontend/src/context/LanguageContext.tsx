'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Language } from '@/translations';
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
  en: '🇺🇸',
  tr: '🇹🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  fr: '🇫🇷',
  ru: '🇷🇺',
  zh: '🇨🇳',
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      return translations.en[key] || key;
    }
    return translation;
  };

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
