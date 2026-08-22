'use client';
import React, { useState, useMemo } from 'react';
import { generatePrettierConfig } from '@/lib/eslintPrettierConfig';

export default function EslintPrettierConfigTool() {
  const [tabWidth, setTabWidth] = useState(2);
  const json = useMemo(() => generatePrettierConfig({ tabWidth }), [tabWidth]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="number" value={tabWidth} onChange={(e) => setTabWidth(Number(e.target.value))} className="w-full rounded-xl border p-2 text-xs" />
        <textarea readOnly rows={10} value={json} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
