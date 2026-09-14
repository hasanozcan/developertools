import type { Metadata } from 'next';
import SearchConsoleOpportunityPanel from '@/components/seo/SearchConsoleOpportunityPanel';

export const metadata: Metadata = {
  title: 'Search Console SEO Opportunity Analyzer',
  description: 'Analyze a Google Search Console CSV export locally and rank high-impression SEO opportunities.',
  robots: { index: false, follow: false },
};

export default function SeoOpportunitiesPage() {
  return (
    <main className="page-shell py-10 sm:py-14">
      <section className="mb-8">
        <span className="eyebrow mb-3">Growth dashboard</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Search Console SEO Opportunities</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          Find queries and pages that already receive impressions but can gain clicks through stronger titles, content, and internal linking.
        </p>
      </section>
      <SearchConsoleOpportunityPanel />
    </main>
  );
}
