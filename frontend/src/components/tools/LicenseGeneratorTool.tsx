'use client';
import React, { useState, useMemo } from 'react';
import { generateLicenseText } from '@/lib/licenseGenerator';

export default function LicenseGeneratorTool() {
  const [author, setAuthor] = useState('Developer Tools');
  const license = useMemo(() => generateLicenseText('MIT', '2026', author), [author]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={12} value={license} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
