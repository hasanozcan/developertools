'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, CircleAlert, Copy } from 'lucide-react';
import { trackCurrentToolEvent } from '@/lib/analytics';
import { useLanguage } from '@/context/LanguageContext';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleCopy = useCallback(async () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
      setStatus('copied');
      trackCurrentToolEvent('tool_copied');
    } catch {
      setStatus('error');
    }
    resetTimer.current = setTimeout(() => setStatus('idle'), 3_000);
  }, [text]);

  const label =
    status === 'copied'
      ? t('common.copied')
      : status === 'error'
        ? t('common.copyFailed')
        : t('common.copy');

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md
        bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors ${className}`}
      disabled={!text}
      aria-live="polite"
      aria-label={label}
    >
      {status === 'copied' ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
          {label}
        </>
      ) : status === 'error' ? (
        <>
          <CircleAlert className="w-4 h-4 text-red-500" />
          {label}
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  );
}
