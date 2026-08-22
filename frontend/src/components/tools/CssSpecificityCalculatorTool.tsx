'use client';
import React, { useState, useMemo } from 'react';
import { calculateSpecificity, compareSpecificity } from '@/lib/cssSpecificityCalculator';

export default function CssSpecificityCalculatorTool() {
  const [selectorA, setSelectorA] = useState('#navbar .menu-item > a:hover');
  const [selectorB, setSelectorB] = useState('nav.menu div.item a');

  const comparison = useMemo(() => compareSpecificity(selectorA, selectorB), [selectorA, selectorB]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Selector A</label>
            <input type="text" value={selectorA} onChange={(e) => setSelectorA(e.target.value)} className="w-full mt-1 rounded-xl border border-slate-200 bg-white p-2.5 font-mono text-xs dark:border-white/10 dark:bg-slate-900 dark:text-slate-100" />
            <p className="mt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">Score: {comparison.scoreA.formatted}</p>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Selector B</label>
            <input type="text" value={selectorB} onChange={(e) => setSelectorB(e.target.value)} className="w-full mt-1 rounded-xl border border-slate-200 bg-white p-2.5 font-mono text-xs dark:border-white/10 dark:bg-slate-900 dark:text-slate-100" />
            <p className="mt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">Score: {comparison.scoreB.formatted}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-indigo-500/10 text-center">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Winning Selector</span>
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{comparison.explanation}</p>
        </div>
      </div>
    </div>
  );
}
