'use client';
import React, { useState, useMemo } from 'react';
import { inspectSshPublicKey } from '@/lib/sshKeyInspector';

export default function SshKeyInspectorTool() {
  const [key, setKey] = useState('ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... dev@company.com');
  const details = useMemo(() => inspectSshPublicKey(key), [key]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={6} value={key} onChange={(e) => setKey(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-indigo-500/10 rounded-xl text-xs space-y-1">
          <p><strong>Key Type:</strong> {details.keyType}</p>
          <p><strong>Comment:</strong> {details.comment}</p>
        </div>
      </div>
    </div>
  );
}
