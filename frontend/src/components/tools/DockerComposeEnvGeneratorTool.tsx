'use client';
import React, { useState } from 'react';
import { generateDotenvFromCompose } from '@/lib/dockerComposeEnvGenerator';
import { Copy, Check } from 'lucide-react';

export default function DockerComposeEnvGeneratorTool() {
  const [yaml, setYaml] = useState(`version: '3.8'\nservices:\n  db:\n    image: postgres:\${POSTGRES_VERSION:-16}\n    environment:\n      POSTGRES_DB: \${DB_NAME}\n      POSTGRES_PASSWORD: \${DB_PASSWORD}`);
  const [copied, setCopied] = useState(false);
  const dotenv = generateDotenvFromCompose(yaml);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { navigator.clipboard.writeText(dotenv); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy .env
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea value={yaml} onChange={(e) => setYaml(e.target.value)} rows={10} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs dark:border-white/10 dark:bg-slate-950" />
        <pre className="h-[200px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-amber-400 dark:border-white/10">{dotenv}</pre>
      </div>
    </div>
  );
}
