'use client';

import { useEffect, useRef } from 'react';
import { useHistory } from '@/context/HistoryContext';
import { trackToolEvent } from '@/lib/analytics';
import { recordLocalToolOpen } from '@/lib/toolPopularity';

interface HistoryTrackerProps {
  slug: string;
  name: string;
  category: string;
}

export default function HistoryTracker({ slug, name, category }: HistoryTrackerProps) {
  const { addToHistory } = useHistory();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      
      // Add to local history
      addToHistory({ slug, name, category });
      
      // Track only catalog identifiers; never send tool input, referrer, or a session identifier.
      trackToolEvent('tool_opened', slug, category);
      recordLocalToolOpen(slug);
    }
  }, [slug, name, category, addToHistory]);

  return null;
}
