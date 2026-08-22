'use client';
import React, { useState, useMemo } from 'react';
import { generateSystemdUnit } from '@/lib/systemdUnitGenerator';

export default function SystemdUnitGeneratorTool() {
  const [execStart, setExecStart] = useState('/usr/bin/node /var/www/app/index.js');
  const unit = useMemo(() => generateSystemdUnit('node-app', { description: 'Node.js App', execStart }), [execStart]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={execStart} onChange={(e) => setExecStart(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={12} value={unit} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
