'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { HistoryProvider } from '@/context/HistoryContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <HistoryProvider>
          {children}
        </HistoryProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
