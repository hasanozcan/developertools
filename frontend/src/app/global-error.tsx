'use client';

import { useEffect } from 'react';
import './globals.css';

export default function GlobalError({ error, reset }: { error: unknown; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-[#fafafa] text-zinc-950 dark:bg-[#09090b] dark:text-zinc-50">
        <main className="page-shell flex min-h-screen items-center justify-center py-10 sm:py-14">
          <section className="mx-auto w-full max-w-2xl rounded-[2rem] border border-zinc-200/80 bg-white/80 p-7 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
            <span className="eyebrow mb-3">Error</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Something went wrong
            </h1>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
              An unexpected application error occurred. You can try again or return to the home
              page.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-200"
              >
                Try again
              </button>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Root layout/router may have failed in global-error */}
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300"
              >
                Back to Home
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
