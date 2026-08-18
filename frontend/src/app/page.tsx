'use client';

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
  LucideIcon,
} from 'lucide-react';
import AdSense from '@/components/common/AdSense';
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

const categoryIcons: Record<string, any> = {
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

export default function Home() {
  const { t } = useLanguage();
  const normalizedPopular = toolCatalog.map((tool, index) => ({
    ...tool,
    categorySlug: getCanonicalToolCategory(
      tool.slug,
      (tool as any).categorySlug || (tool as any).category || tool.categorySlug || '',
    ),
    id: tool.id || index,
  }));

  const categories = categorySlugs.map((slug) => ({
    slug,
    name: t(`cat.${slug}`),
    description: t(`cat.${slug}.desc`),
    icon: categoryIcons[slug],
  }));

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
        <section className="relative mb-16 overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 px-6 py-14 text-center shadow-[0_30px_90px_-45px_rgba(79,70,229,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 sm:px-10 sm:py-20">
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
        <QuickAccessBar className="mb-12" />

        {/* Featured Tools */}
        <section className="mb-14 scroll-mt-24" id="tools">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow mb-3">Toolbox</span>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
                {t('home.popularTools')}
              </h2>
            </div>
            <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
              {toolCatalog.length} tools
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {normalizedPopular.map((tool) => {
              const ToolIcon = toolIconMap[tool.slug] || categoryIcons[tool.categorySlug] || Wand2;
              const categoryLabel = tool.categorySlug
                ? t(`cat.${tool.categorySlug}`) || tool.categorySlug
                : '';
              const toolName = t(`toolName.${tool.slug}`) || tool.slug.replace(/-/g, ' ');
              const toolDesc = t(`toolDesc.${tool.slug}`) || tool.shortDescription || '';

              return (
                <Link
                  key={`${tool.slug}-${tool.categorySlug}`}
                  href={buildToolPath(tool.categorySlug, tool.slug)}
                  title={`${toolName} - ${toolDesc || `Open the ${toolName} developer tool`}`}
                  className="interactive-card group rounded-2xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 shadow-md shadow-indigo-500/20">
                      <ToolIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {toolName}
                        </h3>
                        {categoryLabel && (
                          <span className="whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {categoryLabel}
                          </span>
                        )}
                      </div>
                      {toolDesc && (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 overflow-hidden text-ellipsis">
                          {toolDesc}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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
