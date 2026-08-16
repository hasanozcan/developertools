export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  toolCount: number;
}

export interface Tool {
  id: number;
  name: string;
  slug: string;
  shortDescription?: string;
  categorySlug: string;
  categoryName: string;
  isFeatured: boolean;
}

export interface ToolDetail extends Tool {
  longDescription?: string;
  keywords: string[];
  seo?: {
    title?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageUrl?: string;
    canonicalUrl?: string;
    structuredData?: string;
  };
  faqs: { question: string; answer: string }[];
  relatedTools?: Tool[];
}

// Static data now that the backend is disabled.
export const categoryCatalog = [
  {
    id: 1,
    slug: 'json',
    name: 'JSON Tools',
    description:
      'JSON formatting, validation, querying, patching, and conversion tools for developers',
    toolCount: 10,
  },
  {
    id: 2,
    slug: 'encoding',
    name: 'Encoder Online',
    description:
      'Encode and decode Base64, URL components, hexadecimal, binary, JSON strings, and more',
    toolCount: 9,
  },
  {
    id: 3,
    slug: 'generators',
    name: 'Generators',
    description: 'UUID, password, and other generators',
    toolCount: 7,
  },
  {
    id: 4,
    slug: 'crypto',
    name: 'Cryptography',
    description: 'Hashing, message authentication, certificates, and OAuth security tools',
    toolCount: 7,
  },
  {
    id: 5,
    slug: 'text',
    name: 'Text Tools',
    description: 'Text manipulation and formatting tools',
    toolCount: 8,
  },
  {
    id: 6,
    slug: 'converters',
    name: 'Converters',
    description: 'Data format converters',
    toolCount: 7,
  },
  {
    id: 7,
    slug: 'formatters',
    name: 'Code Formatters',
    description: 'Format and minify code in various languages',
    toolCount: 6,
  },
  {
    id: 8,
    slug: 'utilities',
    name: 'Developer Utilities',
    description: 'HTTP, accessibility, security, network, and request utilities for developers',
    toolCount: 11,
  },
] as const satisfies readonly Category[];

export type CategorySlug = (typeof categoryCatalog)[number]['slug'];

export const toolCatalog = [
  {
    id: 1,
    slug: 'json-formatter',
    name: 'JSON Formatter',
    shortDescription: 'Format and beautify JSON data',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 2,
    slug: 'json-validator',
    name: 'JSON Validator',
    shortDescription: 'Validate JSON syntax and structure',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 3,
    slug: 'json-csv',
    name: 'JSON to CSV',
    shortDescription: 'Convert JSON arrays to CSV and back',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 4,
    slug: 'json-to-typescript',
    name: 'JSON to TypeScript',
    shortDescription: 'Generate TypeScript interfaces from JSON',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 5,
    slug: 'base64',
    name: 'Base64 Encoder/Decoder',
    shortDescription: 'Encode or decode Base64 strings',
    categorySlug: 'encoding',
    categoryName: 'Encoding & Decoding',
    isFeatured: true,
  },
  {
    id: 6,
    slug: 'url-encoder',
    name: 'URL Encoder/Decoder',
    shortDescription: 'Encode or decode URL strings',
    categorySlug: 'encoding',
    categoryName: 'Encoding & Decoding',
    isFeatured: true,
  },
  {
    id: 7,
    slug: 'jwt-decoder',
    name: 'JWT Decoder, Signer & Verifier',
    shortDescription: 'Decode JWTs and sign or verify HS256, HS384, and HS512 tokens locally',
    categorySlug: 'encoding',
    categoryName: 'Encoding & Decoding',
    isFeatured: true,
  },
  {
    id: 8,
    slug: 'html-entity',
    name: 'HTML Entity Encoder/Decoder',
    shortDescription: 'Encode or decode HTML entities',
    categorySlug: 'encoding',
    categoryName: 'Encoding & Decoding',
    isFeatured: true,
  },
  {
    id: 9,
    slug: 'uuid-generator',
    name: 'UUID v4 & v7 Generator',
    shortDescription: 'Generate random v4 or timestamp-based v7 UUIDs',
    categorySlug: 'generators',
    categoryName: 'Generators',
    isFeatured: true,
  },
  {
    id: 10,
    slug: 'password-generator',
    name: 'Password Generator',
    shortDescription: 'Create strong random passwords',
    categorySlug: 'generators',
    categoryName: 'Generators',
    isFeatured: true,
  },
  {
    id: 11,
    slug: 'qr-code',
    name: 'QR Code Generator',
    shortDescription: 'Create QR codes from text or URLs',
    categorySlug: 'generators',
    categoryName: 'Generators',
    isFeatured: true,
  },
  {
    id: 12,
    slug: 'slug-generator',
    name: 'Slug Generator',
    shortDescription: 'Generate clean URL slugs',
    categorySlug: 'generators',
    categoryName: 'Generators',
    isFeatured: true,
  },
  {
    id: 13,
    slug: 'css-gradient',
    name: 'CSS Gradient',
    shortDescription: 'Design and export CSS gradients',
    categorySlug: 'generators',
    categoryName: 'Generators',
    isFeatured: true,
  },
  {
    id: 14,
    slug: 'meta-tags',
    name: 'Meta Tags Generator',
    shortDescription: 'Generate SEO meta tags',
    categorySlug: 'generators',
    categoryName: 'Generators',
    isFeatured: true,
  },
  {
    id: 15,
    slug: 'md5-hash',
    name: 'MD5 Hash',
    shortDescription: 'Generate MD5 hashes',
    categorySlug: 'crypto',
    categoryName: 'Cryptography',
    isFeatured: true,
  },
  {
    id: 16,
    slug: 'sha256-hash',
    name: 'SHA256 Hash',
    shortDescription: 'Generate SHA256 hashes',
    categorySlug: 'crypto',
    categoryName: 'Cryptography',
    isFeatured: true,
  },
  {
    id: 17,
    slug: 'regex-tester',
    name: 'Regex Tester',
    shortDescription: 'Test and debug regex patterns',
    categorySlug: 'text',
    categoryName: 'Text Tools',
    isFeatured: true,
  },
  {
    id: 18,
    slug: 'text-diff',
    name: 'Text Diff',
    shortDescription: 'Compare texts and highlight differences',
    categorySlug: 'text',
    categoryName: 'Text Tools',
    isFeatured: true,
  },
  {
    id: 19,
    slug: 'markdown-preview',
    name: 'Markdown Preview',
    shortDescription: 'Preview and convert Markdown to HTML',
    categorySlug: 'text',
    categoryName: 'Text Tools',
    isFeatured: true,
  },
  {
    id: 20,
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum',
    shortDescription: 'Generate placeholder text',
    categorySlug: 'generators',
    categoryName: 'Generators',
    isFeatured: true,
  },
  {
    id: 21,
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    shortDescription: 'Convert timestamps to readable dates',
    categorySlug: 'converters',
    categoryName: 'Converters',
    isFeatured: true,
  },
  {
    id: 22,
    slug: 'color-converter',
    name: 'Color Converter',
    shortDescription: 'Convert between HEX, RGB, and HSL',
    categorySlug: 'converters',
    categoryName: 'Converters',
    isFeatured: true,
  },
  {
    id: 23,
    slug: 'image-to-base64',
    name: 'Image to Base64',
    shortDescription: 'Convert images to Base64',
    categorySlug: 'encoding',
    categoryName: 'Encoding & Decoding',
    isFeatured: true,
  },
  {
    id: 24,
    slug: 'yaml-json',
    name: 'YAML to JSON',
    shortDescription: 'Convert YAML to JSON and back',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 25,
    slug: 'sql-formatter',
    name: 'SQL Formatter',
    shortDescription: 'Format SQL queries',
    categorySlug: 'formatters',
    categoryName: 'Code Formatters',
    isFeatured: true,
  },
  {
    id: 26,
    slug: 'css-minifier',
    name: 'CSS Minifier',
    shortDescription: 'Minify CSS for production',
    categorySlug: 'formatters',
    categoryName: 'Code Formatters',
    isFeatured: true,
  },
  {
    id: 27,
    slug: 'js-minifier',
    name: 'JS Minifier',
    shortDescription: 'Minify JavaScript for production',
    categorySlug: 'formatters',
    categoryName: 'Code Formatters',
    isFeatured: true,
  },
  {
    id: 28,
    slug: 'cron-parser',
    name: 'Cron Parser',
    shortDescription: 'Parse and explain cron expressions',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 29,
    slug: 'case-converter',
    name: 'Case Converter',
    shortDescription: 'Convert text between different cases',
    categorySlug: 'text',
    categoryName: 'Text Tools',
    isFeatured: true,
  },
  {
    id: 30,
    slug: 'word-counter',
    name: 'Word Counter',
    shortDescription: 'Count words, characters, lines, and sentences',
    categorySlug: 'text',
    categoryName: 'Text Tools',
    isFeatured: true,
  },
  {
    id: 31,
    slug: 'remove-duplicates',
    name: 'Remove Duplicate Lines',
    shortDescription: 'Remove duplicate lines from text',
    categorySlug: 'text',
    categoryName: 'Text Tools',
    isFeatured: true,
  },
  {
    id: 32,
    slug: 'sort-lines',
    name: 'Sort Lines',
    shortDescription: 'Sort lines alphabetically',
    categorySlug: 'text',
    categoryName: 'Text Tools',
    isFeatured: true,
  },
  {
    id: 33,
    slug: 'hex-encoder',
    name: 'HEX Encoder/Decoder',
    shortDescription: 'Encode or decode text to or from hexadecimal',
    categorySlug: 'encoding',
    categoryName: 'Encoding & Decoding',
    isFeatured: true,
  },
  {
    id: 34,
    slug: 'binary-encoder',
    name: 'Binary Encoder/Decoder',
    shortDescription: 'Encode or decode text to or from binary',
    categorySlug: 'encoding',
    categoryName: 'Encoding & Decoding',
    isFeatured: true,
  },
  {
    id: 35,
    slug: 'html-formatter',
    name: 'HTML Formatter',
    shortDescription: 'Format and beautify HTML code',
    categorySlug: 'formatters',
    categoryName: 'Code Formatters',
    isFeatured: true,
  },
  {
    id: 36,
    slug: 'html-minifier',
    name: 'HTML Minifier',
    shortDescription: 'Minify HTML code for production',
    categorySlug: 'formatters',
    categoryName: 'Code Formatters',
    isFeatured: true,
  },
  {
    id: 37,
    slug: 'xml-formatter',
    name: 'XML Formatter',
    shortDescription: 'Format and beautify XML code',
    categorySlug: 'formatters',
    categoryName: 'Code Formatters',
    isFeatured: true,
  },
  {
    id: 38,
    slug: 'sha512-hash',
    name: 'SHA512 Hash Generator',
    shortDescription: 'Generate SHA512 hashes from text',
    categorySlug: 'crypto',
    categoryName: 'Cryptography',
    isFeatured: true,
  },
  {
    id: 39,
    slug: 'roman-numeral-converter',
    name: 'Roman Numeral Converter',
    shortDescription: 'Convert numbers to and from Roman numerals',
    categorySlug: 'converters',
    categoryName: 'Converters',
    isFeatured: true,
  },
  {
    id: 40,
    slug: 'number-base-converter',
    name: 'Number Base Converter',
    shortDescription: 'Convert between decimal, hexadecimal, octal, and binary',
    categorySlug: 'converters',
    categoryName: 'Converters',
    isFeatured: true,
  },
  {
    id: 41,
    slug: 'unicode-escape',
    name: 'Unicode Escape Encoder/Decoder',
    shortDescription: 'Convert text to and from Unicode escape sequences',
    categorySlug: 'encoding',
    categoryName: 'Encoding & Decoding',
    isFeatured: true,
  },
  {
    id: 42,
    slug: 'json-string-escape',
    name: 'JSON String Escape',
    shortDescription: 'Escape and unescape JSON string content',
    categorySlug: 'encoding',
    categoryName: 'Encoding & Decoding',
    isFeatured: true,
  },
  {
    id: 43,
    slug: 'regex-escape',
    name: 'Regex Escape',
    shortDescription: 'Escape text for safe use in regular expressions',
    categorySlug: 'text',
    categoryName: 'Text Tools',
    isFeatured: true,
  },
  {
    id: 44,
    slug: 'url-parser',
    name: 'URL Parser',
    shortDescription: 'Parse URLs into protocol, host, path, and query parameters',
    categorySlug: 'converters',
    categoryName: 'Converters',
    isFeatured: true,
  },
  {
    id: 45,
    slug: 'query-string-parser',
    name: 'Query String Parser',
    shortDescription: 'Parse and build URL query strings',
    categorySlug: 'converters',
    categoryName: 'Converters',
    isFeatured: true,
  },
  {
    id: 46,
    slug: 'http-headers-parser',
    name: 'HTTP Headers Parser',
    shortDescription: 'Convert raw HTTP headers to JSON and back',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 47,
    slug: 'http-status-codes',
    name: 'HTTP Status Codes',
    shortDescription: 'Search and reference common HTTP status codes',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 48,
    slug: 'user-agent-parser',
    name: 'User Agent Parser Online',
    shortDescription:
      'Parse browser, OS, engine, device, CPU, and bot fields from one or many User-Agent strings',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 49,
    slug: 'json-schema-validator',
    name: 'JSON Schema Validator',
    shortDescription: 'Validate JSON documents against JSON Schema rules',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 50,
    slug: 'hmac-generator',
    name: 'HMAC Generator & Verifier',
    shortDescription: 'Generate and verify keyed SHA message authentication codes',
    categorySlug: 'crypto',
    categoryName: 'Cryptography',
    isFeatured: true,
  },
  {
    id: 51,
    slug: 'pkce-generator',
    name: 'PKCE Generator & Verifier',
    shortDescription: 'Generate and verify OAuth PKCE S256 verifier and challenge pairs',
    categorySlug: 'crypto',
    categoryName: 'Cryptography',
    isFeatured: true,
  },
  {
    id: 52,
    slug: 'cidr-calculator',
    name: 'IPv4 CIDR Calculator',
    shortDescription: 'Calculate IPv4 network ranges, masks, broadcasts, and usable hosts',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 53,
    slug: 'json-pointer',
    name: 'JSON Pointer Evaluator',
    shortDescription: 'Resolve RFC 6901 JSON Pointer paths against JSON documents',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 54,
    slug: 'chmod-calculator',
    name: 'Chmod Calculator',
    shortDescription: 'Convert Unix file permissions between octal and symbolic modes',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 55,
    slug: 'cache-control',
    name: 'Cache-Control Parser & Builder',
    shortDescription: 'Parse, normalize, and check HTTP Cache-Control directives',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 56,
    slug: 'jsonpath-tester',
    name: 'JSONPath Tester',
    shortDescription:
      'Query JSON with RFC 9535-style paths, wildcards, slices, and recursive descent',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 57,
    slug: 'csp-builder',
    name: 'CSP Header Builder & Analyzer',
    shortDescription: 'Build, normalize, and inspect Content Security Policy headers',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 58,
    slug: 'curl-to-fetch',
    name: 'cURL Builder & Fetch Converter',
    shortDescription: 'Build cURL requests or convert safe cURL input to JavaScript fetch',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 59,
    slug: 'env-to-json',
    name: '.env to JSON Converter',
    shortDescription: 'Convert dotenv variables to JSON and back without uploading secrets',
    categorySlug: 'converters',
    categoryName: 'Converters',
    isFeatured: true,
  },
  {
    id: 60,
    slug: 'json-to-zod',
    name: 'JSON to Zod Schema',
    shortDescription: 'Generate Zod schemas and inferred TypeScript types from JSON samples',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 61,
    slug: 'bcrypt-generator',
    name: 'Bcrypt Generator & Verifier',
    shortDescription: 'Generate salted bcrypt hashes and verify test passwords locally',
    categorySlug: 'crypto',
    categoryName: 'Cryptography',
    isFeatured: true,
  },
  {
    id: 62,
    slug: 'json-diff-patch',
    name: 'JSON Diff & Patch Generator',
    shortDescription: 'Generate and apply RFC 6902 JSON Patch operations locally',
    categorySlug: 'json',
    categoryName: 'JSON Tools',
    isFeatured: true,
  },
  {
    id: 63,
    slug: 'color-contrast-checker',
    name: 'Color Contrast Checker',
    shortDescription: 'Check WCAG text and UI contrast ratios with a live preview',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
  {
    id: 64,
    slug: 'certificate-decoder',
    name: 'PEM / X.509 Certificate Decoder',
    shortDescription:
      'Inspect certificate identities, validity, SANs, algorithms, and fingerprints locally',
    categorySlug: 'crypto',
    categoryName: 'Cryptography',
    isFeatured: true,
  },
  {
    id: 65,
    slug: 'openapi-validator',
    name: 'OpenAPI Validator & Endpoint Explorer',
    shortDescription: 'Validate OpenAPI 3 documents and explore endpoint operations locally',
    categorySlug: 'utilities',
    categoryName: 'Developer Utilities',
    isFeatured: true,
  },
] as const satisfies readonly Tool[];

export type ToolSlug = (typeof toolCatalog)[number]['slug'];

const categoryBySlug = new Map<string, Category>(
  categoryCatalog.map((category) => [category.slug, category]),
);
const toolBySlug = new Map<string, Tool>(toolCatalog.map((tool) => [tool.slug, tool]));

export function findCatalogTool(slug: string): Tool | undefined {
  return toolBySlug.get(slug);
}

export function isToolSlug(slug: string): slug is ToolSlug {
  return toolBySlug.has(slug);
}

const curatedRelatedToolSlugs: Record<string, string[]> = {
  'json-formatter': ['json-validator', 'json-to-typescript', 'json-csv'],
  'json-to-typescript': ['json-to-zod', 'json-schema-validator', 'json-formatter'],
  'jwt-decoder': ['certificate-decoder', 'hmac-generator', 'base64'],
  'regex-tester': ['regex-escape', 'text-diff', 'case-converter'],
  'uuid-generator': ['password-generator', 'qr-code', 'slug-generator'],
  'password-generator': ['bcrypt-generator', 'uuid-generator', 'hmac-generator'],
  'md5-hash': ['sha256-hash', 'sha512-hash', 'hmac-generator'],
  'sha256-hash': ['certificate-decoder', 'pkce-generator', 'sha512-hash'],
  'sha512-hash': ['sha256-hash', 'hmac-generator', 'md5-hash'],
  'hmac-generator': ['bcrypt-generator', 'pkce-generator', 'sha256-hash'],
  'url-parser': ['cidr-calculator', 'query-string-parser', 'url-encoder'],
  'http-headers-parser': ['openapi-validator', 'cache-control', 'http-status-codes'],
  'pkce-generator': ['sha256-hash', 'hmac-generator', 'uuid-generator'],
  'cidr-calculator': ['url-parser', 'http-headers-parser', 'http-status-codes'],
  'json-pointer': ['json-diff-patch', 'jsonpath-tester', 'json-formatter'],
  'jsonpath-tester': ['json-diff-patch', 'json-pointer', 'json-schema-validator'],
  'chmod-calculator': ['cidr-calculator', 'cron-parser', 'http-headers-parser'],
  'cache-control': ['http-headers-parser', 'csp-builder', 'curl-to-fetch'],
  'csp-builder': ['cache-control', 'curl-to-fetch', 'cron-parser'],
  'curl-to-fetch': ['openapi-validator', 'csp-builder', 'http-headers-parser'],
  'env-to-json': ['yaml-json', 'json-formatter'],
  'json-to-zod': ['json-to-typescript', 'json-schema-validator', 'json-formatter'],
  'bcrypt-generator': ['password-generator', 'hmac-generator', 'md5-hash'],
  'json-diff-patch': ['json-pointer', 'jsonpath-tester', 'json-validator'],
  'color-contrast-checker': ['color-converter', 'css-gradient', 'meta-tags'],
  'certificate-decoder': ['jwt-decoder', 'sha256-hash', 'hmac-generator'],
  'openapi-validator': ['curl-to-fetch', 'http-headers-parser', 'json-schema-validator'],
  'color-converter': ['color-contrast-checker', 'css-gradient', 'roman-numeral-converter'],
  'css-gradient': ['color-contrast-checker', 'color-converter', 'meta-tags'],
};

function relatedToolsFor(tool: Tool, count: number = 3): Tool[] {
  const categoryTools = toolCatalog.filter(
    (candidate) => candidate.categorySlug === tool.categorySlug,
  );
  const categoryIndex = categoryTools.findIndex((candidate) => candidate.slug === tool.slug);
  const categoryRing = categoryTools
    .slice(categoryIndex + 1)
    .concat(categoryTools.slice(0, categoryIndex));
  const globalIndex = toolCatalog.findIndex((candidate) => candidate.slug === tool.slug);
  const globalRing = toolCatalog.slice(globalIndex + 1).concat(toolCatalog.slice(0, globalIndex));
  const candidates = [
    ...(curatedRelatedToolSlugs[tool.slug] || [])
      .map((slug) => toolCatalog.find((candidate) => candidate.slug === slug))
      .filter((candidate): candidate is (typeof toolCatalog)[number] => candidate !== undefined),
    ...categoryRing,
    ...globalRing,
  ];

  const unique = new Map<string, Tool>();
  for (const candidate of candidates) {
    if (candidate.slug !== tool.slug && !unique.has(candidate.slug)) {
      unique.set(candidate.slug, candidate);
    }
  }

  return [...unique.values()].slice(0, count);
}

function asDetail(tool: Tool): ToolDetail {
  return {
    ...tool,
    longDescription: tool.shortDescription,
    keywords: tool.name.split(' '),
    seo: {
      title: `${tool.name} | DevsTools`,
      metaDescription: tool.shortDescription,
    },
    faqs: [],
    relatedTools: relatedToolsFor(tool),
  };
}

// Categories API (static)
export async function getCategories(): Promise<Category[]> {
  return [...categoryCatalog];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return categoryBySlug.get(slug) || null;
}

// Tools API (static)
export async function getTools(): Promise<Tool[]> {
  return [...toolCatalog];
}

export async function getToolBySlug(slug: string): Promise<ToolDetail | null> {
  const tool = findCatalogTool(slug);
  return tool ? asDetail(tool) : null;
}

export async function getFeaturedTools(count: number = 10): Promise<Tool[]> {
  return toolCatalog.filter((t) => t.isFeatured).slice(0, count);
}

export async function getPopularTools(count: number = toolCatalog.length): Promise<Tool[]> {
  return toolCatalog.slice(0, count);
}
