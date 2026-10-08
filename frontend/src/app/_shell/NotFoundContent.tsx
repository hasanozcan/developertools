'use client';

import Link from '@/components/common/LocalizedLink';
import { useLanguage } from '@/context/LanguageContext';

// Shared by app/(default)/not-found.tsx, app/[locale]/not-found.tsx and
// app/global-not-found.tsx so every 404 renders the same page and metadata.
const popularLinks = [
  { key: 'toolName.json-formatter', href: '/tools/json/json-formatter' },
  { key: 'toolName.base64', href: '/tools/encoding/base64' },
  { key: 'toolName.uuid-generator', href: '/tools/generators/uuid-generator' },
  { key: 'toolName.regex-tester', href: '/tools/text/regex-tester' },
  { key: 'notFound.collections', href: '/collections' },
  { key: 'notFound.roles', href: '/for' },
];

export default function NotFoundContent() {
  const { t } = useLanguage();
  return (
    <div className="page-shell py-10 sm:py-14">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-white/80 bg-white/70 p-7 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">404</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {t('notFound.title')}
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
          {t('notFound.description')}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {popularLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-200"
        >
          {t('notFound.home')}
        </Link>
      </section>
    </div>
  );
}
