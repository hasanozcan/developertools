'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Layers } from 'lucide-react';
import { generateDockerfile, type ProjectType } from '@/lib/dockerfileTemplates';
import { useLanguage } from '@/context/LanguageContext';

export default function DockerfileGeneratorTool() {
  const { t } = useLanguage();
  const [projectType, setProjectType] = useState<ProjectType>('node');
  const [version, setVersion] = useState('20-alpine');
  const [port, setPort] = useState(3000);
  const [packageManager, setPackageManager] = useState<'npm' | 'yarn' | 'pnpm'>('npm');
  const [entrypoint, setEntrypoint] = useState('src/index.js');
  const [isMultiStage, setIsMultiStage] = useState(true);
  const [copied, setCopied] = useState(false);

  const dockerfileCode = useMemo(() => {
    return generateDockerfile({
      projectType,
      version,
      port,
      packageManager,
      entrypoint,
      isMultiStage,
    });
  }, [projectType, version, port, packageManager, entrypoint, isMultiStage]);

  const handleTypeChange = (type: ProjectType) => {
    setProjectType(type);
    if (type === 'node') {
      setVersion('20-alpine');
      setPort(3000);
      setEntrypoint('src/index.js');
    } else if (type === 'python') {
      setVersion('3.11-slim');
      setPort(8000);
      setEntrypoint('app.py');
    } else if (type === 'go') {
      setVersion('1.22-alpine');
      setPort(8080);
    } else if (type === 'rust') {
      setVersion('1.78-alpine');
      setPort(8080);
    } else if (type === 'static') {
      setPort(80);
    } else if (type === 'php') {
      setVersion('8.2-apache');
      setPort(80);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dockerfileCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([dockerfileCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Dockerfile';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Platform & Options Selector */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            {t('tool.dockerfile.platform') || 'Target Platform / Stack'}:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'node', label: 'Node.js / Express / Next' },
              { id: 'python', label: 'Python / FastAPI / Flask' },
              { id: 'go', label: 'Go (Golang)' },
              { id: 'rust', label: 'Rust (Cargo)' },
              { id: 'static', label: 'Static HTML / Nginx SPA' },
              { id: 'php', label: 'PHP Apache' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handleTypeChange(p.id as ProjectType)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  projectType === p.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              {t('tool.dockerfile.version') || 'Base Image Version'}
            </label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              {t('tool.dockerfile.port') || 'Exposed Port'}
            </label>
            <input
              type="number"
              value={port}
              onChange={(e) => setPort(parseInt(e.target.value, 10) || 80)}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {projectType === 'node' && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Package Manager
              </label>
              <select
                value={packageManager}
                onChange={(e) => setPackageManager(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="npm">npm (Standard)</option>
                <option value="pnpm">pnpm (Fast &amp; Isolated)</option>
                <option value="yarn">Yarn (Classic)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Generated Dockerfile (Production Multi-stage)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Dockerfile')}
            </button>
            <button
              onClick={handleDownload}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
              title="Download Dockerfile"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <textarea
          readOnly
          value={dockerfileCode}
          rows={16}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-cyan-300 resize-y"
        />
      </div>
    </div>
  );
}
