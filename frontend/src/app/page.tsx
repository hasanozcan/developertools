import Link from 'next/link';
import { 
  Braces, 
  Code, 
  Wand2, 
  Lock, 
  Type, 
  ArrowLeftRight,
  ChevronRight
} from 'lucide-react';
import AdSense from '@/components/common/AdSense';

const categories = [
  { name: 'JSON Tools', slug: 'json', icon: Braces, description: 'Format, validate, and convert JSON data' },
  { name: 'Encoding & Decoding', slug: 'encoding', icon: Code, description: 'Base64, URL encoding and decoding' },
  { name: 'Generators', slug: 'generators', icon: Wand2, description: 'UUID, password, QR code generators' },
  { name: 'Cryptography', slug: 'crypto', icon: Lock, description: 'Hash generators and encryption' },
  { name: 'Text Tools', slug: 'text', icon: Type, description: 'Text manipulation and Markdown' },
  { name: 'Converters', slug: 'converters', icon: ArrowLeftRight, description: 'Data format converters' },
  { name: 'Code Formatters', slug: 'formatters', icon: Code, description: 'SQL, CSS, JavaScript formatters' },
  { name: 'Developer Utilities', slug: 'utilities', icon: Wand2, description: 'Markdown preview, Cron parser, and more' },
];

const featuredTools = [
  { name: 'JSON Formatter', slug: 'json-formatter', category: 'json' },
  { name: 'Base64 Encoder/Decoder', slug: 'base64', category: 'encoding' },
  { name: 'UUID Generator', slug: 'uuid-generator', category: 'generators' },
  { name: 'URL Encoder/Decoder', slug: 'url-encoder', category: 'encoding' },
  { name: 'JWT Decoder', slug: 'jwt-decoder', category: 'encoding' },
  { name: 'MD5 Hash Generator', slug: 'md5-hash', category: 'crypto' },
  { name: 'SHA256 Hash Generator', slug: 'sha256-hash', category: 'crypto' },
  { name: 'Regex Tester', slug: 'regex-tester', category: 'text' },
  { name: 'Color Converter', slug: 'color-converter', category: 'converters' },
  { name: 'QR Code Generator', slug: 'qr-code', category: 'generators' },
  { name: 'SQL Formatter', slug: 'sql-formatter', category: 'formatters' },
  { name: 'Cron Parser', slug: 'cron-parser', category: 'utilities' },
  { name: 'Markdown Preview', slug: 'markdown-preview', category: 'text' },
  { name: 'Slug Generator', slug: 'slug-generator', category: 'generators' },
  { name: 'CSS Minifier', slug: 'css-minifier', category: 'formatters' },
  { name: 'JS Minifier', slug: 'js-minifier', category: 'formatters' },
  { name: 'Password Generator', slug: 'password-generator', category: 'generators' },
  { name: 'Timestamp Converter', slug: 'timestamp-converter', category: 'converters' },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', category: 'text' },
  { name: 'HTML Entity Encoder', slug: 'html-entity', category: 'encoding' },
  { name: 'JSON to CSV Converter', slug: 'json-csv', category: 'converters' },
  { name: 'Text Diff Tool', slug: 'text-diff', category: 'text' },
];

export default function Home() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Free Online Developer Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300  mx-auto">
          Fast, free, and easy-to-use tools for developers. No registration required.
          JSON formatter, Base64 encoder, UUID generator, and more.
        </p>
      </section>

      {/* Ad Banner - Top */}
      <AdSense 
        slot="1733348098" 
        format="horizontal" 
        className="h-24 rounded-lg mb-12 overflow-hidden"
      />

      {/* Featured Tools */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 flex items-center justify-between">
                {tool.name}
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
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
        <h2 className="text-gray-900 dark:text-white">Why Use Developer Tools?</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Developer Tools provides a comprehensive suite of free online utilities designed 
          specifically for software developers, web developers, and IT professionals. 
          Our tools help you save time on repetitive tasks like formatting JSON, encoding 
          strings, generating UUIDs, and testing regular expressions.
        </p>
        <h3>Key Features</h3>
        <ul>
          <li><strong>Fast & Free:</strong> All tools are completely free with no registration required</li>
          <li><strong>Client-Side Processing:</strong> Your data never leaves your browser for maximum privacy</li>
          <li><strong>Mobile Friendly:</strong> Works perfectly on all devices</li>
          <li><strong>No Ads Blocking Tools:</strong> Clean interface without intrusive popups</li>
        </ul>
      </section>
    </div>
  );
}
