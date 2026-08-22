'use client';
import React, { useState, useMemo } from 'react';
import { formatArgon2idHash } from '@/lib/argon2HashGenerator';

export default function Argon2HashGeneratorTool() {
  const [pass, setPass] = useState('secret_password');
  const hash = useMemo(() => formatArgon2idHash(pass, { timeCost: 2, memoryCostKiB: 65536, parallelism: 1 }), [pass]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{hash}</div>
      </div>
    </div>
  );
}
