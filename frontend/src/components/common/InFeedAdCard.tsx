'use client';

import React from 'react';
import AdSense from './AdSense';

interface InFeedAdCardProps {
  className?: string;
  slot?: string;
}

export default function InFeedAdCard({ className = '', slot = '1733348098' }: InFeedAdCardProps) {
  return (
    <div
      data-ad-banner="true"
      className={`rounded-2xl p-4 border border-dashed border-indigo-200/80 bg-gradient-to-br from-indigo-50/40 to-slate-50/50 dark:border-indigo-500/20 dark:from-indigo-950/20 dark:to-slate-900/30 flex flex-col justify-between items-stretch min-h-[140px] relative group transition-all hover:border-indigo-300 dark:hover:border-indigo-500/40 ${className}`}
    >
      <div className="flex items-center justify-between gap-1.5 mb-2">
        <span className="inline-flex items-center rounded-md bg-indigo-100/80 dark:bg-indigo-900/40 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-700/40">
          Advertisements
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        <AdSense slot={slot} format="auto" responsive={true} className="w-full min-h-[90px]" />
      </div>
    </div>
  );
}
