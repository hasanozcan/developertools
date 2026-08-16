'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { normalizeAdSenseClientId } from '@/lib/adsense';
import { detectContentBlocker } from '@/lib/contentBlockerDetection';

interface ContentBlockerOverlayProps {
  reloadPage?: () => void;
}

const reloadCurrentPage = () => window.location.reload();

export default function ContentBlockerOverlay({
  reloadPage = reloadCurrentPage,
}: ContentBlockerOverlayProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const adClient = normalizeAdSenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID);
  const [hasMonetizedContent, setHasMonetizedContent] = useState(false);
  const [detected, setDetected] = useState(false);
  const [checking, setChecking] = useState(false);
  const checkRunId = useRef(0);
  const hasMonetizedContentRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const runDetection = useCallback(async () => {
    if (!adClient || !pathname || !hasMonetizedContent) {
      checkRunId.current += 1;
      // Ignore the initial effect's stale `false` value when the slot observer
      // has already found monetized content and queued the next render.
      if (!adClient || !pathname || !hasMonetizedContentRef.current) {
        setDetected(false);
        setChecking(false);
      }
      return;
    }

    const runId = ++checkRunId.current;
    setChecking(true);
    const result = await detectContentBlocker(adClient);

    if (checkRunId.current !== runId) return;
    // Keep useful content available while the probe is pending or inconclusive.
    // Only a positive blocker signal may open the modal.
    setDetected(result === 'blocked');
    setChecking(false);
  }, [adClient, hasMonetizedContent, pathname]);

  useEffect(() => {
    const updateSlotPresence = () => {
      const hasSlot = document.querySelector('[data-site-support-slot="true"]') !== null;
      const slotAppeared = hasSlot && !hasMonetizedContentRef.current;
      hasMonetizedContentRef.current = hasSlot;
      setHasMonetizedContent(hasSlot);
      if (slotAppeared) {
        setDetected(false);
        setChecking(true);
      } else if (!hasSlot) {
        setDetected(false);
        setChecking(false);
      }
    };

    updateSlotPresence();
    const observer = new MutationObserver(updateSlotPresence);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-site-support-slot'],
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    void runDetection();
    return () => {
      checkRunId.current += 1;
    };
  }, [runDetection]);

  useEffect(() => {
    if (!adClient || !hasMonetizedContent || detected) return;

    const recheck = () => void runDetection();
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') recheck();
    };

    window.addEventListener('focus', recheck);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('focus', recheck);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [adClient, detected, hasMonetizedContent, runDetection]);

  useEffect(() => {
    if (!detected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [detected]);

  const keepFocusInsideDialog = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const buttons = Array.from(
      dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [],
    );
    if (buttons.length === 0) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (document.activeElement === dialogRef.current) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
      return;
    }
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!adClient || !detected) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="adblock-title"
        aria-describedby="adblock-message"
        aria-busy={checking}
        tabIndex={-1}
        onKeyDown={keepFocusInsideDialog}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl outline-none dark:bg-gray-800"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
          <svg
            className="h-7 w-7 text-amber-600 dark:text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h2
          id="adblock-title"
          className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white"
        >
          {t('adblock.title')}
        </h2>
        <p
          id="adblock-message"
          className="mb-6 text-center text-sm text-gray-600 dark:text-gray-300"
        >
          {t('adblock.message')}
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={reloadPage}
            disabled={checking}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            {checking && (
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            <span aria-live="polite">{checking ? t('adblock.checking') : t('adblock.retry')}</span>
          </button>
          <button
            type="button"
            onClick={reloadPage}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t('adblock.reload')}
          </button>
        </div>
      </div>
    </div>
  );
}
