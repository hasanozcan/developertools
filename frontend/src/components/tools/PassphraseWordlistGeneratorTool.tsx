'use client';
import React, { useState, useEffect } from 'react';
import { generateDicewarePassphrase } from '@/lib/passphraseWordlistGenerator';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function PassphraseWordlistGeneratorTool() {
  const [count, setCount] = useState(4);
  const [sep, setSep] = useState('-');
  const [pass, setPass] = useState('');
  const [copied, setCopied] = useState(false);

  const gen = () => setPass(generateDicewarePassphrase(count, sep));
  useEffect(() => { gen(); }, [count, sep]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500">Words Count: {count}</label>
          <input type="range" min="3" max="8" value={count} onChange={(e) => setCount(parseInt(e.target.value, 10))} className="w-full" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">Separator</label>
          <input value={sep} onChange={(e) => setSep(e.target.value)} maxLength={3} className="w-full rounded-xl border border-slate-200 p-2 text-xs text-center font-bold dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-900/30 dark:bg-indigo-950/20 flex justify-between items-center">
        <p className="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400">{pass}</p>
        <button onClick={() => { navigator.clipboard.writeText(pass); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Passphrase
        </button>
      </div>
    </div>
  );
}
