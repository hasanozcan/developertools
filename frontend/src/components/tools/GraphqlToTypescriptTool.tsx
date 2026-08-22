'use client';
import React, { useState, useMemo } from 'react';
import { graphqlToTypescript } from '@/lib/graphqlToTypescript';

export default function GraphqlToTypescriptTool() {
  const [sdl, setSdl] = useState('type User {\n  id: ID!\n  username: String!\n  age: Int\n}');
  const output = useMemo(() => graphqlToTypescript(sdl), [sdl]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={sdl} onChange={(e) => setSdl(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={output} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
