'use client';
import React, { useState } from 'react';
import { buildAnthropicToolDefinition } from '@/lib/anthropicToolBuilder';
import { Copy, Check } from 'lucide-react';

export default function AnthropicToolBuilderTool() {
  const [name, setName] = useState('lookup_stock_price');
  const [desc, setDesc] = useState('Retrieve the real-time stock price for a given ticker symbol');
  const [copied, setCopied] = useState(false);

  const json = buildAnthropicToolDefinition(name, desc, [
    { name: 'ticker', type: 'string', description: 'Stock ticker symbol (e.g. AAPL, GOOGL)', required: true },
    { name: 'currency', type: 'string', description: 'Currency code (e.g. USD)', required: false }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Claude Tool Definition</h3>
        <button
          onClick={() => { navigator.clipboard.writeText(json); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy Tool Schema'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tool Name"
            className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={5}
            placeholder="Description"
            className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
        <pre className="h-[235px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-amber-400 dark:border-white/10">
          {json}
        </pre>
      </div>
    </div>
  );
}
