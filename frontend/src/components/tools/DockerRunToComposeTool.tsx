'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, RefreshCw, Terminal, Layers } from 'lucide-react';
import { parseDockerRun, generateDockerComposeYaml } from '@/lib/dockerComposeConverter';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_DOCKER_RUN = `docker run -d \\
  --name web_app \\
  -p 8080:80 \\
  -v /var/data:/usr/share/nginx/html:ro \\
  -e NODE_ENV=production \\
  -e API_URL=https://api.example.com \\
  --restart always \\
  --network custom_network \\
  nginx:alpine`;

export default function DockerRunToComposeTool() {
  const { t } = useLanguage();
  const [command, setCommand] = useState(SAMPLE_DOCKER_RUN);
  const [copied, setCopied] = useState(false);

  const { composeYaml, error } = useMemo(() => {
    if (!command.trim()) {
      return { composeYaml: '', error: null };
    }
    try {
      const parsed = parseDockerRun(command);
      const yaml = generateDockerComposeYaml(parsed);
      return { composeYaml: yaml, error: null };
    } catch (err: any) {
      return { composeYaml: '', error: err.message || 'Failed to parse docker run command' };
    }
  }, [command]);

  const handleCopy = () => {
    if (!composeYaml) return;
    navigator.clipboard.writeText(composeYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Docker Run Input */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-indigo-500" /> Paste Docker Run Command
            </span>
            <button
              onClick={() => setCommand(SAMPLE_DOCKER_RUN)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Load Sample
            </button>
          </div>
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="docker run -d -p 80:80 --name my_app nginx..."
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        {/* Docker Compose YAML Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-indigo-500" /> Docker Compose (docker-compose.yml)
            </span>
            {composeYaml && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy YAML'}
              </button>
            )}
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={composeYaml}
              placeholder="docker-compose.yml will appear here..."
              rows={14}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
            />
          )}
        </div>
      </div>
    </div>
  );
}
