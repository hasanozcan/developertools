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
      <div className="flex items-center justify-between">
        <div className="btn-group">
          <button
            onClick={() => setTarget('caddy')}
            className={`btn btn-sm ${target === 'caddy' ? 'btn-primary' : 'btn-outline'}`}
          >
            {t("uiText.b1759b33")}</button>
          <button
            onClick={() => setTarget('apache')}
            className={`btn btn-sm ${target === 'apache' ? 'btn-primary' : 'btn-outline'}`}
          >
            {t("uiText.20271e77")}</button>
        </div>

        <button onClick={handleCopy} className="btn btn-primary btn-sm gap-2">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? t("uiText.8dc21305") : t("uiText.1ceeb23a")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            {t("uiText.8ccae7b0")}</label>
          <textarea
            value={nginxInput}
            onChange={(e) => setNginxInput(e.target.value)}
            className="textarea textarea-bordered w-full h-80 font-mono text-xs leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            {target === 'caddy' ? t("uiText.2ade39b7") : t("uiText.d5d986d6")}
          </label>
          <textarea
            readOnly
            value={outputText}
            className="textarea textarea-bordered w-full h-80 font-mono text-xs leading-relaxed bg-muted/40 text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
