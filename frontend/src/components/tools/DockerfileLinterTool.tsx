'use client';
import React, { useState, useMemo } from 'react';
import { lintDockerfile } from '@/lib/dockerfileLinter';

export default function DockerfileLinterTool() {
  const [df, setDf] = useState('FROM node:latest\nRUN apt-get update\nCOPY . .\nCMD ["npm", "start"]');
  const issues = useMemo(() => lintDockerfile(df), [df]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={6} value={df} onChange={(e) => setDf(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="space-y-2">
          {issues.map((iss, i) => (
            <p key={i} className="text-xs p-2 bg-amber-500/10 text-amber-600 rounded">Line {iss.line}: {iss.message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
