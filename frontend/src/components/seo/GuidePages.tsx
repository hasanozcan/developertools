import Link from 'next/link';
import CodeExample from '@/components/common/CodeExample';
import GuideCards from '@/components/seo/GuideCards';
import {
  getGuidesUiCopy,
  getLocalizedGuide,
  type DeveloperGuide,
} from '@/lib/developerGuides';
import type { Language } from '@/lib/i18nRouting';
import { serializeJsonForHtmlScript } from '@/lib/scriptSafeJson';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app').replace(/\/$/, '');

export function GuidesIndexContent({ locale }: { locale: Language }) {
  const ui = getGuidesUiCopy(locale);

  return (
    <div>
      <header className="page-shell pt-8 sm:pt-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/90 sm:p-8">
          <span className="inline-flex items-center rounded border border-slate-300 bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {ui.indexEyebrow}
          </span>
          <h1 className="mt-3 break-words text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {ui.indexHeading}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {ui.indexLead}
          </p>
        </div>
      </header>
      <GuideCards locale={locale} />
    </div>
  );
}

export function GuideDetailContent({
  guide,
  locale,
}: {
  guide: DeveloperGuide;
  locale: Language;
}) {
  const localized = getLocalizedGuide(guide, locale);
  const ui = getGuidesUiCopy(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const url = `${siteUrl}${prefix}/guides/${localized.slug}`;
  const guidesIndexUrl = `${siteUrl}${prefix}/guides`;
  const homeUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`;
  const toolHref = `${prefix}${localized.toolHref}`;
  const collectionHref = `${prefix}${localized.collectionHref}`;
  const aboutHref = `${prefix}/about`;

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: localized.title,
      description: localized.description,
      inLanguage: locale,
      url,
      mainEntityOfPage: url,
      image: `${siteUrl}/opengraph-image`,
      author: { '@type': 'Organization', name: 'DevsTools', url: `${siteUrl}${aboutHref}` },
      publisher: { '@type': 'Organization', name: 'DevsTools', url: siteUrl },
      citation: localized.sources.map((source) => source.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: ui.homeBreadcrumb, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: ui.guidesBreadcrumb, item: guidesIndexUrl },
        { '@type': 'ListItem', position: 3, name: localized.title, item: url },
      ],
    },
  ];

  return (
    <article className="page-shell py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="mb-5 font-mono text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
        <Link href={`${prefix}/guides`} className="hover:text-slate-950 hover:underline dark:hover:text-white">
          {ui.guidesBreadcrumb}
        </Link>
        <span aria-hidden="true" className="px-2 text-slate-400 dark:text-slate-600">
          /
        </span>
        <span className="text-slate-900 dark:text-slate-200">{localized.toolName}</span>
      </nav>
      <header className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/90 sm:p-8">
        <span className="inline-flex items-center rounded border border-slate-300 bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {ui.detailEyebrow}
        </span>
        <h1 className="mt-3 break-words text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {localized.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
          {localized.description}
        </p>
        <p className="mt-3 font-mono text-xs text-slate-600 dark:text-slate-400">
          {ui.byLabel}{' '}
          <Link href={aboutHref} className="underline hover:text-slate-950 dark:hover:text-white">
            DevsTools
          </Link>{' '}
          · {ui.examplesNote}
        </p>
        <Link
          href={toolHref}
          className="mt-5 inline-flex items-center rounded-lg bg-slate-950 px-4 py-2.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-emerald-700 dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-400 sm:text-sm"
        >
          {ui.openToolPrefix} {localized.toolName} →
        </Link>
      </header>
      <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0 space-y-10">
          {localized.sections.map((section, index) => (
            <section
              key={section.heading}
              id={`step-${index + 1}`}
              className="scroll-mt-24 min-w-0"
              aria-labelledby={`heading-${index + 1}`}
            >
              <h2
                id={`heading-${index + 1}`}
                className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold text-slate-950 dark:border-slate-800 dark:text-white sm:text-2xl"
              >
                {section.heading}
              </h2>
              <div className="min-w-0 space-y-4 break-words leading-7 text-slate-700 dark:text-slate-300">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ol className="list-decimal space-y-3 pl-6">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ol>
                )}
                {section.codeExamples?.map((example) => (
                  <CodeExample key={example.title} {...example} />
                ))}
              </div>
            </section>
          ))}
          <section aria-labelledby="guide-sources" className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/90">
            <h2
              id="guide-sources"
              className="mb-3 text-lg font-bold text-slate-950 dark:text-white sm:text-xl"
            >
              {ui.sourcesHeading}
            </h2>
            <ul className="space-y-2.5 text-sm text-emerald-800 dark:text-emerald-300">
              {localized.sources.map((source) => (
                <li key={source.url} className="min-w-0 break-words">
                  <a href={source.url} className="underline underline-offset-4 hover:text-emerald-950 dark:hover:text-emerald-200">
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="order-first min-w-0 lg:order-last" aria-label="Guide navigation">
          <nav
            aria-label={ui.onThisPage}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/90 lg:sticky lg:top-24"
          >
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {ui.onThisPage}
            </h2>
            <ol className="mt-3.5 space-y-2.5 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {localized.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#step-${index + 1}`} className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-400">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
            <Link
              href={collectionHref}
              className="mt-5 block border-t border-slate-200 pt-4 font-mono text-xs font-semibold text-slate-900 hover:text-emerald-700 hover:underline dark:border-slate-800 dark:text-slate-200 dark:hover:text-emerald-400"
            >
              {ui.exploreRelatedTools}
            </Link>
          </nav>
        </aside>
      </div>
    </article>
  );
}
