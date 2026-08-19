'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { convertJsonToEnv, convertEnvToJson } from '@/lib/jsonToEnv';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_JSON = `{
  "PORT": 8080,
  "APP_ENV": "production",
  "DATABASE": {
    "HOST": "localhost",
    "PORT": 5432,
    "NAME": "dev_db"
  },
  "API_KEY": "sk_live_123456789"
}`;

export default function JsonToEnvTool() {
  const { t } = useLanguage();
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [envInput, setEnvInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJsonToEnv = () => {
    setError(null);
    try {
      setEnvInput(convertJsonToEnv(jsonInput));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid JSON input');
    }
  };

  const handleEnvToJson = () => {
    setError(null);
    try {
      setJsonInput(convertEnvToJson(envInput));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid .env format');
    }
  };

  React.useEffect(() => {
    handleJsonToEnv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.jsonenv.title') || 'JSON ↔ .env Environment Variables Converter'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleJsonToEnv}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            JSON → .env
          </button>
          <button
            onClick={handleEnvToJson}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition"
          >
            .env → JSON
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Grid: JSON & ENV */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">JSON Object</span>
            <button
              onClick={() => {
                setJsonInput(SAMPLE_JSON);
                setEnvInput(convertJsonToEnv(SAMPLE_JSON));
                setError(null);
              }}
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
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">.env File Output</span>
            {envInput && (
              <button
                onClick={handleCopyEnv}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy .env')}
              </button>
            )}
          </div>
          <textarea
            value={envInput}
            onChange={(e) => setEnvInput(e.target.value)}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
