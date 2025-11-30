'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (toolSlug: string) => void;
  removeFavorite: (toolSlug: string) => void;
  toggleFavorite: (toolSlug: string) => void;
  isFavorite: (toolSlug: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        setFavorites([]);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const addFavorite = (toolSlug: string) => {
    setFavorites(prev => {
      if (prev.includes(toolSlug)) return prev;
      return [...prev, toolSlug];
    });
  };

  const removeFavorite = (toolSlug: string) => {
    setFavorites(prev => prev.filter(slug => slug !== toolSlug));
  };

  const toggleFavorite = (toolSlug: string) => {
    if (favorites.includes(toolSlug)) {
      removeFavorite(toolSlug);
    } else {
      addFavorite(toolSlug);
    }
  };

  const isFavorite = (toolSlug: string) => favorites.includes(toolSlug);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
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
