'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { HistoryProvider } from '@/context/HistoryContext';
import { LanguageProvider } from '@/context/LanguageContext';
import ContentBlockerOverlay from '@/components/common/ContentBlockerOverlay';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <HistoryProvider>
            {children}
            <ContentBlockerOverlay />
          </HistoryProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
