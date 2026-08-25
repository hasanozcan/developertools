'use client';
import React, { useState } from 'react';
import { generateSha3Hash } from '@/lib/sha3HashGenerator';
import { Copy, Check } from 'lucide-react';

export default function Sha3HashGeneratorTool() {
  const [text, setText] = useState('Hello World');
  const [variant, setVariant] = useState<'sha3-256' | 'sha3-512'>('sha3-256');
  const [copied, setCopied] = useState(false);

  const hash = generateSha3Hash(text, variant);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button onClick={() => setVariant('sha3-256')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${variant === 'sha3-256' ? 'bg-indigo-600 text-white' : ''}`}>SHA3-256</button>
          <button onClick={() => setVariant('sha3-512')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${variant === 'sha3-512' ? 'bg-indigo-600 text-white' : ''}`}>SHA3-512</button>
        </div>
        <button onClick={() => { navigator.clipboard.writeText(hash); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Hash
        </button>
      </div>

      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs dark:border-white/10 dark:bg-slate-950" />

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase">{variant.toUpperCase()} Output</label>
        <p className="p-4 rounded-2xl bg-slate-900 text-pink-400 font-mono text-xs break-all">{hash}</p>
      </div>
    </div>
  );
}
