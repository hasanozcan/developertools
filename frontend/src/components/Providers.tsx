'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { HistoryProvider } from '@/context/HistoryContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <HistoryProvider>
            {children}
          </HistoryProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
