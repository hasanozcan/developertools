'use client';
import React, { useState, useMemo } from 'react';
import { inspectPgpKey } from '@/lib/pgpKeyInspector';

export default function PgpKeyInspectorTool() {
  const [pgp, setPgp] = useState('-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: BCPG v1.58\n...\n-----END PGP PUBLIC KEY BLOCK-----');
  const res = useMemo(() => inspectPgpKey(pgp), [pgp]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={6} value={pgp} onChange={(e) => setPgp(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-indigo-500/10 rounded-xl text-xs">
          <p><strong>PGP Type:</strong> {res.type}</p>
        </div>
      </div>
    </div>
  );
}
