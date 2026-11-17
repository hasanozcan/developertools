'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { computeTotp, type TotpResult } from '@/lib/totpAuthenticatorSimulator';

export default function TotpAuthenticatorSimulatorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('JBSWY3DPEHPK3PXP');
  const [result, setResult] = useState<TotpResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    const refresh = () => {
      computeTotp(input)
        .then((res) => {
          if (!active) return;
          setResult(res);
          setError(null);
        })
        .catch((err: unknown) => {
          if (!active) return;
          setResult(null);
          setError(err instanceof Error ? err.message : 'Failed to compute TOTP code.');
        });
    };

    refresh();
    const timer = setInterval(refresh, 1000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [input]);

  const handleCopy = () => {
    if (!result?.code) return;
    navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">{t('common.input')}</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="JBSWY3DPEHPK3PXP"
          className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">{t('common.output')}</label>
          <button
            onClick={handleCopy}
            disabled={!result?.code}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t('uiText.8dc21305') : t('common.copy')}
          </button>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-muted/30 p-6 flex items-center justify-between">
            <span className="font-mono text-3xl font-bold tracking-widest text-foreground">
              {result?.code ?? '------'}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {result ? `${result.remainingSeconds}s / ${result.timeStepSeconds}s` : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
