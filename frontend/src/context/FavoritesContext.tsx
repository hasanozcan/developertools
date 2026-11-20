'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { isToolSlug } from '@/lib/api';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (toolSlug: string) => void;
  removeFavorite: (toolSlug: string) => void;
  toggleFavorite: (toolSlug: string) => void;
  isFavorite: (toolSlug: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

function sanitizeFavorites(parsed: unknown): string[] {
  if (!Array.isArray(parsed)) return [];
  return [
    ...new Set(
      parsed.filter((slug): slug is string => typeof slug === 'string' && isToolSlug(slug)),
    ),
  ];
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('favorites');
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        setFavorites(sanitizeFavorites(parsed));
      }
    } catch {
      setFavorites([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {
      // Keep favorites usable in memory when storage is unavailable.
    }
  }, [favorites, isInitialized]);

  const addFavorite = (toolSlug: string) => {
    setFavorites((prev) => {
      if (prev.includes(toolSlug)) return prev;
      return [...prev, toolSlug];
    });
  };

  const removeFavorite = (toolSlug: string) => {
    setFavorites((prev) => prev.filter((slug) => slug !== toolSlug));
  };

  const toggleFavorite = (toolSlug: string) => {
    setFavorites((prev) =>
      prev.includes(toolSlug) ? prev.filter((slug) => slug !== toolSlug) : [...prev, toolSlug],
    );
  };

  const isFavorite = (toolSlug: string) => favorites.includes(toolSlug);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
