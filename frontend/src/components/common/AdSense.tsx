'use client';

import { useEffect, useRef, useState } from 'react';
import { normalizeAdSenseClientId } from '@/lib/adsense';

declare global {
  interface Window {
    adsbygoogle: unknown[];
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
  const adClient = normalizeAdSenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID);
  const requestKey = `${adClient}:${slot}:${format}:${responsive}`;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const adRef = useRef<HTMLElement | null>(null);
  const pushedRequestRef = useRef<string | null>(null);
  const [shouldRequestAd, setShouldRequestAd] = useState(false);
  const [isUnfilled, setIsUnfilled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!adClient || !container) return;

    if (!('IntersectionObserver' in window)) {
      setShouldRequestAd(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldRequestAd(true);
        observer.disconnect();
      },
      { rootMargin: '400px 0px' },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [adClient]);

  useEffect(() => {
    const slotElement = adRef.current;
    if (!adClient || !slotElement || !shouldRequestAd) return;

    try {
      if (pushedRequestRef.current !== requestKey) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRequestRef.current = requestKey;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adClient, requestKey, shouldRequestAd]);

  useEffect(() => {
    const slotElement = adRef.current;
    if (!slotElement || typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver(() => {
      if (slotElement.getAttribute('data-ad-status') === 'unfilled') {
        setIsUnfilled(true);
      }
    });

    observer.observe(slotElement, { attributes: true, attributeFilter: ['data-ad-status'] });
    return () => observer.disconnect();
  }, []);

  if (!adClient) return null;

  return (
    <div
      ref={containerRef}
      data-site-support-slot={shouldRequestAd ? 'true' : undefined}
      className={`${className} ${isUnfilled ? 'hidden' : ''}`.trim()}
    >
      <ins
        key={requestKey}
        ref={(node) => {
          adRef.current = node;
        }}
        className="adsbygoogle"
        style={{ display: isUnfilled ? 'none' : 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
