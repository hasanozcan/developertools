'use client';

import { useEffect, useRef } from 'react';
import { useHistory } from '@/context/HistoryContext';
import { trackToolUsage } from '@/lib/api';

interface HistoryTrackerProps {
  slug: string;
  name: string;
  category: string;
}

// Generate or get session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('devtools_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('devtools_session_id', sessionId);
  }
  return sessionId;
}

export default function HistoryTracker({ slug, name, category }: HistoryTrackerProps) {
  const { addToHistory } = useHistory();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      
      // Add to local history
      addToHistory({ slug, name, category });
      
      // Track usage in backend (fire and forget)
      const sessionId = getSessionId();
      const referrer = typeof document !== 'undefined' ? (document.referrer || window.location.href) : undefined;
      trackToolUsage(slug, sessionId, referrer);
    }
  }, [slug, name, category, addToHistory]);

  return null;
}
