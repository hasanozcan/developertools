'use client';
import React, { useMemo } from 'react';
import { generateEditorConfig } from '@/lib/editorconfigGenerator';

export default function EditorconfigGeneratorTool() {
  const config = useMemo(() => generateEditorConfig(2, 'space'), []);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea readOnly rows={12} value={config} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
