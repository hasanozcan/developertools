'use client';
import React, { useState } from 'react';
import { naturalLanguageToCron } from '@/lib/naturalLanguageToCron';
import { Copy, Check } from 'lucide-react';

export default function NaturalLanguageToCronTool() {
  const [text, setText] = useState('every monday at 9');
  const [copied, setCopied] = useState(false);
  const result = naturalLanguageToCron(text);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase">Describe schedule in plain English</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. every 15 minutes, every weekday at 8:30am..."
          className="w-full rounded-2xl border border-slate-200 p-4 text-sm font-semibold dark:border-white/10 dark:bg-slate-950"
        />
      </div>

      <div className="rounded-3xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-900/30 dark:bg-indigo-950/20 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase">Generated Cron Expression</span>
          <p className="text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">{result.cron}</p>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{result.description}</p>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(result.cron); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy Cron'}</span>
        </button>
      </div>
    </div>
  );
}
