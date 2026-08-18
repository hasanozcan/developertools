'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, FileCode } from 'lucide-react';
import { generateSitemapXml, parseUrlList, type SitemapUrlEntry } from '@/lib/sitemapGenerator';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_URLS = `https://example.com/
https://example.com/about
https://example.com/pricing
https://example.com/blog
https://example.com/contact`;

export default function SitemapGeneratorTool() {
  const { t } = useLanguage();
  const [urlInput, setUrlInput] = useState(SAMPLE_URLS);
  const [changefreq, setChangefreq] = useState<SitemapUrlEntry['changefreq']>('weekly');
  const [priority, setPriority] = useState(0.8);
  const [copied, setCopied] = useState(false);

  const sitemapXml = useMemo(() => {
    const entries = parseUrlList(urlInput, { changefreq, priority });
    return generateSitemapXml(entries);
  }, [urlInput, changefreq, priority]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Options Bar */}
      <div className="surface-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('tool.sitemap.defaults') || 'Default Tags'}:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Changefreq:</span>
            <select
              value={changefreq}
              onChange={(e) => setChangefreq(e.target.value as any)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-white"
            >
              <option value="always">always</option>
              <option value="hourly">hourly</option>
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="yearly">yearly</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Priority:</span>
            <select
              value={priority}
              onChange={(e) => setPriority(parseFloat(e.target.value))}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-white"
            >
              <option value={1.0}>1.0 (Highest)</option>
              <option value={0.8}>0.8 (Standard)</option>
              <option value={0.5}>0.5 (Secondary)</option>
              <option value={0.3}>0.3 (Low)</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setUrlInput(SAMPLE_URLS)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          {t('common.loadSample') || 'Load Sample'}
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* URL List Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('tool.sitemap.urlList') || 'List of URLs (One per line)'}
          </span>
          <textarea
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="https://example.com/page1&#10;https://example.com/page2"
          />
        </div>

        {/* XML Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Generated sitemap.xml
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy XML')}
              </button>
              <button
                onClick={handleDownload}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                title="Download sitemap.xml"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={sitemapXml}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
