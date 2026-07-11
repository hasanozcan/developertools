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
  LucideIcon
} from 'lucide-react';
import Breadcrumb from '@/components/common/Breadcrumb';
import AdSense from '@/components/common/AdSense';
import EncodingWorkbench from '@/components/tools/EncodingWorkbench';
import { buildToolPath } from '@/lib/toolRoutes';

// Tool icon mapping
const toolIcons: Record<string, LucideIcon> = {
  'json-formatter': FileJson,
  'json-validator': CheckCircle,
  'json-csv': FileSpreadsheet,
  'json-to-typescript': FileType,
  'yaml-json': FileJson2,
  'base64': Binary,
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
    name: 'Encoder Online',
    metadataTitle: 'Encoder Online – Base64, URL, Hex & Text Decoder',
    description: 'Encode or decode Base64, URL components, hexadecimal, binary, and JSON strings in one browser-based workbench, with dedicated tools for HTML, Unicode, JWTs, and images.',
    icon: Code,
    tools: [
      { name: 'Base64 Encoder/Decoder', slug: 'base64', description: 'Encode or decode Base64 strings' },
      { name: 'URL Encoder/Decoder', slug: 'url-encoder', description: 'Encode or decode URL strings' },
      { name: 'HEX Encoder/Decoder', slug: 'hex-encoder', description: 'Encode or decode text to/from hexadecimal' },
      { name: 'Binary Encoder/Decoder', slug: 'binary-encoder', description: 'Encode or decode text to/from binary' },
      { name: 'JWT Decoder', slug: 'jwt-decoder', description: 'Decode and inspect JWT tokens' },
      { name: 'HTML Entity Encoder/Decoder', slug: 'html-entity', description: 'Encode or decode HTML entities' },
      { name: 'Unicode Escape Encoder/Decoder', slug: 'unicode-escape', description: 'Convert text to and from Unicode escape sequences' },
      { name: 'JSON String Escape', slug: 'json-string-escape', description: 'Escape and unescape JSON string content' },
      { name: 'Image to Base64', slug: 'image-to-base64', description: 'Convert images to Base64 data URIs' },
    ],
    answerSections: [
      {
        heading: 'Which online encoder should I use?',
        paragraphs: [
          'Use the workbench on this page for quick Base64, URL-component, hexadecimal, binary, or JSON-string conversion. Choose the representation required by the system that will consume the result, or open a dedicated tool when you need format-specific options.',
        ],
        bullets: [
          'Base64 converts text to and from Base64; Image to Base64 creates a data URI for an image.',
          'URL Encoder percent-encodes a full URL or one URL component.',
          'HTML Entity handles characters used in HTML source.',
          'Unicode Escape represents code points with escape sequences, while JSON String Escape prepares or reads string content used inside JSON.',
          'HEX Encoder and Binary Encoder expose character data as hexadecimal or bit values.',
          'JWT Decoder displays a token\'s Base64url-encoded header and payload for debugging, but decoding does not verify its signature or prove its claims are trustworthy.',
        ],
      },
      {
        heading: 'Encoding is not encryption or hashing',
        paragraphs: [
          'Encoding changes a value\'s representation so compatible software can reverse it; it is not a security control. Encryption uses a key to protect confidentiality, while hashing produces a digest intended to be one-way. Base64, percent encoding, HTML entities, hexadecimal, binary, Unicode escapes, and JSON escaping do not hide secrets. Use encryption when confidentiality is required, a keyed message-authentication code or digital signature when authenticity and integrity are required, and a dedicated salted, deliberately slow password-hashing scheme for stored passwords.',
        ],
      },
      {
        heading: 'Client-side processing and privacy',
        paragraphs: [
          'These encoding and decoding tools run in the current browser. Text transformations use browser JavaScript, and image conversion uses FileReader instead of uploading the selected file to a conversion service. That client-side boundary reduces routine data transfer, but it does not make sensitive material safe on every device. Clipboard history, browser extensions, third-party page scripts, screen sharing, or a shared computer can expose input. Do not paste production credentials, private keys, session tokens, or confidential JWT claims.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which online encoder should I use?',
        answer: 'Use this page for Base64, URL-component, hexadecimal, binary, or JSON-string conversion. Use HTML entities for HTML source, Unicode escaping for code points, JWT Decoder for token inspection, and Image to Base64 for image data URIs.',
      },
      {
        question: 'Is encoding the same as encryption or hashing?',
        answer: 'No. Encoding is reversible representation and provides no confidentiality. Encryption protects data with a key, while hashing produces a digest that is generally intended to be one-way.',
      },
      {
        question: 'Do these encoding tools upload my input?',
        answer: 'The current tools perform their transformations in your browser and do not submit entered values or selected images to a conversion API. Clipboard history, extensions, page scripts, and shared devices can still expose sensitive input.',
      },
    ],
    sources: [
      { name: 'RFC 4648: Base-N Encodings', url: 'https://www.rfc-editor.org/rfc/rfc4648' },
      { name: 'WHATWG URL Standard: Percent-encoded bytes', url: 'https://url.spec.whatwg.org/#percent-encoded-bytes' },
      { name: 'NIST SP 800-63B: Authentication and Authenticator Management', url: 'https://pages.nist.gov/800-63-4/sp800-63b.html' },
    ],
  },
  generators: {
    name: 'Generators',
    description: 'UUID, password, and other generators',
    icon: Wand2,
    tools: [
      { name: 'UUID v4 & v7 Generator', slug: 'uuid-generator', description: 'Generate random v4 or timestamp-based v7 UUIDs/GUIDs' },
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
      { name: 'SHA512 Hash Generator', slug: 'sha512-hash', description: 'Generate SHA512 hash from text' },
    ],
  },
  text: {
    name: 'Text Tools',
    description: 'Text manipulation and formatting tools',
    icon: Type,
    tools: [
      { name: 'Case Converter', slug: 'case-converter', description: 'Convert text between different cases' },
      { name: 'Word Counter', slug: 'word-counter', description: 'Count words, characters, lines, sentences' },
      { name: 'Regex Tester', slug: 'regex-tester', description: 'Test and debug regular expressions' },
      { name: 'Regex Escape', slug: 'regex-escape', description: 'Escape text for safe regex usage' },
      { name: 'Remove Duplicate Lines', slug: 'remove-duplicates', description: 'Remove duplicate lines from text' },
      { name: 'Sort Lines', slug: 'sort-lines', description: 'Sort lines alphabetically' },
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
      { name: 'Roman Numeral Converter', slug: 'roman-numeral-converter', description: 'Convert numbers to Roman numerals' },
      { name: 'Number Base Converter', slug: 'number-base-converter', description: 'Convert between decimal, hex, octal, binary' },
      { name: 'JSON to CSV Converter', slug: 'json-csv', description: 'Convert JSON to CSV and vice versa' },
      { name: 'YAML ↔ JSON Converter', slug: 'yaml-json', description: 'Convert between YAML and JSON formats' },
      { name: 'Image to Base64', slug: 'image-to-base64', description: 'Convert images to Base64 data URIs' },
      { name: 'URL Parser', slug: 'url-parser', description: 'Parse URLs into protocol, host, path, and query params' },
      { name: 'Query String Parser', slug: 'query-string-parser', description: 'Parse and build URL query strings' },
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
      { name: 'HTML Formatter', slug: 'html-formatter', description: 'Format and beautify HTML code' },
      { name: 'HTML Minifier', slug: 'html-minifier', description: 'Minify HTML code for production' },
      { name: 'XML Formatter', slug: 'xml-formatter', description: 'Format and beautify XML code' },
    ],
  },
  utilities: {
    name: 'Developer Utilities',
    description: 'Essential utilities for developers',
    icon: Wand2,
    tools: [
      { name: 'Cron Expression Parser', slug: 'cron-parser', description: 'Parse and explain cron expressions' },
      { name: 'HTTP Headers Parser', slug: 'http-headers-parser', description: 'Convert raw HTTP headers to JSON and back' },
      { name: 'HTTP Status Codes', slug: 'http-status-codes', description: 'Search and reference common HTTP status codes' },
      { name: 'User-Agent Parser', slug: 'user-agent-parser', description: 'Detect browser, OS, and device from user-agent strings' },
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const categoryUrl = `${siteUrl}/tools/${categorySlug}`;
  const ogImageUrl = `${siteUrl}/og-image.png`;
  const pageTitle = category.metadataTitle || `${category.name} - Free Online Developer Tools`;

  // Category-specific keywords
  const categoryKeywords: Record<string, string[]> = {
    json: ['json tools', 'json formatter', 'json validator', 'json to csv', 'json to typescript', 'yaml to json', 'json beautifier', 'json parser'],
    encoding: ['online encoder', 'encoder online', 'online decoder', 'encoding tools', 'base64 encoder', 'base64 decoder', 'url encoder', 'url decoder', 'hex encoder', 'binary encoder', 'jwt decoder', 'html entity encoder', 'unicode escape', 'json string escape'],
    generators: ['generators', 'uuid generator', 'password generator', 'lorem ipsum generator', 'qr code generator', 'slug generator', 'css gradient generator', 'meta tags generator'],
    crypto: ['cryptography', 'hash generator', 'md5 generator', 'sha256 generator', 'sha512 generator', 'hash tools'],
    text: ['text tools', 'regex tester', 'regex escape', 'case converter', 'word counter', 'text diff', 'markdown preview', 'sort lines', 'remove duplicates'],
    converters: ['converters', 'timestamp converter', 'color converter', 'roman numeral converter', 'number base converter', 'json to csv', 'yaml to json', 'url parser', 'query string parser'],
    formatters: ['code formatters', 'sql formatter', 'css minifier', 'javascript minifier', 'html formatter', 'html minifier', 'xml formatter', 'code beautifier'],
    utilities: ['developer utilities', 'cron parser', 'cron expression', 'development tools', 'http status codes', 'http headers parser', 'user agent parser'],
  };

  return {
    title: pageTitle,
    description: category.description,
    keywords: categoryKeywords[categorySlug] || [category.name.toLowerCase(), 'developer tools', 'online tools', 'free tools'],
    alternates: {
      canonical: categoryUrl,
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

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = categories[categorySlug];

  if (!category) {
    notFound();
  }

  const Icon = category.icon;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const answerSections = category.answerSections || [];
  const faqs = category.faqs || [];
  const sources = category.sources || [];

  // CollectionPage structured data for category pages
  const collectionPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.metadataTitle || `${category.name} - Free Online Developer Tools`,
    description: category.description,
    url: `${siteUrl}/tools/${categorySlug}`,
    ...(categorySlug === 'encoding' ? { dateModified: '2026-07-11' } : {}),
    about: {
      '@type': 'Thing',
      name: category.name,
      description: category.description,
    },
    citation: sources.map((source) => source.url),
    mainEntity: {
      '@type': 'ItemList',
      name: `${category.name} tools`,
      itemListElement: category.tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        url: `${siteUrl}${buildToolPath(categorySlug, tool.slug)}`,
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

  const encodingApplicationStructuredData = categorySlug === 'encoding' ? {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${siteUrl}/tools/encoding#application`,
    url: `${siteUrl}/tools/encoding`,
    name: 'Encoder Online',
    description: category.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    dateModified: '2026-07-11',
    citation: sources.map((source) => source.url),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  } : null;

  const renderAnswerSection = (
    section: { heading: string; paragraphs?: string[]; bullets?: string[] },
    answerFirst = false,
  ) => (
    <section key={section.heading} className="mb-8" data-answer-first={answerFirst ? 'true' : undefined}>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{section.heading}</h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.bullets && (
          <ul className="list-disc pl-6 space-y-2">
            {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        )}
      </div>
    </section>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageStructuredData) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      {encodingApplicationStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(encodingApplicationStructuredData) }}
        />
      )}
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

      {answerSections.slice(0, 1).map((section) => renderAnswerSection(section, true))}

      {categorySlug === 'encoding' && (
        <nav aria-label="Encoding tool shortcuts" className="mb-8 text-gray-600 dark:text-gray-300">
          Open an encoder or decoder:{' '}
          {category.tools.map((tool, index) => (
            <span key={`reader-${tool.slug}`}>
              {index > 0 ? ', ' : ''}
              <Link
                href={buildToolPath(categorySlug, tool.slug)}
                className="text-primary-600 dark:text-primary-400 hover:underline"
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
        slot="1733348098"
        format="horizontal"
        className="h-24 rounded-lg mb-8 overflow-hidden"
      />

      {/* Tools Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-topic-interface="true"
        data-related-tools="true"
      >
        {category.tools.map((tool) => {
          const ToolIcon = toolIcons[tool.slug] || Wand2;
          return (
            <Link
              key={tool.slug}
              href={buildToolPath(categorySlug, tool.slug)}
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

      <div className="mt-12">
        {answerSections.slice(1).map((section) => renderAnswerSection(section))}
      </div>

      {faqs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently asked questions</h2>
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <dt><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3></dt>
                <dd className="text-gray-600 dark:text-gray-300">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {sources.length > 0 && (
        <section className="mb-8" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Sources &amp; references
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Primary references:{' '}
            {sources.map((source, index) => (
              <span key={source.url}>
                {index > 0 ? '; ' : ''}
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                  {source.name}
                </a>
              </span>
            ))}
            .
          </p>
          {categorySlug === 'encoding' && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Last reviewed: <time dateTime="2026-07-11">2026-07-11</time>
            </p>
          )}
        </section>
      )}

      {/* SEO Content */}
      <section className="mt-12 prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-gray-900 dark:text-white">About {category.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {categorySlug === 'encoding'
            ? 'This encoder online workbench and its dedicated tools are designed to help developers work more efficiently. '
            : `Our ${category.name.toLowerCase()} are designed to help developers work more efficiently. `}
          All tools are free to use, require no registration, and process data client-side for maximum privacy.
        </p>
      </section>
    </div>
    </>
  );
}
