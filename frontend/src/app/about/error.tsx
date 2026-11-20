'use client';

import ErrorBoundaryContent from '../_shell/ErrorBoundaryContent';

export default function AboutError({ error, reset }: { error: unknown; reset: () => void }) {
  return <ErrorBoundaryContent error={error} reset={reset} />;
}
