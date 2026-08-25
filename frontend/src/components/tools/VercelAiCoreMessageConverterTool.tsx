'use client';
import React, { useState } from 'react';
import { convertToVercelCoreMessages } from '@/lib/vercelAiCoreMessageConverter';
import { Copy, Check } from 'lucide-react';

export default function VercelAiCoreMessageConverterTool() {
  const [input, setInput] = useState('User: Hello!\nAssistant: Hi there! How can I help you today?\nUser: Write a poem about code.');
  const [copied, setCopied] = useState(false);
  const result = convertToVercelCoreMessages(input);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => { navigator.clipboard.writeText(result.code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy Vercel AI Code'}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <pre className="h-[235px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-cyan-400 dark:border-white/10">
          {result.code}
        </pre>
      </div>
    </div>
  );
}
