'use client';
import React, { useState, useMemo } from 'react';
import { formatKeystoreFingerprint } from '@/lib/androidKeystoreFingerprint';

export default function AndroidKeystoreFingerprintTool() {
  const [raw, setRaw] = useState('A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5F6A1B2');
  const res = useMemo(() => formatKeystoreFingerprint(raw), [raw]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={raw} onChange={(e) => setRaw(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">
          <p><strong>SHA1:</strong> {res.sha1}</p>
        </div>
      </div>
    </div>
  );
}
