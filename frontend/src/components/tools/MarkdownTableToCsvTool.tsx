'use client';

import React, { useState, useMemo } from 'react';
import { Table, Copy, Check } from 'lucide-react';
import { markdownTableToCsv } from '@/lib/markdownTableToCsv';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_MD = `| ID | Product Name | Category | Price | Stock |
|:---|:---|:---|---:|:---:|
| 101 | Wireless Mechanical Keyboard | Accessories | $129.99 | In Stock |
| 102 | Ultra-Wide 4K Monitor | Electronics | $499.00 | In Stock |
| 103 | Ergonomic Mouse, Dark Grey | Accessories | $59.50 | Low Stock |`;

export default function MarkdownTableToCsvTool() {
  const { t } = useLanguage();
  const [mdInput, setMdInput] = useState(SAMPLE_MD);
  const [copied, setCopied] = useState(false);

  const csvOutput = useMemo(() => markdownTableToCsv(mdInput), [mdInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'table.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.mdcsv.title') || 'Markdown Table to CSV / Excel Converter'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCsv}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            Download .csv File
          </button>
        </div>
      </div>

      {/* Grid: Markdown in -> CSV out */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">GitHub Markdown Table</span>
            <button
              onClick={() => setMdInput(SAMPLE_MD)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={mdInput}
            onChange={(e) => setMdInput(e.target.value)}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">CSV Formatted Output</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSV')}
            </button>
          </div>
          <textarea
            readOnly
            value={csvOutput}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
