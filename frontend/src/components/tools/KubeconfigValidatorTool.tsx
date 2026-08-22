'use client';
import React, { useState, useMemo } from 'react';
import { validateKubeconfig } from '@/lib/kubeconfigValidator';

export default function KubeconfigValidatorTool() {
  const [yaml, setYaml] = useState('apiVersion: v1\nkind: Config\ncurrent-context: prod\nclusters:\n- cluster:\n    server: https://10.0.0.1\n  name: prod');
  const res = useMemo(() => validateKubeconfig(yaml), [yaml]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={6} value={yaml} onChange={(e) => setYaml(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-emerald-500/10 rounded-xl text-xs">
          <p><strong>Valid Kubeconfig:</strong> {res.isValid ? 'YES' : 'NO'}</p>
          <p><strong>Current Context:</strong> {res.currentContext || 'None'}</p>
        </div>
      </div>
    </div>
  );
}
