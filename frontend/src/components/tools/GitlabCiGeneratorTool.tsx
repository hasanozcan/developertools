'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateGitLabCiYaml } from '@/lib/gitlabCiGenerator';

export default function GitlabCiGeneratorTool() {
  const [nodeVersion, setNodeVersion] = useState('20-alpine');
  const [stages, setStages] = useState('lint, test, build, deploy');
  const [copied, setCopied] = useState(false);

  const yaml = useMemo(() => {
    return generateGitLabCiYaml({
      stages: stages.split(',').map(s => s.trim()).filter(Boolean),
      nodeVersion,
    });
  }, [nodeVersion, stages]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Node Docker Image Version</label>
          <input value={nodeVersion} onChange={(e) => setNodeVersion(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Stages (comma separated)</label>
          <input value={stages} onChange={(e) => setStages(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">.gitlab-ci.yml</label>
          <button onClick={() => { navigator.clipboard.writeText(yaml); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={yaml} rows={10} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
