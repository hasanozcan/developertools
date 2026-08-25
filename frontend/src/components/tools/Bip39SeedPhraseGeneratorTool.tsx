'use client';
import React, { useState, useEffect } from 'react';
import { generateBip39SeedPhrase } from '@/lib/bip39SeedPhraseGenerator';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function Bip39SeedPhraseGeneratorTool() {
  const [count, setCount] = useState<12 | 24>(12);
  const [phrase, setPhrase] = useState<{ words: string[]; mnemonic: string }>({ words: [], mnemonic: '' });
  const [copied, setCopied] = useState(false);

  const gen = (c: 12 | 24 = count) => {
    setPhrase(generateBip39SeedPhrase(c));
  };

  useEffect(() => {
    gen(12);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button onClick={() => { setCount(12); gen(12); }} className={`rounded-lg px-3 py-1 text-xs font-semibold ${count === 12 ? 'bg-indigo-600 text-white' : ''}`}>12 Words</button>
          <button onClick={() => { setCount(24); gen(24); }} className={`rounded-lg px-3 py-1 text-xs font-semibold ${count === 24 ? 'bg-indigo-600 text-white' : ''}`}>24 Words</button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => gen()} className="inline-flex items-center gap-1 text-xs font-semibold rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button onClick={() => { navigator.clipboard.writeText(phrase.mnemonic); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex items-center gap-1 text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-xl">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Phrase
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {phrase.words.map((w, i) => (
          <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-900 flex gap-2 items-center">
            <span className="text-[10px] font-bold text-slate-400">#{i + 1}</span>
            <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-200">{w}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
