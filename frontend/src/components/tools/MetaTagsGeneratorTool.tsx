'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { serializeJsonForHtmlScript } from '@/lib/scriptSafeJson';

interface MetaTagsConfig {
  // Basic
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  canonical: string;
  language: string;
  favicon: string;
  appleTouchIcon: string;
  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  // Twitter
  twitterCard: string;
  twitterSite: string;
  twitterCreator: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  // LinkedIn
  linkedinTitle: string;
  linkedinDescription: string;
  linkedinImage: string;
  linkedinUrl: string;
  // JSON-LD
  jsonLdType: string;
  jsonLdName: string;
  jsonLdDescription: string;
  jsonLdImage: string;
}

const DEFAULT_CONFIG: MetaTagsConfig = {
  title: '',
  description: '',
  keywords: '',
  author: '',
  robots: 'index, follow',
  canonical: '',
  language: 'en',
  favicon: '',
  appleTouchIcon: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  ogUrl: '',
  ogType: 'website',
  ogSiteName: '',
  twitterCard: 'summary_large_image',
  twitterSite: '',
  twitterCreator: '',
  twitterTitle: '',
  twitterDescription: '',
  twitterImage: '',
  linkedinTitle: '',
  linkedinDescription: '',
  linkedinImage: '',
  linkedinUrl: '',
  jsonLdType: 'WebSite',
  jsonLdName: '',
  jsonLdDescription: '',
  jsonLdImage: '',
};

export default function MetaTagsGeneratorTool() {
  const { t } = useLanguage();
  const [config, setConfig] = useState<MetaTagsConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<'basic' | 'og' | 'twitter' | 'linkedin' | 'jsonld'>('basic');
  const [copied, setCopied] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [includeJsonLd, setIncludeJsonLd] = useState(false);

  const updateConfig = useCallback((key: keyof MetaTagsConfig, value: string) => {
    setConfig(prev => {
      const updated = { ...prev, [key]: value };
      
      // Auto-sync OG and Twitter fields with basic fields
      if (autoSync) {
        if (key === 'title') {
          updated.ogTitle = value;
          updated.twitterTitle = value;
        } else if (key === 'description') {
          updated.ogDescription = value;
          updated.twitterDescription = value;
        } else if (key === 'ogImage') {
          updated.twitterImage = value;
        } else if (key === 'canonical') {
          updated.ogUrl = value;
        }
      }
      
      return updated;
    });
  }, [autoSync]);

  const generateMetaTags = useCallback(() => {
    const tags: string[] = [];
    
    // Charset & Viewport
    tags.push('<meta charset="UTF-8">');
    tags.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    
    // Favicon
    if (config.favicon) {
      tags.push(`<link rel="icon" type="image/x-icon" href="${escapeHtml(config.favicon)}">`);
    }
    if (config.appleTouchIcon) {
      tags.push(`<link rel="apple-touch-icon" href="${escapeHtml(config.appleTouchIcon)}">`);
    }
    
    // Basic meta tags
    if (config.title) {
      tags.push(`<title>${escapeHtml(config.title)}</title>`);
    }
    if (config.description) {
      tags.push(`<meta name="description" content="${escapeHtml(config.description)}">`);
    }
    if (config.keywords) {
      tags.push(`<meta name="keywords" content="${escapeHtml(config.keywords)}">`);
    }
    if (config.author) {
      tags.push(`<meta name="author" content="${escapeHtml(config.author)}">`);
    }
    if (config.robots) {
      tags.push(`<meta name="robots" content="${escapeHtml(config.robots)}">`);
    }
    if (config.canonical) {
      tags.push(`<link rel="canonical" href="${escapeHtml(config.canonical)}">`);
    }
    if (config.language) {
      tags.push(`<meta http-equiv="content-language" content="${escapeHtml(config.language)}">`);
    }
    
    // Open Graph tags
    if (config.ogTitle || config.title) {
      tags.push(`<meta property="og:title" content="${escapeHtml(config.ogTitle || config.title)}">`);
    }
    if (config.ogDescription || config.description) {
      tags.push(`<meta property="og:description" content="${escapeHtml(config.ogDescription || config.description)}">`);
    }
    if (config.ogImage) {
      tags.push(`<meta property="og:image" content="${escapeHtml(config.ogImage)}">`);
    }
    if (config.ogUrl || config.canonical) {
      tags.push(`<meta property="og:url" content="${escapeHtml(config.ogUrl || config.canonical)}">`);
    }
    if (config.ogType) {
      tags.push(`<meta property="og:type" content="${escapeHtml(config.ogType)}">`);
    }
    if (config.ogSiteName) {
      tags.push(`<meta property="og:site_name" content="${escapeHtml(config.ogSiteName)}">`);
    }
    
    // Twitter tags
    if (config.twitterCard) {
      tags.push(`<meta name="twitter:card" content="${escapeHtml(config.twitterCard)}">`);
    }
    if (config.twitterSite) {
      tags.push(`<meta name="twitter:site" content="${escapeHtml(config.twitterSite)}">`);
    }
    if (config.twitterCreator) {
      tags.push(`<meta name="twitter:creator" content="${escapeHtml(config.twitterCreator)}">`);
    }
    if (config.twitterTitle || config.title) {
      tags.push(`<meta name="twitter:title" content="${escapeHtml(config.twitterTitle || config.title)}">`);
    }
    if (config.twitterDescription || config.description) {
      tags.push(`<meta name="twitter:description" content="${escapeHtml(config.twitterDescription || config.description)}">`);
    }
    if (config.twitterImage || config.ogImage) {
      tags.push(`<meta name="twitter:image" content="${escapeHtml(config.twitterImage || config.ogImage)}">`);
    }
    
    // LinkedIn tags (uses Open Graph, but we add specific ones)
    if (config.linkedinTitle || config.title) {
      tags.push(`<meta property="linkedin:title" content="${escapeHtml(config.linkedinTitle || config.title)}">`);
    }
    if (config.linkedinDescription || config.description) {
      tags.push(`<meta property="linkedin:description" content="${escapeHtml(config.linkedinDescription || config.description)}">`);
    }
    if (config.linkedinImage || config.ogImage) {
      tags.push(`<meta property="linkedin:image" content="${escapeHtml(config.linkedinImage || config.ogImage)}">`);
    }
    if (config.linkedinUrl || config.canonical) {
      tags.push(`<meta property="linkedin:url" content="${escapeHtml(config.linkedinUrl || config.canonical)}">`);
    }
    
    // JSON-LD Structured Data
    if (includeJsonLd && (config.jsonLdName || config.title)) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': config.jsonLdType,
        'name': config.jsonLdName || config.title,
        'description': config.jsonLdDescription || config.description,
        'url': config.canonical,
        'image': config.jsonLdImage || config.ogImage,
      };
      // Remove undefined values
      const cleanJsonLd = Object.fromEntries(
        Object.entries(jsonLd).filter(([_, v]) => v !== undefined && v !== '')
      );
      tags.push(`<script type="application/ld+json">\n${serializeJsonForHtmlScript(cleanJsonLd, 2)}\n</script>`);
    }
    
    return tags.join('\n');
  }, [config, includeJsonLd]);

  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generateMetaTags]);

  const reset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  const loadSample = useCallback(() => {
    setConfig({
      title: 'Developer Tools - Free Online Web Development Utilities',
      description: 'A collection of free online tools for developers. JSON formatting, Base64 encoding, UUID generation, and more.',
      keywords: 'developer tools, json formatter, base64, uuid generator, web development',
      author: 'Developer Tools Team',
      robots: 'index, follow',
      canonical: 'https://example.com/tools',
      language: 'en',
      favicon: 'https://example.com/favicon.ico',
      appleTouchIcon: 'https://example.com/apple-touch-icon.png',
      ogTitle: 'Developer Tools - Free Online Web Development Utilities',
      ogDescription: 'A collection of free online tools for developers.',
      ogImage: 'https://example.com/og-image.png',
      ogUrl: 'https://example.com/tools',
      ogType: 'website',
      ogSiteName: 'Developer Tools',
      twitterCard: 'summary_large_image',
      twitterSite: '@devtools',
      twitterCreator: '@devtools',
      twitterTitle: 'Developer Tools - Free Online Web Development Utilities',
      twitterDescription: 'A collection of free online tools for developers.',
      twitterImage: 'https://example.com/twitter-image.png',
      linkedinTitle: 'Developer Tools - Free Online Web Development Utilities',
      linkedinDescription: 'A collection of free online tools for developers.',
      linkedinImage: 'https://example.com/linkedin-image.png',
      linkedinUrl: 'https://example.com/tools',
      jsonLdType: 'WebSite',
      jsonLdName: 'Developer Tools',
      jsonLdDescription: 'A collection of free online tools for developers.',
      jsonLdImage: 'https://example.com/og-image.png',
    });
  }, []);

  const tabs = [
    { id: 'basic', label: t('tool.metaTags.basic') },
    { id: 'og', label: 'Open Graph' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'linkedin', label: t('tool.metaTags.linkedinCard') },
    { id: 'jsonld', label: t('tool.metaTags.jsonLd') },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Auto-sync toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="autoSync"
          checked={autoSync}
          onChange={(e) => setAutoSync(e.target.checked)}
          className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
        />
        <label htmlFor="autoSync" className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
          {t('tool.metaTags.autoSync')}
          <span title={t('tool.metaTags.autoSyncInfo')}>
            <Info className="w-4 h-4" />
          </span>
        </label>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeTab === 'basic' && (
          <>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool.metaTags.pageTitle')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => updateConfig('title', e.target.value)}
                maxLength={60}
                placeholder="My Awesome Website - Home"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">{config.title.length}/60 {t('tool.metaTags.characters')}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool.metaTags.description')} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={config.description}
                onChange={(e) => updateConfig('description', e.target.value)}
                maxLength={160}
                rows={3}
                placeholder="A brief description of your page..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">{config.description.length}/160 {t('tool.metaTags.characters')}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool.metaTags.keywords')}
              </label>
              <input
                type="text"
                value={config.keywords}
                onChange={(e) => updateConfig('keywords', e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool.metaTags.author')}
              </label>
              <input
                type="text"
                value={config.author}
                onChange={(e) => updateConfig('author', e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool.metaTags.robots')}
              </label>
              <select
                value={config.robots}
                onChange={(e) => updateConfig('robots', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              >
                <option value="index, follow">index, follow</option>
                <option value="index, nofollow">index, nofollow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool.metaTags.canonical')}
              </label>
              <input
                type="url"
                value={config.canonical}
                onChange={(e) => updateConfig('canonical', e.target.value)}
                placeholder="https://example.com/page"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            
            {/* Favicon */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool.metaTags.favicon')}
              </label>
              <input
                type="url"
                value={config.favicon}
                onChange={(e) => updateConfig('favicon', e.target.value)}
                placeholder="https://example.com/favicon.ico"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>

            {/* Apple Touch Icon */}
            <div className="md:md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool.metaTags.appleTouchIcon')}
              </label>
              <input
                type="url"
                value={config.appleTouchIcon}
                onChange={(e) => updateConfig('appleTouchIcon', e.target.value)}
                placeholder="https://example.com/apple-touch-icon.png"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
          </>
        )}

        {activeTab === 'og' && (
          <>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:title
              </label>
              <input
                type="text"
                value={config.ogTitle}
                onChange={(e) => updateConfig('ogTitle', e.target.value)}
                placeholder={config.title || 'Open Graph Title'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:description
              </label>
              <textarea
                value={config.ogDescription}
                onChange={(e) => updateConfig('ogDescription', e.target.value)}
                rows={2}
                placeholder={config.description || 'Open Graph Description'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:image <span className="text-gray-400">(1200x630 {t('tool.metaTags.recommended')})</span>
              </label>
              <input
                type="url"
                value={config.ogImage}
                onChange={(e) => updateConfig('ogImage', e.target.value)}
                placeholder="https://example.com/og-image.png"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:type
              </label>
              <select
                value={config.ogType}
                onChange={(e) => updateConfig('ogType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              >
                <option value="website">website</option>
                <option value="article">article</option>
                <option value="book">book</option>
                <option value="profile">profile</option>
                <option value="video.movie">video.movie</option>
                <option value="music.song">music.song</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:site_name
              </label>
              <input
                type="text"
                value={config.ogSiteName}
                onChange={(e) => updateConfig('ogSiteName', e.target.value)}
                placeholder="My Website"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
          </>
        )}

        {activeTab === 'twitter' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                twitter:card
              </label>
              <select
                value={config.twitterCard}
                onChange={(e) => updateConfig('twitterCard', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              >
                <option value="summary">summary</option>
                <option value="summary_large_image">summary_large_image</option>
                <option value="app">app</option>
                <option value="player">player</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                twitter:site
              </label>
              <input
                type="text"
                value={config.twitterSite}
                onChange={(e) => updateConfig('twitterSite', e.target.value)}
                placeholder="@username"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                twitter:creator
              </label>
              <input
                type="text"
                value={config.twitterCreator}
                onChange={(e) => updateConfig('twitterCreator', e.target.value)}
                placeholder="@author"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                twitter:title
              </label>
              <input
                type="text"
                value={config.twitterTitle}
                onChange={(e) => updateConfig('twitterTitle', e.target.value)}
                placeholder={config.title || 'Twitter Title'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                twitter:description
              </label>
              <textarea
                value={config.twitterDescription}
                onChange={(e) => updateConfig('twitterDescription', e.target.value)}
                rows={2}
                placeholder={config.description || 'Twitter Description'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                twitter:image
              </label>
              <input
                type="url"
                value={config.twitterImage}
                onChange={(e) => updateConfig('twitterImage', e.target.value)}
                placeholder={config.ogImage || 'https://example.com/twitter-image.png'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
          </>
        )}

        {activeTab === 'linkedin' && (
          <>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn Title
              </label>
              <input
                type="text"
                value={config.linkedinTitle}
                onChange={(e) => updateConfig('linkedinTitle', e.target.value)}
                placeholder={config.title || 'LinkedIn Title'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn Description
              </label>
              <textarea
                value={config.linkedinDescription}
                onChange={(e) => updateConfig('linkedinDescription', e.target.value)}
                rows={2}
                placeholder={config.description || 'LinkedIn Description'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn Image
              </label>
              <input
                type="url"
                value={config.linkedinImage}
                onChange={(e) => updateConfig('linkedinImage', e.target.value)}
                placeholder={config.ogImage || 'https://example.com/linkedin-image.png'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={config.linkedinUrl}
                onChange={(e) => updateConfig('linkedinUrl', e.target.value)}
                placeholder={config.canonical || 'https://example.com/page'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
          </>
        )}

        {activeTab === 'jsonld' && (
          <>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={includeJsonLd}
                  onChange={(e) => setIncludeJsonLd(e.target.checked)}
                  className="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Include JSON-LD Structured Data
                </span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Schema Type
              </label>
              <select
                value={config.jsonLdType}
                onChange={(e) => updateConfig('jsonLdType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              >
                <option value="WebSite">WebSite</option>
                <option value="WebPage">WebPage</option>
                <option value="Article">Article</option>
                <option value="BlogPosting">BlogPosting</option>
                <option value="Organization">Organization</option>
                <option value="Person">Person</option>
                <option value="Product">Product</option>
                <option value="LocalBusiness">LocalBusiness</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={config.jsonLdName}
                onChange={(e) => updateConfig('jsonLdName', e.target.value)}
                placeholder={config.title || 'Your Site Name'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={config.jsonLdDescription}
                onChange={(e) => updateConfig('jsonLdDescription', e.target.value)}
                rows={2}
                placeholder={config.description || 'A description for search engines'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image
              </label>
              <input
                type="url"
                value={config.jsonLdImage}
                onChange={(e) => updateConfig('jsonLdImage', e.target.value)}
                placeholder={config.ogImage || 'https://example.com/og-image.png'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              />
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={loadSample}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {t('common.loadSample')}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1"
        >
          <RefreshCw className="w-4 h-4" />
          {t('common.reset')}
        </button>
      </div>

      {/* Copy All Button */}
      <div className="flex justify-end">
        <button
          onClick={copyCode}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? t('common.copied') : t('tool.metaTags.copyAllTags')}
        </button>
      </div>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('tool.metaTags.generatedCode')}
          </label>
          <button
            onClick={copyCode}
            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? t('common.copied') : t('common.copy')}
          </button>
        </div>
        <pre className="w-full p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto max-h-80">
          <code>{generateMetaTags()}</code>
        </pre>
      </div>

      {/* Tips */}
      <div className="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
        <p className="font-medium text-blue-900 dark:text-blue-300">{t('tool.metaTags.tips')}</p>
        <ul className="list-disc list-inside space-y-1">
          <li>{t('tool.metaTags.tip1')}</li>
          <li>{t('tool.metaTags.tip2')}</li>
          <li>{t('tool.metaTags.tip3')}</li>
        </ul>
      </div>
    </div>
  );
}
