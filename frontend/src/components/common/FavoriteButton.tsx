'use client';

import { Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { getToolAnalyticsContext, trackToolEvent } from '@/lib/analytics';

interface FavoriteButtonProps {
  toolSlug: string;
  className?: string;
}

export default function FavoriteButton({ toolSlug, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(toolSlug);

  const handleToggle = () => {
    const context = getToolAnalyticsContext();
    toggleFavorite(toolSlug);

    if (context) {
      trackToolEvent(
        favorited ? 'tool_favorite_removed' : 'tool_favorite_added',
        toolSlug,
        context.category,
      );
    }
  };

  return (
    <button
      onClick={handleToggle}
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
