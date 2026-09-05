'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import FavoriteButton from '@/components/common/FavoriteButton';
import HistoryTracker from '@/components/common/HistoryTracker';
import QuickAccessBar from '@/components/common/QuickAccessBar';
import AdSense from '@/components/common/AdSense';
import PostToolAdBanner from '@/components/common/PostToolAdBanner';
import { Maximize2, Minimize2, Sparkles, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

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
  howToUseSteps: customHowToUseSteps,
  children,
}: ToolPageWrapperProps) {
  const { t } = useLanguage();
  const { setTheme, resolvedTheme } = useTheme();
  const [isZenMode, setIsZenMode] = useState(false);

  // Lock body scroll and handle ESC key when in Zen Mode
  useEffect(() => {
    if (!isZenMode) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZenMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZenMode]);

  // Get translated tool name, fallback to default
  const toolName =
    t(`toolName.${toolSlug}`) !== `toolName.${toolSlug}` ? t(`toolName.${toolSlug}`) : defaultName;

  // Get translated tool description, fallback to default
  const toolDescription =
    t(`toolDesc.${toolSlug}`) !== `toolDesc.${toolSlug}`
      ? t(`toolDesc.${toolSlug}`)
      : defaultDescription;

  // Get translated category name
  const translatedCategoryName =
    t(
      `cat.${category === 'json' ? 'json' : category === 'encoding' ? 'encoding' : category === 'generators' ? 'generators' : category === 'crypto' ? 'crypto' : category === 'text' ? 'text' : category === 'converters' ? 'converters' : category === 'formatters' ? 'formatters' : 'utilities'}`,
    ) !== `cat.${category}`
      ? t(
          `cat.${category === 'json' ? 'json' : category === 'encoding' ? 'encoding' : category === 'generators' ? 'generators' : category === 'crypto' ? 'crypto' : category === 'text' ? 'text' : category === 'converters' ? 'converters' : category === 'formatters' ? 'formatters' : 'utilities'}`,
        )
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
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{section.heading}</h2>
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

      {/* Quick Access Bar (Recents & Privacy) */}
      <QuickAccessBar currentSlug={toolSlug} className="mb-4" />

      {/* Breadcrumb */}
      <nav className="mb-6 overflow-x-auto rounded-full border border-white/80 bg-white/60 px-4 py-2.5 backdrop-blur dark:border-white/10 dark:bg-white/5">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <Link
              href="/"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {t('nav.home') || 'Home'}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link
              href={`/tools/${category}`}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {translatedCategoryName}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 dark:text-white font-medium">{toolName}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="surface-card mb-8 flex items-start justify-between gap-4 rounded-3xl p-6 sm:p-8">
        <div>
          <span className="eyebrow mb-3">{translatedCategoryName}</span>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
            {toolName}
          </h1>
          <p className="max-w-3xl leading-7 text-gray-600 dark:text-gray-300">{toolDescription}</p>
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
          <div className="surface-card mb-8 rounded-3xl p-4 sm:p-7 relative" data-tool-interface="true">
            {/* Tool Toolbar (Full Screen Toggle) */}
            <div className="flex items-center justify-end mb-4 pb-2 border-b border-slate-100 dark:border-white/5">
              <button
                onClick={() => setIsZenMode(true)}
                title={t('zenMode') || 'Full Screen'}
                aria-label={t('zenMode') || 'Full Screen'}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500"
              >
                <Maximize2 className="h-3.5 w-3.5 text-indigo-500" />
                <span>{t('zenMode') || 'Full Screen'}</span>
              </button>
            </div>
            {children}
          </div>

          {/* Full Screen Overlay */}
          {isZenMode && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${toolName} - ${t('zenMode') || 'Full Screen'}`}
              className="fixed inset-0 z-[100] flex flex-col bg-slate-100/95 p-2 sm:p-4 md:p-6 overflow-y-auto backdrop-blur-2xl dark:bg-slate-950/95 text-slate-900 dark:text-slate-100"
            >
              {/* Header Bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-xl mb-4 dark:border-white/10 dark:bg-slate-900/90 w-full">
                <div className="flex items-center gap-3">
                  <span className="eyebrow py-0.5 px-2.5 text-[10px]">{translatedCategoryName}</span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate">
                    {toolName}
                  </h2>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Theme Toggle Button */}
                  <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    title={resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    aria-label={resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-slate-200/80 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    {resolvedTheme === 'dark' ? (
                      <Sun className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Moon className="h-4 w-4 text-indigo-600" />
                    )}
                  </button>

                  <span className="hidden md:inline-flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <kbd className="rounded border border-slate-300 bg-slate-200/90 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-800 mr-1.5 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100">
                      ESC
                    </kbd>
                    {t('exitZenMode') || 'to exit'}
                  </span>
                  <button
                    onClick={() => setIsZenMode(false)}
                    title={t('exitZenMode') || 'Exit Full Screen'}
                    aria-label={t('exitZenMode') || 'Exit Full Screen'}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:-translate-y-0.5"
                  >
                    <Minimize2 className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('exitZenMode') || 'Exit Full Screen'}</span>
                  </button>
                </div>
              </div>

              {/* Fullscreen Body with Left Ad + Center Tool + Right Ad */}
              <div className="flex-1 flex gap-4 items-start w-full mb-4">
                {/* Left Skyscraper Ad (Large/Wide screens) */}
                <aside className="hidden xl:block w-[160px] 2xl:w-[300px] shrink-0 sticky top-20">
                  <AdSense
                    slot={process.env.NEXT_PUBLIC_ADSENSE_LEFT_SLOT || '3460899670'}
                    format="vertical"
                    immediate={true}
                    className="min-h-[600px] rounded-3xl border border-slate-200/60 bg-white/50 dark:border-white/5 dark:bg-slate-900/50 p-1 shadow-sm"
                  />
                </aside>

                {/* Center Tool Content (Fluid width) */}
                <main className="flex-1 min-w-0 w-full rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900">
                  {children}
                </main>

                {/* Right Skyscraper Ad (Large/Wide screens) */}
                <aside className="hidden xl:block w-[160px] 2xl:w-[300px] shrink-0 sticky top-20">
                  <AdSense
                    slot={process.env.NEXT_PUBLIC_ADSENSE_RIGHT_SLOT || '1351515156'}
                    format="vertical"
                    immediate={true}
                    className="min-h-[600px] rounded-3xl border border-slate-200/60 bg-white/50 dark:border-white/5 dark:bg-slate-900/50 p-1 shadow-sm"
                  />
                </aside>
              </div>

              {/* Bottom Horizontal Ad Banner (Visible on mobile/tablet when sidebars are hidden) */}
              <div className="w-full shrink-0 xl:hidden">
                <AdSense
                  slot={process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || '7781534087'}
                  format="horizontal"
                  className="min-h-[90px] rounded-2xl border border-slate-200/60 bg-white/50 dark:border-white/5 dark:bg-slate-900/50"
                />
              </div>
            </div>
          )}

          {/* High-Impact Post-Tool Result Banner */}
          <PostToolAdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || '7781534087'} className="mb-8" />

          {/* Supporting server-readable answer content for search and AI retrieval. */}
          {answerSections.slice(1).map((section) => renderAnswerSection(section))}

          {/* Contextual internal links keep each tool connected to its topic cluster. */}
          <section className="mb-8" data-related-tools="true">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('toolPage.relatedTools') || 'Related developer tools'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('toolPage.continueWith') || 'Continue with'}{' '}
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
                  className="interactive-card block rounded-2xl p-4"
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
              {t('toolPage.sourcesAndReferences') || 'Sources & references'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('toolPage.primaryReferences') || 'Primary references:'}{' '}
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
              {t('toolPage.reviewPolicy') ||
                'Review policy: references and behavior notes are checked whenever the tool implementation changes.'}
            </p>
          </section>
        </div>

        {/* Sidebar - Sticky Ad */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AdSense
              slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || '2449208552'}
              format="vertical"
              immediate={true}
              className="min-h-[300px] rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Ad Banner - Bottom */}
      <AdSense
        slot={process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || '7781534087'}
        format="horizontal"
        className="min-h-[90px] rounded-lg mt-8"
      />
    </>
  );
}
