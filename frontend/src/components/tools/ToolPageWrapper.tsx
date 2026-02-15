'use client';

import { useLanguage } from '@/context/LanguageContext';
import FavoriteButton from '@/components/common/FavoriteButton';
import HistoryTracker from '@/components/common/HistoryTracker';
import AdSense from '@/components/common/AdSense';

interface ToolPageWrapperProps {
  toolSlug: string;
  category: string;
  categoryName: string;
  defaultName: string;
  defaultDescription: string;
  children: React.ReactNode;
}

export default function ToolPageWrapper({
  toolSlug,
  category,
  categoryName,
  defaultName,
  defaultDescription,
  children,
}: ToolPageWrapperProps) {
  const { t } = useLanguage();

  // Get translated tool name, fallback to default
  const toolName = t(`toolName.${toolSlug}`) !== `toolName.${toolSlug}`
    ? t(`toolName.${toolSlug}`)
    : defaultName;

  // Get translated tool description, fallback to default
  const toolDescription = t(`toolDesc.${toolSlug}`) !== `toolDesc.${toolSlug}`
    ? t(`toolDesc.${toolSlug}`)
    : defaultDescription;

  // Get translated category name
  const translatedCategoryName = t(`cat.${category === 'json' ? 'json' : category === 'encoding' ? 'encoding' : category === 'generators' ? 'generators' : category === 'crypto' ? 'crypto' : category === 'text' ? 'text' : category === 'converters' ? 'converters' : category === 'formatters' ? 'formatters' : 'utilities'}`) !== `cat.${category}`
    ? t(`cat.${category === 'json' ? 'json' : category === 'encoding' ? 'encoding' : category === 'generators' ? 'generators' : category === 'crypto' ? 'crypto' : category === 'text' ? 'text' : category === 'converters' ? 'converters' : category === 'formatters' ? 'formatters' : 'utilities'}`)
    : categoryName;

  const howToUseSteps = t('toolPage.howToUseSteps').split('\n');

  return (
    <>
      {/* Track history on client side */}
      <HistoryTracker slug={toolSlug} name={toolName} category={category} />

      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {t('nav.home') || 'Home'}
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <a href={`/tools/${category}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {translatedCategoryName}
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 dark:text-white font-medium">{toolName}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{toolName}</h1>
          <p className="text-gray-600 dark:text-gray-300">{toolDescription}</p>
        </div>
        <FavoriteButton toolSlug={toolSlug} />
      </div>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Tool Component */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
            {children}
          </div>

          {/* Ad Banner - After Tool */}
          <AdSense
            slot="1733348098"
            format="horizontal"
            className="h-24 max-h-24 rounded-lg mb-8 overflow-hidden"
          />

          {/* How to Use Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('toolPage.howToUse')} {toolName}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              {howToUseSteps.map((step, index) => (
                <li key={index}>{step.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('toolPage.faq')}
            </h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('toolPage.isDataSafe')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('toolPage.dataSafeAnswer')}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar - Sticky Ad */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AdSense
              slot="2449208552"
              format="vertical"
              className="h-[300px] max-h-[600px] rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </div>

      {/* Ad Banner - Bottom */}
      <AdSense
        slot="7781534087"
        format="horizontal"
        className="h-24 max-h-24 rounded-lg mt-8 overflow-hidden"
      />
    </>
  );
}
