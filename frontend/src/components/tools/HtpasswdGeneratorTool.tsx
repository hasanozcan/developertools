'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, ShieldCheck, KeyRound, RefreshCw } from 'lucide-react';
import { generateHtpasswdLine, type HtpasswdAlgorithm } from '@/lib/htpasswdGenerator';
import { useLanguage } from '@/context/LanguageContext';

export default function HtpasswdGeneratorTool() {
  const { t } = useLanguage();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('MySecurePassword123!');
  const [algorithm, setAlgorithm] = useState<HtpasswdAlgorithm>('bcrypt');
  const [htpasswdLine, setHtpasswdLine] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const entry = await generateHtpasswdLine(username, password, algorithm);
      setHtpasswdLine(entry.line);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password, algorithm]);

  const handleCopy = () => {
    if (!htpasswdLine) return;
    navigator.clipboard.writeText(htpasswdLine);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!htpasswdLine) return;
    const blob = new Blob([htpasswdLine], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.htpasswd';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{t('tool.htpasswd.privacyNotice') || '100% Client-Side Privacy: Password hashing is computed entirely in your browser using the Web Crypto API. Passwords are never sent to any server.'}</span>
      </div>

      {/* Input Form */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              {t('tool.htpasswd.username') || 'Username'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              {t('tool.htpasswd.password') || 'Password'}
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="password"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              {t('tool.htpasswd.algorithm') || 'Hashing Algorithm'}
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as HtpasswdAlgorithm)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="bcrypt">Bcrypt ($2y$ - Recommended)</option>
              <option value="sha1">SHA-1 ({'{SHA}'} - Apache / Nginx standard)</option>
              <option value="plaintext">Plaintext (Testing only)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Output .htpasswd */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              .htpasswd Output Line
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              disabled={!htpasswdLine || loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300 disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy .htpasswd')}
            </button>
            <button
              onClick={handleDownload}
              disabled={!htpasswdLine || loading}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition disabled:opacity-50"
              title="Download .htpasswd"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <textarea
          readOnly
          value={htpasswdLine}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400 resize-none"
        />
      </div>
    </div>
  );
}
