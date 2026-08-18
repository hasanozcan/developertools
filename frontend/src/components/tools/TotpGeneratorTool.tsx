'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, ShieldCheck, QrCode } from 'lucide-react';
import { generateBase32Secret, generateTotpCode, generateOtpAuthUri } from '@/lib/totpGenerator';
import { useLanguage } from '@/context/LanguageContext';

export default function TotpGeneratorTool() {
  const { t } = useLanguage();
  const [secret, setSecret] = useState('');
  const [issuer, setIssuer] = useState('DevsTools');
  const [account, setAccount] = useState('user@example.com');
  const [currentCode, setCurrentCode] = useState('------');
  const [remaining, setRemaining] = useState(30);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  useEffect(() => {
    setSecret(generateBase32Secret(16));
  }, []);

  useEffect(() => {
    if (!secret) return;

    const updateCode = async () => {
      const { code, remainingSeconds } = await generateTotpCode(secret);
      setCurrentCode(code);
      setRemaining(remainingSeconds);
    };

    updateCode();
    const interval = setInterval(updateCode, 1000);
    return () => clearInterval(interval);
  }, [secret]);

  const regenerateSecret = () => {
    setSecret(generateBase32Secret(16));
  };

  const otpauthUri = generateOtpAuthUri(issuer, account, secret);

  const copyText = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{t('tool.totp.privacyNotice') || '100% Client-Side Privacy: All TOTP codes (RFC 6238) and secret keys are generated inside your browser using the Web Crypto API. Secrets are never transmitted.'}</span>
      </div>

      {/* Main Display: 6-Digit Code & Countdown */}
      <div className="surface-card rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-sm border border-slate-200/80 dark:border-white/5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Live 2FA / TOTP Security Code
        </span>
        <div className="flex items-center gap-3">
          <div className="font-mono text-4xl sm:text-5xl font-black tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 px-6 py-3 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 shadow-inner">
            {currentCode.slice(0, 3)} {currentCode.slice(3)}
          </div>
          <button
            onClick={() => copyText(currentCode, setCopiedCode)}
            className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition active:scale-95"
            title="Copy 6-Digit Code"
          >
            {copiedCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        {/* 30-Second Countdown Bar */}
        <div className="w-full max-w-xs space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>Next code in:</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{remaining}s</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              style={{ width: `${(remaining / 30) * 100}%` }}
              className={`h-full transition-all duration-1000 ${
                remaining <= 5 ? 'bg-red-500' : 'bg-indigo-600'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Secret Configuration & Details */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Base32 Secret Key
              </label>
              <button
                onClick={regenerateSecret}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3 h-3" /> New Key
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono uppercase font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Issuer Name
            </label>
            <input
              type="text"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Account Email / Label
            </label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* OTPAuth URI */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              otpauth:// URI (for QR &amp; Authenticator Apps)
            </span>
            <button
              onClick={() => copyText(otpauthUri, setCopiedSecret)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {copiedSecret ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy URI')}
            </button>
          </div>
          <input
            type="text"
            readOnly
            value={otpauthUri}
            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
