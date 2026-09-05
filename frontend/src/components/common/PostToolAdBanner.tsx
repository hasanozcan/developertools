'use client';

import React from 'react';
import AdSense from './AdSense';

interface PostToolAdBannerProps {
  className?: string;
  slot?: string;
}

export default function PostToolAdBanner({
  className = '',
  slot = process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || '7781534087',
}: PostToolAdBannerProps) {
  return (
    <div
      data-ad-banner="true"
      className={`w-full rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-50/70 via-white to-slate-50/70 p-3 sm:p-4 my-6 shadow-sm text-center backdrop-blur-sm dark:border-white/10 dark:from-slate-900/50 dark:via-slate-900/30 dark:to-slate-900/50 ${className}`}
    >
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50">
          Advertisements
        </span>
      </div>
      <div className="flex justify-center items-center w-full min-h-[90px]">
        <AdSense
          slot={slot}
          format="horizontal"
          responsive={true}
          className="w-full max-w-4xl min-h-[90px]"
        />
      </div>
    </div>
  );
}
