import Link from 'next/link';
import { developerGuides, getGuidesUiCopy, getLocalizedGuide } from '@/lib/developerGuides';
import type { Language } from '@/lib/i18nRouting';

export default function GuideCards({ locale = 'en' }: { locale?: Language }) {
  const ui = getGuidesUiCopy(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section
      className="page-shell py-10"
      aria-labelledby="developer-guides-heading"
      data-guide-cards="true"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div className="min-w-0">
          <span className="inline-flex items-center rounded border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {ui.cardsEyebrow}
          </span>
          <h2
            id="developer-guides-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white"
          >
            {ui.cardsHeading}
          </h2>
        </div>
        <Link
          href={`${prefix}/guides`}
          className="font-mono text-xs font-semibold text-slate-800 underline decoration-slate-400 underline-offset-4 transition-colors hover:text-emerald-700 hover:decoration-emerald-600 dark:text-slate-200 dark:decoration-slate-600 dark:hover:text-emerald-400"
        >
          {ui.allGuidesLabel}
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {developerGuides.map((guide, index) => {
          const localized = getLocalizedGuide(guide, locale);
          return (
            <Link
              key={localized.slug}
              href={`${prefix}/guides/${localized.slug}`}
              className="group flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-600"
            >
              <div className="min-w-0">
                <div className="mb-3 flex items-center justify-between gap-2 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    0{index + 1}
                  </span>
                  <span className="truncate">{localized.toolName}</span>
                </div>
                <h3 className="break-words text-base font-bold leading-snug text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                  {localized.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {localized.description}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center font-mono text-xs font-semibold text-slate-900 group-hover:text-emerald-700 dark:text-slate-200 dark:group-hover:text-emerald-400">
                {ui.readGuideLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
