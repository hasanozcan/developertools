'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateKeyframesCss } from '@/lib/cssKeyframesGenerator';

const steps = [
  { percentage: 0, properties: { transform: 'scale(1)', opacity: '1' } },
  { percentage: 50, properties: { transform: 'scale(1.15)', opacity: '0.8' } },
  { percentage: 100, properties: { transform: 'scale(1)', opacity: '1' } },
];

export default function CssKeyframesGeneratorTool() {
  const [animName, setAnimName] = useState('custom-pulse');
  const [duration, setDuration] = useState('1.5s');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => generateKeyframesCss(animName, steps, { duration }), [animName, duration]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-4">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Animation Name</label>
          <input type="text" value={animName} onChange={(e) => setAnimName(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-mono dark:border-white/10 dark:bg-slate-900 dark:text-slate-100" />
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Duration</label>
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-mono dark:border-white/10 dark:bg-slate-900 dark:text-slate-100" />
          <div className="h-32 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
            <style>{result.fullCss}</style>
            <div className={`w-16 h-16 bg-indigo-600 rounded-2xl ${animName}`} />
          </div>
        </div>
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Generated CSS</h3>
            <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy CSS'}
            </button>
          </div>
          <textarea readOnly rows={12} value={result.fullCss} className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>
    </div>
  );
}
