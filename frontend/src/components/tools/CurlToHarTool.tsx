'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { convertCurlToHar } from '@/lib/curlToHar';
import { Copy, Check, Download, Play } from 'lucide-react';
import { publishToolOutput, readTransferredInput } from '@/lib/toolWorkflow';
import { localizeUiText } from '@/lib/localizedText';

const DEFAULT_CURL = `curl -X POST "https://api.example.com/v1/users?ref=dashboard" \\
  -H "Authorization: Bearer sec_tok_9981" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Jane Doe", "role": "admin"}'`;

export default function CurlToHarTool() {
  const { t } = useLanguage();
  const [curlInput, setCurlInput] = useState(DEFAULT_CURL);
  const [harOutput, setHarOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const transferred = readTransferredInput(window.location.hash);
    if (transferred) setCurlInput(transferred.value);
  }, []);

  const handleConvert = () => {
    try {
      setError(null);
      const res = convertCurlToHar(curlInput);
      const output = JSON.stringify(res, null, 2);
      setHarOutput(output);
      publishToolOutput({ toolSlug: 'curl-to-har', value: output, dataType: 'har' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid cURL command');
    }
  };

  const handleCopy = () => {
    if (!harOutput) return;
    navigator.clipboard.writeText(harOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!harOutput) return;
    const blob = new Blob([harOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archive.har';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">{t("uiText.131c2e4e")}</label>
            <button
              onClick={handleConvert}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Play className="h-3.5 w-3.5" /> {t("uiText.1d069656")}</button>
          </div>
          <textarea
            value={curlInput}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurlInput(e.target.value)}
            placeholder={t("uiText.70379f47")}
            rows={14}
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
            <label className="text-sm font-semibold text-foreground">{t("uiText.43eb9738")}</label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!harOutput}
                className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t("uiText.8dc21305") : t("common.copy")}
              </button>
              <button
                onClick={handleDownload}
                disabled={!harOutput}
                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> {t("uiText.b4e036da")}</button>
            </div>
          </div>
          <textarea
            readOnly
            value={harOutput}
            placeholder={t("uiText.438dff31")}
            rows={14}
            className="w-full rounded-lg border border-input bg-muted/30 p-3 font-mono text-xs text-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
