'use client';
import React, { useState, useMemo } from 'react';
import { buildConventionalCommit } from '@/lib/conventionalCommitBuilder';

export default function ConventionalCommitBuilderTool() {
  const [type, setType] = useState<'feat' | 'fix'>('feat');
  const [scope, setScope] = useState('auth');
  const [desc, setDesc] = useState('add oauth2 login provider');

  const msg = useMemo(() => buildConventionalCommit({ type, scope, description: desc }), [type, scope, desc]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex gap-3">
          <input type="text" value={scope} onChange={(e) => setScope(e.target.value)} className="rounded-xl border p-2 text-xs" />
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="flex-1 rounded-xl border p-2 text-xs" />
        </div>
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{msg}</div>
      </div>
    </div>
  );
}
