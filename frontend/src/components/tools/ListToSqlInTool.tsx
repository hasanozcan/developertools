'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Database, Sparkles } from 'lucide-react';
import { convertListToSqlIn, type QuoteType } from '@/lib/listToSqlIn';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_LIST = `101
102
103
104
105
101
106`;

export default function ListToSqlInTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(SAMPLE_LIST);
  const [quoteType, setQuoteType] = useState<QuoteType>('single');
  const [separator, setSeparator] = useState(', ');
  const [prefix, setPrefix] = useState('IN (');
  const [suffix, setSuffix] = useState(')');
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [trimItems, setTrimItems] = useState(true);
  const [copied, setCopied] = useState(false);

  const sqlOutput = useMemo(() => {
    return convertListToSqlIn(input, {
      quoteType,
      separator,
      prefix,
      suffix,
      removeDuplicates,
      trimItems,
      skipEmpty: true,
    });
  }, [input, quoteType, separator, prefix, suffix, removeDuplicates, trimItems]);

  const handleCopy = () => {
    if (!sqlOutput) return;
    navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Options Panel */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.sqlin.optionsTitle') || 'SQL Formatting & Quoting Options'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Quote Type */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Quote Style</label>
            <select
              value={quoteType}
              onChange={(e) => setQuoteType(e.target.value as QuoteType)}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="single">Single Quotes (&apos;item&apos;)</option>
              <option value="double">Double Quotes (&quot;item&quot;)</option>
              <option value="none">No Quotes (Numbers / IDs)</option>
            </select>
          </div>

          {/* Separator */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Separator</label>
            <input
              type="text"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          {/* Prefix */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Prefix</label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          {/* Suffix */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Suffix</label>
            <input
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-100 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Remove Duplicates (Distinct)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={trimItems}
              onChange={(e) => setTrimItems(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Trim Whitespace</span>
          </label>
        </div>
      </div>

      {/* Grid Inputs & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raw List Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Raw List (Newlines or Commas)
            </span>
            <button
              onClick={() => setInput(SAMPLE_LIST)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="Paste your items here, one per line..."
          />
        </div>

        {/* SQL IN Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Formatted SQL Clause
            </span>
            {sqlOutput && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy SQL')}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={sqlOutput}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400 resize-y"
            placeholder="SQL clause will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
