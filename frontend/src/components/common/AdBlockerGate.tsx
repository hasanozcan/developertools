'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function isBaitBlocked() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const bait = document.createElement('div');
  bait.className = 'adsbox adsbygoogle ad ad-banner ad-unit ad-zone';
  bait.style.position = 'absolute';
  bait.style.left = '-9999px';
  bait.style.top = '-9999px';
  bait.style.width = '1px';
  bait.style.height = '1px';
  bait.style.pointerEvents = 'none';
  bait.style.opacity = '0';

  document.body.appendChild(bait);

  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await sleep(50);

  const computed = window.getComputedStyle(bait);
  const blocked =
    computed.display === 'none' ||
    computed.visibility === 'hidden' ||
    bait.offsetHeight === 0 ||
    bait.offsetWidth === 0;

  bait.remove();
  return blocked;
}

async function canReachAdSenseScript(adClient: string) {
  if (typeof fetch !== 'function') return true;

  const url = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adClient)}`;
  const timeoutMs = 2500;

  let controller: AbortController | undefined;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    if (typeof AbortController !== 'undefined') {
      controller = new AbortController();
      timeout = setTimeout(() => controller?.abort(), timeoutMs);
    }

    await fetch(url, {
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller?.signal,
    });

    return true;
  } catch (error) {
    const name = typeof error === 'object' && error !== null && 'name' in error ? String((error as any).name) : '';
    if (name === 'AbortError') return true;
    return false;
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function detectAdBlocker(adClient: string) {
  const baitBlocked = await isBaitBlocked();
  if (baitBlocked) return true;

  const reachable = await canReachAdSenseScript(adClient);
  return !reachable;
}

export default function AdBlockerGate() {
  const { t } = useLanguage();
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checking, setChecking] = useState(true);
  const checkRunId = useRef(0);

  const runCheck = useCallback(async () => {
    if (!adClient) return;

    setChecking(true);
    const runId = (checkRunId.current += 1);

    const detected = await detectAdBlocker(adClient);
    if (checkRunId.current !== runId) return;

    setAdBlockDetected(detected);
    setChecking(false);
  }, [adClient]);

  useEffect(() => {
    if (!adClient) return;
    void runCheck();
  }, [adClient, runCheck]);

  useEffect(() => {
    if (!adClient || !adBlockDetected) return;

    const onVisibility = () => {
      if (document.visibilityState === 'visible') void runCheck();
    };

    window.addEventListener('focus', runCheck);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('focus', runCheck);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [adClient, adBlockDetected, runCheck]);

  if (!adClient || !adBlockDetected) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('adblock.title')}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('adblock.message')}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => void runCheck()}
            disabled={checking}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            <RefreshCw className={`h-4 w-4 ${checking ? 'animate-spin' : ''}`} />
            {checking ? t('adblock.checking') : t('adblock.retry')}
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            {t('adblock.reload')}
          </button>
        </div>
      </div>
    </div>
  );
}
