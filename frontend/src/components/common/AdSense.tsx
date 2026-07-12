'use client';

import { useEffect, useRef, useState } from 'react';
import ContentHighlight from '@/components/common/ContentHighlight';
import { normalizeAdSenseClientId } from '@/lib/adsense';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AD_RENDER_TIMEOUT_MS = 8000;

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

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
  const adClient = normalizeAdSenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID);
  const requestKey = `${adClient ?? 'fallback'}:${slot}:${format}:${responsive}`;
  const adRef = useRef<HTMLElement | null>(null);
  const pushedRequestRef = useRef<string | null>(null);
  const [failedRequestKey, setFailedRequestKey] = useState<string | null>(null);
  const showFallback = !adClient || failedRequestKey === requestKey;

  useEffect(() => {
    const slotElement = adRef.current;
    if (!adClient || !slotElement || showFallback) return;

    let cancelled = false;
    let settled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let observer: MutationObserver | undefined;

    const stopWatching = () => {
      settled = true;
      observer?.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };

    const activateFallback = () => {
      if (cancelled || settled) return;
      stopWatching();
      setFailedRequestKey(requestKey);
    };

    const evaluateSlot = () => {
      if (cancelled || settled) return;

      const computed = window.getComputedStyle(slotElement);
      const adStatus = slotElement.getAttribute('data-ad-status');
      const hasIframe = slotElement.querySelector('iframe') !== null;

      if (
        computed.display === 'none' ||
        computed.visibility === 'hidden' ||
        adStatus === 'unfilled'
      ) {
        activateFallback();
        return;
      }

      if (hasIframe || adStatus === 'filled') stopWatching();
    };

    observer = new MutationObserver(evaluateSlot);
    observer.observe(slotElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    timeoutId = setTimeout(activateFallback, AD_RENDER_TIMEOUT_MS);

    try {
      if (pushedRequestRef.current !== requestKey) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRequestRef.current = requestKey;
      }
      evaluateSlot();
    } catch (error) {
      console.error('AdSense error:', error);
      activateFallback();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [adClient, requestKey, showFallback]);

  if (showFallback) {
    return (
      <div data-site-support-slot="true" className={className}>
        <ContentHighlight variant={formatToVariant(format)} className="h-full w-full" />
      </div>
    );
  }

  return (
    <div data-site-support-slot="true" className={className}>
      <ins
        key={requestKey}
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
    </div>
  );
}
