'use client';
import React, { useState, useEffect } from 'react';
import { generateCustomNanoId } from '@/lib/nanoidCustomAlphabet';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function NanoidCustomAlphabetTool() {
  const [alpha, setAlpha] = useState('0123456789abcdefghijklmnopqrstuvwxyz');
  const [len, setLen] = useState(21);
  const [id, setId] = useState('');
  const [copied, setCopied] = useState(false);

  const gen = () => setId(generateCustomNanoId(alpha, len));
  useEffect(() => { gen(); }, [alpha, len]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500">Custom Alphabet</label>
          <input value={alpha} onChange={(e) => setAlpha(e.target.value || 'a')} className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">Length: {len}</label>
          <input type="range" min="6" max="64" value={len} onChange={(e) => setLen(parseInt(e.target.value, 10))} className="w-full" />
        </div>
      </div>

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-900/30 dark:bg-indigo-950/20 flex justify-between items-center">
        <p className="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400 break-all">{id}</p>
        <button onClick={() => { navigator.clipboard.writeText(id); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy ID
        </button>
      </div>
    </div>
  );
}
