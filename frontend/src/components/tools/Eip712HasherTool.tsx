'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { computeEip712Hash, type Eip712HashResult } from '@/lib/eip712Hasher';
import { Copy, Check } from 'lucide-react';

export default function Eip712HasherTool() {
  const { t } = useLanguage();
  const [domainName, setDomainName] = useState('MyApp');
  const [chainId, setChainId] = useState(1);
  const [contract, setContract] = useState('0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC');
  const [primaryType, setPrimaryType] = useState('Mail');
  const [messageJson, setMessageJson] = useState('{\n  "contents": "Hello Web3"\n}');
  const [res, setRes] = useState<Eip712HashResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    let parsedMessage: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(messageJson);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Message must be a JSON object.');
      }
      parsedMessage = parsed as Record<string, unknown>;
    } catch (err: unknown) {
      setRes(null);
      setError(err instanceof Error ? err.message : 'Invalid JSON message.');
      setLoading(false);
      return () => {
        active = false;
      };
    }

    computeEip712Hash(
      { name: domainName, version: '1', chainId, verifyingContract: contract },
      primaryType,
      parsedMessage,
    )
      .then((output) => {
        if (!active) return;
        setRes(output);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setRes(null);
        setError(err instanceof Error ? err.message : 'Failed to compute EIP-712 hash.');
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [domainName, chainId, contract, primaryType, messageJson]);

  const handleCopy = () => {
    if (!res?.eip712Digest) return;
    navigator.clipboard.writeText(res.eip712Digest);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-500">{t('uiText.ebf72648')}</label>
          <input
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">{t('uiText.2e0454af')}</label>
          <input
            type="number"
            value={chainId}
            onChange={(e) => setChainId(parseInt(e.target.value, 10) || 1)}
            className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">{t('uiText.ecedc46e')}</label>
          <input
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">Primary Type</label>
          <input
            value={primaryType}
            onChange={(e) => setPrimaryType(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500">Message (JSON)</label>
        <textarea
          value={messageJson}
          onChange={(e) => setMessageJson(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-500 uppercase">{t('uiText.84fe49e0')}</label>
            <button
              onClick={handleCopy}
              disabled={!res?.eip712Digest || loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? t('uiText.8dc21305') : t('common.copy')}
            </button>
          </div>
          <p className="font-mono text-xs bg-slate-900 text-emerald-400 p-3 rounded-xl break-all">
            {loading && !res ? '...' : res?.eip712Digest ?? ''}
          </p>
          {res && (
            <div className="grid grid-cols-1 gap-2 text-xs font-mono">
              <div className="rounded-xl bg-slate-900/80 p-3 text-slate-300 break-all">
                <span className="text-slate-400">Domain Separator: </span>
                {res.domainSeparator}
              </div>
              <div className="rounded-xl bg-slate-900/80 p-3 text-slate-300 break-all">
                <span className="text-slate-400">Struct Hash: </span>
                {res.structHash}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
