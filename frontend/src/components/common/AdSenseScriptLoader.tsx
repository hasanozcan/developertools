'use client';

import { useEffect } from 'react';
import { trackProductEvent } from '@/lib/analytics';

const MAX_SCRIPT_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [1500, 5000] as const;
const SCRIPT_SELECTOR = 'script[data-devstools-adsense-loader="true"]';

export const ADSENSE_SCRIPT_READY_EVENT = 'devstools:adsense-script-ready';

export default function AdSenseScriptLoader({ clientId }: { clientId: string }) {
  useEffect(() => {
    let disposed = false;
    let attempt = 0;
    let retryTimer: number | undefined;
    let observedScript: HTMLScriptElement | null = null;

    const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;

    const announceReady = (loadedAttempt?: number) => {
      if (loadedAttempt !== undefined) {
        trackProductEvent('adsense_script_loaded', { attempt: loadedAttempt });
      }
      window.dispatchEvent(new Event(ADSENSE_SCRIPT_READY_EVENT));
    };

    const detachScriptListeners = () => {
      observedScript?.removeEventListener('load', handleLoad);
      observedScript?.removeEventListener('error', handleError);
      observedScript = null;
    };

    const handleLoad = () => {
      if (!observedScript || disposed) return;
      observedScript.dataset.loaded = 'true';
      const loadedAttempt = Number(observedScript.dataset.attempt || attempt || 1);
      detachScriptListeners();
      announceReady(loadedAttempt);
    };

    const scheduleRetry = () => {
      if (disposed || attempt >= MAX_SCRIPT_ATTEMPTS || retryTimer !== undefined) return;
      const delay = RETRY_DELAYS_MS[Math.min(attempt - 1, RETRY_DELAYS_MS.length - 1)];
      retryTimer = window.setTimeout(() => {
        retryTimer = undefined;
        loadScript();
      }, delay);
    };

    const handleError = () => {
      if (!observedScript || disposed) return;
      const failedScript = observedScript;
      const failedAttempt = Number(failedScript.dataset.attempt || attempt || 1);
      detachScriptListeners();
      failedScript.remove();
      trackProductEvent('adsense_script_load_failed', { attempt: failedAttempt });
      scheduleRetry();
    };

    function observe(script: HTMLScriptElement) {
      detachScriptListeners();
      observedScript = script;
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
    }

    function loadScript() {
      if (disposed) return;

      const existing = document.querySelector<HTMLScriptElement>(SCRIPT_SELECTOR);
      if (existing) {
        if (existing.dataset.loaded === 'true') {
          announceReady();
          return;
        }
        attempt = Math.max(attempt, Number(existing.dataset.attempt || 1));
        observe(existing);
        return;
      }

      if (typeof navigator !== 'undefined' && !navigator.onLine) return;

      attempt += 1;
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.crossOrigin = 'anonymous';
      script.dataset.devstoolsAdsenseLoader = 'true';
      script.dataset.attempt = String(attempt);
      observe(script);
      document.head.appendChild(script);
    }

    const retryWhenOnline = () => {
      if (disposed) return;
      const existing = document.querySelector<HTMLScriptElement>(SCRIPT_SELECTOR);
      if (existing?.dataset.loaded === 'true') return;
      if (retryTimer !== undefined) window.clearTimeout(retryTimer);
      retryTimer = undefined;
      attempt = 0;
      existing?.remove();
      detachScriptListeners();
      loadScript();
    };

    window.addEventListener('online', retryWhenOnline);
    loadScript();

    return () => {
      disposed = true;
      window.removeEventListener('online', retryWhenOnline);
      if (retryTimer !== undefined) window.clearTimeout(retryTimer);
      detachScriptListeners();
    };
  }, [clientId]);

  return null;
}
