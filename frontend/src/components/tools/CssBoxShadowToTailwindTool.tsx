'use client';
import React, { useState } from 'react';
import { cssBoxShadowToTailwind } from '@/lib/cssBoxShadowToTailwind';
import { Copy, Check } from 'lucide-react';

export default function CssBoxShadowToTailwindTool() {
  const [shadow, setShadow] = useState('0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)');
  const [copied, setCopied] = useState(false);
  const twClass = cssBoxShadowToTailwind(shadow);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">CSS box-shadow value</label>
          <input
            value={shadow}
            onChange={(e) => setShadow(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-mono dark:border-white/10 dark:bg-slate-950"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Tailwind Class</label>
          <div className="flex gap-2">
            <input
              readOnly
              value={twClass}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-mono text-indigo-600 dark:border-white/10 dark:bg-slate-900 dark:text-indigo-400"
            />
            <button
              onClick={() => { navigator.clipboard.writeText(twClass); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center p-8 bg-slate-100 rounded-3xl dark:bg-slate-900/50">
        <div
          className="w-48 h-32 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center font-semibold text-sm text-slate-700 dark:text-slate-200"
          style={{ boxShadow: shadow }}
        >
          Preview Box
        </div>
      </div>
    </div>
  );
}
