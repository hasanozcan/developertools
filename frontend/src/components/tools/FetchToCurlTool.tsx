'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Terminal, RefreshCw, Code } from 'lucide-react';
import { fetchToCurl } from '@/lib/fetchToCurl';

const SAMPLE_FETCH = `fetch('https://api.example.com/v1/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer my-jwt-token-123'
  },
  body: JSON.stringify({
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'administrator'
  })
});`;

export default function FetchToCurlTool() {
  const [fetchInput, setFetchInput] = useState(SAMPLE_FETCH);
  const [multiline, setMultiline] = useState(true);
  const [copied, setCopied] = useState(false);

  const curlOutput = useMemo(() => {
    if (!fetchInput.trim()) return '';
    try {
      return fetchToCurl(fetchInput, { multiline });
    } catch {
      return '# Error parsing fetch code snippet';
    }
  }, [fetchInput, multiline]);

  const handleCopy = () => {
    if (!curlOutput) return;
    navigator.clipboard.writeText(curlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={multiline}
            onChange={(e) => setMultiline(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500"
          />
          Multi-line output with backslashes (\)
        </label>

        <button
          onClick={() => setFetchInput(SAMPLE_FETCH)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" /> Load Sample Fetch
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Code className="h-3.5 w-3.5 text-indigo-500" /> JavaScript Fetch Snippet
          </span>
          <textarea
            value={fetchInput}
            onChange={(e) => setFetchInput(e.target.value)}
            placeholder="Paste your fetch('...') code or browser network snippet here..."
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-indigo-500" /> Equivalent cURL Command
            </span>
            {curlOutput && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy cURL'}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={curlOutput}
            placeholder="cURL command will appear here..."
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
