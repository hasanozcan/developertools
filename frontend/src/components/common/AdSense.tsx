'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ContentHighlight from '@/components/common/ContentHighlight';

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

/**
 * Map AdSense format to ContentHighlight variant.
 */
function formatToVariant(format: string): 'horizontal' | 'vertical' | 'rectangle' {
  if (format === 'vertical') return 'vertical';
  if (format === 'rectangle') return 'rectangle';
  return 'horizontal';
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

    // Always show self-hosted content when AdSense is not configured.
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
        /* Self-hosted promotion — renders even with content blockers active */
        <ContentHighlight
          variant={formatToVariant(format ?? 'auto')}
          className="w-full h-full"
        />
      )}
    </div>
  );
}
