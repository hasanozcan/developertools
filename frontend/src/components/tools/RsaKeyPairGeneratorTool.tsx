'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, ShieldCheck, Key, RefreshCw } from 'lucide-react';
import { generateRsaKeyPair, generateEcdsaKeyPair, type KeyPairResult } from '@/lib/rsaKeygen';
import { useLanguage } from '@/context/LanguageContext';

export default function RsaKeyPairGeneratorTool() {
  const { t } = useLanguage();
  const [algoType, setAlgoType] = useState<'RSA' | 'ECDSA'>('RSA');
  const [rsaBits, setRsaBits] = useState<2048 | 3072 | 4096>(2048);
  const [ecdsaCurve, setEcdsaCurve] = useState<'P-256' | 'P-384' | 'P-521'>('P-256');
  const [loading, setLoading] = useState(false);
  const [keyPair, setKeyPair] = useState<KeyPairResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generateKeys = async () => {
    setLoading(true);
    try {
      if (algoType === 'RSA') {
        const res = await generateRsaKeyPair(rsaBits);
        setKeyPair(res);
      } else {
        const res = await generateEcdsaKeyPair(ecdsaCurve);
        setKeyPair(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoType, rsaBits, ecdsaCurve]);

  const copyPem = (pem: string, type: 'public' | 'private') => {
    navigator.clipboard.writeText(pem);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const downloadPem = (pem: string, filename: string) => {
    const blob = new Blob([pem], { type: 'application/x-pem-file' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Bar */}
      <div className="surface-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('tool.rsa.algorithm') || 'Algorithm'}:
            </span>
          </div>

          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-900">
            <button
              onClick={() => setAlgoType('RSA')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                algoType === 'RSA'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              RSA
            </button>
            <button
              onClick={() => setAlgoType('ECDSA')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                algoType === 'ECDSA'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ECDSA
            </button>
          </div>

          {algoType === 'RSA' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">{t('tool.rsa.keySize') || 'Key Size'}:</span>
              <select
                value={rsaBits}
                onChange={(e) => setRsaBits(parseInt(e.target.value, 10) as any)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
              >
                <option value={2048}>2048-bit (Standard)</option>
                <option value={3072}>3072-bit (Secure)</option>
                <option value={4096}>4096-bit (Ultra-Secure)</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">{t('tool.rsa.curve') || 'Curve'}:</span>
              <select
                value={ecdsaCurve}
                onChange={(e) => setEcdsaCurve(e.target.value as any)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
              >
                <option value="P-256">NIST P-256 (secp256r1)</option>
                <option value="P-384">NIST P-384 (secp384r1)</option>
                <option value="P-521">NIST P-521 (secp521r1)</option>
              </select>
            </div>
          )}
        </div>

        <button
          onClick={generateKeys}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? (t('common.generating') || 'Generating...') : (t('tool.rsa.generate') || 'Generate New Key Pair')}
        </button>
      </div>

      {/* Security Privacy Notice */}
      <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{t('tool.rsa.securityNotice') || '100% Client-Side Privacy: Keys are generated directly in your browser using the Web Crypto API (SubtleCrypto). Private keys are never sent to any server.'}</span>
      </div>

      {/* Keys Output */}
      {keyPair && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Public Key */}
          <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Public Key (SPKI PEM)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => copyPem(keyPair.publicKeyPem, 'public')}
                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
                >
                  {copiedKey === 'public' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'public' ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy')}
                </button>
                <button
                  onClick={() => downloadPem(keyPair.publicKeyPem, `${algoType.toLowerCase()}_public_key.pem`)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                  title="Download PEM"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={keyPair.publicKeyPem}
              rows={12}
              className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-[11px] text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-cyan-300 resize-y"
            />
          </div>

          {/* Private Key */}
          <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400">
                Private Key (PKCS#8 PEM)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => copyPem(keyPair.privateKeyPem, 'private')}
                  className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300"
                >
                  {copiedKey === 'private' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'private' ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy')}
                </button>
                <button
                  onClick={() => downloadPem(keyPair.privateKeyPem, `${algoType.toLowerCase()}_private_key.pem`)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                  title="Download PEM"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={keyPair.privateKeyPem}
              rows={12}
              className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-[11px] text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-amber-300 resize-y"
            />
          </div>
        </div>
      )}
    </div>
  );
}
