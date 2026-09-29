import Link from 'next/link';
import AdSense from '@/components/common/AdSense';
import {
  DEFAULT_ADSENSE_COLLECTION_BOTTOM_SLOT,
  DEFAULT_ADSENSE_COLLECTION_INDEX_SLOT,
  DEFAULT_ADSENSE_COLLECTION_TOP_SLOT,
  resolveAdSenseSlot,
} from '@/lib/adsenseSlots';
import { groupCollectionSlugs } from '@/lib/collectionGroups';
import { getLocalizedToolMeta, isToolLocaleIndexable, type Language } from '@/lib/i18nRouting';
import {
  getCollectionTools,
  getLocalizedCollection,
  getToolCollection,
  toolCollections,
  type ToolCollection,
} from '@/lib/toolCollections';

const indexCopy: Record<Language, { eyebrow: string; title: string; description: string; explore: string; tools: string }> = {
  en: { eyebrow: 'Developer workflows', title: 'Developer Tool Collections', description: 'Start from the job you need to finish, then move through related DevsTools without hunting for each utility separately.', explore: 'Explore collection', tools: 'tools' },
  tr: { eyebrow: 'Geliştirici iş akışları', title: 'Geliştirici Araç Koleksiyonları', description: 'Yapmak istediğiniz işe göre hazırlanmış araç kümelerinden başlayın ve ilgili araçlar arasında hızlıca ilerleyin.', explore: 'Koleksiyonu aç', tools: 'araç' },
  de: { eyebrow: 'Entwickler-Workflows', title: 'Entwickler-Tool-Sammlungen', description: 'Starten Sie mit kuratierten Tool-Sammlungen für Ihre Aufgabe und wechseln Sie schnell zwischen zusammengehörigen Werkzeugen.', explore: 'Sammlung öffnen', tools: 'Tools' },
  es: { eyebrow: 'Flujos de desarrollo', title: 'Colecciones de herramientas para desarrolladores', description: 'Empieza con colecciones creadas para una tarea concreta y avanza rápidamente entre herramientas relacionadas.', explore: 'Abrir colección', tools: 'herramientas' },
  fr: { eyebrow: 'Workflows développeur', title: 'Collections d’outils pour développeurs', description: 'Commencez par une collection adaptée à votre tâche puis enchaînez rapidement les outils associés.', explore: 'Ouvrir la collection', tools: 'outils' },
  ru: { eyebrow: 'Рабочие процессы разработчика', title: 'Коллекции инструментов разработчика', description: 'Начните с подборки под конкретную задачу и быстро переходите между связанными инструментами.', explore: 'Открыть коллекцию', tools: 'инструментов' },
  zh: { eyebrow: '开发者工作流', title: '开发者工具合集', description: '从面向具体任务的工具合集开始，并在相关工具之间快速衔接。', explore: '打开合集', tools: '个工具' },
};

const detailCopy: Record<Language, { back: string; eyebrow: string; toolsHeading: string; open: string }> = {
  en: { back: 'Collections', eyebrow: 'Curated workflow', toolsHeading: 'Tools in this collection', open: 'Open' },
  tr: { back: 'Koleksiyonlar', eyebrow: 'Seçilmiş iş akışı', toolsHeading: 'Bu koleksiyondaki araçlar', open: 'Aç' },
  de: { back: 'Sammlungen', eyebrow: 'Kuratierter Workflow', toolsHeading: 'Tools in dieser Sammlung', open: 'Öffnen' },
  es: { back: 'Colecciones', eyebrow: 'Flujo seleccionado', toolsHeading: 'Herramientas de esta colección', open: 'Abrir' },
  fr: { back: 'Collections', eyebrow: 'Workflow sélectionné', toolsHeading: 'Outils de cette collection', open: 'Ouvrir' },
  ru: { back: 'Коллекции', eyebrow: 'Подобранный процесс', toolsHeading: 'Инструменты в этой коллекции', open: 'Открыть' },
  zh: { back: '工具合集', eyebrow: '精选工作流', toolsHeading: '此合集中的工具', open: '打开' },
};

// The workflow heading has no translation key: the step copy is English-only, so the section is
// rendered for `en` only and the heading is a plain constant.
const WORKFLOW_HEADING = 'Recommended workflow';

export function getCollectionIndexCopy(locale: Language) {
  return indexCopy[locale];
}

function localePrefix(locale: Language) {
  return locale === 'en' ? '' : `/${locale}`;
}

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
}

export function CollectionIndexContent({ locale }: { locale: Language }) {
  const ui = indexCopy[locale];
  const prefix = localePrefix(locale);
  const indexSlot = resolveAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_INDEX_SLOT,
    DEFAULT_ADSENSE_COLLECTION_INDEX_SLOT,
  );
  const groups = groupCollectionSlugs(
    toolCollections.map((collection) => collection.slug),
    locale,
  );

  return (
    <main className="page-shell py-10 sm:py-14">
      <section className="mb-8 rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">{ui.eyebrow}</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{ui.title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">{ui.description}</p>
      </section>

      <AdSense
        slot={indexSlot}
        format="auto"
        placement={locale === 'en' ? 'collections-index-top' : `collections-index-${locale}`}
        className="mb-8 min-h-[90px]"
      />

      {groups.map((group) => (
        <section key={group.id} className="mb-10" aria-labelledby={`collection-group-${group.id}`}>
          <h2 id={`collection-group-${group.id}`} className="mb-4 text-2xl font-bold text-slate-950 dark:text-white">
            {group.title}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.slugs.map((slug) => {
              const collection = getToolCollection(slug);
              if (!collection) return null;
              const localized = getLocalizedCollection(collection, locale);
              const toolCount = getCollectionTools(collection).length;
              return (
                <Link
                  key={slug}
                  href={`${prefix}/collections/${slug}`}
                  className="interactive-card rounded-3xl p-5"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">{localized.shortTitle}</h3>
                    <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                      {toolCount} {ui.tools}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{localized.description}</p>
                  <p className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400">{ui.explore} →</p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}

export function CollectionDetailContent({ locale, collection }: { locale: Language; collection: ToolCollection }) {
  const localized = getLocalizedCollection(collection, locale);
  const tools = getCollectionTools(collection);
  const ui = detailCopy[locale];
  const prefix = localePrefix(locale);
  const base = siteUrl();
  const slug = collection.slug;

  let topSlot: string | undefined;
  let bottomSlot: string | undefined;
  if (locale === 'en') {
    const footerSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT);
    topSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_TOP_SLOT, footerSlot);
    bottomSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_BOTTOM_SLOT, footerSlot);
  } else {
    topSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_TOP_SLOT, DEFAULT_ADSENSE_COLLECTION_TOP_SLOT);
    bottomSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_BOTTOM_SLOT, DEFAULT_ADSENSE_COLLECTION_BOTTOM_SLOT);
  }
  const placementSuffix = locale === 'en' ? '' : `-${locale}`;

  const paragraphs = localized.introParagraphs && localized.introParagraphs.length > 0 ? localized.introParagraphs : [localized.intro];
  const toolMeta = new Map(
    tools.map((tool) => [tool.slug, getLocalizedToolMeta(tool.slug, locale, tool.name, tool.shortDescription || tool.name)]),
  );
  const workflowSteps = locale === 'en' && localized.workflowSteps ? localized.workflowSteps : undefined;

  // Localized pages list every tool visibly but only advertise tool pages that are indexable in
  // that locale (untranslated tool pages are noindex, so they do not belong in structured data).
  const structuredTools = tools.filter((tool) => isToolLocaleIndexable(tool.slug, locale));
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: localized.title,
    description: localized.description,
    itemListElement: structuredTools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: toolMeta.get(tool.slug)?.name ?? tool.name,
      url: `${base}${prefix}/tools/${tool.categorySlug}/${tool.slug}`,
    })),
  };

  return (
    <main className="page-shell py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        <Link href={`${prefix}/collections`} className="hover:text-indigo-600 dark:hover:text-indigo-400">{ui.back}</Link>
        <span className="px-2">/</span>
        <span>{localized.shortTitle}</span>
      </nav>

      <section className="mb-8 rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">{ui.eyebrow}</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{localized.title}</h1>
        <div data-collection-intro="true" className="mt-4 max-w-3xl space-y-4 leading-7 text-slate-600 dark:text-slate-300">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {collection.searchIntents.map((intent) => (
            <span key={intent} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300">
              {intent}
            </span>
          ))}
        </div>
      </section>

      <AdSense slot={topSlot} format="auto" placement={`collection-${slug}${placementSuffix}-top`} className="mb-8 min-h-[90px]" />

      <section className="mb-10" aria-labelledby="collection-tools-heading">
        <h2 id="collection-tools-heading" className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">{ui.toolsHeading}</h2>
        <div data-collection-tools="true" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool, index) => {
            const meta = toolMeta.get(tool.slug)!;
            return (
              <Link key={tool.slug} href={`${prefix}/tools/${tool.categorySlug}/${tool.slug}`} className="interactive-card rounded-3xl p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">{index + 1}</span>
                  <h3 className="font-bold text-slate-950 dark:text-white">{meta.name}</h3>
                </div>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{meta.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {workflowSteps && (
        <section className="mb-10" aria-labelledby="collection-workflow-heading">
          <h2 id="collection-workflow-heading" className="mb-4 text-2xl font-bold text-slate-950 dark:text-white">
            {WORKFLOW_HEADING}
          </h2>
          <ol data-collection-workflow="true" className="grid gap-4 md:grid-cols-2">
            {workflowSteps.map((step, index) => {
              const tool = tools.find((item) => item.slug === step.toolSlug);
              if (!tool) return null;
              return (
                <li key={`${step.toolSlug}-${index}`} className="rounded-3xl border border-slate-200 bg-white/80 p-5 dark:border-white/10 dark:bg-slate-900/70">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
                  <Link href={`${prefix}/tools/${tool.categorySlug}/${tool.slug}`} className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
                    {ui.open} {tool.name} →
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      <AdSense slot={bottomSlot} format="auto" placement={`collection-${slug}${placementSuffix}-bottom`} className="mt-8 min-h-[90px]" />
    </main>
  );
}
