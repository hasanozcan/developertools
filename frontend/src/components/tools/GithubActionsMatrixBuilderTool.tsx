'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateGithubActionsMatrixYaml } from '@/lib/githubActionsMatrixBuilder';

export default function GithubActionsMatrixBuilderTool() {
  const [workflowName, setWorkflowName] = useState('CI Matrix Build');
  const [osList, setOsList] = useState('ubuntu-latest, macos-latest, windows-latest');
  const [nodeVersions, setNodeVersions] = useState('18.x, 20.x, 22.x');
  const [copied, setCopied] = useState(false);

  const yaml = useMemo(() => {
    return generateGithubActionsMatrixYaml({
      workflowName,
      osList: osList.split(',').map(s => s.trim()).filter(Boolean),
      nodeVersions: nodeVersions.split(',').map(s => s.trim()).filter(Boolean),
    });
  }, [workflowName, osList, nodeVersions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Workflow Name</label>
          <input value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} className="w-full p-2 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">OS Runners (comma separated)</label>
          <input value={osList} onChange={(e) => setOsList(e.target.value)} className="w-full p-2 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Node.js Versions</label>
          <input value={nodeVersions} onChange={(e) => setNodeVersions(e.target.value)} className="w-full p-2 rounded-lg border border-border bg-card text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">.github/workflows/ci.yml</label>
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
