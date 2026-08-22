'use client';
import React, { useState, useMemo } from 'react';
import { formatPackageJson } from '@/lib/packageJsonFormatter';

export default function PackageJsonFormatterTool() {
  const [json, setJson] = useState('{\n  "name": "app",\n  "dependencies": { "zod": "^3.0", "react": "^19.0", "next": "^15.0" }\n}');
  const formatted = useMemo(() => {
    try { return formatPackageJson(json); } catch (e: any) { return e.message; }
  }, [json]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={10} value={json} onChange={(e) => setJson(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={10} value={formatted} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
