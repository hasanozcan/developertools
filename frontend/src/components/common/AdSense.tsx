'use client';

import { useEffect, useRef } from 'react';
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
  const adRef = useRef<HTMLElement | null>(null);
  const pushedRequestRef = useRef<string | null>(null);

  useEffect(() => {
    const slotElement = adRef.current;
    if (!adClient || !slotElement) return;

    try {
      if (pushedRequestRef.current !== requestKey) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRequestRef.current = requestKey;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adClient, requestKey]);

  if (!adClient) return null;

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
