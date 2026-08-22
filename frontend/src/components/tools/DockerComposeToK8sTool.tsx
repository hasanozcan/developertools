'use client';
import React, { useState, useMemo } from 'react';
import { dockerComposeToK8s } from '@/lib/dockerComposeToK8s';

export default function DockerComposeToK8sTool() {
  const [compose, setCompose] = useState('version: "3"\nservices:\n  api:\n    image: node:18-alpine\n    ports:\n      - "3000:3000"');
  const k8s = useMemo(() => dockerComposeToK8s(compose), [compose]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={14} value={compose} onChange={(e) => setCompose(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={14} value={k8s} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
