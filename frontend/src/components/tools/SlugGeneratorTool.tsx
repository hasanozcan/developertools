'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link2, Copy, Check, FileText, Settings, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SlugOptions {
  lowercase: boolean;
  separator: '-' | '_' | '.';
  maxLength: number;
  removeStopWords: boolean;
  transliterate: boolean;
}

export default function SlugGeneratorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkSlugs, setBulkSlugs] = useState<Array<{ original: string; slug: string }>>([]);
  const [bulkCopied, setBulkCopied] = useState(false);
  const [options, setOptions] = useState<SlugOptions>({
    lowercase: true,
    separator: '-',
    maxLength: 100,
    removeStopWords: false,
    transliterate: true,
  });

  const stopWords = useMemo(() => [
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought',
    'used', 'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you', 'he',
    'she', 'we', 'they', 'what', 'which', 'who', 'whom', 'whose', 'where',
    'when', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
    'most', 'other', 'some', 'such', 'no', 'not', 'only', 'same', 'so',
    'than', 'too', 'very', 'just', 'also',
  ], []);

  const transliterationMap = useMemo<Record<string, string>>(() => ({
    '\u00e0': 'a',
    '\u00e1': 'a',
    '\u00e2': 'a',
    '\u00e3': 'a',
    '\u00e4': 'a',
    '\u00e5': 'a',
    '\u00e6': 'ae',
    '\u00e7': 'c',
    '\u00e8': 'e',
    '\u00e9': 'e',
    '\u00ea': 'e',
    '\u00eb': 'e',
    '\u00ec': 'i',
    '\u00ed': 'i',
    '\u00ee': 'i',
    '\u00ef': 'i',
    '\u00f0': 'd',
    '\u00f1': 'n',
    '\u00f2': 'o',
    '\u00f3': 'o',
    '\u00f4': 'o',
    '\u00f5': 'o',
    '\u00f6': 'o',
    '\u00f8': 'o',
    '\u00f9': 'u',
    '\u00fa': 'u',
    '\u00fb': 'u',
    '\u00fc': 'u',
    '\u00fd': 'y',
    '\u00ff': 'y',
    '\u00df': 'ss',
    '\u00fe': 'th',
    '\u00c6': 'ae',
    '\u0152': 'oe',
    '\u0153': 'oe',
    '\u00d8': 'o',
    '\u0110': 'd',
    '\u0111': 'd',
    '\u00d0': 'd',
    '\u00de': 'th',
    '\u0141': 'l',
    '\u0142': 'l',
    '\u015f': 's',
    '\u015e': 's',
    '\u011f': 'g',
    '\u011e': 'g',
    '\u0131': 'i',
    '\u0130': 'i',
    '\u00c7': 'c',
    '\u00d6': 'o',
    '\u00dc': 'u',
    '\u0105': 'a',
    '\u0107': 'c',
    '\u0119': 'e',
    '\u0144': 'n',
    '\u015b': 's',
    '\u017a': 'z',
    '\u017c': 'z',
    '\u010d': 'c',
    '\u010f': 'd',
    '\u011b': 'e',
    '\u0148': 'n',
    '\u0159': 'r',
    '\u0161': 's',
    '\u0165': 't',
    '\u016f': 'u',
    '\u017e': 'z',
  }), []);

  const transliterateText = useCallback((value: string): string => {
    const replaced = value
      .split('')
      .map((char) => transliterationMap[char] || transliterationMap[char.toLowerCase()] || char)
      .join('');
    return replaced.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }, [transliterationMap]);

  const generateSlug = useCallback((text: string): string => {
    if (!text.trim()) return '';

    let result = text;

    // Transliterate special characters
    if (options.transliterate) {
      result = transliterateText(result);
    }

    // Convert to lowercase if option enabled
    if (options.lowercase) {
      result = result.toLowerCase();
    }

    // Remove stop words if option enabled
    if (options.removeStopWords) {
      const words = result.split(/\s+/);
      result = words.filter(word => !stopWords.includes(word.toLowerCase())).join(' ');
    }

    // Replace spaces and special characters with separator
    result = result
      .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
      .replace(/\s+/g, options.separator) // Replace spaces with separator
      .replace(new RegExp(`${options.separator}+`, 'g'), options.separator) // Remove duplicate separators
      .replace(new RegExp(`^${options.separator}|${options.separator}$`, 'g'), ''); // Trim separators

    // Apply max length
    if (options.maxLength > 0 && result.length > options.maxLength) {
      result = result.substring(0, options.maxLength);
      // Don't cut in the middle of a word - find last separator
      const lastSeparator = result.lastIndexOf(options.separator);
      if (lastSeparator > options.maxLength * 0.7) {
        result = result.substring(0, lastSeparator);
      }
    }

    return result;
  }, [options, stopWords, transliterateText]);

  useEffect(() => {
    if (bulkMode) {
      // Handle bulk mode
      if (!input.trim()) {
        setBulkSlugs([]);
        return;
      }
      const lines = input.split('\n').filter(line => line.trim());
      const results = lines.map(line => ({
        original: line,
        slug: generateSlug(line),
      }));
      setBulkSlugs(results);
      setSlug('');
    } else {
      // Single mode
      setSlug(generateSlug(input));
      setBulkSlugs([]);
    }
  }, [input, bulkMode, generateSlug]);

  const copyToClipboard = async () => {
    if (bulkMode) {
      const allSlugs = bulkSlugs.map(item => item.slug).join('\n');
      await navigator.clipboard.writeText(allSlugs);
      setBulkCopied(true);
      setTimeout(() => setBulkCopied(false), 2000);
    } else {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copySingleSlug = async (slugText: string) => {
    await navigator.clipboard.writeText(slugText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const samples = [
    'How to Create a REST API with Node.js',
    '10 Best Practices for Writing Clean Code',
    "What's New in JavaScript ES2024?",
    'Türkçe Karakterler: şğüöçı',
    'Café & Restaurant - Best Food in Town!',
    'Introduction to Machine Learning: A Beginner\'s Guide',
  ];

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mode:</span>
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => { setBulkMode(false); setInput(''); }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              !bulkMode
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Single Slug
          </button>
          <button
            onClick={() => { setBulkMode(true); setInput(''); }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              bulkMode
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Bulk Mode
          </button>
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {bulkMode ? 'Enter Titles (one per line)' : t('tool.slugGenerator.titleOrText')}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={bulkMode ? 8 : 3}
          placeholder={bulkMode ? 'How to Create a REST API\n10 Best Practices for JavaScript\nWhat\'s New in React 19' : t('tool.slugGenerator.inputPlaceholder')}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Options */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">{t('common.options')}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t('tool.slugGenerator.separator')}</label>
            <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              {['-', '_', '.'].map((sep) => (
                <button
                  key={sep}
                  onClick={() => setOptions({ ...options, separator: sep as SlugOptions['separator'] })}
                  className={`flex-1 px-3 py-2 text-sm font-mono transition-colors ${
                    options.separator === sep
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {sep}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t('tool.slugGenerator.maxLength')}</label>
            <input
              type="number"
              value={options.maxLength}
              onChange={(e) => setOptions({ ...options, maxLength: Number(e.target.value) })}
              min={0}
              max={500}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex flex-col justify-end gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.slugGenerator.lowercase')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.transliterate}
                onChange={(e) => setOptions({ ...options, transliterate: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.slugGenerator.transliterate')}</span>
            </label>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeStopWords}
                onChange={(e) => setOptions({ ...options, removeStopWords: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.slugGenerator.removeStopWords')}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Output */}
      {bulkMode ? (
        // Bulk Output
        bulkSlugs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Generated Slugs ({bulkSlugs.length})
              </label>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                {bulkCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {bulkCopied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                {bulkSlugs.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate" title={item.original}>
                        {item.original}
                      </div>
                      <div className="font-mono text-sm text-gray-900 dark:text-white truncate">
                        {item.slug}
                      </div>
                    </div>
                    <button
                      onClick={() => copySingleSlug(item.slug)}
                      className="ml-3 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      title="Copy this slug"
                    >
                      {copied && slug === item.slug ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      ) : (
        // Single Output
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('tool.slugGenerator.generatedSlug')}
            </label>
            {slug && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {slug.length} {t('tool.slugGenerator.characters')}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
              <Link2 className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0" />
              <span className="font-mono text-sm text-gray-900 dark:text-white break-all">
                {slug || <span className="text-gray-400 dark:text-gray-500 italic">your-slug-here</span>}
              </span>
            </div>
            <button
              onClick={copyToClipboard}
              disabled={!slug}
              className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('common.copied') : t('common.copy')}
            </button>
          </div>
        </div>
      )}

      {/* URL Preview - Single mode only */}
      {slug && !bulkMode && (
        <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            {t('tool.slugGenerator.urlPreview')}
          </label>
          <code className="text-sm text-green-800 dark:text-green-200 break-all">
            https://example.com/blog/<span className="font-bold">{slug}</span>
          </code>
        </div>
      )}

      {/* Sample Texts */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {t('tool.slugGenerator.tryExamples')}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {samples.map((sample, index) => (
            <button
              key={index}
              onClick={() => setInput(sample)}
              className="p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            >
              <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{sample}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-1 line-clamp-1">
                -&gt; {generateSlug(sample)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* SEO Tips */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <span className="font-medium text-gray-700 dark:text-gray-300">{t('tool.slugGenerator.seoTitle')}</span>
        </div>
        <div className="p-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">OK</span>
            <span>{t('tool.slugGenerator.seoTip1')}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">OK</span>
            <span>{t('tool.slugGenerator.seoTip2')}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">OK</span>
            <span>{t('tool.slugGenerator.seoTip3')}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">OK</span>
            <span>{t('tool.slugGenerator.seoTip4')}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-600 dark:text-red-400">NO</span>
            <span>{t('tool.slugGenerator.seoTip5')}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-600 dark:text-red-400">NO</span>
            <span>{t('tool.slugGenerator.seoTip6')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
