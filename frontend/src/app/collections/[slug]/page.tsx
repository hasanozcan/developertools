import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSense from '@/components/common/AdSense';
import { DEFAULT_ADSENSE_COLLECTION_BOTTOM_SLOT, DEFAULT_ADSENSE_COLLECTION_TOP_SLOT, resolveAdSenseSlot } from '@/lib/adsenseSlots';
import { getCollectionTools, getToolCollection, toolCollections } from '@/lib/toolCollections';

export function generateStaticParams() {
  return toolCollections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getToolCollection(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: collection.title,
      description: collection.description,
      type: 'website',
    },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getToolCollection(slug);
  if (!collection) notFound();

  const tools = getCollectionTools(collection);
  const footerSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT);
  const collectionTopSlot = resolveAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_TOP_SLOT,
    footerSlot,
  );
  const collectionBottomSlot = resolveAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_BOTTOM_SLOT,
    footerSlot,
  );
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: collection.title,
    description: collection.description,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `${siteUrl}/tools/${tool.categorySlug}/${tool.slug}`,
    })),
  };

  return (
    <main className="page-shell py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/collections" className="hover:text-indigo-600 dark:hover:text-indigo-400">Collections</Link>
        <span className="px-2">/</span>
        <span>{collection.shortTitle}</span>
      </nav>

      <section className="mb-8 rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">Curated workflow</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {collection.title}
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">{collection.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {collection.searchIntents.map((intent) => (
            <span key={intent} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300">
              {intent}
            </span>
          ))}
        </div>
      </section>

      <AdSense
        slot={collectionTopSlot}
        format="auto"
        placement={`collection-${collection.slug}-top`}
        className="mb-8 min-h-[90px]"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool, index) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.categorySlug}/${tool.slug}`}
            className="interactive-card rounded-3xl p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                {index + 1}
              </span>
              <h2 className="font-bold text-slate-950 dark:text-white">{tool.name}</h2>
            </div>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{tool.shortDescription}</p>
          </Link>
        ))}
      </section>

      <AdSense
        slot={collectionBottomSlot}
        format="auto"
        placement={`collection-${collection.slug}-bottom`}
        className="mt-8 min-h-[90px]"
      />
    </main>
  );
}


