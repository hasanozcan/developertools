'use client';
import React, { useState, useMemo } from 'react';
import { evaluateHelmTemplate } from '@/lib/helmValuesEvaluator';

export default function HelmValuesEvaluatorTool() {
  const [tmpl, setTmpl] = useState('replicas: {{ .Values.replicaCount }}');
  const output = useMemo(() => evaluateHelmTemplate(tmpl, { replicaCount: 3 }), [tmpl]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={tmpl} onChange={(e) => setTmpl(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={output} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
