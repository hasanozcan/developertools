'use client';

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
import { useLanguage } from '@/context/LanguageContext';

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

const featuredTools = [
  { slug: 'json-formatter', category: 'json' },
  { slug: 'base64', category: 'encoding' },
  { slug: 'uuid-generator', category: 'generators' },
  { slug: 'url-encoder', category: 'encoding' },
  { slug: 'jwt-decoder', category: 'encoding' },
  { slug: 'md5-hash', category: 'crypto' },
  { slug: 'sha256-hash', category: 'crypto' },
  { slug: 'regex-tester', category: 'text' },
  { slug: 'color-converter', category: 'converters' },
  { slug: 'qr-code', category: 'generators' },
  { slug: 'sql-formatter', category: 'formatters' },
  { slug: 'cron-parser', category: 'utilities' },
  { slug: 'markdown-preview', category: 'text' },
  { slug: 'slug-generator', category: 'generators' },
  { slug: 'css-minifier', category: 'formatters' },
  { slug: 'js-minifier', category: 'formatters' },
  { slug: 'password-generator', category: 'generators' },
  { slug: 'timestamp-converter', category: 'converters' },
  { slug: 'lorem-ipsum', category: 'text' },
  { slug: 'html-entity', category: 'encoding' },
  { slug: 'json-csv', category: 'converters' },
  { slug: 'text-diff', category: 'text' },
];

export default function Home() {
  const { t } = useLanguage();

  const categories = categorySlugs.map(slug => ({
    slug,
    name: t(`cat.${slug}`),
    description: t(`cat.${slug}.desc`),
    icon: categoryIcons[slug],
  }));

  return (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 flex items-center justify-between">
                {t(`toolName.${tool.slug}`)}
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Banner - After Popular Tools */}
      <AdSense 
        slot="1733348098" 
        format="horizontal" 
        className="h-24 rounded-lg mb-12 overflow-hidden"
      />

      {/* Categories */}
      <section className="mb-16">
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
          <li><strong>{t('home.feature4').split(':')[0]}:</strong> {t('home.feature4').split(':')[1]}</li>
        </ul>
      </section>
    </div>
  );
}
