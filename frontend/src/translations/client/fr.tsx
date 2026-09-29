'use client';

import type { ReactNode } from 'react';
import { DictionaryProvider } from '@/context/LanguageContext';
import { frUi } from '../ui/fr';

// One client module per locale: the server root layout renders only the module for the
// page's language, so the browser downloads just that locale's UI dictionary (never the
// other six, and never the ~1 MB tool name/description catalog).
export default function FRDictionary({ children }: { children: ReactNode }) {
  return <DictionaryProvider dictionary={frUi}>{children}</DictionaryProvider>;
}
