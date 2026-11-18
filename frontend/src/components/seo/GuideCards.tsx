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
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">{ui.cardsEyebrow}</span>
          <h2
            id="developer-guides-heading"
            className="mt-2 text-2xl font-bold text-slate-950 dark:text-white"
          >
            {ui.cardsHeading}
          </h2>
        </div>
        <Link
          href={`${prefix}/guides`}
          className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          {ui.allGuidesLabel}
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {developerGuides.map((guide) => {
          const localized = getLocalizedGuide(guide, locale);
          return (
            <Link
              key={localized.slug}
              href={`${prefix}/guides/${localized.slug}`}
              className="interactive-card block rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">{localized.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {localized.description}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {ui.readGuideLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
