'use client';

import { useEffect, useRef, useState } from 'react';
import { normalizeAdSenseClientId } from '@/lib/adsense';
import { trackProductEvent } from '@/lib/analytics';

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
  immediate?: boolean;
  placement?: string;
}

export default function AdSense({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  immediate = false,
  placement,
}: AdSenseProps) {
  const adClient = normalizeAdSenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID);
  if (!adClient) return null;

  return (
    <AdSenseSlot
      key={`${adClient}:${slot}:${format}:${responsive}:${placement || ''}`}
      adClient={adClient}
      slot={slot}
      format={format}
      responsive={responsive}
      className={className}
      immediate={immediate}
      placement={placement || `slot-${slot}`}
    />
  );
}

function AdSenseSlot({
  adClient,
  slot,
  format,
  responsive,
  className,
  immediate,
  placement,
}: Required<AdSenseProps> & { adClient: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const adRef = useRef<HTMLElement | null>(null);
  const pushedRequestRef = useRef(false);
  const [hasRequestedAd, setHasRequestedAd] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const slotElement = adRef.current;
    if (!container || !slotElement || pushedRequestRef.current) return;

    let isNearViewport = immediate || typeof IntersectionObserver === 'undefined';
    let intersectionObserver: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;

    const disconnect = () => {
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', requestAd);
    };

    function requestAd() {
      if (pushedRequestRef.current || !isNearViewport || !slotElement?.isConnected) return;
      // Responsive parents can be display:none even for an immediate placement.
      if (slotElement.getBoundingClientRect().width <= 0) return;

      pushedRequestRef.current = true;
      // The Google queue scans all adsbygoogle elements. Keep hidden/lazy slots
      // out of that shared queue until their own placement is ready.
      slotElement.classList.add('adsbygoogle');
      setHasRequestedAd(true);
      disconnect();
      const pathname = window.location.pathname;
      const toolMatch = /^\/(?:[a-z]{2}\/)?tools\/([^/]+)\/([^/]+)/.exec(pathname);
      const collectionMatch = /^\/collections\/([^/]+)/.exec(pathname);
      trackProductEvent('ad_slot_requested', {
        placement,
        format,
        slot,
        page_type: toolMatch ? 'tool' : collectionMatch ? 'collection' : pathname === '/' ? 'home' : 'other',
        category: toolMatch?.[1],
        tool: toolMatch?.[2],
        collection: collectionMatch?.[1],
      });
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }

    if (!immediate && typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          isNearViewport = entries.some((entry) => entry.isIntersecting);
          requestAd();
        },
        { rootMargin: '400px 0px' },
      );
      intersectionObserver.observe(container);
    }

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(requestAd);
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', requestAd);
    }

    requestAd();
    return disconnect;
  }, [format, immediate, placement, slot]);

  return (
    <div
      ref={containerRef}
      data-ad-container="true"
      data-site-support-slot={hasRequestedAd ? 'true' : undefined}
      className={className}
    >
      <ins
        ref={(node) => {
          adRef.current = node;
        }}
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
