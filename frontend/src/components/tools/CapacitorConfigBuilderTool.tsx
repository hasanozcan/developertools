'use client';
import React, { useState, useMemo } from 'react';
import { generateCapacitorConfig } from '@/lib/capacitorConfigBuilder';

export default function CapacitorConfigBuilderTool() {
  const [id, setId] = useState('com.devstools.mobile');
  const json = useMemo(() => generateCapacitorConfig({ appId: id, appName: 'DevsTools Mobile' }), [id]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={10} value={json} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
