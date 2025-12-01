'use client';

import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/common/Breadcrumb';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
      <Breadcrumb
        items={[
          { name: t('common.home'), href: '/' },
          { name: t('terms.title') },
        ]}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t('terms.title')}</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('terms.lastUpdated')}: December 1, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.acceptance')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('terms.acceptanceDesc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.description')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('terms.descriptionDesc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.useOfService')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('terms.useOfServiceDesc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.intellectualProperty')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('terms.intellectualPropertyDesc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.disclaimer')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('terms.disclaimerDesc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('contact.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <a href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                {t('about.contactUs')}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
