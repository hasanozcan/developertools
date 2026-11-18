'use client';

import Link from '@/components/common/LocalizedLink';
import { useLanguage } from '@/context/LanguageContext';
import { trackProductEvent } from '@/lib/analytics';

export default function ProInterestCard({ placement }: { placement: 'home' | 'tool' }) {
  const { t } = useLanguage();

  return (
    <section className="mb-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-8" aria-labelledby={`pro-interest-${placement}`}>
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">{t('proInterest.eyebrow')}</span>
      <h2 id={`pro-interest-${placement}`} className="mt-2 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">{t('proInterest.title')}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">{t('proInterest.description')}</p>
      <Link
        href="/contact#topic=pro"
        onClick={() => trackProductEvent('pro_interest_clicked', { placement })}
        className="mt-4 inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
      >
        {t('proInterest.cta')}
      </Link>
    </section>
  );
}
