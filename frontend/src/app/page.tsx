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
  LucideIcon
} from 'lucide-react';
import AdSense from '@/components/common/AdSense';
import { toolCatalog } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { buildToolPath, getCanonicalToolCategory } from '@/lib/toolRoutes';

const categorySlugs = ['json', 'encoding', 'generators', 'crypto', 'text', 'converters', 'formatters', 'utilities'];

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
  'roman-numeral-converter': Circle,
  'number-base-converter': Calculator,
  'http-status-codes': FileText,
  'user-agent-parser': Fingerprint,
};

export default function Home() {
  const { t } = useLanguage();
  const normalizedPopular = toolCatalog.map((tool, index) => ({
      ...tool,
      categorySlug: getCanonicalToolCategory(
        tool.slug,
        (tool as any).categorySlug || (tool as any).category || tool.categorySlug || ''
      ),
      id: tool.id || index,
    }));

  const categories = categorySlugs.map(slug => ({
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
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300  mx-auto">
          {t('home.subtitle')}
        </p>
      </section>

      {/* Featured Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('home.popularTools')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {normalizedPopular.map((tool) => {
            const ToolIcon = toolIconMap[tool.slug] || categoryIcons[tool.categorySlug] || Wand2;
            const categoryLabel = tool.categorySlug ? t(`cat.${tool.categorySlug}`) || tool.categorySlug : '';
            const toolName = t(`toolName.${tool.slug}`) || tool.slug.replace(/-/g, ' ');
            const toolDesc = t(`toolDesc.${tool.slug}`) || tool.shortDescription || '';

            return (
              <Link
                key={`${tool.slug}-${tool.categorySlug}`}
                href={buildToolPath(tool.categorySlug, tool.slug)}
                className="group p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary-50 dark:bg-primary-900/30">
                    <ToolIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {toolName}
                      </h3>
                      {categoryLabel && (
                        <span className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap">
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('home.browseByCategory')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/tools/${category.slug}`}
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
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
        <p className="text-gray-600 dark:text-gray-300">
          {t('home.whyUseDesc')}
        </p>
        <h3>{t('home.keyFeatures')}</h3>
        <ul>
          <li><strong>{t('home.feature1').split(':')[0]}:</strong> {t('home.feature1').split(':')[1]}</li>
          <li><strong>{t('home.feature2').split(':')[0]}:</strong> {t('home.feature2').split(':')[1]}</li>
          <li><strong>{t('home.feature3').split(':')[0]}:</strong> {t('home.feature3').split(':')[1]}</li>
        </ul>
      </section>
    </div>
    </>
  );
}
