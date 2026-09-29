'use client';

import dynamic from 'next/dynamic';
import type { ComponentType, ReactNode } from 'react';
import type { Language } from '@/translations';

// Used by the locale-prefixed root layout (app/[locale]/layout.tsx). Every locale is a lazy
// import, so a page only downloads (and preloads) the UI dictionary of its own language;
// a static import of all of them would put every dictionary into one shared chunk.
// The English layouts import ./en directly instead, so /tools/... pages never load this file.
const dictionaries: Record<Language, ComponentType<{ children: ReactNode }>> = {
  en: dynamic(() => import('./en')),
  tr: dynamic(() => import('./tr')),
  de: dynamic(() => import('./de')),
  es: dynamic(() => import('./es')),
  fr: dynamic(() => import('./fr')),
  ru: dynamic(() => import('./ru')),
  zh: dynamic(() => import('./zh')),
};

export default function LocaleDictionary({
  lang,
  children,
}: {
  lang: Language;
  children: ReactNode;
}) {
  const Dictionary = dictionaries[lang];
  return <Dictionary>{children}</Dictionary>;
}
