import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSense from '@/components/common/AdSense';
import {
  DEFAULT_ADSENSE_COLLECTION_BOTTOM_SLOT,
  DEFAULT_ADSENSE_COLLECTION_TOP_SLOT,
  resolveAdSenseSlot,
} from '@/lib/adsenseSlots';
import {
  NON_DEFAULT_LOCALES,
  getHreflangAlternates,
  getLocalizedToolMeta,
  isNonDefaultLocale,
  type Language,
} from '@/lib/i18nRouting';
import {
  getCollectionTools,
  getLocalizedCollection,
  getToolCollection,
  toolCollections,
} from '@/lib/toolCollections';

const copy: Record<Exclude<Language, 'en'>, { back: string; eyebrow: string }> = {
  tr: { back: 'Koleksiyonlar', eyebrow: 'Seçilmiş iş akışı' },
  de: { back: 'Sammlungen', eyebrow: 'Kuratierter Workflow' },
  es: { back: 'Colecciones', eyebrow: 'Flujo seleccionado' },
  fr: { back: 'Collections', eyebrow: 'Workflow sélectionné' },
  ru: { back: 'Коллекции', eyebrow: 'Подобранный процесс' },
  zh: { back: '工具合集', eyebrow: '精选工作流' },
};

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.flatMap((locale) =>
    toolCollections.map((collection) => ({ locale, slug: collection.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isNonDefaultLocale(locale)) return { title: 'Not Found' };
  const collection = getToolCollection(slug);
  if (!collection) return { title: 'Not Found' };
  const localized = getLocalizedCollection(collection, locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  return {
    title: localized.title,
    description: localized.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/collections/${slug}`,
      languages: getHreflangAlternates(`/collections/${slug}`, siteUrl),
    },
    openGraph: { title: localized.title, description: localized.description, type: 'website' },
  };
}

export default async function LocalizedCollectionPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isNonDefaultLocale(locale)) notFound();
  const activeLocale = locale as Exclude<Language, 'en'>;
  const collection = getToolCollection(slug);
  if (!collection) notFound();

  const localized = getLocalizedCollection(collection, activeLocale);
  const tools = getCollectionTools(collection);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const topSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_TOP_SLOT, DEFAULT_ADSENSE_COLLECTION_TOP_SLOT);
  const bottomSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_BOTTOM_SLOT, DEFAULT_ADSENSE_COLLECTION_BOTTOM_SLOT);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: localized.title,
    description: localized.description,
    itemListElement: tools.map((tool, index) => {
      const meta = getLocalizedToolMeta(tool.slug, activeLocale, tool.name, tool.shortDescription || tool.name);
      return { '@type': 'ListItem', position: index + 1, name: meta.name, url: `${siteUrl}/${locale}/tools/${tool.categorySlug}/${tool.slug}` };
    }),
  };

  return (
    <main className="page-shell py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        <Link href={`/${locale}/collections`} className="hover:text-indigo-600 dark:hover:text-indigo-400">{copy[activeLocale].back}</Link>
        <span className="px-2">/</span>
        <span>{localized.shortTitle}</span>
      </nav>

      <section className="mb-8 rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">{copy[activeLocale].eyebrow}</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{localized.title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">{localized.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {collection.searchIntents.map((intent) => (
            <span key={intent} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300">{intent}</span>
          ))}
        </div>
      </section>

      <AdSense slot={topSlot} format="auto" placement={`collection-${slug}-${locale}-top`} className="mb-8 min-h-[90px]" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool, index) => {
          const meta = getLocalizedToolMeta(tool.slug, activeLocale, tool.name, tool.shortDescription || tool.name);
          return (
            <Link key={tool.slug} href={`/${locale}/tools/${tool.categorySlug}/${tool.slug}`} className="interactive-card rounded-3xl p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">{index + 1}</span>
                <h2 className="font-bold text-slate-950 dark:text-white">{meta.name}</h2>
              </div>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{meta.description}</p>
            </Link>
          );
        })}
      </section>

      <AdSense slot={bottomSlot} format="auto" placement={`collection-${slug}-${locale}-bottom`} className="mt-8 min-h-[90px]" />
    </main>
  );
}
