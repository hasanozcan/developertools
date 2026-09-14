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
  const requestInFlightRef = useRef(false);
  const [hasRequestedAd, setHasRequestedAd] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const slotElement = adRef.current;
    if (!container || !slotElement || pushedRequestRef.current) return;

    let isNearViewport = immediate || typeof IntersectionObserver === 'undefined';
    let intersectionObserver: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let adStatusObserver: MutationObserver | undefined;
    let reportedAdStatus = false;
    let requestRetryTimer: number | undefined;
    let requestAttempts = 0;

    const disconnectRequestObservers = () => {
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', requestAd);
    };

    const disconnect = () => {
      disconnectRequestObservers();
      adStatusObserver?.disconnect();
      if (requestRetryTimer !== undefined) window.clearTimeout(requestRetryTimer);
    };

    const reportAdStatus = () => {
      if (reportedAdStatus) return;
      const status = slotElement.getAttribute('data-ad-status');
      if (status !== 'filled' && status !== 'unfilled') return;
      reportedAdStatus = true;
      const pathname = window.location.pathname;
      const toolMatch = /^\/(?:[a-z]{2}\/)?tools\/([^/]+)\/([^/]+)/.exec(pathname);
      const collectionMatch = /^\/(?:[a-z]{2}\/)?collections(?:\/([^/]+))?(?:\/|$)/.exec(pathname);
      trackProductEvent(status === 'filled' ? 'ad_slot_filled' : 'ad_slot_unfilled', {
        placement,
        format,
        slot,
        page_type: toolMatch ? 'tool' : collectionMatch ? 'collection' : pathname === '/' ? 'home' : 'other',
        category: toolMatch?.[1],
        tool: toolMatch?.[2],
        collection: collectionMatch?.[1],
      });
      adStatusObserver?.disconnect();
    };

    function requestAd() {
      if (
        pushedRequestRef.current ||
        requestInFlightRef.current ||
        !isNearViewport ||
        !slotElement?.isConnected
      )
        return;
      // Responsive parents can be display:none even for an immediate placement.
      if (slotElement.getBoundingClientRect().width <= 0) return;

      requestInFlightRef.current = true;
      requestAttempts += 1;
      // The Google queue scans all adsbygoogle elements. Keep hidden/lazy slots
      // out of that shared queue until their own placement is ready.
      slotElement.classList.add('adsbygoogle');
      const pathname = window.location.pathname;
      const toolMatch = /^\/(?:[a-z]{2}\/)?tools\/([^/]+)\/([^/]+)/.exec(pathname);
      const collectionMatch = /^\/(?:[a-z]{2}\/)?collections(?:\/([^/]+))?(?:\/|$)/.exec(pathname);
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRequestRef.current = true;
        requestInFlightRef.current = false;
        setHasRequestedAd(true);
        disconnectRequestObservers();
        trackProductEvent('ad_slot_requested', {
          placement,
          format,
          slot,
          attempt: requestAttempts,
          page_type: toolMatch ? 'tool' : collectionMatch ? 'collection' : pathname === '/' ? 'home' : 'other',
          category: toolMatch?.[1],
          tool: toolMatch?.[2],
          collection: collectionMatch?.[1],
        });
        if (typeof MutationObserver !== 'undefined') {
          adStatusObserver = new MutationObserver(reportAdStatus);
          adStatusObserver.observe(slotElement, {
            attributes: true,
            attributeFilter: ['data-ad-status'],
          });
          reportAdStatus();
        }
      } catch (error) {
        requestInFlightRef.current = false;
        trackProductEvent('ad_slot_request_failed', {
          placement,
          format,
          slot,
          attempt: requestAttempts,
          error: error instanceof Error ? error.name : 'unknown',
        });
        console.error('AdSense error:', error);

        // If Google already claimed this element, retrying the same <ins> can create
        // duplicate-slot errors. Otherwise keep the slot pending and retry a bounded
        // number of times for transient initialization races.
        if (slotElement.hasAttribute('data-adsbygoogle-status')) {
          pushedRequestRef.current = true;
          setHasRequestedAd(true);
          disconnectRequestObservers();
          return;
        }

        slotElement.classList.remove('adsbygoogle');
        if (requestAttempts < 3) {
          requestRetryTimer = window.setTimeout(requestAd, requestAttempts === 1 ? 500 : 1500);
        }
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
