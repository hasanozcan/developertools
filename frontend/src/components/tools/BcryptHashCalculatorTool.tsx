'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, Lock, ShieldCheck } from 'lucide-react';
import { generateBcryptMockHash, parseBcryptHash } from '@/lib/bcryptHashCalculator';

export default function BcryptHashCalculatorTool() {
  const { t } = useLanguage();
  const [password, setPassword] = useState('SuperSecretPassword2026!');
  const [cost, setCost] = useState<number>(10);
  const [hashInput, setHashInput] = useState('');
  const [copied, setCopied] = useState(false);

  const generatedHash = useMemo(() => {
    if (!password) return '';
    return generateBcryptMockHash(password, cost);
  }, [password, cost]);

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
      <div className="p-4 rounded-xl border border-border bg-card space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" /> {t("uiText.ccfc4bfb")}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">{t("uiText.c791f777")}</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered input-sm w-full font-mono text-xs"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              {t("uiText.452a869f")}{cost})
            </label>
            <input
              type="range"
              min="4"
              max="16"
              value={cost}
              onChange={(e) => setCost(parseInt(e.target.value, 10))}
              className="range range-primary range-sm w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-muted-foreground">{t("uiText.2a71d561")}</label>
            <button onClick={handleCopy} className="btn btn-primary btn-xs gap-1">
              {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t("uiText.8dc21305") : t("uiText.78551acc")}
            </button>
          </div>
          <input
            type="text"
            readOnly
            value={generatedHash}
            className="input input-bordered input-sm w-full font-mono text-xs bg-muted/30 text-primary font-semibold"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl border border-border bg-card space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" /> {t("uiText.adaad8e7")}</h3>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            {t("uiText.22d1b747")}</label>
          <input
            type="text"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            placeholder={t("uiText.1eccde8a")}
            className="input input-bordered input-sm w-full font-mono text-xs"
          />
        </div>

        {hashInspection && (
          <div className="p-3 rounded-lg bg-muted/40 border border-border text-xs space-y-1">
            {hashInspection.isValid ? (
              <div className="space-y-1">
                <span className="text-success font-semibold">{t("uiText.14c4bb16")}</span>
                <div className="font-mono text-muted-foreground">
                  {t("uiText.b8066377")}<span className="text-foreground">${hashInspection.version}</span> {' ' + t("uiText.cef1284a") + ' '}<span className="text-foreground">{hashInspection.cost}</span>
                </div>
                <div className="font-mono text-muted-foreground truncate">
                  {t("uiText.a37d85b9")}<span className="text-foreground">{hashInspection.salt}</span>
                </div>
              </div>
            ) : (
              <span className="text-error font-semibold">{t("uiText.8abc70e6")}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
