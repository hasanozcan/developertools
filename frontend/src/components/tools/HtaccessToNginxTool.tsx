'use client';

import React, { useState, useMemo } from 'react';
import { Server, Copy, Check } from 'lucide-react';
import { convertHtaccessToNginx } from '@/lib/htaccessToNginx';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_HTACCESS = `# 301 Redirects
Redirect 301 /old-page /new-page
Redirect 301 /contact-us /contact

# URL Rewrites
RewriteEngine On
RewriteRule ^blog/([0-9]+)/?$ /post.php?id=$1 [L]
RewriteRule ^user/(.*)$ /profile.php?u=$1 [R=301,L]

# Custom Headers
Header set X-Frame-Options "SAMEORIGIN"`;

export default function HtaccessToNginxTool() {
  const { t } = useLanguage();
  const [htaccessInput, setHtaccessInput] = useState(SAMPLE_HTACCESS);
  const [copied, setCopied] = useState(false);

  const nginxOutput = useMemo(() => convertHtaccessToNginx(htaccessInput), [htaccessInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(nginxOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="surface-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.htaccess.title') || 'Apache .htaccess to Nginx Rewrite Converter'}
          </span>
        </div>
      </div>

      {/* Grid: .htaccess in -> Nginx out */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Apache .htaccess Rules</span>
            <button
              onClick={() => setHtaccessInput(SAMPLE_HTACCESS)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={htaccessInput}
            onChange={(e) => setHtaccessInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Nginx Config Output</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Nginx')}
            </button>
          </div>
          <textarea
            readOnly
            value={nginxOutput}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
