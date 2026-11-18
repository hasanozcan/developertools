import React, { Fragment } from 'react';
import { Metadata } from 'next';
import Link from '@/components/common/LocalizedLink';
import { notFound } from 'next/navigation';
import {
  Braces,
  Code,
  Wand2,
  Lock,
  Type,
  ArrowLeftRight,
  ChevronRight,
  FileJson,
  Binary,
  Fingerprint,
  Link2,
  KeyRound,
  Hash,
  ShieldCheck,
  Shield,
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
  CheckCircle,
  Hash as HashIcon,
  Layers,
  SortAsc,
  SortDesc,
  Ban,
  Network,
  LucideIcon,
} from 'lucide-react';
import Breadcrumb from '@/components/common/Breadcrumb';
import AdSense from '@/components/common/AdSense';
import InFeedAdCard from '@/components/common/InFeedAdCard';
import EncodingWorkbench from '@/components/tools/EncodingWorkbench';
import { buildToolPath } from '@/lib/toolRoutes';
import { toolCatalog } from '@/lib/api';
import {
  DEFAULT_LOCALE,
  getHreflangAlternates,
  getLocalizedPath,
  getLocalizedToolMeta,
  isToolLocaleIndexable,
  type Language,
} from '@/lib/i18nRouting';
import { translations } from '@/translations';
import {
  DEFAULT_ADSENSE_CATEGORY_TOP_SLOT,
  resolveAdSenseSlot,
  resolveDistinctAdSenseSlot,
} from '@/lib/adsenseSlots';

// In-feed ads between tool cards. They stay hidden until the category list has its own
// AdSense unit id (distinct from the top banner), like the other optional placements.
const CATEGORY_INFEED_INTERVAL = 12;
import { resolveTitle } from '@/lib/toolTitle';
import { serializeJsonForHtmlScript } from '@/lib/scriptSafeJson';
import { categoryUiLabels, getCategoryPageContent } from '@/lib/categoryPageContent';

/** Looks up a UI string for `locale` (English fallback) and fills `{placeholders}`. */
function translate(
  locale: Language,
  key: string,
  values: Record<string, string | number> = {},
): string {
  const template = translations[locale]?.[key] || translations.en[key] || key;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );
}

// Tool icon mapping
const toolIcons: Record<string, LucideIcon> = {
  'json-formatter': FileJson,
  'json-validator': CheckCircle,
  'json-schema-validator': ShieldCheck,
  'json-csv': FileSpreadsheet,
  'json-to-typescript': FileType,
  'yaml-json': FileJson2,
  base64: Binary,
  'url-encoder': Link2,
  'hex-encoder': HashIcon,
  'binary-encoder': Code2,
  'jwt-decoder': KeyRound,
  'html-entity': Code2,
  'unicode-escape': Code2,
  'json-string-escape': Code2,
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
  'sha512-hash': Shield,
  'hmac-generator': KeyRound,
  'pkce-generator': KeyRound,
  'regex-tester': Regex,
  'text-diff': GitCompare,
  'regex-escape': Regex,
  'case-converter': Layers,
  'word-counter': FileText,
  'remove-duplicates': Ban,
  'sort-lines': SortAsc,
  'markdown-preview': FileText,
  'timestamp-converter': Timer,
  'color-converter': Palette,
  'roman-numeral-converter': FileType,
  'number-base-converter': HashIcon,
  'url-parser': Link2,
  'query-string-parser': Link2,
  'sql-formatter': Database,
  'css-minifier': Minimize2,
  'js-minifier': FileCode,
  'html-formatter': Code,
  'html-minifier': Minimize2,
  'xml-formatter': FileCode,
  'cron-parser': Clock,
  'http-headers-parser': FileText,
  'http-status-codes': CheckCircle,
  'user-agent-parser': Fingerprint,
  'cidr-calculator': Network,
  'json-pointer': FileJson,
  'chmod-calculator': Lock,
  'cache-control': Clock,
  'jsonpath-tester': Braces,
  'csp-builder': ShieldCheck,
  'curl-to-fetch': Code2,
};

interface CategoryAccent {
  code: string;
  iconBox: string;
  badge: string;
  topBorder: string;
}

const categoryAccents: Record<string, CategoryAccent> = {
  json: {
    code: 'JSON',
    iconBox: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/70 dark:bg-emerald-950/60 dark:text-emerald-300',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/60 dark:text-emerald-300',
    topBorder: 'border-t-emerald-500',
  },
  crypto: {
    code: 'CRYPTO',
    iconBox: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800/70 dark:bg-amber-950/60 dark:text-amber-300',
    badge: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800/70 dark:bg-amber-950/60 dark:text-amber-300',
    topBorder: 'border-t-amber-500',
  },
  encoding: {
    code: 'ENC',
    iconBox: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/70 dark:bg-sky-950/60 dark:text-sky-300',
    badge: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800/70 dark:bg-sky-950/60 dark:text-sky-300',
    topBorder: 'border-t-sky-500',
  },
  converters: {
    code: 'CONV',
    iconBox: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800/70 dark:bg-blue-950/60 dark:text-blue-300',
    badge: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800/70 dark:bg-blue-950/60 dark:text-blue-300',
    topBorder: 'border-t-blue-500',
  },
  formatters: {
    code: 'FMT',
    iconBox: 'border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800/70 dark:bg-teal-950/60 dark:text-teal-300',
    badge: 'border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-800/70 dark:bg-teal-950/60 dark:text-teal-300',
    topBorder: 'border-t-teal-500',
  },
  generators: {
    code: 'GEN',
    iconBox: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800/70 dark:bg-rose-950/60 dark:text-rose-300',
    badge: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800/70 dark:bg-rose-950/60 dark:text-rose-300',
    topBorder: 'border-t-rose-500',
  },
  text: {
    code: 'TEXT',
    iconBox: 'border-zinc-300 bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
    badge: 'border-zinc-300 bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
    topBorder: 'border-t-zinc-500',
  },
  utilities: {
    code: 'UTIL',
    iconBox: 'border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-800/70 dark:bg-cyan-950/60 dark:text-cyan-300',
    badge: 'border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-800/70 dark:bg-cyan-950/60 dark:text-cyan-300',
    topBorder: 'border-t-cyan-500',
  },
};

interface CategoryConfig {
  name: string;
  metadataTitle?: string;
  description: string;
  icon: any;
  tools: { name: string; slug: string; description: string }[];
  answerSections?: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  faqs?: { question: string; answer: string }[];
  sources?: { name: string; url: string }[];
}

const categories: Record<string, CategoryConfig> = {
  json: {
    name: 'JSON Tools',
    description: 'JSON formatting, validation, querying, and conversion tools for developers',
    icon: Braces,
    tools: [
      {
        name: 'JSON Formatter',
        slug: 'json-formatter',
        description: 'Format and beautify JSON data',
      },
      { name: 'JSON Validator', slug: 'json-validator', description: 'Validate JSON syntax' },
      {
        name: 'JSON Schema Validator',
        slug: 'json-schema-validator',
        description: 'Validate JSON documents against JSON Schema rules',
      },
      {
        name: 'JSON to CSV Converter',
        slug: 'json-csv',
        description: 'Convert JSON to CSV and vice versa',
      },
      {
        name: 'JSON to TypeScript',
        slug: 'json-to-typescript',
        description: 'Generate TypeScript interfaces from JSON',
      },
      {
        name: 'YAML ↔ JSON Converter',
        slug: 'yaml-json',
        description: 'Convert between YAML and JSON formats',
      },
      {
        name: 'JSON Pointer Evaluator',
        slug: 'json-pointer',
        description: 'Resolve RFC 6901 pointers against JSON documents',
      },
      {
        name: 'JSONPath Tester',
        slug: 'jsonpath-tester',
        description: 'Query JSON with paths, wildcards, slices, and recursive descent',
      },
    ],
  },
  encoding: {
    name: 'Encoder Online',
    metadataTitle: 'Encoder Online – Base64, URL, Hex & Text Decoder',
    description:
      'Encode or decode Base64, URL components, hexadecimal, binary, and JSON strings in one browser-based workbench, with dedicated tools for HTML, Unicode, JWTs, and images.',
    icon: Code,
    tools: [
      {
        name: 'Base64 Encoder/Decoder',
        slug: 'base64',
        description: 'Encode or decode Base64 strings',
      },
      {
        name: 'URL Encoder/Decoder',
        slug: 'url-encoder',
        description: 'Encode or decode URL strings',
      },
      {
        name: 'HEX Encoder/Decoder',
        slug: 'hex-encoder',
        description: 'Encode or decode text to/from hexadecimal',
      },
      {
        name: 'Binary Encoder/Decoder',
        slug: 'binary-encoder',
        description: 'Encode or decode text to/from binary',
      },
      { name: 'JWT Decoder', slug: 'jwt-decoder', description: 'Decode and inspect JWT tokens' },
      {
        name: 'HTML Entity Encoder/Decoder',
        slug: 'html-entity',
        description: 'Encode or decode HTML entities',
      },
      {
        name: 'Unicode Escape Encoder/Decoder',
        slug: 'unicode-escape',
        description: 'Convert text to and from Unicode escape sequences',
      },
      {
        name: 'JSON String Escape',
        slug: 'json-string-escape',
        description: 'Escape and unescape JSON string content',
      },
      {
        name: 'Image to Base64',
        slug: 'image-to-base64',
        description: 'Convert images to Base64 data URIs',
      },
    ],
  },
  generators: {
    name: 'Generators',
    description: 'UUID, password, and other generators',
    icon: Wand2,
    tools: [
      {
        name: 'UUID v4 & v7 Generator',
        slug: 'uuid-generator',
        description: 'Generate random v4 or timestamp-based v7 UUIDs/GUIDs',
      },
      {
        name: 'Password Generator',
        slug: 'password-generator',
        description: 'Generate secure random passwords',
      },
      {
        name: 'Lorem Ipsum Generator',
        slug: 'lorem-ipsum',
        description: 'Generate placeholder text',
      },
      {
        name: 'QR Code Generator',
        slug: 'qr-code',
        description: 'Generate QR codes from text or URLs',
      },
      {
        name: 'Slug Generator',
        slug: 'slug-generator',
        description: 'Generate SEO-friendly URL slugs',
      },
      {
        name: 'CSS Gradient Generator',
        slug: 'css-gradient',
        description: 'Create beautiful CSS gradients',
      },
      {
        name: 'Meta Tags Generator',
        slug: 'meta-tags',
        description: 'Generate SEO meta tags for websites',
      },
    ],
  },
  crypto: {
    name: 'Cryptography',
    description: 'Hashing, message authentication, and OAuth security tools',
    icon: Lock,
    tools: [
      { name: 'MD5 Hash Generator', slug: 'md5-hash', description: 'Generate MD5 hash from text' },
      {
        name: 'SHA256 Hash Generator',
        slug: 'sha256-hash',
        description: 'Generate SHA256 hash from text',
      },
      {
        name: 'SHA512 Hash Generator',
        slug: 'sha512-hash',
        description: 'Generate SHA512 hash from text',
      },
      {
        name: 'HMAC Generator & Verifier',
        slug: 'hmac-generator',
        description: 'Generate and verify keyed SHA message authentication codes',
      },
      {
        name: 'PKCE Generator & Verifier',
        slug: 'pkce-generator',
        description: 'Generate and verify OAuth PKCE S256 pairs',
      },
    ],
  },
  text: {
    name: 'Text Tools',
    description: 'Text manipulation and formatting tools',
    icon: Type,
    tools: [
      {
        name: 'Case Converter',
        slug: 'case-converter',
        description: 'Convert text between different cases',
      },
      {
        name: 'Word Counter',
        slug: 'word-counter',
        description: 'Count words, characters, lines, sentences',
      },
      {
        name: 'Regex Tester',
        slug: 'regex-tester',
        description: 'Test and debug regular expressions',
      },
      {
        name: 'Regex Escape',
        slug: 'regex-escape',
        description: 'Escape text for safe regex usage',
      },
      {
        name: 'Remove Duplicate Lines',
        slug: 'remove-duplicates',
        description: 'Remove duplicate lines from text',
      },
      { name: 'Sort Lines', slug: 'sort-lines', description: 'Sort lines alphabetically' },
      {
        name: 'Text Diff Tool',
        slug: 'text-diff',
        description: 'Compare two texts and find differences',
      },
      {
        name: 'Markdown Preview',
        slug: 'markdown-preview',
        description: 'Preview and convert Markdown to HTML',
      },
      {
        name: 'Slug Generator',
        slug: 'slug-generator',
        description: 'Generate SEO-friendly URL slugs',
      },
    ],
  },
  converters: {
    name: 'Converters',
    description: 'Data format converters',
    icon: ArrowLeftRight,
    tools: [
      {
        name: 'Timestamp Converter',
        slug: 'timestamp-converter',
        description: 'Convert timestamps to dates',
      },
      {
        name: 'Color Converter',
        slug: 'color-converter',
        description: 'Convert colors between HEX, RGB, HSL',
      },
      {
        name: 'Roman Numeral Converter',
        slug: 'roman-numeral-converter',
        description: 'Convert numbers to Roman numerals',
      },
      {
        name: 'Number Base Converter',
        slug: 'number-base-converter',
        description: 'Convert between decimal, hex, octal, binary',
      },
      {
        name: 'JSON to CSV Converter',
        slug: 'json-csv',
        description: 'Convert JSON to CSV and vice versa',
      },
      {
        name: 'YAML ↔ JSON Converter',
        slug: 'yaml-json',
        description: 'Convert between YAML and JSON formats',
      },
      {
        name: 'Image to Base64',
        slug: 'image-to-base64',
        description: 'Convert images to Base64 data URIs',
      },
      {
        name: 'URL Parser',
        slug: 'url-parser',
        description: 'Parse URLs into protocol, host, path, and query params',
      },
      {
        name: 'Query String Parser',
        slug: 'query-string-parser',
        description: 'Parse and build URL query strings',
      },
    ],
  },
  formatters: {
    name: 'Code Formatters',
    description: 'Format and minify code in various languages',
    icon: Code,
    tools: [
      {
        name: 'SQL Formatter',
        slug: 'sql-formatter',
        description: 'Format and beautify SQL queries',
      },
      { name: 'CSS Minifier', slug: 'css-minifier', description: 'Minify CSS code for production' },
      {
        name: 'JavaScript Minifier',
        slug: 'js-minifier',
        description: 'Minify JavaScript code for production',
      },
      {
        name: 'HTML Formatter',
        slug: 'html-formatter',
        description: 'Format and beautify HTML code',
      },
      {
        name: 'HTML Minifier',
        slug: 'html-minifier',
        description: 'Minify HTML code for production',
      },
      { name: 'XML Formatter', slug: 'xml-formatter', description: 'Format and beautify XML code' },
    ],
  },
  utilities: {
    name: 'Developer Utilities',
    description: 'HTTP, security, network, and request utilities for developers',
    icon: Wand2,
    tools: [
      {
        name: 'Cron Expression Parser',
        slug: 'cron-parser',
        description: 'Parse and explain cron expressions',
      },
      {
        name: 'HTTP Headers Parser',
        slug: 'http-headers-parser',
        description: 'Convert raw HTTP headers to JSON and back',
      },
      {
        name: 'HTTP Status Codes',
        slug: 'http-status-codes',
        description: 'Search and reference common HTTP status codes',
      },
      {
        name: 'User-Agent Parser',
        slug: 'user-agent-parser',
        description: 'Detect browser, OS, and device from user-agent strings',
      },
      {
        name: 'IPv4 CIDR Calculator',
        slug: 'cidr-calculator',
        description: 'Calculate IPv4 subnet ranges, masks, and usable hosts',
      },
      {
        name: 'Chmod Calculator',
        slug: 'chmod-calculator',
        description: 'Convert Unix permissions between octal and symbolic modes',
      },
      {
        name: 'Cache-Control Parser & Builder',
        slug: 'cache-control',
        description: 'Parse, normalize, and check HTTP caching directives',
      },
      {
        name: 'CSP Header Builder & Analyzer',
        slug: 'csp-builder',
        description: 'Build and inspect Content Security Policy headers',
      },
      {
        name: 'cURL Builder & Fetch Converter',
        slug: 'curl-to-fetch',
        description: 'Build cURL requests or convert supported cURL input to fetch',
      },
      {
        name: 'QR Code Generator',
        slug: 'qr-code',
        description: 'Generate QR codes from text or URLs',
      },
      {
        name: 'Markdown Preview',
        slug: 'markdown-preview',
        description: 'Preview and convert Markdown to HTML',
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ category: string }>;
  /** Set by the `[locale]` route; the unprefixed English route leaves it unset. */
  locale?: Language;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories[categorySlug];

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const categoryUrl = `${siteUrl}/tools/${categorySlug}`;
  const ogImageUrl = `${categoryUrl}/opengraph-image`;
  const pageTitle = category.metadataTitle || `${category.name} - Free Online Developer Tools`;

  // Category-specific keywords
  const categoryKeywords: Record<string, string[]> = {
    json: [
      'json tools',
      'json formatter',
      'json validator',
      'json schema validator',
      'json to csv',
      'json to typescript',
      'yaml to json',
      'json beautifier',
      'json parser',
      'jsonpath tester',
      'jsonpath online',
    ],
    encoding: [
      'online encoder',
      'encoder online',
      'online decoder',
      'encoding tools',
      'base64 encoder',
      'base64 decoder',
      'url encoder',
      'url decoder',
      'hex encoder',
      'binary encoder',
      'jwt decoder',
      'html entity encoder',
      'unicode escape',
      'json string escape',
    ],
    generators: [
      'generators',
      'uuid generator',
      'password generator',
      'lorem ipsum generator',
      'qr code generator',
      'slug generator',
      'css gradient generator',
      'meta tags generator',
    ],
    crypto: [
      'cryptography',
      'hash generator',
      'hmac generator',
      'hmac verifier',
      'pkce generator',
      'oauth pkce',
      'md5 generator',
      'sha256 generator',
      'sha512 generator',
      'hash tools',
    ],
    text: [
      'text tools',
      'regex tester',
      'regex escape',
      'case converter',
      'word counter',
      'text diff',
      'markdown preview',
      'sort lines',
      'remove duplicates',
    ],
    converters: [
      'converters',
      'timestamp converter',
      'color converter',
      'roman numeral converter',
      'number base converter',
      'json to csv',
      'yaml to json',
      'url parser',
      'query string parser',
    ],
    formatters: [
      'code formatters',
      'sql formatter',
      'css minifier',
      'javascript minifier',
      'html formatter',
      'html minifier',
      'xml formatter',
      'code beautifier',
    ],
    utilities: [
      'developer utilities',
      'cron parser',
      'cron expression',
      'development tools',
      'http status codes',
      'http headers parser',
      'user agent parser',
      'cidr calculator',
      'subnet calculator',
      'content security policy builder',
      'csp analyzer',
      'curl to fetch',
      'curl command builder',
    ],
  };

  return {
    title: resolveTitle(pageTitle, { stripBoilerplate: false }).title,
    description: category.description,
    keywords: categoryKeywords[categorySlug] || [
      category.name.toLowerCase(),
      'developer tools',
      'online tools',
      'free tools',
    ],
    alternates: {
      canonical: categoryUrl,
      languages: getHreflangAlternates(`/tools/${categorySlug}`, siteUrl),
    },
    openGraph: {
      title: pageTitle,
      description: category.description,
      url: categoryUrl,
      siteName: 'DevsTools',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${category.name} - DevsTools`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: category.description,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export default async function CategoryPage({ params, locale = DEFAULT_LOCALE }: PageProps) {
  const { category: categorySlug } = await params;
  const category = categories[categorySlug];

  if (!category) {
    notFound();
  }

  const Icon = category.icon;
  const accent = categoryAccents[categorySlug] ?? categoryAccents.utilities;
  const categoryTopSlot = resolveAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_TOP_SLOT,
    DEFAULT_ADSENSE_CATEGORY_TOP_SLOT,
  );
  const categoryInFeedSlot = resolveDistinctAdSenseSlot(
    process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_INFEED_SLOT,
    [categoryTopSlot],
  );
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const isDefaultLocale = locale === DEFAULT_LOCALE;
  const localizePath = (path: string) => getLocalizedPath(path, locale);
  const categoryName = isDefaultLocale
    ? category.name
    : translations[locale]?.[`cat.${categorySlug}`] || category.name;
  const categoryDescription = isDefaultLocale
    ? category.description
    : translations[locale]?.[`categoryPage.description.${categorySlug}`] || category.description;
  const pageTitle = isDefaultLocale
    ? category.metadataTitle || `${category.name} - Free Online Developer Tools`
    : translate(locale, 'categoryPage.metaTitle', { category: categoryName });
  const pageUrl = `${siteUrl}${localizePath(`/tools/${categorySlug}`)}`;
  const allToolsHeading = translate(locale, 'categoryPage.allToolsHeading', {
    category: categoryName,
  });
  const localizedContent = getCategoryPageContent(categorySlug, locale);
  const answerSections = localizedContent?.answerSections ?? category.answerSections ?? [];
  const faqs = localizedContent?.faqs ?? category.faqs ?? [];
  const sources = localizedContent?.sources ?? category.sources ?? [];
  const contentUi = localizedContent?.ui ?? categoryUiLabels[locale] ?? categoryUiLabels.en;

  // Merge curated entries with the full catalog so every tool in this category
  // is reachable from its category hub (internal linking + crawl discovery).
  // Curated lists can list a tool more than once, so dedupe by slug on merge.
  const curatedSlugs = new Set(category.tools.map((tool) => tool.slug));
  const seenToolSlugs = new Set<string>();
  const allCategoryTools = [
    ...category.tools,
    ...toolCatalog
      .filter(
        (catalogTool) =>
          catalogTool.categorySlug === categorySlug && !curatedSlugs.has(catalogTool.slug),
      )
      .map((catalogTool) => {
        const shortDescription: string | undefined = catalogTool.shortDescription;
        return {
          name: catalogTool.name,
          slug: catalogTool.slug,
          description: shortDescription || catalogTool.name,
        };
      }),
  ]
    .filter((tool) => {
      if (seenToolSlugs.has(tool.slug)) {
        return false;
      }
      seenToolSlugs.add(tool.slug);
      return true;
    })
    .map((tool) => ({
      ...tool,
      ...getLocalizedToolMeta(tool.slug, locale, tool.name, tool.description),
      href: localizePath(buildToolPath(categorySlug, tool.slug)),
    }));

  // Every tool stays visible (and linked) on locale hubs, but structured data only
  // lists tools whose locale page is indexable so JSON-LD never points at a
  // noindex URL or at another locale.
  const structuredDataTools = isDefaultLocale
    ? allCategoryTools
    : allCategoryTools.filter((tool) => isToolLocaleIndexable(tool.slug, locale));

  // CollectionPage structured data for category pages
  const collectionPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    ...(isDefaultLocale ? {} : { '@id': pageUrl }),
    name: pageTitle,
    description: categoryDescription,
    url: pageUrl,
    ...(isDefaultLocale ? {} : { inLanguage: locale }),
    // The OG image route only exists under the unprefixed path.
    image: `${siteUrl}/tools/${categorySlug}/opengraph-image`,
    about: {
      '@type': 'Thing',
      name: categoryName,
      description: categoryDescription,
    },
    citation: sources.map((source) => source.url),
    mainEntity: {
      '@type': 'ItemList',
      name: isDefaultLocale ? `${category.name} tools` : allToolsHeading,
      itemListElement: structuredDataTools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        url: `${siteUrl}${tool.href}`,
      })),
    },
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const encodingApplicationStructuredData =
    categorySlug === 'encoding'
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          '@id': `${pageUrl}#application`,
          url: pageUrl,
          name: isDefaultLocale ? 'Encoder Online' : categoryName,
          description: categoryDescription,
          ...(isDefaultLocale ? {} : { inLanguage: locale }),
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Any',
          isAccessibleForFree: true,
          citation: sources.map((source) => source.url),
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }
      : null;

  const renderAnswerSection = (
    section: { heading: string; paragraphs?: string[]; bullets?: string[] },
    answerFirst = false,
  ) => (
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(collectionPageStructuredData) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(faqStructuredData) }}
        />
      )}
      {encodingApplicationStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(encodingApplicationStructuredData) }}
        />
      )}
      <div className="page-shell">
        <Breadcrumb
          items={[
            {
              name: isDefaultLocale ? 'Home' : translate(locale, 'nav.home'),
              href: localizePath('/'),
            },
            { name: categoryName },
          ]}
        />

        {/* Header */}
        <div className={`mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 border-t-2 ${accent.topBorder} bg-white p-5 dark:border-slate-800 dark:bg-slate-950/90 sm:flex-row sm:items-start sm:p-7`}>
          <div className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${accent.iconBox}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${accent.badge}`}>
                {accent.code}
              </span>
              <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                {translate(locale, 'categoryPage.showingAll', { count: allCategoryTools.length })}
              </span>
            </div>
            <h1 className="mb-2 break-words text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              {categoryName}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">{categoryDescription}</p>
          </div>
        </div>

        {answerSections.slice(0, 1).map((section) => renderAnswerSection(section, true))}

        {categorySlug === 'encoding' && (
          <nav
            aria-label={translate(locale, 'categoryPage.encodingShortcutsAria')}
            className="mb-8 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300"
          >
            {translate(locale, 'categoryPage.encodingShortcutsLabel')}{' '}
            {allCategoryTools
              .filter((tool) => curatedSlugs.has(tool.slug))
              .map((tool, index) => (
                <span key={`reader-${tool.slug}`}>
                  {index > 0 ? ', ' : ''}
                  <Link
                    href={tool.href}
                    className="font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    {tool.name}
                  </Link>
                </span>
              ))}
            .
          </nav>
        )}

        {categorySlug === 'encoding' && <EncodingWorkbench />}

        {/* Ad Banner */}
        <AdSense
          slot={categoryTopSlot}
          format="horizontal"
          placement={`category-${categorySlug}-top`}
          className="mb-8 min-h-[90px] rounded-lg"
        />

        {/* Tools Grid: one section heading, tool card titles are h3 */}
        <section aria-labelledby="category-tools-heading">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
            <h2
              id="category-tools-heading"
              className="text-xl font-bold tracking-tight text-slate-950 dark:text-white"
            >
              {allToolsHeading}
            </h2>
            <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
              {allCategoryTools.length}
            </span>
          </div>
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            data-topic-interface="true"
            data-related-tools="true"
          >
            {allCategoryTools.map((tool, index) => {
              const ToolIcon = toolIcons[tool.slug] || Wand2;
              const showInFeed =
                Boolean(categoryInFeedSlot) &&
                (index + 1) % CATEGORY_INFEED_INTERVAL === 0 &&
                index < allCategoryTools.length - 1;
              return (
                <Fragment key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="interactive-card group flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-600"
                  >
                    <div className="min-w-0">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${accent.iconBox}`}>
                          <ToolIcon className="h-4 w-4" />
                        </span>
                        <span className="truncate font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400">
                          {tool.slug}
                        </span>
                      </div>
                      <h3 className="mb-1.5 flex items-center justify-between gap-2 break-words text-base font-bold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                        <span className="min-w-0 break-words">{tool.name}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </h3>
                      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{tool.description}</p>
                    </div>
                  </Link>
                  {showInFeed && categoryInFeedSlot && (
                    <InFeedAdCard
                      slot={categoryInFeedSlot}
                      placement={`category-${categorySlug}-infeed`}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </section>

        <div className="mt-12">
          {answerSections.slice(1).map((section) => renderAnswerSection(section))}
        </div>

        {faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold text-slate-950 dark:border-slate-800 dark:text-white">
              {contentUi.faqHeading}
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
        )}

        {sources.length > 0 && (
          <section
            className="mb-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/90"
            aria-labelledby="sources-heading"
          >
            <h2
              id="sources-heading"
              className="mb-3 text-lg font-bold text-slate-950 dark:text-white sm:text-xl"
            >
              {contentUi.sourcesHeading}
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              {contentUi.primaryReferences}{' '}
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
            {categorySlug === 'encoding' && (
              <p className="mt-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                {contentUi.lastReviewed} <time dateTime="2026-07-11">2026-07-11</time>
              </p>
            )}
          </section>
        )}

        {/* SEO Content */}
        {isDefaultLocale ? (
          <section className="prose prose-gray mt-12 max-w-none dark:prose-invert">
            <h2 className="text-slate-950 dark:text-white">About {category.name}</h2>
            <p className="text-slate-700 dark:text-slate-300">
              {categorySlug === 'encoding'
                ? 'This encoder online workbench and its dedicated tools are designed to help developers work more efficiently. '
                : `Our ${category.name.toLowerCase()} are designed to help developers work more efficiently. `}
              All tools are free to use, require no registration, and process data client-side for
              maximum privacy.
            </p>
          </section>
        ) : (
          <section className="prose prose-gray mt-12 max-w-none dark:prose-invert">
            <h2 className="text-slate-950 dark:text-white">
              {translate(locale, 'categoryPage.aboutHeading', { category: categoryName })}
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              {translate(locale, 'categoryPage.aboutText')}
            </p>
          </section>
        )}
      </div>
    </>
  );
}
