import Link from 'next/link';
import { developerGuides } from '@/lib/developerGuides';

export default function GuideCards() {
  return (
    <section
      className="page-shell py-10"
      aria-labelledby="developer-guides-heading"
      data-guide-cards="true"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Learn by doing</span>
          <h2
            id="developer-guides-heading"
            className="mt-2 text-2xl font-bold text-slate-950 dark:text-white"
          >
            Practical developer guides
          </h2>
        </div>
        <Link
          href="/guides"
          className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          All guides →
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {developerGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="interactive-card block rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">{guide.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {guide.description}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Read guide →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
