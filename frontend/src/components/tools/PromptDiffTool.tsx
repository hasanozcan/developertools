'use client';
import React, { useState, useMemo } from 'react';
import { comparePrompts } from '@/lib/promptDiff';

export default function PromptDiffTool() {
  const [promptA, setPromptA] = useState('You are an assistant.\nBe concise and clear.');
  const [promptB, setPromptB] = useState('You are an expert coding assistant.\nBe concise, clear, and write strict TypeScript.');

  const diff = useMemo(() => comparePrompts(promptA, promptB), [promptA, promptB]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Prompt V1</label>
          <textarea rows={6} value={promptA} onChange={(e) => setPromptA(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" />
        </div>
        <div className="surface-card rounded-2xl p-5 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Prompt V2</label>
          <textarea rows={6} value={promptB} onChange={(e) => setPromptB(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" />
        </div>
      </div>
      <div className="surface-card rounded-2xl p-5 space-y-3">
        <div className="flex gap-4 text-xs font-bold">
          <span className="text-emerald-500">+{diff.addedCount} Added</span>
          <span className="text-rose-500">-{diff.removedCount} Removed</span>
          <span className="text-indigo-500">{diff.wordDelta >= 0 ? '+' : ''}{diff.wordDelta} Words</span>
        </div>
        <div className="font-mono text-xs space-y-1 p-3 bg-slate-900 rounded-xl">
          {diff.lines.map((l, idx) => (
            <div key={idx} className={l.type === 'added' ? 'text-emerald-400 bg-emerald-500/10 px-2 rounded' : l.type === 'removed' ? 'text-rose-400 bg-rose-500/10 px-2 rounded' : 'text-slate-400 px-2'}>
              {l.type === 'added' ? '+ ' : l.type === 'removed' ? '- ' : '  '}{l.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
