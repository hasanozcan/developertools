'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Eye, EyeOff, ShieldCheck, ShieldX } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import {
  BCRYPT_MAX_PASSWORD_BYTES,
  generateBcryptHash,
  getBcryptPasswordByteLength,
  verifyBcryptHash,
} from '@/lib/bcrypt';

type VerificationResult = 'match' | 'noMatch' | null;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Bcrypt operation failed.';
}

function PasswordVisibilityButton({
  visible,
  onToggle,
  showLabel,
  hideLabel,
}: {
  visible: boolean;
  onToggle: () => void;
  showLabel: string;
  hideLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? hideLabel : showLabel}
      aria-pressed={visible}
      className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
      {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  );
}

export default function BcryptGeneratorTool() {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [cost, setCost] = useState(10);
  const [generatedHash, setGeneratedHash] = useState('');
  const [generationError, setGenerationError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationPassword, setVerificationPassword] = useState('');
  const [hashToVerify, setHashToVerify] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null);
  const [verificationError, setVerificationError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showVerificationPassword, setShowVerificationPassword] = useState(false);
  const generationOperationRef = useRef(0);
  const verificationOperationRef = useRef(0);

  const passwordBytes = getBcryptPasswordByteLength(password);
  const verificationPasswordBytes = getBcryptPasswordByteLength(verificationPassword);

  const invalidateGeneration = useCallback(() => {
    generationOperationRef.current += 1;
    setIsGenerating(false);
    setGeneratedHash('');
    setGenerationError('');
  }, []);

  const invalidateVerification = useCallback(() => {
    verificationOperationRef.current += 1;
    setIsVerifying(false);
    setVerificationResult(null);
    setVerificationError('');
  }, []);

  useEffect(
    () => () => {
      generationOperationRef.current += 1;
      verificationOperationRef.current += 1;
    },
    [],
  );

  const handleGenerate = useCallback(async () => {
    const operationId = generationOperationRef.current + 1;
    generationOperationRef.current = operationId;
    setIsGenerating(true);
    setGeneratedHash('');
    setGenerationError('');

    try {
      const hash = await generateBcryptHash(password, cost);
      if (generationOperationRef.current !== operationId) return;
      setGeneratedHash(hash);
      setHashToVerify(hash);
      invalidateVerification();
    } catch (error) {
      if (generationOperationRef.current !== operationId) return;
      setGenerationError(getErrorMessage(error));
    } finally {
      if (generationOperationRef.current === operationId) setIsGenerating(false);
    }
  }, [cost, invalidateVerification, password]);

  const handleVerify = useCallback(async () => {
    const operationId = verificationOperationRef.current + 1;
    verificationOperationRef.current = operationId;
    setIsVerifying(true);
    setVerificationResult(null);
    setVerificationError('');

    try {
      const matches = await verifyBcryptHash(verificationPassword, hashToVerify.trim());
      if (verificationOperationRef.current !== operationId) return;
      setVerificationResult(matches ? 'match' : 'noMatch');
    } catch (error) {
      if (verificationOperationRef.current !== operationId) return;
      setVerificationError(getErrorMessage(error));
    } finally {
      if (verificationOperationRef.current === operationId) setIsVerifying(false);
    }
  }, [hashToVerify, verificationPassword]);

  const loadSample = useCallback(() => {
    invalidateGeneration();
    invalidateVerification();
    setPassword('example-password');
    setVerificationPassword('example-password');
    setHashToVerify('');
    setCost(10);
  }, [invalidateGeneration, invalidateVerification]);

  return (
    <div className="space-y-8">
      <form
        aria-labelledby="bcrypt-generator-heading"
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          void handleGenerate();
        }}
      >
        <h3
          id="bcrypt-generator-heading"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          {t('tool.bcrypt.generate')}
        </h3>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label
              htmlFor="bcrypt-cost"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('tool.bcrypt.cost')}
            </label>
            <select
              id="bcrypt-cost"
              value={cost}
              onChange={(event) => {
                setCost(Number(event.target.value));
                invalidateGeneration();
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {[8, 9, 10, 11, 12, 13, 14].map((value) => (
                <option key={value} value={value}>
                  {value} (2^{value})
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={loadSample}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t('common.loadSample')}
          </button>
        </div>

        <div>
          <label
            htmlFor="bcrypt-password"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.bcrypt.password')}
          </label>
          <div className="relative">
            <input
              id="bcrypt-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                invalidateGeneration();
              }}
              autoComplete="new-password"
              spellCheck={false}
              placeholder={t('tool.bcrypt.passwordPlaceholder')}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <PasswordVisibilityButton
              visible={showPassword}
              onToggle={() => setShowPassword((visible) => !visible)}
              showLabel={t('tool.bcrypt.showPassword')}
              hideLabel={t('tool.bcrypt.hidePassword')}
            />
          </div>
          <p
            className={`mt-1 text-xs ${
              passwordBytes > BCRYPT_MAX_PASSWORD_BYTES
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {passwordBytes}/{BCRYPT_MAX_PASSWORD_BYTES} UTF-8 bytes
          </p>
        </div>

        <button
          type="submit"
          disabled={!password || isGenerating || passwordBytes > BCRYPT_MAX_PASSWORD_BYTES}
          aria-busy={isGenerating}
          className="rounded-lg bg-primary-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGenerating ? t('tool.bcrypt.generating') : t('tool.bcrypt.generate')}
        </button>

        {generationError && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
          >
            {generationError}
          </p>
        )}

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="bcrypt-generated-hash"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('tool.bcrypt.generatedHash')}
            </label>
            <CopyButton text={generatedHash} />
          </div>
          <textarea
            id="bcrypt-generated-hash"
            value={generatedHash}
            readOnly
            rows={3}
            aria-live="polite"
            placeholder={t('tool.bcrypt.hashPlaceholder')}
            className="w-full resize-y rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </form>

      <form
        aria-labelledby="bcrypt-verifier-heading"
        className="space-y-5 border-t border-gray-200 pt-7 dark:border-gray-700"
        onSubmit={(event) => {
          event.preventDefault();
          void handleVerify();
        }}
      >
        <div>
          <h3
            id="bcrypt-verifier-heading"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
          >
            <ShieldCheck className="h-5 w-5 text-primary-600" />
            {t('tool.bcrypt.verifyHeading')}
          </h3>
        </div>

        <div>
          <label
            htmlFor="bcrypt-verification-password"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.bcrypt.verifyPassword')}
          </label>
          <div className="relative">
            <input
              id="bcrypt-verification-password"
              type={showVerificationPassword ? 'text' : 'password'}
              value={verificationPassword}
              onChange={(event) => {
                setVerificationPassword(event.target.value);
                invalidateVerification();
              }}
              autoComplete="new-password"
              spellCheck={false}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <PasswordVisibilityButton
              visible={showVerificationPassword}
              onToggle={() => setShowVerificationPassword((visible) => !visible)}
              showLabel={t('tool.bcrypt.showPassword')}
              hideLabel={t('tool.bcrypt.hidePassword')}
            />
          </div>
          <p
            className={`mt-1 text-xs ${
              verificationPasswordBytes > BCRYPT_MAX_PASSWORD_BYTES
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {verificationPasswordBytes}/{BCRYPT_MAX_PASSWORD_BYTES} UTF-8 bytes
          </p>
        </div>

        <div>
          <label
            htmlFor="bcrypt-hash-to-verify"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.bcrypt.hashToVerify')}
          </label>
          <textarea
            id="bcrypt-hash-to-verify"
            value={hashToVerify}
            onChange={(event) => {
              setHashToVerify(event.target.value);
              invalidateVerification();
            }}
            rows={3}
            spellCheck={false}
            placeholder="$2b$10$..."
            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={
            !verificationPassword ||
            !hashToVerify.trim() ||
            isVerifying ||
            verificationPasswordBytes > BCRYPT_MAX_PASSWORD_BYTES
          }
          aria-busy={isVerifying}
          className="rounded-lg bg-gray-800 px-5 py-2.5 font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          {isVerifying ? t('tool.bcrypt.verifying') : t('tool.bcrypt.verify')}
        </button>

        {verificationError && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
          >
            {verificationError}
          </p>
        )}

        {verificationResult && (
          <div
            role="status"
            aria-live="polite"
            className={`flex items-center gap-2 rounded-lg border p-4 font-medium ${
              verificationResult === 'match'
                ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300'
                : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300'
            }`}
          >
            {verificationResult === 'match' ? (
              <>
                <CheckCircle2 className="h-5 w-5" /> {t('tool.bcrypt.match')}
              </>
            ) : (
              <>
                <ShieldX className="h-5 w-5" /> {t('tool.bcrypt.noMatch')}
              </>
            )}
          </div>
        )}
      </form>

      <div className="space-y-2 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
        <p>{t('tool.bcrypt.localNote')}</p>
        <p>{t('tool.bcrypt.limitNote')}</p>
      </div>
    </div>
  );
}
