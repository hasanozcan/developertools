'use client';
import React, { useState, useMemo } from 'react';
import { formatTerraformHcl } from '@/lib/terraformFormatter';

export default function TerraformFormatterTool() {
  const [raw, setRaw] = useState('resource "aws_s3_bucket" "b" {\nbucket = "my-bucket"\ntags = {\nEnvironment = "Dev"\n}\n}');
  const formatted = useMemo(() => formatTerraformHcl(raw), [raw]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={raw} onChange={(e) => setRaw(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={formatted} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
