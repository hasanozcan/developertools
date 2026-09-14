import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSense from '@/components/common/AdSense';
import {
  DEFAULT_ADSENSE_COLLECTION_INDEX_SLOT,
  resolveAdSenseSlot,
} from '@/lib/adsenseSlots';
import {
  NON_DEFAULT_LOCALES,
  getHreflangAlternates,
  isNonDefaultLocale,
  type Language,
} from '@/lib/i18nRouting';
import { getCollectionTools, getLocalizedCollection, toolCollections } from '@/lib/toolCollections';

const copy: Record<Exclude<Language, 'en'>, { eyebrow: string; title: string; description: string; explore: string; tools: string }> = {
  tr: { eyebrow: 'Geliştirici iş akışları', title: 'Geliştirici Araç Koleksiyonları', description: 'Yapmak istediğiniz işe göre hazırlanmış araç kümelerinden başlayın ve ilgili araçlar arasında hızlıca ilerleyin.', explore: 'Koleksiyonu aç', tools: 'araç' },
  de: { eyebrow: 'Entwickler-Workflows', title: 'Entwickler-Tool-Sammlungen', description: 'Starten Sie mit kuratierten Tool-Sammlungen für Ihre Aufgabe und wechseln Sie schnell zwischen zusammengehörigen Werkzeugen.', explore: 'Sammlung öffnen', tools: 'Tools' },
  es: { eyebrow: 'Flujos de desarrollo', title: 'Colecciones de herramientas para desarrolladores', description: 'Empieza con colecciones creadas para una tarea concreta y avanza rápidamente entre herramientas relacionadas.', explore: 'Abrir colección', tools: 'herramientas' },
  fr: { eyebrow: 'Workflows développeur', title: 'Collections d’outils pour développeurs', description: 'Commencez par une collection adaptée à votre tâche puis enchaînez rapidement les outils associés.', explore: 'Ouvrir la collection', tools: 'outils' },
  ru: { eyebrow: 'Рабочие процессы разработчика', title: 'Коллекции инструментов разработчика', description: 'Начните с подборки под конкретную задачу и быстро переходите между связанными инструментами.', explore: 'Открыть коллекцию', tools: 'инструментов' },
  zh: { eyebrow: '开发者工作流', title: '开发者工具合集', description: '从面向具体任务的工具合集开始，并在相关工具之间快速衔接。', explore: '打开合集', tools: '个工具' },
};

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) return { title: 'Not Found' };
  const activeLocale = locale as Exclude<Language, 'en'>;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const localizedCopy = copy[activeLocale];
  return {
    title: localizedCopy.title,
    description: localizedCopy.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/collections`,
      languages: getHreflangAlternates('/collections', siteUrl),
    },
  };
}

export default async function LocalizedCollectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) notFound();

  const activeLocale = locale as Exclude<Language, 'en'>;
  const localizedCopy = copy[activeLocale];
  const collectionIndexSlot = resolveAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_INDEX_SLOT,
    DEFAULT_ADSENSE_COLLECTION_INDEX_SLOT,
  );

  return (
    <main className="page-shell py-10 sm:py-14">
      <section className="mb-8 rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">{localizedCopy.eyebrow}</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {localizedCopy.title}
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          {localizedCopy.description}
        </p>
      </section>

      <AdSense
        slot={collectionIndexSlot}
        format="auto"
        placement={`collections-index-${locale}`}
        className="mb-8 min-h-[90px]"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {toolCollections.map((collection) => {
          const localizedCollection = getLocalizedCollection(collection, activeLocale);
          const tools = getCollectionTools(collection);
          return (
            <Link
              key={collection.slug}
              href={`/${locale}/collections/${collection.slug}`}
              className="interactive-card rounded-3xl p-6"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">{localizedCollection.shortTitle}</h2>
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                  {tools.length} {localizedCopy.tools}
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{localizedCollection.description}</p>
              <p className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400">{localizedCopy.explore} →</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
