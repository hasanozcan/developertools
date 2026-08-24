'use client';

import React, { useState, useMemo, Fragment } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import {
  Braces,
  Code,
  Wand2,
  Lock,
  Type,
  Text,
  ArrowLeftRight,
  ChevronRight,
  FileJson,
  Binary,
  Fingerprint,
  Link2,
  KeyRound,
  Hash,
  ShieldCheck,
  Regex,
  Palette,
  QrCode,
  Database,
  Clock,
  FileText,
  LinkIcon,
  Minimize2,
  FileCode,
  Key,
  Timer,
  TextQuote,
  Code2,
  FileSpreadsheet,
  GitCompare,
  FileType,
  FileJson2,
  Image,
  Paintbrush,
  Tags,
  Trash,
  ArrowUpDown,
  ArrowUp,
  Shield,
  Circle,
  Calculator,
  Network,
  Sparkles,
  Search,
  Flame,
  LayoutGrid,
  FolderTree,
  X,
  LucideIcon,
} from 'lucide-react';
import AdSense from '@/components/common/AdSense';
import InFeedAdCard from '@/components/common/InFeedAdCard';
import QuickAccessBar from '@/components/common/QuickAccessBar';
import { toolCatalog } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { buildToolPath, getCanonicalToolCategory } from '@/lib/toolRoutes';

const categorySlugs = [
  'json',
  'encoding',
  'generators',
  'crypto',
  'text',
  'converters',
  'formatters',
  'utilities',
];

const categoryIcons: Record<string, LucideIcon> = {
  json: Braces,
  encoding: Code,
  generators: Wand2,
  crypto: Lock,
  text: Type,
  converters: ArrowLeftRight,
  formatters: Code,
  utilities: Wand2,
};

const toolIconMap: Record<string, LucideIcon> = {
  'json-formatter': FileJson,
  'json-validator': FileJson,
  'json-schema-validator': ShieldCheck,
  'json-csv': FileSpreadsheet,
  'json-to-typescript': FileType,
  'yaml-json': FileJson2,
  base64: Binary,
  'url-encoder': Link2,
  'jwt-decoder': KeyRound,
  'html-entity': Code2,
  'unicode-escape': Code2,
  'json-string-escape': FileJson,
  'image-to-base64': Image,
  'uuid-generator': Fingerprint,
  'password-generator': Key,
  'lorem-ipsum': TextQuote,
  'qr-code': QrCode,
  'slug-generator': LinkIcon,
  'css-gradient': Paintbrush,
  'meta-tags': Tags,
  'md5-hash': Hash,
  'sha256-hash': ShieldCheck,
  'regex-tester': Regex,
  'regex-escape': Regex,
  'text-diff': GitCompare,
  'markdown-preview': FileText,
  'timestamp-converter': Timer,
  'color-converter': Palette,
  'url-parser': Link2,
  'query-string-parser': Link2,
  'sql-formatter': Database,
  'css-minifier': Minimize2,
  'js-minifier': FileCode,
  'cron-parser': Clock,
  'http-headers-parser': FileText,
  'case-converter': Text,
  'word-counter': FileType,
  'remove-duplicates': Trash,
  'sort-lines': ArrowUpDown,
  'hex-encoder': Hash,
  'binary-encoder': Binary,
  'html-formatter': FileJson,
  'html-minifier': Minimize2,
  'xml-formatter': FileCode,
  'sha512-hash': ShieldCheck,
  'hmac-generator': KeyRound,
  'pkce-generator': KeyRound,
  'roman-numeral-converter': Circle,
  'number-base-converter': Calculator,
  'http-status-codes': FileText,
  'user-agent-parser': Fingerprint,
  'cidr-calculator': Network,
  'svg-to-jsx': FileCode,
  'svg-minifier': Minimize2,
  'css-clamp': Calculator,
  'css-box-shadow': Paintbrush,
  'docker-run-to-compose': Binary,
  'cron-generator': Clock,
  'json-to-sql': Database,
  'bip39-generator': Key,
  'dmarc-generator': ShieldCheck,
  'json-to-models': Code2,
};

const popularToolSlugs = new Set([
  'json-formatter',
  'base64',
  'uuid-generator',
  'regex-tester',
  'jwt-decoder',
  'timestamp-converter',
  'text-diff',
  'css-minifier',
  'qr-code',
  'md5-hash',
  'color-converter',
]);

export default function Home() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'grouped'>('grid');

  const normalizedPopular = useMemo(() => {
    return toolCatalog.map((tool, index) => ({
      ...tool,
      categorySlug: getCanonicalToolCategory(
        tool.slug,
        (tool as any).categorySlug || (tool as any).category || tool.categorySlug || '',
      ),
      id: tool.id || index,
    }));
  }, []);

  const categories = useMemo(() => {
    return categorySlugs.map((slug) => ({
      slug,
      name: t(`cat.${slug}`) || slug,
      description: t(`cat.${slug}.desc`) || '',
      icon: categoryIcons[slug] || Wand2,
    }));
  }, [t]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: normalizedPopular.length };
    for (const tool of normalizedPopular) {
      counts[tool.categorySlug] = (counts[tool.categorySlug] || 0) + 1;
    }
    return counts;
  }, [normalizedPopular]);

  // Filtered tools list based on selected category & search query
  const filteredTools = useMemo(() => {
    let list = normalizedPopular;
    if (selectedCategory) {
      list = list.filter((tool) => tool.categorySlug === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((tool) => {
        const name = (t(`toolName.${tool.slug}`) || tool.slug.replace(/-/g, ' ')).toLowerCase();
        const desc = (t(`toolDesc.${tool.slug}`) || tool.shortDescription || '').toLowerCase();
        return (
          name.includes(q) ||
          desc.includes(q) ||
          tool.slug.toLowerCase().includes(q) ||
          tool.categorySlug.toLowerCase().includes(q)
        );
      });
    }
    return list;
  }, [normalizedPopular, selectedCategory, searchQuery, t]);

  // Grouped by Category for grouped view mode
  const groupedByCategory = useMemo(() => {
    const groups: {
      slug: string;
      name: string;
      icon: LucideIcon;
      tools: typeof normalizedPopular;
    }[] = [];

    for (const cat of categories) {
      const tools = filteredTools.filter((t) => t.categorySlug === cat.slug);
      if (tools.length > 0) {
        groups.push({
          slug: cat.slug,
          name: cat.name,
          icon: cat.icon,
          tools,
        });
      }
    }
    return groups;
  }, [categories, filteredTools]);

  const siteUrl = 'https://devstools.app';

  // BreadcrumbList structured data for homepage
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ],
  };

  // CollectionPage structured data for homepage
  const collectionPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'DevsTools - Free Online Developer Tools',
    description: `${toolCatalog.length} free online developer tools: JSON formatter, Base64 encoder, UUID generator, hash generators, regex tester, QR code & more. No registration, 100% client-side.`,
    url: siteUrl,
    about: {
      '@type': 'Thing',
      name: 'Developer Tools',
      description: 'Free online tools for software developers and web designers',
    },
  };

  return (
    <>
      {/* Structured Data */}
      <Script
        id="homepage-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Script
        id="homepage-collectionpage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageStructuredData) }}
      />
      <div className="page-shell">
        {/* Hero Section */}
        <section className="relative mb-14 overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 px-6 py-14 text-center shadow-[0_30px_90px_-45px_rgba(79,70,229,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 sm:px-10 sm:py-20">
          <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="eyebrow mb-6">
            <Sparkles className="h-3.5 w-3.5" /> {toolCatalog.length} developer tools
          </div>
          <h1 className="relative mx-auto mb-5 max-w-5xl text-4xl font-extrabold tracking-[-0.04em] text-gray-950 dark:text-white md:text-6xl lg:text-7xl">
            {t('home.title')}
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
            {t('home.subtitle')}
          </p>
          <a
            href="#tools"
            title={`Browse ${toolCatalog.length} free developer tools`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-200"
          >
            <Search className="h-4 w-4" /> {t('home.popularTools')}
          </a>
        </section>

        {/* Quick Access Bar (Recent & Privacy Badge) */}
        <QuickAccessBar className="mb-10" />

        {/* Interactive Toolbox Section */}
        <section className="mb-14 scroll-mt-24" id="tools">
          {/* Header & Controls Bar */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="eyebrow mb-2">Toolbox</span>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
                  {t('home.popularTools')}
                </h2>
                <span className="rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-0.5 text-xs font-semibold text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-800 dark:text-slate-300">
                  {filteredTools.length} / {normalizedPopular.length}
                </span>
              </div>
            </div>

            {/* Filter Search Input & View Mode Toggles */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative flex-1 sm:w-64 sm:flex-initial">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('home.filterPlaceholder') || 'Filter tools...'}
                  className="w-full rounded-2xl border border-slate-200/80 bg-white/90 py-2 pl-9 pr-8 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-100"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    title={t('home.clearFilter') || 'Clear'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="inline-flex rounded-2xl border border-slate-200/80 bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                <button
                  onClick={() => setViewMode('grid')}
                  title={t('home.viewGrid') || 'Grid View'}
                  aria-label="Grid view"
                  className={`rounded-xl p-2 transition ${
                    viewMode === 'grid'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('grouped')}
                  title={t('home.viewGrouped') || 'Grouped View'}
                  aria-label="Grouped view"
                  className={`rounded-xl p-2 transition ${
                    viewMode === 'grouped'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  <FolderTree className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedCategory === null
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'border border-slate-200/80 bg-white/80 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-indigo-500'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t('home.allCategories') || 'All'}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  selectedCategory === null
                    ? 'bg-indigo-900/60 text-white'
                    : 'bg-slate-200/80 text-slate-800 dark:bg-slate-700 dark:text-slate-100'
                }`}
              >
                {categoryCounts.all || normalizedPopular.length}
              </span>
            </button>

            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.slug;
              const count = categoryCounts[cat.slug] || 0;

              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.slug)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'border border-slate-200/80 bg-white/80 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-indigo-500'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.name}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      isSelected
                        ? 'bg-indigo-900/60 text-white'
                        : 'bg-slate-200/80 text-slate-800 dark:bg-slate-700 dark:text-slate-100'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tool Cards Content */}
          {filteredTools.length === 0 ? (
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-12 text-center shadow-sm dark:border-white/10 dark:bg-slate-900/80">
              <Search className="mx-auto mb-3 h-8 w-8 text-slate-400" />
              <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                {t('home.noToolsFound') || 'No tools found matching your filter.'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
              >
                <X className="h-3.5 w-3.5" />
                <span>{t('home.clearFilter') || 'Clear Filter'}</span>
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {filteredTools.map((tool, index) => {
                const showInFeed = (index + 1) % 12 === 0 && index < filteredTools.length - 1;
                const ToolIcon = toolIconMap[tool.slug] || categoryIcons[tool.categorySlug] || Wand2;
                const categoryLabel = tool.categorySlug
                  ? t(`cat.${tool.categorySlug}`) || tool.categorySlug
                  : '';
                const toolName = t(`toolName.${tool.slug}`) || tool.slug.replace(/-/g, ' ');
                const toolDesc = t(`toolDesc.${tool.slug}`) || tool.shortDescription || '';
                const isPopular = popularToolSlugs.has(tool.slug);

                return (
                  <React.Fragment key={`frag-${tool.slug}-${tool.categorySlug}`}>
                  <Link
                    key={`${tool.slug}-${tool.categorySlug}`}
                    href={buildToolPath(tool.categorySlug, tool.slug)}
                    title={`${toolName} - ${toolDesc || `Open the ${toolName} developer tool`}`}
                    className="interactive-card group rounded-2xl p-4 relative"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 shadow-md shadow-indigo-500/20 shrink-0 group-hover:scale-105 transition-transform">
                        <ToolIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1.5">
                          <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
                            {toolName}
                          </h3>
                          {isPopular && (
                            <span className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-full bg-amber-100 dark:bg-amber-950/50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 shrink-0">
                              <Flame className="h-2.5 w-2.5 text-amber-500 fill-amber-500" />
                              {t('home.popularBadge') || 'Popular'}
                            </span>
                          )}
                        </div>
                        {toolDesc && (
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                            {toolDesc}
                          </p>
                        )}
                        {categoryLabel && !isPopular && (
                          <span className="inline-block mt-2 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {categoryLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                      {showInFeed && (
                        <InFeedAdCard key={`infeed-search-${tool.slug}-${index}`} />
                      )}
                    </React.Fragment>
                );
              })}
            </div>
          ) : (
            /* Grouped by Category View */
            <div className="space-y-10">
              {groupedByCategory.map((group) => {
                const CatIcon = group.icon;
                return (
                  <div key={group.slug} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 dark:border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="rounded-xl bg-indigo-50 p-2 dark:bg-indigo-900/30">
                          <CatIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {group.name}
                        </h3>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {group.tools.length}
                        </span>
                      </div>
                      <Link
                        href={`/tools/${group.slug}`}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 inline-flex items-center gap-1"
                      >
                        <span>{t('nav.viewAll')}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                      {group.tools.map((tool, index) => {
                        const showInFeed = (index + 1) % 12 === 0 && index < group.tools.length - 1;
                        const ToolIcon = toolIconMap[tool.slug] || group.icon || Wand2;
                        const toolName = t(`toolName.${tool.slug}`) || tool.slug.replace(/-/g, ' ');
                        const toolDesc = t(`toolDesc.${tool.slug}`) || tool.shortDescription || '';
                        const isPopular = popularToolSlugs.has(tool.slug);

                        return (
                          <React.Fragment key={`frag-${group.slug}-${tool.slug}`}>
                          <Link
                            key={`${tool.slug}-${tool.categorySlug}`}
                            href={buildToolPath(tool.categorySlug, tool.slug)}
                            title={`${toolName} - ${toolDesc || `Open the ${toolName} developer tool`}`}
                            className="interactive-card group rounded-2xl p-4 relative"
                          >
                            <div className="flex items-start gap-3">
                              <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 shadow-md shadow-indigo-500/20 shrink-0 group-hover:scale-105 transition-transform">
                                <ToolIcon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1.5">
                                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
                                    {toolName}
                                  </h4>
                                  {isPopular && (
                                    <span className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-full bg-amber-100 dark:bg-amber-950/50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 shrink-0">
                                      <Flame className="h-2.5 w-2.5 text-amber-500 fill-amber-500" />
                                      {t('home.popularBadge') || 'Popular'}
                                    </span>
                                  )}
                                </div>
                                {toolDesc && (
                                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {toolDesc}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                              {showInFeed && (
                                <InFeedAdCard key={`infeed-${group.slug}-${index}`} />
                              )}
                            </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Ad Banner - After Popular Tools */}
        <AdSense
          slot="1733348098"
          format="horizontal"
          className="h-24 rounded-lg mb-12 overflow-hidden"
        />

        {/* Categories */}
        <section className="mb-16" id="categories">
          <span className="eyebrow mb-3">Explore</span>
          <h2 className="mb-7 text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
            {t('home.browseByCategory')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/tools/${category.slug}`}
                  title={`${category.name} - ${category.description}`}
                  className="interactive-card group rounded-3xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-indigo-50 p-3.5 transition group-hover:bg-indigo-600 dark:bg-indigo-400/10 dark:group-hover:bg-indigo-500">
                      <Icon className="h-6 w-6 text-indigo-600 transition group-hover:text-white dark:text-indigo-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Ad Banner - Bottom */}
        <AdSense
          slot="7781534087"
          format="horizontal"
          className="h-24 rounded-lg mb-12 overflow-hidden"
        />

        {/* SEO Content */}
        <section className="prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-gray-900 dark:text-white">{t('home.whyUse')}</h2>
          <p className="text-gray-600 dark:text-gray-300">{t('home.whyUseDesc')}</p>
          <h3>{t('home.keyFeatures')}</h3>
          <ul>
            <li>
              <strong>{t('home.feature1').split(':')[0]}:</strong>{' '}
              {t('home.feature1').split(':')[1]}
            </li>
            <li>
              <strong>{t('home.feature2').split(':')[0]}:</strong>{' '}
              {t('home.feature2').split(':')[1]}
            </li>
            <li>
              <strong>{t('home.feature3').split(':')[0]}:</strong>{' '}
              {t('home.feature3').split(':')[1]}
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
