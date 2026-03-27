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
const staticCategories: Category[] = [
  { id: 1, slug: 'json', name: 'JSON Tools', description: 'Format, validate, and convert JSON', toolCount: 5 },
  { id: 2, slug: 'encoding', name: 'Encoding & Decoding', description: 'Base64, URL, HTML encoding tools', toolCount: 5 },
  { id: 3, slug: 'generators', name: 'Generators', description: 'UUID, password, QR, meta tag generators', toolCount: 7 },
  { id: 4, slug: 'crypto', name: 'Cryptography', description: 'Hash and crypto helpers', toolCount: 2 },
  { id: 5, slug: 'text', name: 'Text Tools', description: 'Compare, preview, and format text', toolCount: 3 },
  { id: 6, slug: 'converters', name: 'Converters', description: 'Data and color converters', toolCount: 2 },
  { id: 7, slug: 'formatters', name: 'Formatters', description: 'SQL/CSS/JS format & minify', toolCount: 3 },
  { id: 8, slug: 'utilities', name: 'Utilities', description: 'Cron parser and helpers', toolCount: 1 },
];

const staticTools: Tool[] = [
  { id: 1, slug: 'json-formatter', name: 'JSON Formatter', shortDescription: 'Format and beautify JSON data', categorySlug: 'json', categoryName: 'JSON Tools', isFeatured: true },
  { id: 2, slug: 'json-validator', name: 'JSON Validator', shortDescription: 'Validate JSON syntax and structure', categorySlug: 'json', categoryName: 'JSON Tools', isFeatured: true },
  { id: 3, slug: 'json-csv', name: 'JSON to CSV', shortDescription: 'Convert JSON arrays to CSV and back', categorySlug: 'json', categoryName: 'JSON Tools', isFeatured: true },
  { id: 4, slug: 'json-to-typescript', name: 'JSON to TypeScript', shortDescription: 'Generate TypeScript interfaces from JSON', categorySlug: 'json', categoryName: 'JSON Tools', isFeatured: true },
  { id: 5, slug: 'base64', name: 'Base64 Encoder/Decoder', shortDescription: 'Encode or decode Base64 strings', categorySlug: 'encoding', categoryName: 'Encoding & Decoding', isFeatured: true },
  { id: 6, slug: 'url-encoder', name: 'URL Encoder/Decoder', shortDescription: 'Encode or decode URL strings', categorySlug: 'encoding', categoryName: 'Encoding & Decoding', isFeatured: true },
  { id: 7, slug: 'jwt-decoder', name: 'JWT Decoder', shortDescription: 'Inspect JWT headers and payloads', categorySlug: 'encoding', categoryName: 'Encoding & Decoding', isFeatured: true },
  { id: 8, slug: 'html-entity', name: 'HTML Entity Encoder/Decoder', shortDescription: 'Encode or decode HTML entities', categorySlug: 'encoding', categoryName: 'Encoding & Decoding', isFeatured: true },
  { id: 9, slug: 'uuid-generator', name: 'UUID Generator', shortDescription: 'Generate UUIDs in all versions (v1, v3, v4, v5)', categorySlug: 'generators', categoryName: 'Generators', isFeatured: true },
  { id: 10, slug: 'password-generator', name: 'Password Generator', shortDescription: 'Create strong random passwords', categorySlug: 'generators', categoryName: 'Generators', isFeatured: true },
  { id: 11, slug: 'qr-code', name: 'QR Code Generator', shortDescription: 'Create QR codes from text or URLs', categorySlug: 'generators', categoryName: 'Generators', isFeatured: true },
  { id: 12, slug: 'slug-generator', name: 'Slug Generator', shortDescription: 'Generate clean URL slugs', categorySlug: 'generators', categoryName: 'Generators', isFeatured: true },
  { id: 13, slug: 'css-gradient', name: 'CSS Gradient', shortDescription: 'Design and export CSS gradients', categorySlug: 'generators', categoryName: 'Generators', isFeatured: true },
  { id: 14, slug: 'meta-tags', name: 'Meta Tags Generator', shortDescription: 'Generate SEO meta tags', categorySlug: 'generators', categoryName: 'Generators', isFeatured: true },
  { id: 15, slug: 'md5-hash', name: 'MD5 Hash', shortDescription: 'Generate MD5 hashes', categorySlug: 'crypto', categoryName: 'Cryptography', isFeatured: true },
  { id: 16, slug: 'sha256-hash', name: 'SHA256 Hash', shortDescription: 'Generate SHA256 hashes', categorySlug: 'crypto', categoryName: 'Cryptography', isFeatured: true },
  { id: 17, slug: 'regex-tester', name: 'Regex Tester', shortDescription: 'Test and debug regex patterns', categorySlug: 'text', categoryName: 'Text Tools', isFeatured: true },
  { id: 18, slug: 'text-diff', name: 'Text Diff', shortDescription: 'Compare texts and highlight differences', categorySlug: 'text', categoryName: 'Text Tools', isFeatured: true },
  { id: 19, slug: 'markdown-preview', name: 'Markdown Preview', shortDescription: 'Preview and convert Markdown to HTML', categorySlug: 'text', categoryName: 'Text Tools', isFeatured: true },
  { id: 20, slug: 'lorem-ipsum', name: 'Lorem Ipsum', shortDescription: 'Generate placeholder text', categorySlug: 'generators', categoryName: 'Generators', isFeatured: true },
  { id: 21, slug: 'timestamp-converter', name: 'Timestamp Converter', shortDescription: 'Convert timestamps to readable dates', categorySlug: 'converters', categoryName: 'Converters', isFeatured: true },
  { id: 22, slug: 'color-converter', name: 'Color Converter', shortDescription: 'Convert between HEX, RGB, and HSL', categorySlug: 'converters', categoryName: 'Converters', isFeatured: true },
  { id: 23, slug: 'image-to-base64', name: 'Image to Base64', shortDescription: 'Convert images to Base64', categorySlug: 'encoding', categoryName: 'Encoding & Decoding', isFeatured: true },
  { id: 24, slug: 'yaml-json', name: 'YAML to JSON', shortDescription: 'Convert YAML to JSON and back', categorySlug: 'json', categoryName: 'JSON Tools', isFeatured: true },
  { id: 25, slug: 'sql-formatter', name: 'SQL Formatter', shortDescription: 'Format SQL queries', categorySlug: 'formatters', categoryName: 'Formatters', isFeatured: true },
  { id: 26, slug: 'css-minifier', name: 'CSS Minifier', shortDescription: 'Minify CSS for production', categorySlug: 'formatters', categoryName: 'Formatters', isFeatured: true },
  { id: 27, slug: 'js-minifier', name: 'JS Minifier', shortDescription: 'Minify JavaScript for production', categorySlug: 'formatters', categoryName: 'Formatters', isFeatured: true },
  { id: 28, slug: 'cron-parser', name: 'Cron Parser', shortDescription: 'Parse and explain cron expressions', categorySlug: 'utilities', categoryName: 'Utilities', isFeatured: true },
  // New tools - Generators
  { id: 29, slug: 'hash-generator', name: 'Hash Generator', shortDescription: 'Generate MD5, SHA1, SHA256, SHA384, SHA512 hashes', categorySlug: 'crypto', categoryName: 'Cryptography', isFeatured: true },
  { id: 30, slug: 'js-beautifier', name: 'JavaScript Beautifier', shortDescription: 'Beautify and format JavaScript code', categorySlug: 'formatters', categoryName: 'Formatters', isFeatured: true },
  { id: 31, slug: 'html-validator', name: 'HTML Validator', shortDescription: 'Validate HTML syntax and find errors', categorySlug: 'text', categoryName: 'Text Tools', isFeatured: true },
  { id: 32, slug: 'yaml-validator', name: 'YAML Validator', shortDescription: 'Validate YAML syntax', categorySlug: 'json', categoryName: 'JSON Tools', isFeatured: true },
  { id: 33, slug: 'curl-generator', name: 'cURL Generator', shortDescription: 'Generate cURL commands from URL and options', categorySlug: 'encoding', categoryName: 'Encoding & Decoding', isFeatured: true },
  { id: 34, slug: 'sql-insert-generator', name: 'SQL Insert Generator', shortDescription: 'Generate SQL INSERT statements from JSON/CSV', categorySlug: 'generators', categoryName: 'Generators', isFeatured: true },
  { id: 35, slug: 'regex-generator', name: 'Regex Generator', shortDescription: 'Generate regex patterns from sample text', categorySlug: 'text', categoryName: 'Text Tools', isFeatured: true },
  { id: 36, slug: 'jwt-generator', name: 'JWT Generator', shortDescription: 'Generate JWT tokens from header and payload', categorySlug: 'encoding', categoryName: 'Encoding & Decoding', isFeatured: true },
  { id: 37, slug: 'xpath-tester', name: 'XPath Tester', shortDescription: 'Test XPath expressions against XML/HTML', categorySlug: 'text', categoryName: 'Text Tools', isFeatured: true },
  { id: 38, slug: 'random-string-generator', name: 'Random String Generator', shortDescription: 'Generate random strings with custom character sets', categorySlug: 'generators', categoryName: 'Generators', isFeatured: true },
  { id: 39, slug: 'cron-generator', name: 'Cron Generator', shortDescription: 'Generate cron expressions from human descriptions', categorySlug: 'utilities', categoryName: 'Utilities', isFeatured: true },
];

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
    relatedTools: staticTools.filter((t) => t.categorySlug === tool.categorySlug && t.slug !== tool.slug).slice(0, 3),
  };
}

// Categories API (static)
export async function getCategories(): Promise<Category[]> {
  return staticCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return staticCategories.find((cat) => cat.slug === slug) || null;
}

// Tools API (static)
export async function getTools(): Promise<Tool[]> {
  return staticTools;
}

export async function getToolBySlug(slug: string): Promise<ToolDetail | null> {
  const tool = staticTools.find((t) => t.slug === slug);
  return tool ? asDetail(tool) : null;
}

export async function getFeaturedTools(count: number = 10): Promise<Tool[]> {
  return staticTools.filter((t) => t.isFeatured).slice(0, count);
}

export async function getPopularTools(count: number = 10): Promise<Tool[]> {
  return staticTools.slice(0, count);
}

// Analytics API (noop)
export async function trackToolUsage(_toolSlug: string, _sessionId?: string, _referrer?: string): Promise<void> {
  return;
}
