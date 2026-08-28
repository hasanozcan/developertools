'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { convertDockerComposeToK8s } from '@/lib/dockerComposeToK8s';

const SAMPLE_COMPOSE = `version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  backend:
    image: node:18-alpine
    ports:
      - "3000:3000"
`;

export default function DockerComposeToK8sTool() {
  const [input, setInput] = useState(SAMPLE_COMPOSE);
  const output = convertDockerComposeToK8s(input);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">docker-compose.yml</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Kubernetes Deployment & Service YAML</label>
            <CopyButton text={output} />
          </div>
          <pre className="h-64 overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-purple-400 dark:border-slate-700">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
