'use client';

import { Fragment, useState, useEffect, useSyncExternalStore } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import FavoriteButton from '@/components/common/FavoriteButton';
import HistoryTracker from '@/components/common/HistoryTracker';
import QuickAccessBar from '@/components/common/QuickAccessBar';
import ToolWorkflowBar from '@/components/common/ToolWorkflowBar';
import WorkspaceControls from '@/components/common/WorkspaceControls';
import AdSense from '@/components/common/AdSense';
import PostToolAdBanner from '@/components/common/PostToolAdBanner';
import { Maximize2, Minimize2, Sun, Moon } from 'lucide-react';
import Link from '@/components/common/LocalizedLink';
import ProInterestCard from '@/components/common/ProInterestCard';
import {
  DEFAULT_ADSENSE_TOOL_SIDEBAR_SLOT,
  DEFAULT_ADSENSE_TOOL_ZEN_LEFT_SLOT,
  DEFAULT_ADSENSE_TOOL_ZEN_RIGHT_SLOT,
  resolveAdSenseFormat,
  resolveAdSenseSlot,
  resolveDistinctAdSenseSlot,
} from '@/lib/adsenseSlots';
import { getToolSeoCopy } from '@/lib/toolSeoCopy';
import CodeExample from '@/components/common/CodeExample';
import RelatedGuideLinks from '@/components/common/RelatedGuideLinks';
import type { ToolSeoSection } from '@/lib/toolSeoContent';

/** Matches Tailwind's `lg` breakpoint, where the sidebar sits beside the tool. */
const DESKTOP_SIDEBAR_QUERY = '(min-width: 1024px)';

/** Reserved height for the client-only tool UI so its mount doesn't shift the page. */
export const DEFAULT_TOOL_INTERFACE_MIN_HEIGHT = 420;

function subscribeToDesktopSidebar(onChange: () => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }
  const mediaQuery = window.matchMedia(DESKTOP_SIDEBAR_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
}

function getDesktopSidebarSnapshot() {
  return (
    typeof window.matchMedia === 'function' && window.matchMedia(DESKTOP_SIDEBAR_QUERY).matches
  );
}

// The server cannot know the viewport; render the lazy (mobile-safe) variant.
function getDesktopSidebarServerSnapshot() {
  return false;
}

interface ToolPageWrapperProps {
  toolSlug: string;
  category: string;
  categoryName: string;
  defaultName: string;
  defaultDescription: string;
  /**
   * Server-resolved localized name (non-default locales only). Wins over the
   * `toolName.<slug>` dict entry, which may be an English placeholder when the
   * real translation lives in enhancedTools.
   */
  localizedName?: string;
  /** Server-resolved localized description; see {@link localizedName}. */
  localizedDescription?: string;
  faqs: { question: string; answer: string }[];
  sources: { name: string; url: string }[];
  answerSections: ToolSeoSection[];
  relatedTools: { name: string; description: string; href: string }[];
  topicCollections: { name: string; description: string; href: string }[];
  relatedGuides?: { name: string; description: string; href: string }[];
  howToUseSteps?: string[];
  /** Minimum height (px) reserved for the tool UI before it mounts. */
  interfaceMinHeight?: number;
  children: React.ReactNode;
}

export default function ToolPageWrapper({
  toolSlug,
  category,
  categoryName,
  defaultName,
  defaultDescription,
  localizedName,
  localizedDescription,
  faqs,
  sources,
  answerSections,
  relatedTools,
  topicCollections,
  relatedGuides = [],
  howToUseSteps: customHowToUseSteps,
  interfaceMinHeight = DEFAULT_TOOL_INTERFACE_MIN_HEIGHT,
  children,
}: ToolPageWrapperProps) {
  const { t, language } = useLanguage();
  const seoCopy = getToolSeoCopy(language);
  // Only request the sidebar ad eagerly when the sidebar is beside the tool;
  // on smaller viewports it stacks at the bottom and should load lazily.
  const isDesktopSidebar = useSyncExternalStore(
    subscribeToDesktopSidebar,
    getDesktopSidebarSnapshot,
    getDesktopSidebarServerSnapshot,
  );
  const translateOr = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };
  const { setTheme, resolvedTheme } = useTheme();
  const [isZenMode, setIsZenMode] = useState(false);
  const [zenAdSession, setZenAdSession] = useState(0);
  const [zenAdsReady, setZenAdsReady] = useState(false);

  // Dedicated slots keep placement reports separate. Skip unconfigured or
  // conflicting bottom placements instead of sharing another placement's ID.
  const sidebarSlot = resolveAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT,
    DEFAULT_ADSENSE_TOOL_SIDEBAR_SLOT,
  );
  const postResultSlot = resolveAdSenseSlot(process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT);
  const zenLeftSlot = resolveAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_LEFT_SLOT,
    DEFAULT_ADSENSE_TOOL_ZEN_LEFT_SLOT,
  );
  const zenRightSlot = resolveAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_RIGHT_SLOT,
    DEFAULT_ADSENSE_TOOL_ZEN_RIGHT_SLOT,
  );
  const usedSlots = [postResultSlot, sidebarSlot, zenLeftSlot, zenRightSlot];
  const bottomSlot = resolveDistinctAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT,
    usedSlots,
  );
  const zenBottomSlot = resolveDistinctAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_TOOL_ZEN_BOTTOM_SLOT,
    [...usedSlots, bottomSlot],
  );
  // Small screens only show the post-tool banner above the long answer content and the
  // sidebar unit below all of it, so one more unit in the middle of that content gets the
  // most use there. It stays hidden until it has an id of its own.
  const inContentSlot = resolveDistinctAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_TOOL_INCONTENT_SLOT,
    [...usedSlots, bottomSlot, zenBottomSlot],
  );
  // Formats can be changed per deployment to compare fill and revenue in AdSense reports.
  const sidebarFormat = resolveAdSenseFormat(
    process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_FORMAT,
    'vertical',
  );
  const postToolFormat = resolveAdSenseFormat(
    process.env.NEXT_PUBLIC_ADSENSE_POST_TOOL_FORMAT,
    'horizontal',
  );
  const bottomFormat = resolveAdSenseFormat(
    process.env.NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_FORMAT,
    'auto',
  );
  const contentSections = answerSections.slice(1);

  // Lock body scroll and handle ESC key when in Zen Mode
  useEffect(() => {
    if (!isZenMode) {
      setZenAdsReady(false);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setZenAdsReady(true));
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZenMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZenMode]);

  // Prefer the server-resolved localized text (matches <title> and JSON-LD),
  // then the translation dict, then the default.
  const toolName = localizedName || translateOr(`toolName.${toolSlug}`, defaultName);
  const toolDescription =
    localizedDescription || translateOr(`toolDesc.${toolSlug}`, defaultDescription);

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

  const renderAnswerSection = (section: ToolSeoSection, answerFirst = false) => (
    <section
      key={section.heading}
      className="mb-8 min-w-0"
      data-answer-first={answerFirst ? 'true' : undefined}
    >
      <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-950 dark:text-white">{section.heading}</h2>
      <div className="min-w-0 space-y-3 break-words leading-7 text-slate-700 dark:text-slate-300">
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.codeExamples?.map((example) => <CodeExample key={example.title} {...example} />)}
        {section.bullets && (
          <ul className="list-disc space-y-2 pl-6">
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
      <nav className="mb-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-900/90">
        <ol className="flex items-center space-x-2 font-mono text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
          <li className="shrink-0">
            <Link
              href="/"
              className="transition-colors hover:text-slate-950 hover:underline dark:hover:text-white"
            >
              {t('nav.home') || 'Home'}
            </Link>
          </li>
          <li className="text-slate-400 dark:text-slate-600">/</li>
          <li className="shrink-0">
            <Link
              href={`/tools/${category}`}
              className="transition-colors hover:text-slate-950 hover:underline dark:hover:text-white"
            >
              {translatedCategoryName}
            </Link>
          </li>
          <li className="text-slate-400 dark:text-slate-600">/</li>
          <li className="truncate font-medium text-slate-950 dark:text-white">{toolName}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/90 sm:p-7">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded border border-slate-300 bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {translatedCategoryName}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {t('uiText.fd35707d')}
            </span>
          </div>
          <h1 className="mb-2 break-words text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {toolName}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">{toolDescription}</p>
        </div>
        <FavoriteButton toolSlug={toolSlug} className="shrink-0" />
      </div>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Content Area */}
        <div className="min-w-0 lg:col-span-3">
          {/* Lead with the direct answer before the interactive interface. */}
          {answerSections.slice(0, 1).map((section) => renderAnswerSection(section, true))}

          {/* Tool Component */}
          <div
            className="relative mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
            data-tool-interface="true"
          >
            {/* Tool Toolbar (Window Chrome + Workspace + Full Screen Toggle) */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900/95 sm:px-6">
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                <span className="hidden items-center gap-1.5 font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-400 sm:inline-flex">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  {toolSlug}
                </span>
                <WorkspaceControls toolSlug={toolSlug} />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setZenAdSession((session) => session + 1);
                    setIsZenMode(true);
                  }}
                  title={t('zenMode') || 'Full Screen'}
                  aria-label={t('zenMode') || 'Full Screen'}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-semibold text-slate-800 transition-colors hover:border-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-700"
                >
                  <Maximize2 className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>{t('zenMode') || 'Full Screen'}</span>
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <RelatedGuideLinks guides={relatedGuides} locale={language} />
              {/* The tool UI is client-only; reserve its typical height so mounting it
                  doesn't push the content below (CLS). */}
              <div data-tool-slot="true" className="min-w-0" style={{ minHeight: `${interfaceMinHeight}px` }}>
                {children}
              </div>
              <ToolWorkflowBar toolSlug={toolSlug} />
            </div>
          </div>

          {/* Full Screen Overlay */}
          {isZenMode && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${toolName} - ${t('zenMode') || 'Full Screen'}`}
              className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-slate-100 p-2 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-4 md:p-6"
            >
              {/* Header Bar */}
              <div className="sticky top-0 z-20 mb-4 flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="shrink-0 rounded border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {translatedCategoryName}
                  </span>
                  <h2 className="truncate text-base font-bold tracking-tight text-slate-950 dark:text-white sm:text-lg">
                    {toolName}
                  </h2>
                </div>
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                  {/* Theme Toggle Button */}
                  <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    title={
                      resolvedTheme === 'dark'
                        ? translateOr('lightMode', 'Light Mode')
                        : translateOr('darkMode', 'Dark Mode')
                    }
                    aria-label={
                      resolvedTheme === 'dark'
                        ? translateOr('lightMode', 'Light Mode')
                        : translateOr('darkMode', 'Dark Mode')
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:border-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    {resolvedTheme === 'dark' ? (
                      <Sun className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Moon className="h-4 w-4 text-slate-700" />
                    )}
                  </button>

                  <span className="hidden items-center text-xs text-slate-600 dark:text-slate-400 md:inline-flex">
                    <kbd className="mr-1.5 rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
                      {t('uiText.ea50bade')}
                    </kbd>
                    {t('exitZenMode') || 'to exit'}
                  </span>
                  <button
                    onClick={() => setIsZenMode(false)}
                    title={t('exitZenMode') || 'Exit Full Screen'}
                    aria-label={t('exitZenMode') || 'Exit Full Screen'}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-3.5 py-1.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    <Minimize2 className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {t('exitZenMode') || 'Exit Full Screen'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Fullscreen Body with Left Ad + Center Tool + Right Ad */}
              <div className="mb-4 flex w-full flex-1 items-start gap-4">
                {/* Left Skyscraper Ad (Large/Wide screens) */}
                <aside className="sticky top-20 hidden w-[160px] shrink-0 xl:block 2xl:w-[300px]">
                  {zenAdsReady && (
                    <AdSense
                      key={`zen-left-${zenAdSession}`}
                      slot={zenLeftSlot}
                      format="auto"
                      responsive={true}
                      immediate={true}
                      placement="tool-zen-left"
                      className="min-h-[600px] rounded-xl border border-slate-200 bg-white/80 p-1 dark:border-slate-800 dark:bg-slate-900/80"
                    />
                  )}
                </aside>

                {/* Center Tool Content (Fluid width) */}
                <main className="w-full min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
                  <RelatedGuideLinks guides={relatedGuides} locale={language} />
                  {children}
                </main>

                {/* Right Skyscraper Ad (Large/Wide screens) */}
                <aside className="sticky top-20 hidden w-[160px] shrink-0 xl:block 2xl:w-[300px]">
                  {zenAdsReady && (
                    <AdSense
                      key={`zen-right-${zenAdSession}`}
                      slot={zenRightSlot}
                      format="auto"
                      responsive={true}
                      immediate={true}
                      placement="tool-zen-right"
                      className="min-h-[600px] rounded-xl border border-slate-200 bg-white/80 p-1 dark:border-slate-800 dark:bg-slate-900/80"
                    />
                  )}
                </aside>
              </div>

              {/* Bottom Horizontal Ad Banner (Visible on mobile/tablet when sidebars are hidden) */}
              <div className="w-full shrink-0 xl:hidden">
                {zenAdsReady && zenBottomSlot && (
                  <AdSense
                    key={`zen-bottom-${zenAdSession}`}
                    slot={zenBottomSlot}
                    format="auto"
                    responsive={true}
                    immediate={true}
                    placement="tool-zen-bottom"
                    className="min-h-[90px] rounded-xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80"
                  />
                )}
              </div>
            </div>
          )}

          {/* High-Impact Post-Tool Result Banner */}
          <PostToolAdBanner slot={postResultSlot} format={postToolFormat} className="mb-8" />

          {/* Supporting server-readable answer content for search and AI retrieval. */}
          {contentSections.map((section, index) => (
            <Fragment key={section.heading}>
              {renderAnswerSection(section)}
              {index === 0 && inContentSlot && (
                <PostToolAdBanner
                  slot={inContentSlot}
                  format="auto"
                  placement="tool-in-content"
                  className="lg:hidden"
                />
              )}
            </Fragment>
          ))}
          {contentSections.length === 0 && inContentSlot && (
            <PostToolAdBanner
              slot={inContentSlot}
              format="auto"
              placement="tool-in-content"
              className="lg:hidden"
            />
          )}

          {/* Contextual internal links keep each tool connected to its topic cluster. */}
          <section className="mb-8" data-related-tools="true">
            <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold text-slate-950 dark:border-slate-800 dark:text-white">
              {t('toolPage.relatedTools') || 'Related developer tools'}
            </h2>
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              {t('toolPage.continueWith') || 'Continue with'}{' '}
              {relatedTools.map((relatedTool, index) => (
                <span key={`reader-${relatedTool.href}`}>
                  {index > 0 ? ', ' : ''}
                  <Link
                    href={relatedTool.href}
                    className="font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    {relatedTool.name}
                  </Link>
                </span>
              ))}
              .
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.href}
                  href={relatedTool.href}
                  className="interactive-card group block min-w-0 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-600"
                >
                  <h3 className="mb-1.5 break-words font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                    {relatedTool.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {relatedTool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Keep the existing bottom unit near the tool result, after related content. */}
          {bottomSlot && (
            <AdSense
              slot={bottomSlot}
              format={bottomFormat}
              placement="tool-bottom"
              className="mb-8 min-h-[90px] rounded-lg"
            />
          )}

          {topicCollections.length > 0 && (
            <section className="mb-8" data-topic-collections="true">
              <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold text-slate-950 dark:border-slate-800 dark:text-white">
                {seoCopy.topicCollectionsHeading}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {topicCollections.map((collection) => (
                  <Link
                    key={collection.href}
                    href={collection.href}
                    className="interactive-card group block min-w-0 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-600"
                  >
                    <h3 className="mb-1.5 break-words font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {collection.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <ProInterestCard placement="tool" />

          {/* How to Use Section */}
          <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/90">
            <h2 className="mb-4 text-xl font-bold text-slate-950 dark:text-white">
              {t('toolPage.howToUse')} {toolName}
            </h2>
            <ol className="list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
              {howToUseSteps.map((step, index) => (
                <li key={index}>{step.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold text-slate-950 dark:border-slate-800 dark:text-white">
              {t('toolPage.faq')}
            </h2>
            <dl className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border-b border-slate-200 pb-4 dark:border-slate-800"
                >
                  <dt>
                    <h3 className="mb-2 font-semibold text-slate-950 dark:text-white">
                      {faq.question}
                    </h3>
                  </dt>
                  <dd className="text-slate-700 dark:text-slate-300">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Sources and review metadata */}
          <section
            className="mb-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/90"
            aria-labelledby="sources-heading"
          >
            <h2
              id="sources-heading"
              className="mb-3 text-lg font-bold text-slate-950 dark:text-white sm:text-xl"
            >
              {t('toolPage.sourcesAndReferences') || 'Sources & references'}
            </h2>
            <p className="mb-3 text-slate-700 dark:text-slate-300">
              {t('toolPage.primaryReferences') || 'Primary references:'}{' '}
              {sources.map((source, index) => (
                <span key={source.url}>
                  {index > 0 ? '; ' : ''}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    {source.name}
                  </a>
                </span>
              ))}
              .
            </p>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
              {t('toolPage.reviewPolicy') ||
                'Review policy: references and behavior notes are checked whenever the tool implementation changes.'}
            </p>
          </section>
        </div>

        {/* Sidebar - Sticky Ad */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AdSense
              slot={sidebarSlot}
              format={sidebarFormat}
              immediate={isDesktopSidebar}
              placement="tool-sidebar"
              className="min-h-[300px] rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
