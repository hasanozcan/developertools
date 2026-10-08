'use client';

import React, { useState, useEffect } from 'react';
import { KeyRound, Copy, Check, RefreshCw, ShieldCheck } from 'lucide-react';
import { generateJwtToken } from '@/lib/jwtGenerator';
import { useLanguage } from '@/context/LanguageContext';
import { localizeUiText } from '@/lib/localizedText';

export default function JwtGeneratorTool() {
  const { t } = useLanguage();
  const [algorithm, setAlgorithm] = useState<'HS256' | 'HS384' | 'HS512'>('HS256');
  const [secret, setSecret] = useState('your-256-bit-secret-key-1234567890');
  const [headerJson, setHeaderJson] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payloadJson, setPayloadJson] = useState(
    '{\n  "sub": "user_123456",\n  "name": "Dev User",\n  "role": "admin",\n  "iat": 1771500000\n}'
  );
  const [generatedToken, setGeneratedToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    try {
      const header = JSON.parse(headerJson);
      header.alg = algorithm;
      const payload = JSON.parse(payloadJson);

      const res = await generateJwtToken({
        header,
        payload,
        secret,
        algorithm,
      });

      setGeneratedToken(res.token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid JSON input');
    }
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm, secret, headerJson, payloadJson]);

  const handleCopy = () => {
    if (!generatedToken) return;
    navigator.clipboard.writeText(generatedToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddExp = () => {
    try {
      const parsed = JSON.parse(payloadJson);
      parsed.exp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      setPayloadJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Secret & Algorithm Bar */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.jwtgen.settingsTitle') || 'JWT Signing Key & Algorithm'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">{t("uiText.9945210a")}</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as typeof algorithm)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="HS256">{t("uiText.2c2c19e3")}</option>
              <option value="HS384">{t("uiText.32b729e7")}</option>
              <option value="HS512">{t("uiText.2b8b428d")}</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-500 block mb-1">{t("uiText.0f1f2d7e")}</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              placeholder={t("uiText.b2eaae5a")}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {localizeUiText(error, t)}
        </div>
      )}

      {/* Editors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Header & Payload */}
        <div className="space-y-4">
          <div className="surface-card rounded-2xl p-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-500 block">
              {t("uiText.d3d8e2e0")}</span>
            <textarea
              value={headerJson}
              onChange={(e) => setHeaderJson(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-pink-300"
            />
          </div>

          <div className="surface-card rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
                {t("uiText.0f411e6b")}</span>
              <button
                onClick={handleAddExp}
                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {t("uiText.5060719a")}</button>
            </div>
            <textarea
              value={payloadJson}
              onChange={(e) => setPayloadJson(e.target.value)}
              rows={7}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-purple-300"
            />
          </div>
        </div>

        {/* Encoded JWT Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("uiText.bd9b1dbb")}</span>
              </div>
              {generatedToken && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Token')}
                </button>
              )}
            </div>

            <textarea
              readOnly
              value={generatedToken}
              rows={11}
              className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs break-all text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950"
            />
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
            <span className="text-pink-400 font-bold">{t("tool.jwtDecoder.header")}</span>.
            <span className="text-purple-400 font-bold">{t("tool.jwtDecoder.payload")}</span>.
            <span className="text-cyan-400 font-bold">{t("tool.jwtDecoder.signature")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
