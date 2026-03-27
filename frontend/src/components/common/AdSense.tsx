'use client';

import { useEffect, useRef, useState } from 'react';
import ContentHighlight from '@/components/common/ContentHighlight';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// Global tracking for initialized ad slots to prevent duplicate pushes
const initializedSlots = new Set<string>();

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
  const [showFallback, setShowFallback] = useState(false);
  const instanceIdRef = useRef<string>(`${slot}-${Date.now()}-${Math.random().toString(36).slice(2)}`);

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
    let pushTimeoutId: ReturnType<typeof setTimeout> | undefined;

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

      // Check if this slot already has an ins element that has been processed
      const existingIns = shadowRoot.querySelector('ins.adsbygoogle[data-ad-slot="' + slot + '"]') as HTMLElement | null;
      if (existingIns) {
        const existingStatus = existingIns.getAttribute('data-adsbygoogle-status');
        // If already processed, just reference it and skip push
        if (existingStatus === 'done') {
          adRef.current = existingIns;
          return;
        }
        // If pending but not done, check if we already pushed for this slot
        if (initializedSlots.has(slot)) {
          adRef.current = existingIns;
          return;
        }
      }

      // Check if this slot was already initialized globally
      if (initializedSlots.has(slot)) {
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

      // Mark this slot as initialized BEFORE pushing to prevent race conditions
      initializedSlots.add(slot);

      // Wait for adsbygoogle to be available, then push
      const tryPush = () => {
        if (isCancelled) return;
        
        if (window.adsbygoogle) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch {
            // Silently handle push errors - already pushed
          }
        } else {
          // Script not loaded yet, try again in 100ms
          pushTimeoutId = setTimeout(tryPush, 100);
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
      if (pushTimeoutId) clearTimeout(pushTimeoutId);
      // Remove from initialized slots on unmount so it can be re-initialized if remounted
      initializedSlots.delete(slot);
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
