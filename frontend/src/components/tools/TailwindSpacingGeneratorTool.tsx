'use client';
import React, { useState } from 'react';
import { generateTailwindSpacingScale } from '@/lib/tailwindSpacingGenerator';
import { Copy, Check } from 'lucide-react';

export default function TailwindSpacingGeneratorTool() {
  const [base, setBase] = useState(4);
  const [steps, setSteps] = useState(16);
  const [copied, setCopied] = useState(false);

  const scale = generateTailwindSpacingScale(base, steps);
  const json = JSON.stringify({ theme: { extend: { spacing: scale } } }, null, 2);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div><label className="text-xs font-semibold text-slate-500">Base Unit (px): {base}</label><input type="range" min="2" max="8" value={base} onChange={(e) => setBase(parseInt(e.target.value, 10))} /></div>
          <div><label className="text-xs font-semibold text-slate-500">Steps: {steps}</label><input type="range" min="8" max="32" value={steps} onChange={(e) => setSteps(parseInt(e.target.value, 10))} /></div>
        </div>
        <button onClick={() => { navigator.clipboard.writeText(json); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Config
        </button>
      </div>
      <pre className="h-[250px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-teal-400 dark:border-white/10">{json}</pre>
    </div>
  );
}
