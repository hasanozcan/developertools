'use client';
import React, { useState, useMemo } from 'react';
import { sanitizeEnvFile } from '@/lib/envSanitizer';

export default function EnvSanitizerTool() {
  const [env, setEnv] = useState('DATABASE_URL=postgres://root:secret@localhost:5432/app\nAPI_KEY=sk_live_123456');
  const sanitized = useMemo(() => sanitizeEnvFile(env), [env]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={10} value={env} onChange={(e) => setEnv(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={10} value={sanitized} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
