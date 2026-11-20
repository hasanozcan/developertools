'use client';

import React, { useState, useMemo, useEffect, Fragment } from 'react';
import Link from '@/components/common/LocalizedLink';
import ProInterestCard from '@/components/common/ProInterestCard';
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
  Circle,
  Calculator,
  Network,
  Terminal,
  Search,
  Flame,
  LayoutGrid,
  FolderTree,
  X,
  Star,
  Zap,
  ChevronDown,
  LucideIcon,
} from 'lucide-react';
import AdSense from '@/components/common/AdSense';
import InFeedAdCard from '@/components/common/InFeedAdCard';
import QuickAccessBar from '@/components/common/QuickAccessBar';
import TrendingTools from '@/components/seo/TrendingTools';
import { toolCatalog } from '@/lib/api';
import { getToolManifest } from '@/lib/toolManifest';
import type { HomeHubs } from '@/lib/homeHubs';
import { useLanguage } from '@/context/LanguageContext';
import { useFavorites } from '@/context/FavoritesContext';
import { buildToolPath, getCanonicalToolCategory } from '@/lib/toolRoutes';
import { getLocalizedPath } from '@/lib/localeRouting';
import { interpolateText, translateCount } from '@/lib/localizedText';
import { serializeJsonForHtmlScript } from '@/lib/scriptSafeJson';
import {
  DEFAULT_ADSENSE_HOME_AFTER_TOOLS_SLOT,
  DEFAULT_ADSENSE_HOME_BEFORE_SEO_SLOT,
  DEFAULT_ADSENSE_INFEED_SLOT,
  resolveAdSenseSlot,
} from '@/lib/adsenseSlots';

// Defaults are the ids these placements already used; set the variables to give each
// placement its own AdSense unit.
const HOME_INFEED_SLOT = resolveAdSenseSlot(
  process.env.NEXT_PUBLIC_ADSENSE_HOME_INFEED_SLOT,
  DEFAULT_ADSENSE_INFEED_SLOT,
);
const HOME_AFTER_TOOLS_SLOT = resolveAdSenseSlot(
  process.env.NEXT_PUBLIC_ADSENSE_HOME_AFTER_TOOLS_SLOT,
  DEFAULT_ADSENSE_HOME_AFTER_TOOLS_SLOT,
);
const HOME_BEFORE_SEO_SLOT = resolveAdSenseSlot(
  process.env.NEXT_PUBLIC_ADSENSE_HOME_BEFORE_SEO_SLOT,
  DEFAULT_ADSENSE_HOME_BEFORE_SEO_SLOT,
);

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
  'dockerfile-generator': Binary,
  'kubernetes-deployment-generator': Network,
  'tailwind-v4-mesh-gradient-generator': Paintbrush,
  'blake3-hash-generator': ShieldCheck,
  'sql-to-python-sqlalchemy': Database,
  'postman-to-openapi': ArrowLeftRight,
  'http-cache-control-tester': Wand2,
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
  'dockerfile-generator',
  'tailwind-v4-mesh-gradient-generator',
  'blake3-hash-generator',
]);

interface CategoryAccent {
  code: string;
  topBorder: string;
  iconBox: string;
  badge: string;
}

const categoryAccents: Record<string, CategoryAccent> = {
  json: {
    code: 'JSON',
    topBorder: 'border-t-emerald-500',
    iconBox: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/70 dark:bg-emerald-950/60 dark:text-emerald-300',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/60 dark:text-emerald-300',
  },
  crypto: {
    code: 'CRYPTO',
    topBorder: 'border-t-amber-500',
    iconBox: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800/70 dark:bg-amber-950/60 dark:text-amber-300',
    badge: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800/70 dark:bg-amber-950/60 dark:text-amber-300',
  },
  encoding: {
    code: 'ENC',
    topBorder: 'border-t-sky-500',
    iconBox: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/70 dark:bg-sky-950/60 dark:text-sky-300',
    badge: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800/70 dark:bg-sky-950/60 dark:text-sky-300',
  },
  converters: {
    code: 'CONV',
    topBorder: 'border-t-blue-500',
    iconBox: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800/70 dark:bg-blue-950/60 dark:text-blue-300',
    badge: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800/70 dark:bg-blue-950/60 dark:text-blue-300',
  },
  formatters: {
    code: 'FMT',
    topBorder: 'border-t-teal-500',
    iconBox: 'border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800/70 dark:bg-teal-950/60 dark:text-teal-300',
    badge: 'border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-800/70 dark:bg-teal-950/60 dark:text-teal-300',
  },
  generators: {
    code: 'GEN',
    topBorder: 'border-t-rose-500',
    iconBox: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800/70 dark:bg-rose-950/60 dark:text-rose-300',
    badge: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800/70 dark:bg-rose-950/60 dark:text-rose-300',
  },
  text: {
    code: 'TEXT',
    topBorder: 'border-t-zinc-500',
    iconBox: 'border-zinc-300 bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
    badge: 'border-zinc-300 bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
  },
  utilities: {
    code: 'UTIL',
    topBorder: 'border-t-cyan-500',
    iconBox: 'border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-800/70 dark:bg-cyan-950/60 dark:text-cyan-300',
    badge: 'border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-800/70 dark:bg-cyan-950/60 dark:text-cyan-300',
  },
};

const heroShortcutSlugs = [
  { slug: 'json-formatter', fallbackCategory: 'json' },
  { slug: 'jwt-decoder', fallbackCategory: 'encoding' },
  { slug: 'base64', fallbackCategory: 'encoding' },
  { slug: 'sha256-hash', fallbackCategory: 'crypto' },
  { slug: 'regex-tester', fallbackCategory: 'text' },
  { slug: 'curl-to-fetch', fallbackCategory: 'utilities' },
] as const;

const workbenchDailySlugs = [
  { slug: 'json-formatter', fallbackCategory: 'json', tag: 'JSON', tagClass: 'border-emerald-700/80 bg-emerald-950/80 text-emerald-300' },
  { slug: 'sha256-hash', fallbackCategory: 'crypto', tag: 'CRYPTO', tagClass: 'border-amber-700/80 bg-amber-950/80 text-amber-300' },
  { slug: 'jwt-decoder', fallbackCategory: 'encoding', tag: 'ENC', tagClass: 'border-sky-700/80 bg-sky-950/80 text-sky-300' },
  { slug: 'curl-to-fetch', fallbackCategory: 'utilities', tag: 'UTIL', tagClass: 'border-cyan-700/80 bg-cyan-950/80 text-cyan-300' },
] as const;

const spotlightTools = [
  { slug: 'json-formatter', icon: FileJson, category: 'json' },
  { slug: 'jwt-decoder', icon: KeyRound, category: 'encoding' },
  { slug: 'base64', icon: Binary, category: 'encoding' },
  { slug: 'uuid-generator', icon: Fingerprint, category: 'generators' },
  { slug: 'regex-tester', icon: Regex, category: 'text' },
  { slug: 'dockerfile-generator', icon: Binary, category: 'utilities' },
  { slug: 'sql-to-python-sqlalchemy', icon: Database, category: 'converters' },
  { slug: 'tailwind-v4-mesh-gradient-generator', icon: Paintbrush, category: 'generators' },
];

const INITIAL_PAGE_SIZE = 48;
const LOAD_MORE_STEP = 48;

const directoryCopy: Record<
  'en' | 'tr' | 'de' | 'es' | 'fr' | 'ru' | 'zh',
  { heading: string; subtitle: string }
> = {
  en: {
    heading: 'Complete Tool Directory',
    subtitle: 'Direct links to every free client-side developer tool organized by category.',
  },
  tr: {
    heading: 'Tüm Araçlar Dizini',
    subtitle: 'Kategoriye göre düzenlenmiş tüm ücretsiz istemci tarafı geliştirici araçlarına doğrudan bağlantılar.',
  },
  de: {
    heading: 'Vollständiges Tool-Verzeichnis',
    subtitle: 'Direkte Links zu allen kostenlosen clientseitigen Entwickler-Tools nach Kategorie.',
  },
  es: {
    heading: 'Directorio completo de herramientas',
    subtitle: 'Enlaces directos a todas las herramientas gratuitas en el navegador organizadas por categoría.',
  },
  fr: {
    heading: 'Répertoire complet des outils',
    subtitle: 'Liens directs vers tous les outils développeurs gratuits côté client, classés par catégorie.',
  },
  ru: {
    heading: 'Полный каталог инструментов',
    subtitle: 'Прямые ссылки на все бесплатные клиентские инструменты разработчика по категориям.',
  },
  zh: {
    heading: '完整工具目录',
    subtitle: '按分类整理的所有免费浏览器端开发者工具直达链接。',
  },
};

export default function Home({ hubs, children }: { hubs: HomeHubs; children?: React.ReactNode }) {
  const { t, language } = useLanguage();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'grouped'>('grid');
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  useEffect(() => {
    const readUrlSearch = () => {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const query = new URLSearchParams(window.location.search);
      const urlSearch = hash.get('search') ?? query.get('search');
      if (urlSearch !== null) {
        setSearchQuery(urlSearch);
      }
    };
    readUrlSearch();
    window.addEventListener('hashchange', readUrlSearch);
    return () => window.removeEventListener('hashchange', readUrlSearch);
  }, []);

  const updateSearchQuery = (nextValue: string) => {
    setSearchQuery(nextValue);
    try {
      const nextHash = nextValue.trim() ? `#search=${encodeURIComponent(nextValue)}` : '';
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}${nextHash}`,
      );
    } catch {
      // Ignore history errors in restricted test environments.
    }
  };

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

  const toolCategoryBySlug = useMemo(() => {
    const map = new Map<string, string>();
    for (const tool of normalizedPopular) {
      map.set(tool.slug, tool.categorySlug);
    }
    return map;
  }, [normalizedPopular]);

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

  // Reset pagination when category, search or favorite toggle changes
  useEffect(() => {
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [selectedCategory, searchQuery, showFavoritesOnly]);

  // Filtered tools list based on selected category, favorites & search query
  const filteredTools = useMemo(() => {
    let list = normalizedPopular;
    if (showFavoritesOnly) {
      list = list.filter((tool) => isFavorite(tool.slug));
    } else if (selectedCategory) {
      list = list.filter((tool) => tool.categorySlug === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((tool) => {
        const name = (t(`toolName.${tool.slug}`) || tool.slug.replace(/-/g, ' ')).toLowerCase();
        const desc = (t(`toolDesc.${tool.slug}`) || tool.shortDescription || '').toLowerCase();
        const aliases = getToolManifest(tool.slug)?.searchAliases ?? [];
        return (
          name.includes(q) ||
          desc.includes(q) ||
          tool.slug.toLowerCase().includes(q) ||
          tool.categorySlug.toLowerCase().includes(q) ||
          aliases.some((alias) => alias.toLowerCase().includes(q))
        );
      });
    }
    return list;
  }, [normalizedPopular, selectedCategory, showFavoritesOnly, searchQuery, isFavorite, t]);

  // Tools currently displayed in Grid View (progressive / paginated for instant 60 FPS performance)
  const displayedGridTools = useMemo(() => {
    if (searchQuery.trim() || selectedCategory || showFavoritesOnly) {
      return filteredTools;
    }
    return filteredTools.slice(0, visibleCount);
  }, [filteredTools, searchQuery, selectedCategory, showFavoritesOnly, visibleCount]);

  const hasMore = !searchQuery.trim() && !selectedCategory && !showFavoritesOnly && visibleCount < filteredTools.length;

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  // Localized homepages (/tr, /de, ...) render this same component.
  const localizedHomePath = getLocalizedPath('/', language);
  const pageUrl = localizedHomePath === '/' ? siteUrl : `${siteUrl}${localizedHomePath}`;

  // BreadcrumbList structured data for homepage
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('common.home'),
        item: pageUrl,
      },
    ],
  };

  // CollectionPage structured data for homepage
  const collectionPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('home.title'),
    description: t('home.subtitle'),
    '@id': `${pageUrl}#collectionpage`,
    url: pageUrl,
    inLanguage: language,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    about: {
      '@type': 'Thing',
      name: 'Developer Tools',
      description: 'Free online tools for software developers and web designers',
    },
  };

  const renderToolCard = (
    tool: (typeof normalizedPopular)[number],
    headingLevel: 'h3' | 'h4',
    showCategoryBadge: boolean,
  ) => {
    const accent = categoryAccents[tool.categorySlug] ?? categoryAccents.utilities;
    const ToolIcon = toolIconMap[tool.slug] || categoryIcons[tool.categorySlug] || Terminal;
    const categoryLabel = tool.categorySlug ? t(`cat.${tool.categorySlug}`) || tool.categorySlug : '';
    const toolName = t(`toolName.${tool.slug}`) || tool.slug.replace(/-/g, ' ');
    const toolDesc = t(`toolDesc.${tool.slug}`) || tool.shortDescription || '';
    const isPopular = popularToolSlugs.has(tool.slug);
    const isFav = isFavorite(tool.slug);

    return (
      <Link
        key={`${tool.slug}-${tool.categorySlug}`}
        href={buildToolPath(tool.categorySlug, tool.slug)}
        title={`${toolName} - ${toolDesc || interpolateText(t('home.openTool'), { tool: toolName })}`}
        className={`group relative flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 border-t-2 ${accent.topBorder} bg-white p-4 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-slate-600`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(tool.slug);
          }}
          title={isFav ? t('uiText.c23fbb86') : t('uiText.2baec734')}
          aria-label={interpolateText(t(isFav ? 'home.removeFavorite' : 'home.addFavorite'), {
            tool: toolName,
          })}
          className={`absolute right-2.5 top-2.5 z-10 rounded-md p-1.5 transition ${
            isFav
              ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400'
              : 'text-slate-500 opacity-100 hover:bg-slate-100 hover:text-amber-600 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-amber-400'
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${isFav ? 'fill-amber-500' : ''}`} />
        </button>

        <div className="flex items-start gap-3">
          <div className={`shrink-0 rounded-lg border p-2 ${accent.iconBox}`}>
            <ToolIcon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1 pr-6">
            {headingLevel === 'h3' ? (
              <h3 className="truncate text-sm font-bold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                {toolName}
              </h3>
            ) : (
              <h4 className="truncate text-sm font-bold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                {toolName}
              </h4>
            )}
            {toolDesc && (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {toolDesc}
              </p>
            )}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {showCategoryBadge && (
                <span
                  className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${accent.badge}`}
                >
                  {accent.code}
                </span>
              )}
              {showCategoryBadge && categoryLabel && (
                <span className="truncate text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  {categoryLabel}
                </span>
              )}
              {isPopular && (
                <span className="inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/60 dark:text-amber-300">
                  <Flame className="h-2.5 w-2.5 fill-amber-500 text-amber-600 dark:text-amber-400" />
                  {t('home.popularBadge') || 'Popular'}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(collectionPageStructuredData) }}
      />
      <div className="page-shell">
        {/* Asymmetric Developer Workbench Hero */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/90 sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            {/* Left Column: Title, Subtitle, Inline Instant Filter, Quick-Launch Chips */}
            <div className="flex min-w-0 flex-col justify-between lg:col-span-7">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-slate-100 px-2.5 py-0.5 dark:border-slate-700 dark:bg-slate-900">
                    <Terminal className="h-3 w-3 text-emerald-700 dark:text-emerald-400" />
                    {toolCatalog.length} {t('uiText.3323a216')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    WebCrypto / Wasm · {t('uiText.fd35707d')}
                  </span>
                </div>

                <h1 className="mb-3 break-words text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                  {t('home.title')}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  {t('home.subtitle')}
                </p>
              </div>

              <div className="mt-6 space-y-3.5">
                {/* Inline Instant Filter Input */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    placeholder={
                      t('home.filterPlaceholder') || `Filter ${normalizedPopular.length} tools...`
                    }
                    aria-label={t('home.filterPlaceholder') || 'Filter tools'}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-24 text-sm text-slate-950 placeholder:text-slate-500 transition-colors focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-emerald-400 dark:focus:bg-slate-950 dark:focus:ring-emerald-400/20"
                  />
                  <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => updateSearchQuery('')}
                        title={t('home.clearFilter') || 'Clear'}
                        aria-label={t('home.clearFilter') || 'Clear'}
                        className="rounded-md border border-slate-300 bg-white p-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <kbd className="hidden rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:inline-block">
                        /
                      </kbd>
                    )}
                    <a
                      href="#tools"
                      title={interpolateText(t('home.browseTools'), { count: toolCatalog.length })}
                      className="rounded-md border border-slate-300 bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-800 hover:border-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {filteredTools.length}/{normalizedPopular.length}
                    </a>
                  </div>
                </div>

                {/* Quick-launch tool shortcut chips */}
                <div className="flex flex-wrap items-center gap-2">
                  {heroShortcutSlugs.map(({ slug, fallbackCategory }) => {
                    const cat = toolCategoryBySlug.get(slug) || fallbackCategory;
                    const accent = categoryAccents[cat] ?? categoryAccents.utilities;
                    const toolLabel = t(`toolName.${slug}`) || slug.replace(/-/g, ' ');
                    return (
                      <Link
                        key={slug}
                        href={buildToolPath(cat, slug)}
                        title={interpolateText(t('home.quickLaunch'), { tool: toolLabel })}
                        className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 transition-colors hover:border-slate-400 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                      >
                        <span
                          className={`shrink-0 rounded border px-1 py-0.5 font-mono text-[9px] font-bold uppercase ${accent.badge}`}
                        >
                          {accent.code}
                        </span>
                        <span className="truncate">{toolLabel}</span>
                      </Link>
                    );
                  })}
                  {favorites.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowFavoritesOnly(true);
                        setSelectedCategory(null);
                        const el = document.getElementById('tools');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100 dark:border-amber-800/70 dark:bg-amber-950/50 dark:text-amber-300"
                    >
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-600 dark:text-amber-400" />
                      <span>
                        {t('uiText.69396f32')}
                        {favorites.length})
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (Desktop): Quick Workbench / Keyboard-First Inspector Panel */}
            <aside
              aria-label={t('uiText.947317d5')}
              className="hidden flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-950 text-slate-100 lg:col-span-5 lg:flex"
            >
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span>{t('uiText.947317d5')}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                  <kbd className="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-slate-200">
                    /
                  </kbd>
                  <kbd className="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-slate-200">
                    ⌘K
                  </kbd>
                </div>
              </div>

              <div className="divide-y divide-slate-800/90">
                {workbenchDailySlugs.map(({ slug, fallbackCategory, tag, tagClass }) => {
                  const cat = toolCategoryBySlug.get(slug) || fallbackCategory;
                  const name = t(`toolName.${slug}`) || slug.replace(/-/g, ' ');
                  const desc = t(`toolDesc.${slug}`) || '';
                  return (
                    <Link
                      key={`wb-${slug}`}
                      href={buildToolPath(cat, slug)}
                      className="group flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-slate-900"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`w-14 shrink-0 rounded border px-1.5 py-0.5 text-center font-mono text-[10px] font-bold tracking-wider ${tagClass}`}
                        >
                          {tag}
                        </span>
                        <div className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-white group-hover:text-emerald-300">
                            {name}
                          </span>
                          {desc && (
                            <span className="block truncate text-xs text-slate-300">{desc}</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-300" />
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/70 px-4 py-2 font-mono text-[11px] text-slate-300">
                <span>{t('uiText.71aeeea3')}</span>
                <span className="text-emerald-300">{t('uiText.fd35707d')}</span>
              </div>
            </aside>
          </div>
        </section>

        {children}

        {/* Workbench Top Launchpad Band */}
        <section className="mb-8" aria-label={t('uiText.bc885c90')}>
          <div className="mb-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 fill-amber-500 text-amber-600 dark:text-amber-400" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t('uiText.947317d5')}
              </h2>
            </div>
            <span className="hidden font-mono text-[11px] text-slate-600 dark:text-slate-400 sm:inline">
              {t('uiText.71aeeea3')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
            {spotlightTools.map((st) => {
              const Icon = st.icon;
              const cat = toolCategoryBySlug.get(st.slug) || st.category;
              const accent = categoryAccents[cat] ?? categoryAccents.utilities;
              const toolName = t(`toolName.${st.slug}`) || st.slug.replace(/-/g, ' ');
              return (
                <Link
                  key={st.slug}
                  href={buildToolPath(cat, st.slug)}
                  title={interpolateText(t('home.quickLaunch'), { tool: toolName })}
                  className={`group relative flex min-w-0 flex-col items-start justify-between rounded-xl border border-slate-200 border-t-2 ${accent.topBorder} bg-white p-3 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-slate-600`}
                >
                  <div className="mb-2 flex w-full items-center justify-between gap-1.5">
                    <span className={`rounded-md border p-1.5 ${accent.iconBox}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase text-slate-600 dark:text-slate-400">
                      {accent.code}
                    </span>
                  </div>
                  <span className="w-full truncate text-xs font-semibold text-slate-900 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400">
                    {toolName}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick Access Bar (Recent & Privacy Badge) */}
        <QuickAccessBar className="mb-10" />

        <TrendingTools />

        <section className="mb-10" aria-labelledby="workflow-collections-heading">
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-slate-200 pb-3 dark:border-slate-800">
            <div>
              <span className="mb-1.5 inline-block rounded border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {t('uiText.e23d5661')}
              </span>
              <h2
                id="workflow-collections-heading"
                className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white"
              >
                {t('uiText.06e7efd4')}
              </h2>
            </div>
            <Link
              href="/collections"
              className="hidden font-mono text-xs font-semibold text-slate-800 underline decoration-slate-400 underline-offset-4 hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-400 sm:inline"
            >
              {t('uiText.49d6ab9c')}
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.collections.map((collection) => {
              return (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="interactive-card group min-w-0 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-600"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="min-w-0 break-words font-bold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                      {collection.title}
                    </h3>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 dark:text-slate-400" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {collection.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <ProInterestCard placement="home" />

        <section className="mb-10" aria-labelledby="role-toolboxes-heading">
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-slate-200 pb-3 dark:border-slate-800">
            <div>
              <span className="mb-1.5 inline-block rounded border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {t('uiText.937daf64')}
              </span>
              <h2
                id="role-toolboxes-heading"
                className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white"
              >
                {t('uiText.83151179')}
              </h2>
            </div>
            <Link
              href="/for"
              className="hidden font-mono text-xs font-semibold text-slate-800 underline decoration-slate-400 underline-offset-4 hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-400 sm:inline"
            >
              {t('uiText.2168cca4')}
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.audiences.map((audience) => {
              return (
                <Link
                  key={audience.slug}
                  href={`/for/${audience.slug}`}
                  className="interactive-card group min-w-0 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-600"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="min-w-0 break-words font-bold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                      {audience.title}
                    </h3>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 dark:text-slate-400" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {audience.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Interactive Toolbox Section */}
        <section className="mb-14 scroll-mt-24" id="tools">
          {/* Header & Controls Bar */}
          <div className="mb-5 flex flex-col gap-4 border-b border-slate-200 pb-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="mb-1.5 inline-block rounded border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {t('uiText.239a9538')}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                  {showFavoritesOnly ? t('uiText.6d8800c0') : t('home.popularTools')}
                </h2>
                <span className="rounded border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {filteredTools.length} / {normalizedPopular.length}
                </span>
              </div>
            </div>

            {/* Active Search Reset + View Mode Toggles */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => updateSearchQuery('')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-semibold text-slate-800 hover:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <span className="max-w-[160px] truncate">{searchQuery}</span>
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              {/* View Mode Toggle */}
              <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  title={t('home.viewGrid') || 'Grid View'}
                  aria-label={t('uiText.00c3ebe6')}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grouped')}
                  title={t('home.viewGrouped') || 'Grouped View'}
                  aria-label={t('uiText.b6ca2302')}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === 'grouped'
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
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
              type="button"
              onClick={() => {
                setSelectedCategory(null);
                setShowFavoritesOnly(false);
              }}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedCategory === null && !showFavoritesOnly
                  ? 'border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600'
              }`}
            >
              <span>{t('home.allCategories') || 'All'}</span>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                  selectedCategory === null && !showFavoritesOnly
                    ? 'bg-slate-800 text-slate-100 dark:bg-slate-200 dark:text-slate-900'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                {categoryCounts.all || normalizedPopular.length}
              </span>
            </button>

            {/* Favorites Pill */}
            <button
              type="button"
              onClick={() => {
                setShowFavoritesOnly(!showFavoritesOnly);
                setSelectedCategory(null);
              }}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                showFavoritesOnly
                  ? 'border-amber-700 bg-amber-700 text-white dark:border-amber-500 dark:bg-amber-500 dark:text-slate-950'
                  : 'border-amber-300 bg-amber-50 text-amber-900 hover:border-amber-500 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300'
              }`}
            >
              <Star
                className={`h-3.5 w-3.5 ${
                  showFavoritesOnly
                    ? 'fill-current'
                    : 'fill-amber-500 text-amber-600 dark:text-amber-400'
                }`}
              />
              <span>{t('commandPalette.favorites')}</span>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                  showFavoritesOnly
                    ? 'bg-amber-900/60 text-white dark:bg-amber-950/30 dark:text-slate-950'
                    : 'bg-amber-200/80 text-amber-950 dark:bg-amber-900/70 dark:text-amber-200'
                }`}
              >
                {favorites.length}
              </span>
            </button>

            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.slug && !showFavoritesOnly;
              const count = categoryCounts[cat.slug] || 0;

              return (
                <button
                  type="button"
                  key={cat.slug}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : cat.slug);
                    setShowFavoritesOnly(false);
                  }}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.name}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                      isSelected
                        ? 'bg-slate-800 text-slate-100 dark:bg-slate-200 dark:text-slate-900'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
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
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/90">
              <Search className="mx-auto mb-3 h-8 w-8 text-slate-500 dark:text-slate-400" />
              <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                {showFavoritesOnly
                  ? t('uiText.db45a87d')
                  : t('home.noToolsFound') || 'No tools found matching your filter.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setShowFavoritesOnly(false);
                  updateSearchQuery('');
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-4 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                <X className="h-3.5 w-3.5" />
                <span>{t('home.clearFilter') || 'Clear Filter'}</span>
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {displayedGridTools.map((tool, index) => {
                  const showInFeed = (index + 1) % 12 === 0 && index < displayedGridTools.length - 1;
                  return (
                    <React.Fragment key={`frag-${tool.slug}-${tool.categorySlug}`}>
                      {renderToolCard(tool, 'h3', true)}
                      {showInFeed && (
                        <InFeedAdCard
                          key={`infeed-search-${tool.slug}-${index}`}
                          slot={HOME_INFEED_SLOT}
                          placement="home-search-infeed"
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Progressive Load More Bar */}
              {hasMore && (
                <div className="mt-10 flex flex-col items-center justify-center gap-3">
                  <div className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {t('home.showingTools')
                      .split(/(\{shown\})/)
                      .map((part, index) =>
                        part === '{shown}' ? (
                          <span
                            key={index}
                            className="font-bold text-emerald-700 dark:text-emerald-400"
                          >
                            {displayedGridTools.length}
                          </span>
                        ) : (
                          interpolateText(part, { total: filteredTools.length })
                        ),
                      )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-5 py-2.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                    >
                      <ChevronDown className="h-4 w-4" />
                      <span>{translateCount(t, language, 'home.loadMoreTools', LOAD_MORE_STEP)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisibleCount(filteredTools.length)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-mono text-xs font-semibold text-slate-800 transition-colors hover:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                      <span>{interpolateText(t('home.showAll'), { count: filteredTools.length })}</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Grouped by Category View */
            <div className="space-y-10">
              {groupedByCategory.map((group) => {
                const CatIcon = group.icon;
                const accent = categoryAccents[group.slug] ?? categoryAccents.utilities;
                return (
                  <div key={group.slug} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className={`rounded-lg border p-2 ${accent.iconBox}`}>
                          <CatIcon className="h-4 w-4" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                          {group.name}
                        </h3>
                        <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {group.tools.length}
                        </span>
                      </div>
                      <Link
                        href={`/tools/${group.slug}`}
                        className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-slate-800 hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-400"
                      >
                        <span>{t('nav.viewAll')}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                      {group.tools.map((tool, index) => {
                        const showInFeed = (index + 1) % 12 === 0 && index < group.tools.length - 1;
                        return (
                          <React.Fragment key={`frag-${group.slug}-${tool.slug}`}>
                            {renderToolCard(tool, 'h4', false)}
                            {showInFeed && (
                              <InFeedAdCard
                                key={`infeed-${group.slug}-${index}`}
                                slot={HOME_INFEED_SLOT}
                                placement={`home-${group.slug}-infeed`}
                              />
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
          slot={HOME_AFTER_TOOLS_SLOT}
          format="horizontal"
          placement="home-after-tools"
          className="mb-12 min-h-[90px] rounded-lg"
        />

        {/* Categories */}
        <section className="mb-16" id="categories">
          <span className="mb-2 inline-block rounded border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {t('uiText.4d9eb2dc')}
          </span>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            {t('home.browseByCategory')}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const accent = categoryAccents[category.slug] ?? categoryAccents.utilities;
              return (
                <Link
                  key={category.slug}
                  href={`/tools/${category.slug}`}
                  title={`${category.name} - ${category.description}`}
                  className={`interactive-card group flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 border-t-2 ${accent.topBorder} bg-white p-5 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-slate-600`}
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className={`rounded-lg border p-2.5 ${accent.iconBox}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${accent.badge}`}>
                        {accent.code}
                      </span>
                    </div>
                    <h3 className="mb-1 font-bold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                      {category.name}
                    </h3>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Ad Banner - Bottom */}
        <AdSense
          slot={HOME_BEFORE_SEO_SLOT}
          format="horizontal"
          placement="home-before-seo"
          className="mb-12 min-h-[90px] rounded-lg"
        />

        {/* SEO Content */}
        <section className="prose prose-gray max-w-none dark:prose-invert">
          <h2 className="text-slate-950 dark:text-white">{t('home.whyUse')}</h2>
          <p className="text-slate-700 dark:text-slate-300">{t('home.whyUseDesc')}</p>
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

        {/* SSR Complete Tool Directory for crawl discovery & direct navigation */}
        <section
          aria-label="Complete Tool Directory"
          data-complete-directory="true"
          className="mt-12 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/90 sm:p-6"
        >
          <div className="mb-5 border-b border-slate-200 pb-4 dark:border-slate-800">
            <h2 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white sm:text-xl">
              {directoryCopy[language]?.heading || directoryCopy.en.heading}
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300 sm:text-sm">
              {directoryCopy[language]?.subtitle || directoryCopy.en.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
            {categories.map((cat) => {
              const catTools = normalizedPopular.filter((item) => item.categorySlug === cat.slug);
              if (catTools.length === 0) return null;
              const accent = categoryAccents[cat.slug] ?? categoryAccents.utilities;
              return (
                <div key={`dir-${cat.slug}`} className="min-w-0">
                  <h3 className="mb-2 flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 font-mono text-xs font-bold text-slate-950 dark:border-slate-800 dark:text-white">
                    <Link
                      href={`/tools/${cat.slug}`}
                      className="min-w-0 truncate hover:text-emerald-700 dark:hover:text-emerald-400"
                    >
                      {cat.name}
                    </Link>
                    <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] ${accent.badge}`}>
                      {catTools.length}
                    </span>
                  </h3>
                  <ul className="space-y-0.5 font-mono text-[11px] leading-5">
                    {catTools.map((tool) => {
                      const toolLabel = t(`toolName.${tool.slug}`) || tool.name;
                      return (
                        <li key={`dir-tool-${tool.slug}`} className="min-w-0">
                          <Link
                            href={buildToolPath(tool.categorySlug, tool.slug)}
                            prefetch={false}
                            className="block min-w-0 break-words py-0.5 text-slate-700 [overflow-wrap:anywhere] hover:text-emerald-700 hover:underline dark:text-slate-300 dark:hover:text-emerald-400"
                          >
                            {toolLabel}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
