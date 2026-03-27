'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const shadowHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;
    const host = shadowHostRef.current;

    if (!adClient || !host) return;

    try {
      // Create or reuse shadow root
      let shadowRoot = host.shadowRoot;
      if (!shadowRoot) {
        shadowRoot = host.attachShadow({ mode: 'open' });
      }

      // Create ins element inside shadow DOM
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', adClient);
      ins.setAttribute('data-ad-slot', slot);
      ins.setAttribute('data-ad-format', format);
      ins.setAttribute('data-full-width-responsive', 'true');

      // Clear previous content
      shadowRoot.innerHTML = '';
      shadowRoot.appendChild(ins);

      // Push to adsbygoogle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [slot, format]);

  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

  if (!adClient) {
    // Placeholder for development
    return (
      <div className={`ad-container rounded-lg ${className}`}>
        <span className="text-sm">Advertisement</span>
      </div>
    );
  }

  // Shadow DOM host
  return <div ref={shadowHostRef} className={`ad-container rounded-lg ${className}`} />;
}
