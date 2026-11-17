'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, Server } from 'lucide-react';
import { convertNginxToCaddy } from '@/lib/nginxToCaddyConverter';

export default function NginxToCaddyConverterTool() {
  const { t } = useLanguage();
  const [nginxInput, setNginxInput] = useState(
    `server {\n    listen 80;\n    server_name api.devstools.app;\n    \n    location /api/ {\n        proxy_pass http://localhost:3000;\n    }\n}`
  );
  const [target, setTarget] = useState<'caddy' | 'apache'>('caddy');
  const [copied, setCopied] = useState(false);

  const converted = useMemo(() => {
    return convertNginxToCaddy(nginxInput);
  }, [nginxInput]);

  const outputText = target === 'caddy' ? converted.caddyfile : converted.apache;

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="inline-flex rounded-lg border border-gray-300 bg-gray-100 p-1 dark:border-gray-600 dark:bg-gray-800">
          <button
            onClick={() => setTarget('caddy')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              target === 'caddy'
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {t("uiText.b1759b33")}</button>
          <button
            onClick={() => setTarget('apache')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              target === 'apache'
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {t("uiText.20271e77")}</button>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          {copied ? <Check className="w-4 h-4 text-green-200" /> : <Copy className="w-4 h-4" />}
          {copied ? t("uiText.8dc21305") : t("uiText.1ceeb23a")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("uiText.8ccae7b0")}</label>
          <textarea
            value={nginxInput}
            onChange={(e) => setNginxInput(e.target.value)}
            className="w-full h-80 rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {target === 'caddy' ? t("uiText.2ade39b7") : t("uiText.d5d986d6")}
          </label>
          <textarea
            readOnly
            value={outputText}
            className="w-full h-80 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
