'use client';
import React, { useState } from 'react';
import { convertHtmlTable } from '@/lib/htmlTableConverter';
import { Copy, Check } from 'lucide-react';

export default function HtmlTableConverterTool() {
  const [html, setHtml] = useState('<table>\n  <tr><th>Language</th><th>Popularity</th></tr>\n  <tr><td>TypeScript</td><td>Very High</td></tr>\n  <tr><td>Rust</td><td>High</td></tr>\n</table>');
  const [outputType, setOutputType] = useState<'markdown' | 'csv' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  const result = convertHtmlTable(html);
  const outText = result[outputType];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button onClick={() => setOutputType('markdown')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${outputType === 'markdown' ? 'bg-indigo-600 text-white' : ''}`}>Markdown</button>
          <button onClick={() => setOutputType('csv')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${outputType === 'csv' ? 'bg-indigo-600 text-white' : ''}`}>CSV</button>
          <button onClick={() => setOutputType('json')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${outputType === 'json' ? 'bg-indigo-600 text-white' : ''}`}>JSON</button>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(outText); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy Output'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={12}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <pre className="h-[235px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-amber-400 dark:border-white/10">
          {outText}
        </pre>
      </div>
    </div>
  );
}
