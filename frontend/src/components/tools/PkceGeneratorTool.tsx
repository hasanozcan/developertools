'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, KeyRound, ShieldCheck, ShieldX } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import {
  deriveCodeChallenge,
  generateCodeVerifier,
  validateCodeVerifier,
  verifyCodeChallenge,
} from '@/lib/pkce';

type VerificationResult = 'valid' | 'invalid' | null;

export default function PkceGeneratorTool() {
  const { t } = useLanguage();
  const [length, setLength] = useState(64);
  const [verifier, setVerifier] = useState('');
  const [challenge, setChallenge] = useState('');
  const [expectedChallenge, setExpectedChallenge] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const operationRef = useRef(0);

  const cancelPendingOperation = useCallback(() => {
    operationRef.current += 1;
    setBusy(false);
  }, []);

  const invalidateDerivedValues = useCallback(() => {
    cancelPendingOperation();
    setChallenge('');
    setVerificationResult(null);
    setError('');
  }, [cancelPendingOperation]);

  useEffect(
    () => () => {
      operationRef.current += 1;
    },
    [],
  );

  const runOperation = useCallback(
    async <T,>(operation: () => Promise<T>, onSuccess: (result: T) => void) => {
      const operationId = operationRef.current + 1;
      operationRef.current = operationId;
      setBusy(true);
      setError('');

      try {
        const result = await operation();
        if (operationRef.current === operationId) {
          onSuccess(result);
        }
      } catch {
        if (operationRef.current === operationId) {
          setError(t('tool.pkce.error'));
        }
      } finally {
        if (operationRef.current === operationId) {
          setBusy(false);
        }
      }
    },
    [t],
  );

  const generatePair = useCallback(() => {
    if (!Number.isInteger(length) || length < 43 || length > 128) {
      setError(t('tool.pkce.lengthError'));
      return;
    }
    void runOperation(
      async () => {
        const nextVerifier = generateCodeVerifier(length);
        const nextChallenge = await deriveCodeChallenge(nextVerifier);
        return { verifier: nextVerifier, challenge: nextChallenge };
      },
      (result) => {
        setVerifier(result.verifier);
        setChallenge(result.challenge);
        setVerificationResult(null);
      },
    );
  }, [length, runOperation, t]);

  const deriveChallenge = useCallback(() => {
    try {
      validateCodeVerifier(verifier);
    } catch {
      setError(t('tool.pkce.verifierError'));
      return;
    }
    void runOperation(
      () => deriveCodeChallenge(verifier),
      (nextChallenge) => {
        setChallenge(nextChallenge);
        setVerificationResult(null);
      },
    );
  }, [runOperation, t, verifier]);

  const verifyPair = useCallback(() => {
    try {
      validateCodeVerifier(verifier);
    } catch {
      setError(t('tool.pkce.verifierError'));
      return;
    }
    if (!/^[A-Za-z0-9_-]{43}$/.test(expectedChallenge)) {
      setError(t('tool.pkce.challengeError'));
      return;
    }
    void runOperation(
      () => verifyCodeChallenge(verifier, expectedChallenge),
      (valid) => {
        setVerificationResult(valid ? 'valid' : 'invalid');
      },
    );
  }, [expectedChallenge, runOperation, t, verifier]);

  const verifierStatus = (() => {
    if (!verifier) return null;
    try {
      validateCodeVerifier(verifier);
      return 'valid';
    } catch {
      return 'invalid';
    }
  })();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            htmlFor="pkce-length"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.pkce.verifierLength')}
          </label>
          <input
            id="pkce-length"
            type="number"
            min={43}
            max={128}
            value={length}
            onChange={(event) => {
              cancelPendingOperation();
              setLength(Number(event.target.value));
              setError('');
            }}
            className="w-28 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="button"
          onClick={generatePair}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-wait disabled:opacity-60"
        >
          <KeyRound className="h-4 w-4" />
          {t('tool.pkce.generatePair')}
        </button>
        <button
          type="button"
          onClick={() => {
            cancelPendingOperation();
            setVerifier('');
            setChallenge('');
            setExpectedChallenge('');
            setVerificationResult(null);
            setError('');
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {t('common.clear')}
        </button>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">{t('tool.pkce.info')}</p>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="pkce-verifier"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.pkce.codeVerifier')}
          </label>
          <div className="flex items-center gap-3">
            {verifierStatus && (
              <span
                className={`text-xs font-medium ${
                  verifierStatus === 'valid'
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                {verifier.length} {t('common.characters')} · {t(`tool.pkce.${verifierStatus}`)}
              </span>
            )}
            <CopyButton text={verifier} />
          </div>
        </div>
        <textarea
          id="pkce-verifier"
          value={verifier}
          onChange={(event) => {
            setVerifier(event.target.value);
            invalidateDerivedValues();
          }}
          rows={4}
          spellCheck={false}
          placeholder={t('tool.pkce.verifierPlaceholder')}
          className="w-full resize-y rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
        />
      </div>

      <button
        type="button"
        onClick={deriveChallenge}
        disabled={busy || !verifier.trim()}
        className="rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-500"
      >
        {t('tool.pkce.deriveChallenge')}
      </button>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="pkce-challenge"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.pkce.challenge')}
          </label>
          <CopyButton text={challenge} />
        </div>
        <textarea
          id="pkce-challenge"
          value={challenge}
          readOnly
          rows={3}
          aria-live="polite"
          placeholder={t('tool.pkce.challengePlaceholder')}
          className="w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800 placeholder-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-500"
        />
      </div>

      <section
        aria-labelledby="pkce-verifier-heading"
        className="space-y-4 border-t border-gray-200 pt-6 dark:border-gray-700"
      >
        <div>
          <h3
            id="pkce-verifier-heading"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
          >
            <ShieldCheck className="h-5 w-5 text-primary-600" />
            {t('tool.pkce.verifyHeading')}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('tool.pkce.verifyIntro')}
          </p>
        </div>

        <div>
          <label
            htmlFor="pkce-expected-challenge"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.pkce.expectedChallenge')}
          </label>
          <input
            id="pkce-expected-challenge"
            value={expectedChallenge}
            onChange={(event) => {
              cancelPendingOperation();
              setExpectedChallenge(event.target.value);
              setVerificationResult(null);
              setError('');
            }}
            spellCheck={false}
            placeholder={t('tool.pkce.expectedPlaceholder')}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          />
        </div>

        <button
          type="button"
          onClick={verifyPair}
          disabled={busy || !verifier.trim() || !expectedChallenge.trim()}
          className="rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          {t('tool.pkce.verifyPair')}
        </button>

        {verificationResult && (
          <div
            role="status"
            aria-live="polite"
            className={`flex items-center gap-2 rounded-lg border p-4 font-medium ${
              verificationResult === 'valid'
                ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300'
                : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300'
            }`}
          >
            {verificationResult === 'valid' ? (
              <>
                <CheckCircle2 className="h-5 w-5" /> {t('tool.pkce.match')}
              </>
            ) : (
              <>
                <ShieldX className="h-5 w-5" /> {t('tool.pkce.noMatch')}
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
