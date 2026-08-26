'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Terminal, RefreshCw } from 'lucide-react';
import { curlToAxios } from '@/lib/curlToAxios';

const SAMPLE_CURL = `curl -X POST https://api.example.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-your-api-key-here" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}],
    "temperature": 0.7
  }'`;

export default function CurlToAxiosTool() {
  const [curlInput, setCurlInput] = useState(SAMPLE_CURL);
  const [language, setLanguage] = useState<'typescript' | 'javascript'>('typescript');
  const [asyncAwait, setAsyncAwait] = useState(true);
  const [copied, setCopied] = useState(false);

  const codeOutput = useMemo(() => {
    if (!curlInput.trim()) return '';
    try {
      return curlToAxios(curlInput, { language, asyncAwait, indent: 2 });
    } catch {
      return '// Invalid cURL syntax';
    }
  }, [curlInput, language, asyncAwait]);

  const handleCopy = () => {
    if (!codeOutput) return;
    navigator.clipboard.writeText(codeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={asyncAwait}
              onChange={(e) => setAsyncAwait(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Async / Await Syntax
          </label>
        </div>

        <button
          onClick={() => setCurlInput(SAMPLE_CURL)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" /> Load Sample cURL
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-indigo-500" /> cURL Command
          </span>
          <textarea
            value={curlInput}
            onChange={(e) => setCurlInput(e.target.value)}
            placeholder="Paste your curl command here..."
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Generated Axios Code
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
          <textarea
            readOnly
            value={codeOutput}
            placeholder="Axios code will appear here..."
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
