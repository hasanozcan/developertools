'use client';

import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/common/Breadcrumb';
import Link from '@/components/common/LocalizedLink';
import Script from 'next/script';

export default function PrivacyPage() {
  const { t } = useLanguage();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

  // WebPage structured data for Privacy page
  const webPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/privacy#webpage`,
    url: `${siteUrl}/privacy`,
    name: 'Privacy Policy - DevsTools',
    description: 'Privacy policy for DevsTools, including client-side processing and limited analytics measurement.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    dateModified: '2026-08-15',
  };

  return (
    <>
      <Script
        id="privacy-webpage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageStructuredData) }}
      />
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
      <Breadcrumb
        items={[
          { name: t('common.home'), href: '/' },
          { name: t('privacy.title') },
        ]}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t('privacy.title')}</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('privacy.lastUpdated')}: August 15, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privacy.overview')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('privacy.overviewDesc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privacy.dataProcessing')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              <strong>{t('privacy.dataProcessingDesc')}</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>{t('privacy.dataProcessingList1')}</li>
              <li>{t('privacy.dataProcessingList2')}</li>
              <li>{t('privacy.dataProcessingList3')}</li>
              <li>{t('privacy.dataProcessingList4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privacy.localStorage')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('privacy.localStorageDesc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privacy.analytics')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('privacy.analyticsDesc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privacy.cookies')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('privacy.cookiesDesc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('contact.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <Link href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                {t('about.contactUs')}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
