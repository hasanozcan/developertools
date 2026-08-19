'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { convertTsvToJson, convertJsonToTsv } from '@/lib/tsvToJson';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_TSV = `id\tname\tdept\tsalary
1\tAlice Smith\tEngineering\t95000
2\tBob Jones\tDesign\t82000
3\tCharlie Brown\tMarketing\t74000`;

export default function TsvToJsonTool() {
  const { t } = useLanguage();
  const [tsvInput, setTsvInput] = useState(SAMPLE_TSV);
  const [jsonInput, setJsonInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTsvToJson = () => {
    setError(null);
    try {
      const res = convertTsvToJson(tsvInput);
      setJsonInput(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Conversion error');
    }
  };

  const handleJsonToTsv = () => {
    setError(null);
    try {
      const res = convertJsonToTsv(jsonInput);
      setTsvInput(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid JSON input');
    }
  };

  React.useEffect(() => {
    handleTsvToJson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyJson = () => {
    if (!jsonInput) return;
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Conversion Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.tsvjson.title') || 'TSV (Tab-Separated) ↔ JSON Converter'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTsvToJson}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            TSV → JSON
          </button>
          <button
            onClick={handleJsonToTsv}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition"
          >
            JSON → TSV
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Grid: TSV & JSON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">TSV Text (Tab-Delimited)</span>
            <button
              onClick={() => {
                setTsvInput(SAMPLE_TSV);
                const res = convertTsvToJson(SAMPLE_TSV);
                setJsonInput(res);
                setError(null);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={tsvInput}
            onChange={(e) => setTsvInput(e.target.value)}
            rows={13}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">JSON Output</span>
            {jsonInput && (
              <button
                onClick={handleCopyJson}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy JSON')}
              </button>
            )}
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={13}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
