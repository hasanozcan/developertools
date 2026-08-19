'use client';

import React, { useState } from 'react';
import { Type, Copy, Check } from 'lucide-react';
import { slugToTitleCase, slugToPascalCase, slugToCamelCase } from '@/lib/slugToTitle';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_SLUG = 'how-to-build-a-modern-web-app_v2';

export default function SlugToTitleTool() {
  const { t } = useLanguage();
  const [slug, setSlug] = useState(SAMPLE_SLUG);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const titleCase = slugToTitleCase(slug);
  const pascalCase = slugToPascalCase(slug);
  const camelCase = slugToCamelCase(slug);
  const sentenceCase = slug
    ? slug.replace(/[_-]+/g, ' ').charAt(0).toUpperCase() + slug.replace(/[_-]+/g, ' ').slice(1).toLowerCase()
    : '';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Slug Input Card */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.slugtitle.title') || 'URL Slug to Title & Header Case Converter'}
          </h3>
        </div>

        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="my-cool-blog-post_name"
          className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
        />
      </div>

      {/* Formatted Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 border border-slate-200 dark:border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Title Case (Article Headline)</span>
            <button
              onClick={() => handleCopy(titleCase, 'title')}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              {copiedKey === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white block font-sans">{titleCase}</span>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-slate-200 dark:border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Sentence Case</span>
            <button
              onClick={() => handleCopy(sentenceCase, 'sentence')}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              {copiedKey === 'sentence' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white block font-sans">{sentenceCase}</span>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-slate-200 dark:border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">PascalCase (React Component / Class)</span>
            <button
              onClick={() => handleCopy(pascalCase, 'pascal')}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              {copiedKey === 'pascal' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <span className="text-base font-mono font-bold text-indigo-600 dark:text-indigo-400 block">{pascalCase}</span>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-slate-200 dark:border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">camelCase (Variable / Function)</span>
            <button
              onClick={() => handleCopy(camelCase, 'camel')}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              {copiedKey === 'camel' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <span className="text-base font-mono font-bold text-purple-600 dark:text-purple-400 block">{camelCase}</span>
        </div>
      </div>
    </div>
  );
}
