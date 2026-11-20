import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { getGuideLinkCopy } from '@/lib/guideLinkCopy';
import type { Language } from '@/lib/i18nRouting';

export default function RelatedGuideLinks({
  guides,
  locale,
}: {
  guides: { name: string; href: string }[];
  locale: Language;
}) {
  if (guides.length === 0) return null;
  const copy = getGuideLinkCopy(locale);

  return (
    <nav
      aria-label={copy.heading}
      data-related-guides="true"
      className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-zinc-200 bg-zinc-50/80 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <BookOpen
          className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
          aria-hidden="true"
        />
        <span>{copy.heading}:</span>
      </span>
      {guides.map((guide) => {
        const localizedHref = locale === 'en' ? guide.href : `/${locale}${guide.href}`;
        return (
          <Link
            key={guide.href}
            href={localizedHref}
            hrefLang={locale}
            className="font-medium text-emerald-700 underline decoration-emerald-500/40 underline-offset-4 transition-colors hover:text-emerald-800 hover:decoration-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            {copy.labels[guide.href] ?? guide.name}
          </Link>
        );
      })}
    </nav>
  );
}
