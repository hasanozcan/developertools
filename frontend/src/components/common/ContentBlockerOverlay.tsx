'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { normalizeAdSenseClientId } from '@/lib/adsense';
import { trackProductEvent } from '@/lib/analytics';
import { detectContentBlocker } from '@/lib/contentBlockerDetection';
import {
  getContentBlockerGateState,
  getGateModeForCount,
  recordBlockedPageView,
  resetContentBlockerGate,
  type AdBlockGateMode,
} from '@/lib/contentBlockerGate';
import { useAdSenseAllowedHost } from './useAdSenseAllowedHost';

interface ContentBlockerOverlayProps {
  reloadPage?: () => void;
}

const reloadCurrentPage = () => window.location.reload();

const SUPPORT_SLOT_SELECTOR = '[data-site-support-slot="true"]';

const containsSupportSlot = (node: Node) =>
  node.nodeType === Node.ELEMENT_NODE &&
  ((node as Element).matches(SUPPORT_SLOT_SELECTOR) ||
    (node as Element).querySelector(SUPPORT_SLOT_SELECTOR) !== null);

function WarningTriangleIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
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
  );
}

export default function ContentBlockerOverlay({
  reloadPage = reloadCurrentPage,
}: ContentBlockerOverlayProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const adsAllowed = useAdSenseAllowedHost();
  const adClient = adsAllowed
    ? normalizeAdSenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID)
    : undefined;
  const [hasMonetizedContent, setHasMonetizedContent] = useState(false);
  const [gateMode, setGateMode] = useState<AdBlockGateMode | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [checking, setChecking] = useState(false);
  const checkRunId = useRef(0);
  const hasMonetizedContentRef = useRef(false);
  const recordedPathnameRef = useRef<string | null>(null);
  const trackedGateKeyRef = useRef<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const runDetection = useCallback(async () => {
    if (!adClient || !pathname || !hasMonetizedContent) {
      checkRunId.current += 1;
      // Ignore the initial effect's stale `false` value when the slot observer
      // has already found monetized content and queued the next render.
      if (!adClient || !pathname || !hasMonetizedContentRef.current) {
        setGateMode(null);
        setChecking(false);
      }
      return;
    }

    const runId = ++checkRunId.current;
    setChecking(true);
    const result = await detectContentBlocker(adClient);

    if (checkRunId.current !== runId) return;

    if (result === 'blocked') {
      // Increment at most once per unique page mount / pathname so focus and
      // visibility rechecks on the same page do not escalate Tier 1 to Tier 2.
      const gateState =
        recordedPathnameRef.current !== pathname
          ? recordBlockedPageView()
          : getContentBlockerGateState();
      recordedPathnameRef.current = pathname;
      setGateMode(getGateModeForCount(gateState.count));
    } else if (result === 'clear') {
      resetContentBlockerGate();
      recordedPathnameRef.current = null;
      setGateMode(null);
    } else {
      // Keep useful content available while the probe is inconclusive.
      setGateMode(null);
    }
    setChecking(false);
  }, [adClient, hasMonetizedContent, pathname]);

  useEffect(() => {
    setDismissed(false);
    setGateMode(null);
    trackedGateKeyRef.current = null;

    // The slot currently backing `hasMonetizedContent`, so mutations while a
    // slot is mounted can be handled with an O(1) `isConnected` check instead
    // of a document-wide query on every DOM change (e.g. each tool keystroke).
    let trackedSlot: Element | null = null;

    const applySlotPresence = (slot: Element | null) => {
      trackedSlot = slot;
      const hasSlot = slot !== null;
      const slotAppeared = hasSlot && !hasMonetizedContentRef.current;
      hasMonetizedContentRef.current = hasSlot;
      setHasMonetizedContent(hasSlot);
      if (slotAppeared) {
        setGateMode(null);
        setChecking(true);
      } else if (!hasSlot) {
        setGateMode(null);
        setChecking(false);
      }
    };

    const findSlot = () => document.querySelector(SUPPORT_SLOT_SELECTOR);
    const mayContainSlot = (record: MutationRecord) =>
      record.type === 'attributes' || Array.from(record.addedNodes).some(containsSupportSlot);

    const onMutations = (records: MutationRecord[]) => {
      if (trackedSlot) {
        if (trackedSlot.isConnected && trackedSlot.matches(SUPPORT_SLOT_SELECTOR)) return;
        const replacement = findSlot();
        // Another slot still marks the page as monetized: nothing changes.
        if (replacement) trackedSlot = replacement;
        else applySlotPresence(null);
        return;
      }
      // No slot yet: only added elements or marker attribute changes can add one.
      if (!records.some(mayContainSlot)) return;
      const slot = findSlot();
      if (slot) applySlotPresence(slot);
    };

    applySlotPresence(findSlot());
    const observer = new MutationObserver(onMutations);
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
    if (!adClient || !hasMonetizedContent || gateMode === 'hard') return;

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
  }, [adClient, gateMode, hasMonetizedContent, runDetection]);

  useEffect(() => {
    if (gateMode !== 'hard') return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [gateMode]);

  useEffect(() => {
    if (!adClient || !pathname || !gateMode) return;
    if (gateMode === 'soft' && dismissed) return;

    const trackingKey = `${pathname}:${gateMode}`;
    if (trackedGateKeyRef.current === trackingKey) return;
    trackedGateKeyRef.current = trackingKey;

    trackProductEvent(gateMode === 'hard' ? 'adblock_gate_shown' : 'adblock_soft_banner_shown');
  }, [adClient, dismissed, gateMode, pathname]);

  const handleDismissSoftBanner = () => {
    setDismissed(true);
    trackProductEvent('adblock_soft_banner_dismissed');
  };

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

  if (!adClient || !gateMode) return null;

  if (gateMode === 'soft') {
    if (dismissed) return null;

    return (
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4">
        <div
          role="region"
          aria-label={t('adblock.title')}
          className="pointer-events-auto mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-amber-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-amber-800/60 dark:bg-gray-900/95 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <WarningTriangleIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {t('adblock.title')}
              </p>
              <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                {t('adblock.softNote')}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <button
              type="button"
              onClick={reloadPage}
              disabled={checking}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-primary-500 dark:hover:bg-primary-600"
            >
              <span aria-live="polite">{checking ? t('adblock.checking') : t('adblock.retry')}</span>
            </button>
            <button
              type="button"
              onClick={handleDismissSoftBanner}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {t('adblock.dismiss')}
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <WarningTriangleIcon className="h-7 w-7 text-amber-600 dark:text-amber-400" />
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
