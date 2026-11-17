'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { computeKeccak256, type Keccak256Result } from '@/lib/ethereumKeccak256Hasher';

export default function EthereumKeccak256HasherTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('transfer(address,uint256)');
  const [result, setResult] = useState<Keccak256Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    computeKeccak256(input)
      .then((res) => {
        if (!active) return;
        setResult(res);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setResult(null);
        setError(err instanceof Error ? err.message : 'Failed to compute Keccak-256 hash.');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [input]);

  const outputText = error ? `Error: ${error}` : result?.keccak256Hex ?? '';

  const handleCopy = () => {
    if (!result?.keccak256Hex) return;
    navigator.clipboard.writeText(result.keccak256Hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">{t('common.input')}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">{t('common.output')}</label>
          <button
            onClick={handleCopy}
            disabled={!result?.keccak256Hex || loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t('uiText.8dc21305') : t('common.copy')}
          </button>
        </div>
        <textarea
          readOnly
          value={loading && !outputText ? '...' : outputText}
          rows={4}
          className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm text-foreground shadow-sm"
        />
        {result && !error && (
          <div className="rounded-xl border border-border bg-muted/20 px-4 py-2.5 text-xs font-mono text-muted-foreground">
            <span>4-Byte Selector: </span>
            <span className="font-semibold text-foreground">{result.methodSig}</span>
          </div>
        )}
      </div>
    </div>
  );
}
