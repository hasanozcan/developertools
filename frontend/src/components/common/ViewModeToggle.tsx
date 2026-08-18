'use client';

import React from 'react';
import { Columns2, Rows2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export type ViewLayout = 'split' | 'stacked';

interface ViewModeToggleProps {
  layout: ViewLayout;
  onChange: (layout: ViewLayout) => void;
  className?: string;
}

export default function ViewModeToggle({ layout, onChange, className = '' }: ViewModeToggleProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl border border-slate-200/80 bg-slate-100/80 dark:border-white/5 dark:bg-slate-800/80 text-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange('split')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition ${
          layout === 'split'
            ? 'bg-white text-indigo-600 shadow-2xs dark:bg-slate-700 dark:text-white'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
        title={t('common.layoutSplit') || 'Side by Side'}
      >
        <Columns2 className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{t('common.layoutSplit') || 'Side by Side'}</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('stacked')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition ${
          layout === 'stacked'
            ? 'bg-white text-indigo-600 shadow-2xs dark:bg-slate-700 dark:text-white'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
        title={t('common.layoutStacked') || 'Stacked'}
      >
        <Rows2 className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{t('common.layoutStacked') || 'Stacked'}</span>
      </button>
    </div>
  );
}
