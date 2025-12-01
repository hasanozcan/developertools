'use client';

import { Code2, Shield, Zap, Heart } from 'lucide-react';
import Breadcrumb from '@/components/common/Breadcrumb';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
      <Breadcrumb
        items={[
          { name: t('common.home'), href: '/' },
          { name: t('footer.about') },
        ]}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Code2 className="w-16 h-16 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('about.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.mission')}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('about.missionDesc')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Shield className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('about.privacyFirst')}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('about.privacyFirstDesc')}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Zap className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('about.lightningFast')}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('about.lightningFastDesc')}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Heart className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('about.freeForever')}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('about.freeForeverDesc')}
            </p>
          </div>
        </div>

        {/* Tools Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.whatWeOffer')}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {t('about.whatWeOfferDesc')}
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>JSON formatting, validation, and conversion tools</li>
            <li>Encoding and decoding tools (Base64, URL, JWT, HTML entities)</li>
            <li>Hash generators (MD5, SHA256)</li>
            <li>Random generators (UUID, passwords, Lorem Ipsum)</li>
            <li>Code formatters and minifiers (SQL, CSS, JavaScript)</li>
            <li>Text utilities (Regex tester, Markdown preview, Text diff)</li>
            <li>Converters (Timestamp, Color, JSON to CSV)</li>
          </ul>
        </div>

        {/* Contact CTA */}
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.haveFeedback')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('about.haveFeedbackDesc')}
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            {t('about.contactUs')}
          </a>
        </div>
      </div>
    </div>
  );
}
