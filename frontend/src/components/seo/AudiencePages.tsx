import Link from 'next/link';
import AdSense from '@/components/common/AdSense';
import {
  DEFAULT_ADSENSE_COLLECTION_BOTTOM_SLOT,
  DEFAULT_ADSENSE_COLLECTION_TOP_SLOT,
  resolveAdSenseSlot,
} from '@/lib/adsenseSlots';
import {
  developerAudiences,
  getAudienceCollections,
  getAudienceTools,
  getLocalizedAudience,
  type DeveloperAudience,
} from '@/lib/developerAudiences';
import { getLocalizedToolMeta, type Language } from '@/lib/i18nRouting';
import { getLocalizedCollection } from '@/lib/toolCollections';

const pageCopy: Record<Language, { eyebrow: string; title: string; description: string; explore: string; featured: string; collections: string }> = {
  en: { eyebrow: 'Developer roles', title: 'Tools by Developer Role', description: 'Start with a role-focused toolbox built around the tasks, formats, and workflows you use most.', explore: 'Explore toolbox', featured: 'Featured tools', collections: 'Related collections' },
  tr: { eyebrow: 'Geliştirici rolleri', title: 'Geliştirici Rolüne Göre Araçlar', description: 'En sık kullandığınız görevler, formatlar ve iş akışları etrafında hazırlanmış rol odaklı araç kutularıyla başlayın.', explore: 'Araç kutusunu aç', featured: 'Öne çıkan araçlar', collections: 'İlgili koleksiyonlar' },
  de: { eyebrow: 'Entwicklerrollen', title: 'Tools nach Entwicklerrolle', description: 'Starten Sie mit einem rollenbezogenen Werkzeugkasten für Ihre häufigsten Aufgaben, Formate und Workflows.', explore: 'Toolbox öffnen', featured: 'Empfohlene Tools', collections: 'Verwandte Sammlungen' },
  es: { eyebrow: 'Roles de desarrollo', title: 'Herramientas por rol de desarrollador', description: 'Empieza con una caja de herramientas enfocada en las tareas, formatos y flujos que más utilizas.', explore: 'Abrir herramientas', featured: 'Herramientas destacadas', collections: 'Colecciones relacionadas' },
  fr: { eyebrow: 'Rôles développeur', title: 'Outils par rôle de développeur', description: 'Commencez avec une boîte à outils centrée sur les tâches, formats et workflows que vous utilisez le plus.', explore: 'Ouvrir la boîte à outils', featured: 'Outils recommandés', collections: 'Collections associées' },
  ru: { eyebrow: 'Роли разработчиков', title: 'Инструменты по роли разработчика', description: 'Начните с набора инструментов для задач, форматов и процессов, которые чаще всего нужны в вашей роли.', explore: 'Открыть набор', featured: 'Рекомендуемые инструменты', collections: 'Связанные коллекции' },
  zh: { eyebrow: '开发者角色', title: '按开发者角色查找工具', description: '从围绕常见任务、数据格式和工作流整理的角色工具箱开始。', explore: '打开工具箱', featured: '精选工具', collections: '相关合集' },
};

export function getAudienceIndexCopy(locale: Language) {
  return pageCopy[locale];
}

function localePrefix(locale: Language) {
  return locale === 'en' ? '' : `/${locale}`;
}

export function AudienceIndexContent({ locale }: { locale: Language }) {
  const ui = pageCopy[locale];
  const prefix = localePrefix(locale);

  return (
    <main className="page-shell py-10 sm:py-14">
      <section className="mb-8 rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">{ui.eyebrow}</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{ui.title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">{ui.description}</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {developerAudiences.map((audience) => {
          const localized = getLocalizedAudience(audience, locale);
          return (
            <Link key={audience.slug} href={`${prefix}/for/${audience.slug}`} className="interactive-card rounded-3xl p-6">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">{localized.shortTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{localized.description}</p>
              <p className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400">{ui.explore} →</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export function AudienceDetailContent({ locale, audience }: { locale: Language; audience: DeveloperAudience }) {
  const localized = getLocalizedAudience(audience, locale);
  const tools = getAudienceTools(audience);
  const collections = getAudienceCollections(audience);
  const ui = pageCopy[locale];
  const prefix = localePrefix(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const topSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_TOP_SLOT, DEFAULT_ADSENSE_COLLECTION_TOP_SLOT);
  const bottomSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_BOTTOM_SLOT, DEFAULT_ADSENSE_COLLECTION_BOTTOM_SLOT);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: localized.title,
    description: localized.description,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: getLocalizedToolMeta(tool.slug, locale, tool.name, tool.shortDescription || tool.name).name,
      url: `${siteUrl}${prefix}/tools/${tool.categorySlug}/${tool.slug}`,
    })),
  };

  return (
    <main className="page-shell py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        <Link href={`${prefix}/for`} className="hover:text-indigo-600 dark:hover:text-indigo-400">{ui.title}</Link>
        <span className="px-2">/</span>
        <span>{localized.shortTitle}</span>
      </nav>

      <section className="mb-8 rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">{ui.eyebrow}</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{localized.title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">{localized.intro}</p>
      </section>

      <AdSense slot={topSlot} format="auto" placement={`audience-${audience.slug}-${locale}-top`} className="mb-8 min-h-[90px]" />

      <section className="mb-10" aria-labelledby="audience-featured-tools">
        <h2 id="audience-featured-tools" className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">{ui.featured}</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => {
            const meta = getLocalizedToolMeta(tool.slug, locale, tool.name, tool.shortDescription || tool.name);
            return (
              <Link key={tool.slug} href={`${prefix}/tools/${tool.categorySlug}/${tool.slug}`} className="interactive-card rounded-3xl p-5">
                <h3 className="font-bold text-slate-950 dark:text-white">{meta.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{meta.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-8" aria-labelledby="audience-collections">
        <h2 id="audience-collections" className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">{ui.collections}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {collections.map((collection) => {
            const localizedCollection = getLocalizedCollection(collection, locale);
            return (
              <Link key={collection.slug} href={`${prefix}/collections/${collection.slug}`} className="interactive-card rounded-3xl p-5">
                <h3 className="font-bold text-slate-950 dark:text-white">{localizedCollection.shortTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{localizedCollection.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <AdSense slot={bottomSlot} format="auto" placement={`audience-${audience.slug}-${locale}-bottom`} className="mt-8 min-h-[90px]" />
    </main>
  );
}
