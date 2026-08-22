'use client';
import React, { useState, useMemo } from 'react';
import { generateXcodeContentsJson } from '@/lib/xcodeAssetCatalog';

export default function XcodeAssetCatalogTool() {
  const [name, setName] = useState('app_logo');
  const json = useMemo(() => generateXcodeContentsJson(name), [name]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={12} value={json} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
