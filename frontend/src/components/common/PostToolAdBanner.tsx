'use client';

import React from 'react';
import AdSense from './AdSense';

interface PostToolAdBannerProps {
  className?: string;
  slot?: string;
}

export default function PostToolAdBanner({
  className = '',
  slot = '1733348098',
}: PostToolAdBannerProps) {
  return (
    <div
      className={`w-full rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-50/70 via-white to-slate-50/70 p-3 sm:p-4 my-6 shadow-sm overflow-hidden text-center backdrop-blur-sm dark:border-white/10 dark:from-slate-900/50 dark:via-slate-900/30 dark:to-slate-900/50 ${className}`}
    >
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/50">
          Sponsored
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          Support Free Developer Tools
        </span>
      </div>
      <div className="flex justify-center items-center w-full min-h-[90px] max-h-[120px] overflow-hidden">
        <AdSense
          slot={slot}
          format="horizontal"
          responsive={true}
          className="w-full max-w-4xl min-h-[90px] max-h-[120px] overflow-hidden"
        />
      </div>
    </div>
  );
}
