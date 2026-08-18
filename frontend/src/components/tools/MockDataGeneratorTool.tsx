'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, RefreshCw, Database } from 'lucide-react';
import { generateMockData, type MockDataType } from '@/lib/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function MockDataGeneratorTool() {
  const { t } = useLanguage();
  const [type, setType] = useState<MockDataType>('users');
  const [count, setCount] = useState<number>(5);
  const [copied, setCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const jsonOutput = useMemo(() => {
    const data = generateMockData(type, count);
    return JSON.stringify(data, null, 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, count, refreshKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mock_${type}_${count}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="surface-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-500" />
            <label className="text-sm font-semibold text-slate-900 dark:text-white">
              {t('tool.mockdata.dataType') || 'Data Schema'}:
            </label>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(['users', 'products', 'orders', 'companies', 'posts'] as const).map((tVal) => (
              <button
                key={tVal}
                onClick={() => setType(tVal)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                  type === tVal
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200'
                }`}
              >
                {tVal}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">{t('tool.mockdata.count') || 'Rows'}:</span>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
            >
              {[1, 3, 5, 10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num} items
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t('tool.mockdata.regenerate') || 'Regenerate'}
          </button>
        </div>
      </div>

      {/* JSON Viewer */}
      <div className="surface-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Generated JSON Output ({count} records)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy JSON')}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 transition"
            >
              <Download className="h-3.5 w-3.5" />
              {t('common.download') || 'Download .json'}
            </button>
          </div>
        </div>

        <textarea
          readOnly
          value={jsonOutput}
          rows={16}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400 resize-y"
        />
      </div>
    </div>
  );
}
