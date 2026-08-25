'use client';
import React, { useState } from 'react';
import { generateLangGraphState } from '@/lib/langgraphStateGenerator';
import { Copy, Check } from 'lucide-react';

export default function LanggraphStateGeneratorTool() {
  const [graphName, setGraphName] = useState('Agent');
  const [lang, setLang] = useState<'python' | 'typescript'>('python');
  const [copied, setCopied] = useState(false);

  const code = generateLangGraphState(graphName, [
    { name: 'messages', type: 'messages' },
    { name: 'user_id', type: 'str' },
    { name: 'retry_count', type: 'int' }
  ], lang);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <input
            value={graphName}
            onChange={(e) => setGraphName(e.target.value)}
            placeholder="Graph Name"
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs dark:border-white/10 dark:bg-slate-950"
          />
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button onClick={() => setLang('python')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${lang === 'python' ? 'bg-indigo-600 text-white' : ''}`}>Python</button>
            <button onClick={() => setLang('typescript')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${lang === 'typescript' ? 'bg-indigo-600 text-white' : ''}`}>TypeScript</button>
          </div>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy LangGraph Code'}</span>
        </button>
      </div>

      <pre className="h-[300px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 dark:border-white/10">
        {code}
      </pre>
    </div>
  );
}
