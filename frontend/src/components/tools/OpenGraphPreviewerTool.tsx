'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Share2, Globe } from 'lucide-react';
import { generateOpenGraphMetaTags, parseDomain, type OpenGraphData } from '@/lib/openGraphPreview';
import { useLanguage } from '@/context/LanguageContext';

export default function OpenGraphPreviewerTool() {
  const { t } = useLanguage();
  const [ogData, setOgData] = useState<OpenGraphData>({
    title: 'DevTools Suite - 100+ Free Online Developer Utilities',
    description:
      'Fast, private, client-side developer tools. JSON formatters, Base64, UUIDs, cryptography, CSS generators, and converters.',
    url: 'https://developertools.dev',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop',
    siteName: 'DevTools Suite',
    twitterHandle: '@developertools',
  });
  const [copied, setCopied] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'twitter' | 'facebook' | 'linkedin' | 'google'>('twitter');

  const metaTags = useMemo(() => {
    return generateOpenGraphMetaTags(ogData);
  }, [ogData]);

  const domain = useMemo(() => parseDomain(ogData.url), [ogData.url]);

  const handleCopy = () => {
    navigator.clipboard.writeText(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Form & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Inputs */}
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.og.metaDetails') || 'Social Meta Tags & Open Graph Parameters'}
            </h3>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Page Title (og:title)</label>
            <input
              type="text"
              value={ogData.title}
              onChange={(e) => setOgData({ ...ogData, title: e.target.value })}
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Description (og:description)</label>
            <textarea
              value={ogData.description}
              onChange={(e) => setOgData({ ...ogData, description: e.target.value })}
              rows={3}
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Canonical URL (og:url)</label>
            <input
              type="text"
              value={ogData.url}
              onChange={(e) => setOgData({ ...ogData, url: e.target.value })}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Image URL (og:image / 1200x630)</label>
            <input
              type="text"
              value={ogData.imageUrl}
              onChange={(e) => setOgData({ ...ogData, imageUrl: e.target.value })}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Site Name</label>
              <input
                type="text"
                value={ogData.siteName}
                onChange={(e) => setOgData({ ...ogData, siteName: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Twitter Handle</label>
              <input
                type="text"
                value={ogData.twitterHandle}
                onChange={(e) => setOgData({ ...ogData, twitterHandle: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Live Social Card Simulation */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-4">
          {/* Platform Tab Buttons */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Card Simulator</span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'twitter', label: 'Twitter / X' },
                { id: 'facebook', label: 'Facebook' },
                { id: 'linkedin', label: 'LinkedIn' },
                { id: 'google', label: 'Google SERP' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p.id as typeof activePlatform)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                    activePlatform === p.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social Card Preview Container */}
          <div className="flex-1 flex items-center justify-center p-4">
            {activePlatform === 'twitter' || activePlatform === 'facebook' || activePlatform === 'linkedin' ? (
              <div className="w-full max-w-md rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-md">
                {ogData.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ogData.imageUrl}
                    alt="Open Graph preview"
                    className="w-full h-48 object-cover border-b border-slate-100 dark:border-white/5"
                  />
                )}
                <div className="p-3.5 space-y-1">
                  <span className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold block truncate">
                    {domain}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{ogData.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{ogData.description}</p>
                </div>
              </div>
            ) : (
              /* Google SERP Snippet */
              <div className="w-full max-w-md rounded-2xl p-5 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{ogData.url}</span>
                </div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 text-base line-clamp-1 hover:underline cursor-pointer">
                  {ogData.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{ogData.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generated Meta Tag Code */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Generated HTML Meta Tags Code
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Meta Tags')}
          </button>
        </div>
        <textarea
          readOnly
          value={metaTags}
          rows={10}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
