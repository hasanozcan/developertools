'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { getToolAnalyticsContext, trackToolEvent } from '@/lib/analytics';

interface FavoriteButtonProps {
  toolSlug: string;
  className?: string;
}

export default function FavoriteButton({ toolSlug, className = '' }: FavoriteButtonProps) {
  const { t } = useLanguage();
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
      title={favorited ? t("uiText.c23fbb86") : t("uiText.09c13814")}
      aria-label={favorited ? t("uiText.c23fbb86") : t("uiText.09c13814")}
    >
      <Star className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
    </button>
  );
}
