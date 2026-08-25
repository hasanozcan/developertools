'use client';
import React, { useState } from 'react';
import { migrateTailwindV3ToV4 } from '@/lib/tailwindV3ToV4Migrator';
import { Copy, Check } from 'lucide-react';

export default function TailwindV3ToV4MigratorTool() {
  const [v3, setV3] = useState(`module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#06b6d4',
        accent: '#f43f5e',
      }
    }
  }
};`);
  const [copied, setCopied] = useState(false);
  const v4 = migrateTailwindV3ToV4(v3);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => { navigator.clipboard.writeText(v4); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy Tailwind v4 CSS'}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={v3}
          onChange={(e) => setV3(e.target.value)}
          rows={12}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <pre className="h-[235px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-teal-400 dark:border-white/10">
          {v4}
        </pre>
      </div>
    </div>
  );
}
