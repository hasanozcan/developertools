'use client';

import ErrorBoundaryContent from '../_shell/ErrorBoundaryContent';

export default function LocaleError({ error, reset }: { error: unknown; reset: () => void }) {
  return <ErrorBoundaryContent error={error} reset={reset} />;
}
