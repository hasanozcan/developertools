'use client';

import { Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface FavoriteButtonProps {
  toolSlug: string;
  className?: string;
}

export default function FavoriteButton({ toolSlug, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(toolSlug);

  return (
    <button
      onClick={() => toggleFavorite(toolSlug)}
      className={`p-2 rounded-lg transition-colors ${
        favorited
          ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30'
          : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700'
      } ${className}`}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
    </button>
  );
}
