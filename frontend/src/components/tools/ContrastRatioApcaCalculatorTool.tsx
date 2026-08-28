'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateWcagContrast } from '@/lib/contrastRatioApcaCalculator';

export default function ContrastRatioApcaCalculatorTool() {
  const [lum1, setLum1] = useState('1.0');
  const [lum2, setLum2] = useState('0.0');
  const ratio = calculateWcagContrast(Number(lum1) || 1.0, Number(lum2) || 0.0);
  const output = `WCAG Contrast Ratio: ${ratio}:1 (Threshold: 4.5:1 AA, 7:1 AAA)`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold">Foreground Luminance (0.0 - 1.0)</label>
          <input type="number" step="0.1" value={lum1} onChange={(e) => setLum1(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
        <div>
          <label className="text-xs font-semibold">Background Luminance (0.0 - 1.0)</label>
          <input type="number" step="0.1" value={lum2} onChange={(e) => setLum2(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">Contrast Evaluation</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={4} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
