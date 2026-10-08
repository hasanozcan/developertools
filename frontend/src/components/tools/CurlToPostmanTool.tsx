'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { convertCurlToPostman } from '@/lib/curlToPostman';
import { Copy, Check, Download, ArrowRightLeft } from 'lucide-react';
import { publishToolOutput, readTransferredInput } from '@/lib/toolWorkflow';
import { localizeUiText } from '@/lib/localizedText';

const DEFAULT_CURL = `curl -X POST "https://api.example.com/v1/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "secretpassword"}'`;

export default function CurlToPostmanTool() {
  const { t } = useLanguage();
  const [curlInput, setCurlInput] = useState(DEFAULT_CURL);
  const [collectionName, setCollectionName] = useState('Imported cURL Collection');
  const [postmanJson, setPostmanJson] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const transferred = readTransferredInput(window.location.hash);
    if (transferred) setCurlInput(transferred.value);
  }, []);

  const handleConvert = () => {
    try {
      setError(null);
      const res = convertCurlToPostman(curlInput, collectionName);
      const output = JSON.stringify(res, null, 2);
      setPostmanJson(output);
      publishToolOutput({ toolSlug: 'curl-to-postman', value: output, dataType: 'postman' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid cURL input');
    }
  };

  const handleCopy = () => {
    if (!postmanJson) return;
    navigator.clipboard.writeText(postmanJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!postmanJson) return;
    const blob = new Blob([postmanJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${collectionName.toLowerCase().replace(/\s+/g, '-')}.postman_collection.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">{t("uiText.4f34aaa8")}</label>
            <input
              type="text"
              value={collectionName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCollectionName(e.target.value)}
              placeholder={t("uiText.6ff5b9ff")}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">{t("uiText.531a88ee")}</label>
            <button
              onClick={handleConvert}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ArrowRightLeft className="h-3.5 w-3.5" /> {t("uiText.0db0606b")}</button>
          </div>
          <textarea
            value={curlInput}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurlInput(e.target.value)}
            placeholder={t("uiText.d83b2b36")}
            rows={13}
            className="w-full rounded-lg border border-input bg-background p-3 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
              {localizeUiText(error, t)}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">{t("uiText.c4cf9f2a")}</label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!postmanJson}
                className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t("uiText.8dc21305") : t("common.copy")}
              </button>
              <button
                onClick={handleDownload}
                disabled={!postmanJson}
                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> {t("uiText.41fa1c79")}</button>
            </div>
          </div>
          <textarea
            readOnly
            value={postmanJson}
            placeholder={t("uiText.a909aa41")}
            rows={16}
            className="w-full rounded-lg border border-input bg-muted/30 p-3 font-mono text-xs text-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
