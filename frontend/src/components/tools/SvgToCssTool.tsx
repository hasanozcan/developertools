'use client';
import React, { useState } from 'react';
import { svgToCss } from '@/lib/svgToCss';
import { Copy, Check } from 'lucide-react';

export default function SvgToCssTool() {
  const [svg, setSvg] = useState('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>');
  const [copied, setCopied] = useState(false);
  const result = svgToCss(svg);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => { navigator.clipboard.writeText(result.cssBackground); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy CSS Background'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={svg}
          onChange={(e) => setSvg(e.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <div className="space-y-4">
          <pre className="h-[120px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-teal-400 dark:border-white/10">
            {result.cssBackground}
          </pre>
          <pre className="h-[120px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-indigo-400 dark:border-white/10">
            {result.dataUri}
          </pre>
        </div>
      </div>
    </div>
  );
}
