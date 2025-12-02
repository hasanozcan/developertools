import { Metadata } from 'next';
import Link from 'next/link';
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
  LucideIcon
} from 'lucide-react';
import Breadcrumb from '@/components/common/Breadcrumb';
import AdSense from '@/components/common/AdSense';

// Tool icon mapping
const toolIcons: Record<string, LucideIcon> = {
  'json-formatter': FileJson,
  'json-validator': CheckCircle,
  'json-csv': FileSpreadsheet,
  'json-to-typescript': FileType,
  'yaml-json': FileJson2,
  'base64': Binary,
  'url-encoder': Link2,
  'jwt-decoder': KeyRound,
  'html-entity': Code2,
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
  'text-diff': GitCompare,
  'markdown-preview': FileText,
  'timestamp-converter': Timer,
  'color-converter': Palette,
  'sql-formatter': Database,
  'css-minifier': Minimize2,
  'js-minifier': FileCode,
  'cron-parser': Clock,
};

const categories: Record<string, { name: string; description: string; icon: any; tools: { name: string; slug: string; description: string }[] }> = {
  json: {
    name: 'JSON Tools',
    description: 'JSON formatting, validation, and conversion tools for developers',
    icon: Braces,
    tools: [
      { name: 'JSON Formatter', slug: 'json-formatter', description: 'Format and beautify JSON data' },
      { name: 'JSON Validator', slug: 'json-validator', description: 'Validate JSON syntax' },
      { name: 'JSON to CSV Converter', slug: 'json-csv', description: 'Convert JSON to CSV and vice versa' },
      { name: 'JSON to TypeScript', slug: 'json-to-typescript', description: 'Generate TypeScript interfaces from JSON' },
      { name: 'YAML ↔ JSON Converter', slug: 'yaml-json', description: 'Convert between YAML and JSON formats' },
    ],
  },
  encoding: {
    name: 'Encoding & Decoding',
    description: 'Base64, URL encoding and decoding tools',
    icon: Code,
    tools: [
      { name: 'Base64 Encoder/Decoder', slug: 'base64', description: 'Encode or decode Base64 strings' },
      { name: 'URL Encoder/Decoder', slug: 'url-encoder', description: 'Encode or decode URL strings' },
      { name: 'JWT Decoder', slug: 'jwt-decoder', description: 'Decode and inspect JWT tokens' },
      { name: 'HTML Entity Encoder/Decoder', slug: 'html-entity', description: 'Encode or decode HTML entities' },
      { name: 'Image to Base64', slug: 'image-to-base64', description: 'Convert images to Base64 data URIs' },
    ],
  },
  generators: {
    name: 'Generators',
    description: 'UUID, password, and other generators',
    icon: Wand2,
    tools: [
      { name: 'UUID Generator', slug: 'uuid-generator', description: 'Generate random UUIDs/GUIDs' },
      { name: 'Password Generator', slug: 'password-generator', description: 'Generate secure random passwords' },
      { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', description: 'Generate placeholder text' },
      { name: 'QR Code Generator', slug: 'qr-code', description: 'Generate QR codes from text or URLs' },
      { name: 'Slug Generator', slug: 'slug-generator', description: 'Generate SEO-friendly URL slugs' },
      { name: 'CSS Gradient Generator', slug: 'css-gradient', description: 'Create beautiful CSS gradients' },
      { name: 'Meta Tags Generator', slug: 'meta-tags', description: 'Generate SEO meta tags for websites' },
    ],
  },
  crypto: {
    name: 'Cryptography',
    description: 'Hash generators and encryption tools',
    icon: Lock,
    tools: [
      { name: 'MD5 Hash Generator', slug: 'md5-hash', description: 'Generate MD5 hash from text' },
      { name: 'SHA256 Hash Generator', slug: 'sha256-hash', description: 'Generate SHA256 hash from text' },
    ],
  },
  text: {
    name: 'Text Tools',
    description: 'Text manipulation and formatting tools',
    icon: Type,
    tools: [
      { name: 'Regex Tester', slug: 'regex-tester', description: 'Test and debug regular expressions' },
      { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', description: 'Generate placeholder text' },
      { name: 'Text Diff Tool', slug: 'text-diff', description: 'Compare two texts and find differences' },
      { name: 'Markdown Preview', slug: 'markdown-preview', description: 'Preview and convert Markdown to HTML' },
      { name: 'Slug Generator', slug: 'slug-generator', description: 'Generate SEO-friendly URL slugs' },
    ],
  },
  converters: {
    name: 'Converters',
    description: 'Data format converters',
    icon: ArrowLeftRight,
    tools: [
      { name: 'Timestamp Converter', slug: 'timestamp-converter', description: 'Convert timestamps to dates' },
      { name: 'Color Converter', slug: 'color-converter', description: 'Convert colors between HEX, RGB, HSL' },
      { name: 'JSON to CSV Converter', slug: 'json-csv', description: 'Convert JSON to CSV and vice versa' },
      { name: 'YAML ↔ JSON Converter', slug: 'yaml-json', description: 'Convert between YAML and JSON formats' },
      { name: 'Image to Base64', slug: 'image-to-base64', description: 'Convert images to Base64 data URIs' },
    ],
  },
  formatters: {
    name: 'Code Formatters',
    description: 'Format and minify code in various languages',
    icon: Code,
    tools: [
      { name: 'SQL Formatter', slug: 'sql-formatter', description: 'Format and beautify SQL queries' },
      { name: 'CSS Minifier', slug: 'css-minifier', description: 'Minify CSS code for production' },
      { name: 'JavaScript Minifier', slug: 'js-minifier', description: 'Minify JavaScript code for production' },
    ],
  },
  utilities: {
    name: 'Developer Utilities',
    description: 'Essential utilities for developers',
    icon: Wand2,
    tools: [
      { name: 'Cron Expression Parser', slug: 'cron-parser', description: 'Parse and explain cron expressions' },
      { name: 'QR Code Generator', slug: 'qr-code', description: 'Generate QR codes from text or URLs' },
      { name: 'Markdown Preview', slug: 'markdown-preview', description: 'Preview and convert Markdown to HTML' },
    ],
  },
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories[categorySlug];

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} - Free Online Developer Tools`,
    description: category.description,
    openGraph: {
      title: `${category.name} - Free Online Developer Tools`,
      description: category.description,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = categories[categorySlug];

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: category.name },
        ]}
      />

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
          <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
        </div>
      </div>

      {/* Ad Banner */}
      <AdSense
        slot="1733348098"
        format="horizontal"
        className="h-24 rounded-lg mb-8 overflow-hidden"
      />

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.tools.map((tool) => {
          const ToolIcon = toolIcons[tool.slug] || Wand2;
          return (
            <Link
              key={tool.slug}
              href={`/tools/${categorySlug}/${tool.slug}`}
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all"
            >
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 flex items-center justify-between mb-2">
                <span className="flex items-center gap-2">
                  <ToolIcon className="w-5 h-5 text-primary-500" />
                  {tool.name}
                </span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{tool.description}</p>
            </Link>
          );
        })}
      </div>

      {/* SEO Content */}
      <section className="mt-12 prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-gray-900 dark:text-white">About {category.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Our {category.name.toLowerCase()} are designed to help developers work more efficiently.
          All tools are free to use, require no registration, and process data client-side for maximum privacy.
        </p>
      </section>
    </div>
  );
}
