'use client';

import { useEffect, useRef, useState } from 'react';
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
  const adRef = useRef<HTMLElement | null>(null);
  const shadowHostRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

    // Always show self-hosted content when AdSense is not configured.
    if (!adClient) {
      setShowFallback(true);
      return;
    }

    const host = shadowHostRef.current;
    if (!host) return;

    let isCancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const activateFallback = () => {
      if (!isCancelled) setShowFallback(true);
    };

    const evaluateSlot = () => {
      const slotElement = adRef.current;
      if (!slotElement) return 'pending' as const;

      // For Shadow DOM, we need to check the element inside shadow root
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
      // Create or reuse shadow root
      let shadowRoot = host.shadowRoot;
      if (!shadowRoot) {
        shadowRoot = host.attachShadow({ mode: 'open' });
      }

      // Check if this slot already has an ins element with ads
      const existingIns = shadowRoot.querySelector('ins.adsbygoogle[data-ad-slot="' + slot + '"]');
      if (existingIns) {
        // Already initialized, skip
        adRef.current = existingIns;
        return;
      }

      // Create ins element inside shadow DOM
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', adClient);
      ins.setAttribute('data-ad-slot', slot);
      ins.setAttribute('data-ad-format', format);
      ins.setAttribute('data-full-width-responsive', responsive ? 'true' : 'false');

      // Clear previous content (for reload scenarios)
      shadowRoot.innerHTML = '';
      shadowRoot.appendChild(ins);

      // Update ref to point to shadow DOM element
      adRef.current = ins;

      // Only push if script is loaded and not already initialized
      if (initializedRef.current) return;

      initializedRef.current = true;

      // Wait for adsbygoogle to be available, then push
      const tryPush = () => {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else {
          // Script not loaded yet, try again in 100ms
          setTimeout(tryPush, 100);
        }
      };
      tryPush();
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

  // Show fallback when AdSense is not configured or failed to load
  if (!adClient || showFallback) {
    return (
      <div className={className}>
        <ContentHighlight
          variant={formatToVariant(format ?? 'auto')}
          className="w-full h-full"
        />
      </div>
    );
  }

  // Shadow DOM host - ad blocker cannot see elements inside shadow root
  return <div ref={shadowHostRef} className={className} />;
}
