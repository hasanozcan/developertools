'use client';

import React, { useState } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ShareLinkButtonProps {
  data: Record<string, unknown> | string;
  className?: string;
  buttonText?: string;
}

export function encodeShareData(data: Record<string, unknown> | string): string {
  try {
    const json = typeof data === 'string' ? data : JSON.stringify(data);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(json))));
  } catch {
    return '';
  }
}

export function decodeShareData<T = any>(hashString: string): T | null {
  try {
    const raw = hashString.replace(/^#\/?/, '').replace(/^share=/, '');
    if (!raw) return null;
    const decoded = decodeURIComponent(escape(atob(decodeURIComponent(raw))));
    try {
      return JSON.parse(decoded) as T;
    } catch {
      return decoded as unknown as T;
    }
  } catch {
    return null;
  }
}

export default function ShareLinkButton({ data, className = '', buttonText }: ShareLinkButtonProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const encoded = encodeShareData(data);
    if (!encoded) return;

    const url = new URL(window.location.href);
    url.hash = `share=${encoded}`;
    window.history.replaceState({}, '', url.toString());

    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition shadow-2xs ${className}`}
      title={t('common.shareLink') || 'Share link with current data'}
      aria-label={t('common.shareLink') || 'Share link with current data'}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-emerald-600 dark:text-emerald-400">
            {t('common.linkCopied') || 'Link Copied!'}
          </span>
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5 text-indigo-500" />
          <span>{buttonText || t('common.shareLink') || 'Share Link'}</span>
        </>
      )}
    </button>
  );
}
