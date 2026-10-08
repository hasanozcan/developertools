'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { curlToPython } from '@/lib/curlToPython';
import { Copy, Check, Terminal, Play } from 'lucide-react';

export default function CurlToPythonTool() {
  const { t } = useLanguage();
  const [curl, setCurl] = useState('curl -X POST https://api.example.com/v1/users -H "Authorization: Bearer token123" -H "Content-Type: application/json" -d "{\"name\":\"Alex\",\"role\":\"admin\"}"');
  const [lib, setLib] = useState<'requests' | 'httpx'>('requests');
  const [copied, setCopied] = useState(false);

  const pythonCode = curlToPython(curl, lib);

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("uiText.44defa7e")}</label>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setLib('requests')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${lib === 'requests' ? 'bg-white shadow-sm text-indigo-600 dark:bg-slate-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
            >
              {t("uiText.66ad5ad3")}</button>
            <button
              onClick={() => setLib('httpx')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${lib === 'httpx' ? 'bg-white shadow-sm text-indigo-600 dark:bg-slate-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
            >
              httpx
            </button>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? t("uiText.8dc21305") : t("uiText.e69acad7")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("uiText.5a50d337")}</label>
          <textarea
            value={curl}
            onChange={(e) => setCurl(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
            placeholder={t("uiText.70379f47")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("uiText.00e8ce21")}</label>
          <pre className="h-[235px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 dark:border-white/10">
            {pythonCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
