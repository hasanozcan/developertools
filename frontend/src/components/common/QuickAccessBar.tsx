'use client';

import React from 'react';
import Link from '@/components/common/LocalizedLink';
import { History, Star, ShieldCheck, Sparkles, Command } from 'lucide-react';
import { useHistory } from '@/context/HistoryContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useLanguage } from '@/context/LanguageContext';
import { findCatalogTool } from '@/lib/api';

interface QuickAccessBarProps {
  currentSlug?: string;
  className?: string;
}

export default function QuickAccessBar({ currentSlug, className = '' }: QuickAccessBarProps) {
  const { history } = useHistory();
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  // Filter out the currently active tool from recents
  const recentItems = history.filter((item) => item.slug !== currentSlug).slice(0, 5);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 rounded-2xl border border-slate-200/80 bg-white/70 shadow-xs backdrop-blur-md dark:border-white/5 dark:bg-slate-900/60 text-xs ${className}`}
    >
      {/* Left: Recent / Favorite Quick Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
        {recentItems.length > 0 ? (
          <>
            <span className="flex items-center gap-1 font-semibold text-slate-400 dark:text-slate-500 shrink-0 text-[11px]">
              <History className="h-3.5 w-3.5 text-indigo-500" />
              <span className="hidden sm:inline">{t('common.recentTools') || 'Recent'}:</span>
            </span>
            {recentItems.map((item) => {
              const catalogTool = findCatalogTool(item.slug);
              const category = catalogTool?.categorySlug || item.category || 'tools';
              const name = t(`toolName.${item.slug}`) !== `toolName.${item.slug}` ? t(`toolName.${item.slug}`) : item.name;
              return (
                <Link
                  key={item.slug}
                  href={`/tools/${category}/${item.slug}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/80 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-medium transition dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 shrink-0 text-[11px]"
                >
                  <span className="truncate max-w-[120px]">{name}</span>
                </Link>
              );
            })}
          </>
        ) : (
          <span className="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400 text-[11px]">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>{t('header.exploreTools') || 'Fast, Private & Client-Side Developer Suite'}</span>
          </span>
        )}
      </div>

      {/* Right: Privacy Badge */}
      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 font-medium dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-300 text-[11px]">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          <span>{t('common.clientSideBadge') || '100% Client-Side • Private'}</span>
        </div>
      </div>
    </div>
  );
}
