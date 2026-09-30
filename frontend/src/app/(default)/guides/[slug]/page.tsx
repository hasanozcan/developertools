import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CodeExample from '@/components/common/CodeExample';
import { developerGuides } from '@/lib/developerGuides';
import { serializeJsonForHtmlScript } from '@/lib/scriptSafeJson';

type Props = { params: Promise<{ slug: string }> };
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app').replace(/\/$/, '');

export function generateStaticParams() {
  return developerGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = developerGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const url = `${siteUrl}/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url,
      locale: 'en_US',
      images: [`${siteUrl}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = developerGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const url = `${siteUrl}/guides/${guide.slug}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      inLanguage: 'en',
      url,
      mainEntityOfPage: url,
      image: `${siteUrl}/opengraph-image`,
      author: { '@type': 'Organization', name: 'DevsTools', url: `${siteUrl}/about` },
      publisher: { '@type': 'Organization', name: 'DevsTools', url: siteUrl },
      citation: guide.sources.map((source) => source.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteUrl}/guides` },
        { '@type': 'ListItem', position: 3, name: guide.title, item: url },
      ],
    },
  ];

  return (
    <article lang="en" className="page-shell py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        <Link href="/guides" className="hover:underline">
          Developer guides
        </Link>
        <span aria-hidden="true" className="px-2">
          /
        </span>
        <span>{guide.toolName}</span>
      </nav>
      <header className="max-w-4xl">
        <span className="eyebrow">Practical guide · English</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
          {guide.description}
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          By{' '}
          <Link href="/about" className="underline">
            DevsTools
          </Link>{' '}
          · Examples and primary references below
        </p>
        <Link
          href={guide.toolHref}
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Open {guide.toolName} →
        </Link>
      </header>
      <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0 space-y-10">
          {guide.sections.map((section, index) => (
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
              Sources and references
            </h2>
            <ul className="space-y-3 text-indigo-600 dark:text-indigo-400">
              {guide.sources.map((source) => (
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
            aria-label="On this page"
            className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-700 dark:bg-slate-900/70 lg:sticky lg:top-24"
          >
            <h2 className="font-semibold text-slate-950 dark:text-white">On this page</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {guide.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#step-${index + 1}`} className="hover:underline">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
            <Link
              href={guide.collectionHref}
              className="mt-5 block border-t border-slate-200 pt-4 text-sm font-semibold text-indigo-600 hover:underline dark:border-slate-700 dark:text-indigo-400"
            >
              Explore related tools →
            </Link>
          </nav>
        </aside>
      </div>
    </article>
  );
}
