'use client';

import type { ReactNode } from 'react';
import { DictionaryProvider } from '@/context/LanguageContext';
import { deUi } from '../ui/de';

// One client module per locale: the server root layout renders only the module for the
// page's language, so the browser downloads just that locale's UI dictionary (never the
// other six, and never the ~1 MB tool name/description catalog).
export default function DEDictionary({ children }: { children: ReactNode }) {
  return <DictionaryProvider dictionary={deUi}>{children}</DictionaryProvider>;
}
