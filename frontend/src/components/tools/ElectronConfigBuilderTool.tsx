'use client';
import React, { useState, useMemo } from 'react';
import { generateElectronMainJs } from '@/lib/electronConfigBuilder';

export default function ElectronConfigBuilderTool() {
  const [app, setApp] = useState('DevsTools Desktop');
  const code = useMemo(() => generateElectronMainJs({ appName: app, appId: 'com.devstools.app' }), [app]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={app} onChange={(e) => setApp(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={12} value={code} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
