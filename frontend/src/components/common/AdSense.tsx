'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

export default function AdSense({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdSenseProps) {
  const { t, language } = useLanguage();
  const adRef = useRef<HTMLElement | null>(null);
  const pushedRef = useRef(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

    // Always show in-app fallback when AdSense is not configured.
    if (!adClient) {
      setShowFallback(true);
      return;
    }

    let isCancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const activateFallback = () => {
      if (!isCancelled) setShowFallback(true);
    };

    const evaluateSlot = () => {
      const slotElement = adRef.current;
      if (!slotElement) return 'pending' as const;

      const computed = window.getComputedStyle(slotElement);
      const isHidden =
        computed.display === 'none' ||
        computed.visibility === 'hidden' ||
        slotElement.offsetHeight === 0 ||
        slotElement.offsetWidth === 0;

      const adsByGoogleStatus = slotElement.getAttribute('data-adsbygoogle-status');
      const adStatus = slotElement.getAttribute('data-ad-status');
      const hasIframe = slotElement.querySelector('iframe') !== null;

      if (isHidden || adStatus === 'unfilled') return 'fallback' as const;
      if (hasIframe || adsByGoogleStatus === 'done' || adStatus === 'filled') return 'loaded' as const;

      return 'pending' as const;
    };

    try {
      if (!pushedRef.current) {
        // Queue render request even if the AdSense script hasn't loaded yet.
        // If script/network is blocked we switch to fallback after checks.
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
      activateFallback();
      return;
    }

    let attempts = 0;
    const maxAttempts = 5;
    intervalId = setInterval(() => {
      attempts += 1;
      const result = evaluateSlot();

      if (result === 'loaded') {
        if (intervalId) clearInterval(intervalId);
        return;
      }

      if (result === 'fallback' || attempts >= maxAttempts) {
        if (intervalId) clearInterval(intervalId);
        activateFallback();
      }
    }, 1500);

    return () => {
      isCancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [slot, format, responsive]);

  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const contactHref = language === 'en' ? '/contact' : `/contact?lang=${language}`;

  return (
    <div className={className}>
      {adClient && !showFallback ? (
        <ins
          ref={(node) => {
            adRef.current = node;
          }}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      ) : (
        <a
          href={contactHref}
          className="flex h-full min-h-[96px] w-full items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white px-4 py-3 text-gray-700 transition-colors hover:border-primary-400 hover:from-primary-50 hover:to-white dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 dark:text-gray-200 dark:hover:border-primary-500 dark:hover:from-primary-950/40"
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-300">
              {t('ads.fallback.badge')}
            </p>
            <p className="truncate text-sm font-medium">{t('ads.fallback.title')}</p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">{t('ads.fallback.subtitle')}</p>
          </div>
          <span className="shrink-0 rounded-md bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white dark:bg-primary-500">
            {t('ads.fallback.cta')}
          </span>
        </a>
      )}
    </div>
  );
}
