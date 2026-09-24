'use client';

import Link from '@/components/common/LocalizedLink';
import { useLanguage } from '@/context/LanguageContext';
import { trackProductEvent } from '@/lib/analytics';

export default function ProInterestCard({ placement }: { placement: 'home' | 'tool' }) {
  const { t } = useLanguage();

  return (
    <section className="mb-10 rounded-3xl border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-400/20 dark:bg-indigo-950/20 sm:p-8" aria-labelledby={`pro-interest-${placement}`}>
      <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">{t('proInterest.eyebrow')}</span>
      <h2 id={`pro-interest-${placement}`} className="mt-2 text-xl font-bold text-slate-950 dark:text-white">{t('proInterest.title')}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300">{t('proInterest.description')}</p>
      <Link
        href="/contact?topic=pro"
        onClick={() => trackProductEvent('pro_interest_clicked', { placement })}
        className="mt-4 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        {t('proInterest.cta')}
      </Link>
    </section>
  );
}
