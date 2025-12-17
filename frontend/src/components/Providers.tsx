'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { HistoryProvider } from '@/context/HistoryContext';
import { LanguageProvider } from '@/context/LanguageContext';
import AdBlockerGate from '@/components/common/AdBlockerGate';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <HistoryProvider>
            {children}
            <AdBlockerGate />
          </HistoryProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
