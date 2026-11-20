'use client';

import ErrorBoundaryContent from '../_shell/ErrorBoundaryContent';

export default function ContactError({ error, reset }: { error: unknown; reset: () => void }) {
  return <ErrorBoundaryContent error={error} reset={reset} />;
}
