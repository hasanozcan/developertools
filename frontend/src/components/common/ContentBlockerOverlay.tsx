'use client';

import { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Detects whether a content-filtering extension is active by
 * creating a "bait" element that popular filter lists target.
 *
 * When detected, it displays a dismissible overlay asking the
 * user to whitelist the site.
 */
export default function ContentBlockerOverlay() {
    const { t } = useLanguage();
    const [detected, setDetected] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [checking, setChecking] = useState(true);

    const runDetection = useCallback(() => {
        setChecking(true);

        // Method 1: Create a bait element that ad blockers typically hide
        const bait = document.createElement('div');
        bait.className =
            'adsbox ad-placement carbon-wrap pub_300x250 textAd text_ad text-ad';
        bait.setAttribute('data-ad-slot', 'test');
        bait.style.cssText =
            'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;';
        bait.innerHTML = '&nbsp;';
        document.body.appendChild(bait);

        // Give the blocker time to act on the bait element
        const timerId = setTimeout(() => {
            const wasBaitHidden =
                bait.offsetHeight === 0 ||
                bait.offsetWidth === 0 ||
                bait.clientHeight === 0 ||
                window.getComputedStyle(bait).display === 'none' ||
                window.getComputedStyle(bait).visibility === 'hidden' ||
                !bait.isConnected;

            // Method 2: Try to fetch a resource ad blockers commonly block
            const fetchCheck = fetch(
                'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                { method: 'HEAD', mode: 'no-cors' },
            )
                .then(() => false)
                .catch(() => true);

            fetchCheck.then((networkBlocked) => {
                setDetected(wasBaitHidden || networkBlocked);
                setChecking(false);
            });

            // Clean up
            if (bait.parentNode) {
                bait.parentNode.removeChild(bait);
            }
        }, 300);

        return () => {
            clearTimeout(timerId);
            if (bait.parentNode) {
                bait.parentNode.removeChild(bait);
            }
        };
    }, []);

    useEffect(() => {
        // Check if user has already dismissed
        try {
            const dismissedAt = localStorage.getItem('cb_dismissed');
            if (dismissedAt) {
                const elapsed = Date.now() - parseInt(dismissedAt, 10);
                // Re-show after 24 hours
                if (elapsed < 24 * 60 * 60 * 1000) {
                    setDismissed(true);
                    setChecking(false);
                    return;
                }
            }
        } catch {
            // localStorage not available
        }

        const cleanup = runDetection();
        return cleanup;
    }, [runDetection]);

    const handleDismiss = () => {
        setDismissed(true);
        try {
            localStorage.setItem('cb_dismissed', String(Date.now()));
        } catch {
            // ignore
        }
    };

    const handleRetry = () => {
        runDetection();
    };

    const handleReload = () => {
        window.location.reload();
    };

    // Don't show anything if not detected or already dismissed
    if (!detected || dismissed) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="mx-4 max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <svg
                        className="h-7 w-7 text-amber-600 dark:text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h2 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">
                    {t('adblock.title')}
                </h2>

                {/* Message */}
                <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-300">
                    {t('adblock.message')}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    {checking ? (
                        <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-3 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                            <svg
                                className="h-4 w-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
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
                            {t('adblock.checking')}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleReload}
                                className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                            >
                                {t('adblock.reload')}
                            </button>
                            <button
                                onClick={handleRetry}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                {t('adblock.retry')}
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="text-xs text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                ✕
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
