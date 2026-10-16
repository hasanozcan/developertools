'use client';

import { useEffect } from 'react';
import { trackProductEvent } from '@/lib/analytics';
import { isAdSenseAllowedInBrowser } from '@/lib/adsense';

const MAX_SCRIPT_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [1500, 5000] as const;

type AdSenseScriptState = {
  attempt: number;
  loaded: boolean;
};

const scriptStates = new WeakMap<HTMLScriptElement, AdSenseScriptState>();

function findAdSenseScript(src: string) {
  return Array.from(document.scripts).find((script) => script.src === src) ?? null;
}

export const ADSENSE_SCRIPT_READY_EVENT = 'devstools:adsense-script-ready';

export default function AdSenseScriptLoader({ clientId }: { clientId: string }) {
  useEffect(() => {
    if (!isAdSenseAllowedInBrowser()) return;

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
      const state = scriptStates.get(observedScript) ?? {
        attempt: Math.max(attempt, 1),
        loaded: false,
      };
      state.loaded = true;
      scriptStates.set(observedScript, state);
      detachScriptListeners();
      announceReady(state.attempt);
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
      const failedAttempt = scriptStates.get(failedScript)?.attempt ?? Math.max(attempt, 1);
      detachScriptListeners();
      scriptStates.delete(failedScript);
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
      if (disposed || !isAdSenseAllowedInBrowser()) return;

      const existing = findAdSenseScript(src);
      if (existing) {
        const state = scriptStates.get(existing);
        if (state?.loaded) {
          announceReady();
          return;
        }
        attempt = Math.max(attempt, state?.attempt ?? 1);
        observe(existing);
        return;
      }

      if (typeof navigator !== 'undefined' && !navigator.onLine) return;

      attempt += 1;
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.crossOrigin = 'anonymous';
      scriptStates.set(script, { attempt, loaded: false });
      observe(script);
      document.head.appendChild(script);
    }

    const retryWhenOnline = () => {
      if (disposed || !isAdSenseAllowedInBrowser()) return;
      const existing = findAdSenseScript(src);
      if (existing && scriptStates.get(existing)?.loaded) return;
      if (retryTimer !== undefined) window.clearTimeout(retryTimer);
      retryTimer = undefined;
      attempt = 0;
      if (existing) {
        scriptStates.delete(existing);
        existing.remove();
      }
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
