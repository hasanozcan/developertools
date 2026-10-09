'use client';

import type { ReactNode } from 'react';
import { DictionaryProvider } from '@/context/LanguageContext';
import { trUiCore } from '../ui/core/tr';

// One client module per locale: the server root layout renders only the module for the
// page's language, so the browser downloads just that locale's shared UI strings (never the
// other six, never the ~1 MB tool name/description catalog, and never other tools' strings:
// a tool page adds its own through <ToolDictionaryProvider>).
export default function TRDictionary({ children }: { children: ReactNode }) {
  return <DictionaryProvider dictionary={trUiCore}>{children}</DictionaryProvider>;
}
