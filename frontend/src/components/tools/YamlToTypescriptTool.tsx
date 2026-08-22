'use client';
import React, { useState, useMemo } from 'react';
import { yamlToTypescript } from '@/lib/yamlToTypescript';

export default function YamlToTypescriptTool() {
  const [yaml, setYaml] = useState('server_port: 8080\nenable_ssl: true\napp_name: MyAwesomeApp');
  const output = useMemo(() => yamlToTypescript(yaml, 'AppConfig'), [yaml]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={yaml} onChange={(e) => setYaml(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={output} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
