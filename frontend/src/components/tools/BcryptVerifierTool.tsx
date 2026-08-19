'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { parseBcryptHash, verifyBcryptHash } from '@/lib/bcryptVerifier';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
const SAMPLE_PASSWORD = 'password';

export default function BcryptVerifierTool() {
  const { t } = useLanguage();
  const [plainPassword, setPlainPassword] = useState(SAMPLE_PASSWORD);
  const [hashInput, setHashInput] = useState(SAMPLE_HASH);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const parsedInfo = parseBcryptHash(hashInput);

  const handleVerify = async () => {
    setErrorMessage(null);
    setVerificationResult(null);

    if (!plainPassword) {
      setErrorMessage('Please enter a plain text password to test.');
      return;
    }

    if (!parsedInfo.isValidStructure) {
      setErrorMessage('Invalid Bcrypt hash format (expected standard $2a$, $2b$, or $2y$ prefix).');
      return;
    }

    setIsVerifying(true);
    try {
      const match = await verifyBcryptHash(plainPassword, hashInput);
      setVerificationResult(match);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Verification failed.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Fields */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.bcryptv.inputTitle') || 'Password & Bcrypt Hash Verification'}
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Plain Text Password</label>
            <input
              type="text"
              value={plainPassword}
              onChange={(e) => {
                setPlainPassword(e.target.value);
                setVerificationResult(null);
              }}
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              placeholder="e.g. secretpassword"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Bcrypt Hash String ($2a$, $2b$, $2y$)</label>
            <input
              type="text"
              value={hashInput}
              onChange={(e) => {
                setHashInput(e.target.value);
                setVerificationResult(null);
              }}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              placeholder="$2a$10$..."
            />
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Verifying Hash...</span>
            </>
          ) : (
            <span>Verify Password Against Hash</span>
          )}
        </button>
      </div>

      {/* Verification Result Banner */}
      {verificationResult !== null && (
        <div
          className={`p-6 rounded-2xl border flex items-center gap-4 ${
            verificationResult
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
          }`}
        >
          {verificationResult ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
          ) : (
            <XCircle className="w-8 h-8 text-red-500 shrink-0" />
          )}
          <div>
            <h4 className="font-bold text-sm">
              {verificationResult ? 'Match Confirmed (Password Valid)' : 'Mismatch (Incorrect Password)'}
            </h4>
            <p className="text-xs opacity-90 mt-0.5">
              {verificationResult
                ? 'The plain text password matches this Bcrypt hash signature.'
                : 'The plain text password does not match the provided Bcrypt hash.'}
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Parsed Bcrypt Anatomy */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Bcrypt Hash Structure Anatomy
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Version</span>
            <span className="font-mono text-sm font-black text-indigo-600 dark:text-indigo-400">
              {parsedInfo.version}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Cost (Rounds)</span>
            <span className="font-mono text-sm font-black text-indigo-600 dark:text-indigo-400">
              {parsedInfo.cost > 0 ? `${parsedInfo.cost} (2^${parsedInfo.cost} iter)` : '-'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-slate-900/60 sm:col-span-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Valid Format</span>
            <span
              className={`font-mono text-sm font-black ${
                parsedInfo.isValidStructure ? 'text-emerald-500' : 'text-slate-400'
              }`}
            >
              {parsedInfo.isValidStructure ? 'Valid Bcrypt Signature' : 'Unrecognized'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
