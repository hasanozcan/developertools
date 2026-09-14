'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { HistoryProvider } from '@/context/HistoryContext';
import { LanguageProvider } from '@/context/LanguageContext';
import ContentBlockerOverlay from '@/components/common/ContentBlockerOverlay';
import { WorkspaceProvider } from '@/context/WorkspaceContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <WorkspaceProvider>
          <FavoritesProvider>
            <HistoryProvider>
              {children}
              <ContentBlockerOverlay />
            </HistoryProvider>
          </FavoritesProvider>
        </WorkspaceProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
