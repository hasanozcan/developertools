'use client';
import React, { useState, useMemo } from 'react';
import { generateChangelogMd } from '@/lib/changelogGenerator';

export default function ChangelogGeneratorTool() {
  const [version, setVersion] = useState('1.0.0');
  const md = useMemo(() => generateChangelogMd({ version, date: '2026-08-22', added: ['Initial tool launch'] }), [version]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={8} value={md} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
