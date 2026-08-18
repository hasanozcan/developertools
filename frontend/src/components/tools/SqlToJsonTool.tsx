'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Database } from 'lucide-react';
import { sqlToJson } from '@/lib/sqlToJson';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_SQL = `INSERT INTO users (id, username, email, is_active, score) VALUES
(1, 'alice', 'alice@example.com', true, 95.5),
(2, 'bob', 'bob@example.com', false, 82.0),
(3, 'charlie', 'charlie@example.com', true, 88.75);`;

export default function SqlToJsonTool() {
  const { t } = useLanguage();
  const [sqlInput, setSqlInput] = useState(SAMPLE_SQL);
  const [copied, setCopied] = useState(false);

  const jsonOutput = useMemo(() => {
    if (!sqlInput.trim()) return '';
    try {
      const records = sqlToJson(sqlInput);
      return JSON.stringify(records, null, 2);
    } catch {
      return '';
    }
  }, [sqlInput]);

  const handleCopy = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sql_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="surface-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            SQL INSERT ➔ JSON Converter
          </span>
        </div>
        <button
          onClick={() => setSqlInput(SAMPLE_SQL)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          {t('common.loadSample') || 'Load Sample'}
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SQL Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            SQL Query / Dump
          </span>
          <textarea
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="INSERT INTO table (col1, col2) VALUES (1, 'val');"
          />
        </div>

        {/* JSON Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Parsed JSON Array
            </span>
            {jsonOutput && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy JSON')}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                  title="Download JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={jsonOutput}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400 resize-y"
            placeholder="// JSON array will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
