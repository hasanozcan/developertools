'use client';
import React, { useState } from 'react';
import { curlToPhp } from '@/lib/curlToPhp';
import { Copy, Check } from 'lucide-react';

export default function CurlToPhpTool() {
  const [curl, setCurl] = useState('curl -X POST https://api.example.com -d "key=val"');
  const [style, setStyle] = useState<'guzzle' | 'native'>('guzzle');
  const [copied, setCopied] = useState(false);
  const code = curlToPhp(curl, style);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStyle('guzzle')}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${style === 'guzzle' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
          >
            Guzzle HTTP
          </button>
          <button
            onClick={() => setStyle('native')}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${style === 'native' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
          >
            Native cURL
          </button>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy PHP Code'}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={curl}
          onChange={(e) => setCurl(e.target.value)}
          rows={12}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <pre className="h-[235px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-purple-400 dark:border-white/10">
          {code}
        </pre>
      </div>
    </div>
  );
}
