'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';
import { parseCurlCommand, generateCodeFromCurl, type TargetLanguage } from '@/lib/curlToCode';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_CURL = `curl -X POST https://api.example.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer my_secret_token" \\
  -d '{"email": "developer@example.com", "remember": true}'`;

const LANGUAGES: { id: TargetLanguage; label: string }[] = [
  { id: 'javascript_fetch', label: 'JavaScript (Fetch)' },
  { id: 'javascript_axios', label: 'JavaScript (Axios)' },
  { id: 'python_requests', label: 'Python (Requests)' },
  { id: 'go', label: 'Go (net/http)' },
  { id: 'php', label: 'PHP (cURL)' },
  { id: 'rust', label: 'Rust (reqwest)' },
];

export default function CurlToCodeTool() {
  const { t } = useLanguage();
  const [curlInput, setCurlInput] = useState(SAMPLE_CURL);
  const [targetLang, setTargetLang] = useState<TargetLanguage>('javascript_fetch');
  const [copied, setCopied] = useState(false);

  const { code, error } = useMemo(() => {
    if (!curlInput.trim()) return { code: '', error: null };
    try {
      const parsed = parseCurlCommand(curlInput);
      const generated = generateCodeFromCurl(parsed, targetLang);
      return { code: generated, error: null };
    } catch (err: any) {
      return { code: '', error: err.message || 'Failed to parse cURL command' };
    }
  }, [curlInput, targetLang]);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Target Language Selector */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.curltocode.targetLang') || 'Target Language'}:
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTargetLang(id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                targetLang === id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* cURL Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-500" /> cURL Command
            </span>
            <button
              onClick={() => setCurlInput(SAMPLE_CURL)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={curlInput}
            onChange={(e) => setCurlInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="curl -X POST https://..."
          />
        </div>

        {/* Code Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Generated Code Output
            </span>
            {code && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Code')}
              </button>
            )}
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={code}
              rows={14}
              className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
              placeholder="// Generated code will appear here..."
            />
          )}
        </div>
      </div>
    </div>
  );
}
