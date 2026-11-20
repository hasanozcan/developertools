export default function LoadingContent() {
  return (
    <div className="page-shell py-8 sm:py-10" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading...</span>
      <div className="animate-pulse space-y-6">
        <div className="h-9 w-56 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80" />
        <div className="rounded-2xl border border-zinc-200/90 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="mb-4 h-6 w-1/3 rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80" />
          <div className="mb-6 h-4 w-2/3 rounded-lg bg-zinc-200/70 dark:bg-zinc-800/70" />
          <div className="h-80 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800/60" />
        </div>
      </div>
    </div>
  );
}
