'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, RefreshCw, Code2 } from 'lucide-react';
import { generateModelsFromJson, type TargetLanguage } from '@/lib/jsonToModels';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_JSON = JSON.stringify(
  {
    id: 1001,
    title: 'Modern Developer Tools',
    status: 'published',
    views_count: 4250,
    is_featured: true,
    author: {
      id: 42,
      name: 'Sarah Connor',
      email: 'sarah@example.com',
    },
    tags: ['web', 'devtools', 'cloud'],
  },
  null,
  2,
);

const LANGUAGES: { id: TargetLanguage; label: string }[] = [
  { id: 'go', label: 'Go (Golang Structs)' },
  { id: 'python', label: 'Python (Pydantic v2)' },
  { id: 'rust', label: 'Rust (Serde Structs)' },
  { id: 'csharp', label: 'C# (Records)' },
  { id: 'kotlin', label: 'Kotlin (Data Classes)' },
];

export default function JsonToModelsTool() {
  const { t } = useLanguage();
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>('go');
  const [rootName, setRootName] = useState('ApiResponse');
  const [copied, setCopied] = useState(false);

  const { codeOutput, error } = useMemo(() => {
    if (!jsonInput.trim()) {
      return { codeOutput: '', error: null };
    }
    try {
      const res = generateModelsFromJson(jsonInput, {
        rootName,
        targetLanguage,
      });
      return { codeOutput: res, error: null };
    } catch (err: any) {
      return { codeOutput: '', error: err.message || 'Failed to generate models' };
    }
  }, [jsonInput, rootName, targetLanguage]);

  const handleCopy = () => {
    if (!codeOutput) return;
    navigator.clipboard.writeText(codeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Configuration Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        {/* Language Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setTargetLanguage(lang.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                targetLanguage === lang.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Root Name:
          </label>
          <input
            type="text"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            className="w-36 rounded-xl border border-slate-300 bg-white px-3 py-1 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              JSON Input
            </span>
            <button
              onClick={() => setJsonInput(SAMPLE_JSON)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Load Sample
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={15}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-indigo-500" /> Generated Models ({targetLanguage.toUpperCase()})
            </span>
            {codeOutput && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            )}
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={codeOutput}
              placeholder="Generated code will appear here..."
              rows={15}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
            />
          )}
        </div>
      </div>
    </div>
  );
}
