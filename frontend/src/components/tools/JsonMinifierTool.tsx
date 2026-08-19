'use client';

import React, { useState, useMemo } from 'react';
import { Minimize2, Copy, Check } from 'lucide-react';
import { minifyJson } from '@/lib/jsonMinifier';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_JSON = `{
  "app": "DeveloperTools",
  "version": 2.0,
  "features": [
    "Formatters",
    "Generators",
    "Converters"
  ],
  "author": {
    "name": "Admin",
    "website": "https://developertools.com"
  }
}`;

export default function JsonMinifierTool() {
  const { t } = useLanguage();
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [copied, setCopied] = useState(false);

  const { minified, error } = useMemo(() => {
    try {
      const res = minifyJson(jsonInput);
      return { minified: res, error: null };
    } catch (err: unknown) {
      return { minified: '', error: err instanceof Error ? err.message : 'Invalid JSON' };
    }
  }, [jsonInput]);

  const handleCopy = () => {
    if (!minified) return;
    navigator.clipboard.writeText(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const compressionRate = jsonInput.length > 0 && minified.length > 0
    ? Math.round((1 - minified.length / jsonInput.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Minimize2 className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.jsonmin.title') || 'JSON Minifier & Compact Stringifier'}
          </span>
        </div>

        {minified && (
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">Original: {jsonInput.length} B</span>
            <span className="text-emerald-500 font-bold">Minified: {minified.length} B</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
              {compressionRate}% smaller
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Grid: Pretty JSON in -> Minified JSON out */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Uncompressed / Formatted JSON</span>
            <button
              onClick={() => setJsonInput(SAMPLE_JSON)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Minified Single-Line JSON</span>
            {minified && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy JSON')}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={minified}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
