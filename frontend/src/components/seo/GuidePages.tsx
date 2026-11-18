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
      <header className="page-shell pt-10 sm:pt-14">
        <span className="eyebrow">{ui.indexEyebrow}</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {ui.indexHeading}
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          {ui.indexLead}
        </p>
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
    <article className="page-shell py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        <Link href={`${prefix}/guides`} className="hover:underline">
          {ui.guidesBreadcrumb}
        </Link>
        <span aria-hidden="true" className="px-2">
          /
        </span>
        <span>{localized.toolName}</span>
      </nav>
      <header className="max-w-4xl">
        <span className="eyebrow">{ui.detailEyebrow}</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {localized.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
          {localized.description}
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {ui.byLabel}{' '}
          <Link href={aboutHref} className="underline">
            DevsTools
          </Link>{' '}
          · {ui.examplesNote}
        </p>
        <Link
          href={toolHref}
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
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
              className="scroll-mt-24"
              aria-labelledby={`heading-${index + 1}`}
            >
              <h2
                id={`heading-${index + 1}`}
                className="mb-4 text-2xl font-bold text-slate-950 dark:text-white"
              >
                {section.heading}
              </h2>
              <div className="space-y-4 leading-7 text-slate-600 dark:text-slate-300">
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
          <section aria-labelledby="guide-sources">
            <h2
              id="guide-sources"
              className="mb-4 text-2xl font-bold text-slate-950 dark:text-white"
            >
              {ui.sourcesHeading}
            </h2>
            <ul className="space-y-3 text-indigo-600 dark:text-indigo-400">
              {localized.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} className="underline">
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="order-first lg:order-last" aria-label="Guide navigation">
          <nav
            aria-label={ui.onThisPage}
            className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-700 dark:bg-slate-900/70 lg:sticky lg:top-24"
          >
            <h2 className="font-semibold text-slate-950 dark:text-white">{ui.onThisPage}</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {localized.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#step-${index + 1}`} className="hover:underline">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
            <Link
              href={collectionHref}
              className="mt-5 block border-t border-slate-200 pt-4 text-sm font-semibold text-indigo-600 hover:underline dark:border-slate-700 dark:text-indigo-400"
            >
              {ui.exploreRelatedTools}
            </Link>
          </nav>
        </aside>
      </div>
    </article>
  );
}
