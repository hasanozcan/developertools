'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateCssClamp } from '@/lib/cssClampCalculator';

export default function CssClampCalculatorTool() {
  const [minWidth, setMinWidth] = useState(320);
  const [maxWidth, setMaxWidth] = useState(1280);
  const [minValue, setMinValue] = useState(16);
  const [maxValue, setMaxValue] = useState(32);

  const clampExpr = calculateCssClamp({ minWidth, maxWidth, minValue, maxValue });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Min Viewport (px)</label>
            <input type="number" value={minWidth} onChange={(e) => setMinWidth(Number(e.target.value))} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Max Viewport (px)</label>
            <input type="number" value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Min Value (px)</label>
            <input type="number" value={minValue} onChange={(e) => setMinValue(Number(e.target.value))} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Max Value (px)</label>
            <input type="number" value={maxValue} onChange={(e) => setMaxValue(Number(e.target.value))} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <code className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{clampExpr}</code>
          <CopyButton text={clampExpr} />
        </div>
      </div>
    </div>
  );
}
