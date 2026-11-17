'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { generateUuidV5 } from '@/lib/uuidV5Generator';
import { Copy, Check } from 'lucide-react';

export default function UuidV5GeneratorTool() {
  const { t } = useLanguage();
  const [namespace, setNamespace] = useState('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
  const [name, setName] = useState('devstools.app');
  const [uuid, setUuid] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    generateUuidV5(namespace, name)
      .then((result) => {
        if (!active) return;
        setUuid(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setUuid('');
        setError(err instanceof Error ? err.message : 'Failed to generate UUID v5.');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [namespace, name]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500">{t('uiText.02197d13')}</label>
          <input
            value={namespace}
            onChange={(e) => setNamespace(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">{t('uiText.d02df5cb')}</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-900/30 dark:bg-indigo-950/20 flex justify-between items-center gap-4">
          <div className="min-w-0">
            <span className="text-xs font-semibold text-slate-500 uppercase">{t('uiText.96d90199')}</span>
            <p className="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 break-all">
              {loading && !uuid ? '...' : uuid}
            </p>
          </div>
          <button
            disabled={!uuid || loading}
            onClick={() => {
              if (!uuid) return;
              navigator.clipboard.writeText(uuid);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? t('uiText.8dc21305') : t('uiText.711459c7')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
