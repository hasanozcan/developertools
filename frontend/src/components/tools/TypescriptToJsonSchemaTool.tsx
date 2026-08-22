'use client';
import React, { useState, useMemo } from 'react';
import { typescriptToJsonSchema } from '@/lib/typescriptToJsonSchema';

export default function TypescriptToJsonSchemaTool() {
  const [ts, setTs] = useState('interface User {\n  id: number;\n  name: string;\n  isAdmin?: boolean;\n}');
  const output = useMemo(() => typescriptToJsonSchema(ts, 'UserSchema'), [ts]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={ts} onChange={(e) => setTs(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={output} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
