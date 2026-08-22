'use client';
import React, { useState, useMemo } from 'react';
import { buildAndroidManifestXml } from '@/lib/androidManifestBuilder';

export default function AndroidManifestBuilderTool() {
  const [pkg, setPkg] = useState('com.devstools.app');
  const xml = useMemo(() => buildAndroidManifestXml({ packageName: pkg, appName: 'DevsTools', permissions: ['INTERNET', 'CAMERA'] }), [pkg]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={pkg} onChange={(e) => setPkg(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={12} value={xml} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
