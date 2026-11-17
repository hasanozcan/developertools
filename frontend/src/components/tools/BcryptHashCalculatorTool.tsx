'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, Lock, ShieldCheck } from 'lucide-react';
import { generateBcryptHash, parseBcryptHash } from '@/lib/bcryptHashCalculator';
import { BCRYPT_MAX_BROWSER_COST } from '@/lib/bcrypt';

export default function BcryptHashCalculatorTool() {
  const { t } = useLanguage();
  const [password, setPassword] = useState('SuperSecretPassword2026!');
  const [cost, setCost] = useState<number>(10);
  const [hashInput, setHashInput] = useState('');
  const [copied, setCopied] = useState(false);

  const [generatedHash, setGeneratedHash] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const generate = async () => {
    setBusy(true);
    setGeneratedHash('');
    setError('');
    setCopied(false);
    try {
      setGeneratedHash(await generateBcryptHash(password, cost));
    } catch (error) {
      setError(error instanceof Error ? error.message : t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  const hashInspection = useMemo(() => {
    if (!hashInput.trim()) return null;
    return parseBcryptHash(hashInput);
  }, [hashInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary-600 dark:text-primary-400" /> {t("uiText.ccfc4bfb")}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">{t("uiText.c791f777")}</label>
            <input
              type="text"
              value={password}
              disabled={busy}
              onChange={(e) => { setPassword(e.target.value); setGeneratedHash(''); setError(''); setCopied(false); }}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-mono text-xs text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
              {t("uiText.452a869f")}{cost})
            </label>
            <input
              type="range"
              min="4"
              max={BCRYPT_MAX_BROWSER_COST}
              value={cost}
              disabled={busy}
              onChange={(e) => { setCost(parseInt(e.target.value, 10)); setGeneratedHash(''); setCopied(false); }}
              className="w-full h-2 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-600 disabled:opacity-50 dark:bg-gray-700"
            />
          </div>
        </div>

        <button
          onClick={generate}
          disabled={busy || !password}
          className="inline-flex items-center rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? t('tool.bcrypt.generating') : t('common.generate')}
        </button>
        {error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </p>
        )}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{t("uiText.2a71d561")}</label>
            <button
              onClick={handleCopy}
              disabled={!generatedHash || busy}
              className="inline-flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-200" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t("uiText.8dc21305") : t("uiText.78551acc")}
            </button>
          </div>
          <input
            type="text"
            readOnly
            value={generatedHash}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 font-mono text-xs font-semibold text-primary-600 dark:border-gray-600 dark:bg-gray-900 dark:text-primary-400"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary-600 dark:text-primary-400" /> {t("uiText.adaad8e7")}</h3>

        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
            {t("uiText.22d1b747")}</label>
          <input
            type="text"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            placeholder={t("uiText.1eccde8a")}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-mono text-xs text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>

        {hashInspection && (
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs space-y-1 dark:bg-gray-900 dark:border-gray-700">
            {hashInspection.isValid ? (
              <div className="space-y-1">
                <span className="text-green-600 dark:text-green-400 font-semibold">{t("uiText.14c4bb16")}</span>
                <div className="font-mono text-gray-500 dark:text-gray-400">
                  {t("uiText.b8066377")} <span className="text-gray-900 dark:text-white">${hashInspection.version}</span> {' ' + t("uiText.cef1284a") + ' '}<span className="text-gray-900 dark:text-white">{hashInspection.cost}</span>
                </div>
                <div className="font-mono text-gray-500 dark:text-gray-400 truncate">
                  {t("uiText.a37d85b9")} <span className="text-gray-900 dark:text-white">{hashInspection.salt}</span>
                </div>
              </div>
            ) : (
              <span className="text-red-600 dark:text-red-400 font-semibold">{t("uiText.8abc70e6")}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
