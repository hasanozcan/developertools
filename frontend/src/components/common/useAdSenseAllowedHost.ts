'use client';

import { useSyncExternalStore } from 'react';
import { isAdSenseAllowedInBrowser } from '@/lib/adsense';

// Moving between origins creates a new document, so no subscription is needed.
const subscribe = () => () => {};
const getServerSnapshot = () => false;

export function useAdSenseAllowedHost() {
  return useSyncExternalStore(subscribe, isAdSenseAllowedInBrowser, getServerSnapshot);
}
