import type { Metadata } from 'next';
import Link from 'next/link';
import AdSense from '@/components/common/AdSense';
import { DEFAULT_ADSENSE_COLLECTION_INDEX_SLOT, resolveAdSenseSlot } from '@/lib/adsenseSlots';
import { getCollectionTools, toolCollections } from '@/lib/toolCollections';

export const metadata: Metadata = {
  title: 'Developer Tool Collections',
  description:
    'Browse curated developer tool collections for API debugging, JSON, authentication, Docker and Kubernetes, AI and LLM development, and databases.',
  alternates: { canonical: '/collections' },
};

export default function CollectionsPage() {
  const footerSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT);
  const collectionIndexSlot = resolveAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_COLLECTION_INDEX_SLOT,
    DEFAULT_ADSENSE_COLLECTION_INDEX_SLOT,
  );

  return (
    <main className="page-shell py-10 sm:py-14">
      <section className="mb-8 rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">Developer workflows</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Developer Tool Collections
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          Start from the job you need to finish, then move through related DevsTools without hunting for each utility separately.
        </p>
      </section>

      <AdSense
        slot={collectionIndexSlot}
        format="auto"
        placement="collections-index-top"
        className="mb-8 min-h-[90px]"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {toolCollections.map((collection) => {
          const tools = getCollectionTools(collection);
          return (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="interactive-card rounded-3xl p-6"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">{collection.shortTitle}</h2>
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                  {tools.length} tools
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{collection.description}</p>
              <p className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400">Explore collection →</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}


