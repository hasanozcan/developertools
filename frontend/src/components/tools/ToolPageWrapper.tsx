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
  faqs: { question: string; answer: string }[];
  sources: { name: string; url: string }[];
  answerSections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  relatedTools: { name: string; description: string; href: string }[];
  lastReviewed: string;
  howToUseSteps?: string[];
  children: React.ReactNode;
}

export default function ToolPageWrapper({
  toolSlug,
  category,
  categoryName,
  defaultName,
  defaultDescription,
  faqs,
  sources,
  answerSections,
  relatedTools,
  lastReviewed,
  howToUseSteps: customHowToUseSteps,
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

  const howToUseSteps = customHowToUseSteps || t('toolPage.howToUseSteps').split('\n');

  const renderAnswerSection = (
    section: { heading: string; paragraphs?: string[]; bullets?: string[] },
    answerFirst = false,
  ) => (
    <section
      key={section.heading}
      className="mb-8"
      data-answer-first={answerFirst ? 'true' : undefined}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {section.heading}
      </h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.bullets && (
          <ul className="list-disc pl-6 space-y-2">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );

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
          {/* Lead with the direct answer before the interactive interface. */}
          {answerSections.slice(0, 1).map((section) => renderAnswerSection(section, true))}

          {/* Tool Component */}
          <div
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
            data-tool-interface="true"
          >
            {children}
          </div>

          {/* Ad Banner - After Tool */}
          <AdSense
            slot="1733348098"
            format="horizontal"
            className="h-24 max-h-24 rounded-lg mb-8 overflow-hidden"
          />

          {/* Supporting server-readable answer content for search and AI retrieval. */}
          {answerSections.slice(1).map((section) => renderAnswerSection(section))}

          {/* Contextual internal links keep each tool connected to its topic cluster. */}
          <section className="mb-8" data-related-tools="true">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Related developer tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Continue with{' '}
              {relatedTools.map((relatedTool, index) => (
                <span key={`reader-${relatedTool.href}`}>
                  {index > 0 ? ', ' : ''}
                  <a
                    href={relatedTool.href}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {relatedTool.name}
                  </a>
                </span>
              ))}
              .
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((relatedTool) => (
                <a
                  key={relatedTool.href}
                  href={relatedTool.href}
                  className="block rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {relatedTool.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {relatedTool.description}
                  </p>
                </a>
              ))}
            </div>
          </section>

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
            <dl className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border-b border-gray-100 dark:border-gray-700 pb-4"
                >
                  <dt>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                  </dt>
                  <dd className="text-gray-600 dark:text-gray-300">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Sources and review metadata */}
          <section className="mb-8" aria-labelledby="sources-heading">
            <h2
              id="sources-heading"
              className="text-xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Sources &amp; references
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Primary references:{' '}
              {sources.map((source, index) => (
                <span key={source.url}>
                  {index > 0 ? '; ' : ''}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {source.name}
                  </a>
                </span>
              ))}
              .
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last reviewed: <time dateTime={lastReviewed}>{lastReviewed}</time>
            </p>
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
