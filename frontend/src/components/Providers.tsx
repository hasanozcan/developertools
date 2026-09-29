'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { HistoryProvider } from '@/context/HistoryContext';
import { LanguageProvider, type Language } from '@/context/LanguageContext';
import ContentBlockerOverlay from '@/components/common/ContentBlockerOverlay';
import { WorkspaceProvider } from '@/context/WorkspaceContext';
import { ReactNode } from 'react';

export function Providers({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Language;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={initialLocale}>
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
