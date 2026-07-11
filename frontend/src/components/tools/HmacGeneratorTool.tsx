'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { generateHmac, verifyHmac, type HmacAlgorithm, type HmacOutputEncoding } from '@/lib/hmac';
import { CheckCircle2, Eye, EyeOff, ShieldCheck, ShieldX } from 'lucide-react';

type VerificationResult = 'valid' | 'invalid' | null;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'HMAC operation failed';
}

export default function HmacGeneratorTool() {
  const [message, setMessage] = useState('');
  const [secret, setSecret] = useState('');
  const [algorithm, setAlgorithm] = useState<HmacAlgorithm>('SHA-256');
  const [encoding, setEncoding] = useState<HmacOutputEncoding>('hex');
  const [generatedSignature, setGeneratedSignature] = useState('');
  const [signatureToVerify, setSignatureToVerify] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null);
  const [generationError, setGenerationError] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const generationOperationRef = useRef(0);
  const verificationOperationRef = useRef(0);

  const invalidateGeneration = useCallback(() => {
    generationOperationRef.current += 1;
    setIsGenerating(false);
  }, []);

  const invalidateVerification = useCallback(() => {
    verificationOperationRef.current += 1;
    setIsVerifying(false);
  }, []);

  const clearDerivedValues = useCallback(() => {
    invalidateGeneration();
    invalidateVerification();
    setGeneratedSignature('');
    setVerificationResult(null);
    setGenerationError('');
    setVerificationError('');
  }, [invalidateGeneration, invalidateVerification]);

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
    setGenerationError('');
    setGeneratedSignature('');

    try {
      const signature = await generateHmac(message, secret, algorithm, encoding);
      if (generationOperationRef.current !== operationId) return;
      setGeneratedSignature(signature);
    } catch (error) {
      if (generationOperationRef.current !== operationId) return;
      setGenerationError(getErrorMessage(error));
    } finally {
      if (generationOperationRef.current === operationId) {
        setIsGenerating(false);
      }
    }
  }, [algorithm, encoding, message, secret]);

  const handleVerify = useCallback(async () => {
    const operationId = verificationOperationRef.current + 1;
    verificationOperationRef.current = operationId;
    setIsVerifying(true);
    setVerificationError('');
    setVerificationResult(null);

    try {
      const isValid = await verifyHmac(message, secret, signatureToVerify, algorithm, encoding);
      if (verificationOperationRef.current !== operationId) return;
      setVerificationResult(isValid ? 'valid' : 'invalid');
    } catch (error) {
      if (verificationOperationRef.current !== operationId) return;
      setVerificationError(getErrorMessage(error));
    } finally {
      if (verificationOperationRef.current === operationId) {
        setIsVerifying(false);
      }
    }
  }, [algorithm, encoding, message, secret, signatureToVerify]);

  const loadSample = useCallback(() => {
    setMessage('The quick brown fox jumps over the lazy dog');
    setSecret('key');
    setAlgorithm('SHA-256');
    setEncoding('hex');
    setSignatureToVerify('');
    clearDerivedValues();
  }, [clearDerivedValues]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            htmlFor="hmac-algorithm"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Algorithm
          </label>
          <select
            id="hmac-algorithm"
            value={algorithm}
            onChange={(event) => {
              setAlgorithm(event.target.value as HmacAlgorithm);
              clearDerivedValues();
            }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="SHA-256">HMAC SHA-256</option>
            <option value="SHA-384">HMAC SHA-384</option>
            <option value="SHA-512">HMAC SHA-512</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="hmac-encoding"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Output format
          </label>
          <select
            id="hmac-encoding"
            value={encoding}
            onChange={(event) => {
              setEncoding(event.target.value as HmacOutputEncoding);
              clearDerivedValues();
            }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="hex">Hexadecimal</option>
            <option value="base64">Base64</option>
          </select>
        </div>

        <button
          type="button"
          onClick={loadSample}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Load sample
        </button>
      </div>

      <div>
        <label
          htmlFor="hmac-message"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Message
        </label>
        <textarea
          id="hmac-message"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            clearDerivedValues();
          }}
          rows={6}
          placeholder="Enter the message to authenticate..."
          spellCheck={false}
          className="w-full resize-y rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
        />
      </div>

      <div>
        <label
          htmlFor="hmac-secret"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Secret key
        </label>
        <div className="relative">
          <input
            id="hmac-secret"
            type={showSecret ? 'text' : 'password'}
            value={secret}
            onChange={(event) => {
              setSecret(event.target.value);
              clearDerivedValues();
            }}
            autoComplete="off"
            spellCheck={false}
            placeholder="Enter a secret key..."
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-12 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          />
          <button
            type="button"
            onClick={() => setShowSecret((visible) => !visible)}
            aria-label={showSecret ? 'Hide secret key' : 'Show secret key'}
            aria-pressed={showSecret}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {showSecret ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-wait disabled:opacity-60"
        >
          {isGenerating ? 'Generating...' : 'Generate HMAC'}
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your message and secret stay in this browser.
        </p>
      </div>

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
            htmlFor="hmac-output"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Generated signature ({encoding})
          </label>
          <CopyButton text={generatedSignature} />
        </div>
        <textarea
          id="hmac-output"
          value={generatedSignature}
          readOnly
          rows={4}
          aria-live="polite"
          placeholder="Generated HMAC signature will appear here..."
          className="w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800 placeholder-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-500"
        />
      </div>

      <section
        aria-labelledby="hmac-verifier-heading"
        className="space-y-4 border-t border-gray-200 pt-6 dark:border-gray-700"
      >
        <div>
          <h3
            id="hmac-verifier-heading"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
          >
            <ShieldCheck className="h-5 w-5 text-primary-600" />
            Verify a signature
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Verification uses the same message, secret, algorithm, and format selected above.
          </p>
        </div>

        <div>
          <label
            htmlFor="hmac-signature-to-verify"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Signature to verify
          </label>
          <textarea
            id="hmac-signature-to-verify"
            value={signatureToVerify}
            onChange={(event) => {
              invalidateVerification();
              setSignatureToVerify(event.target.value);
              setVerificationResult(null);
              setVerificationError('');
            }}
            rows={4}
            spellCheck={false}
            placeholder={`Paste a ${encoding} signature...`}
            className="w-full resize-y rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          />
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={isVerifying}
          className="rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-wait disabled:opacity-60 dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          {isVerifying ? 'Verifying...' : 'Verify signature'}
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
              verificationResult === 'valid'
                ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300'
                : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300'
            }`}
          >
            {verificationResult === 'valid' ? (
              <>
                <CheckCircle2 className="h-5 w-5" /> Signature is valid
              </>
            ) : (
              <>
                <ShieldX className="h-5 w-5" /> Signature does not match
              </>
            )}
          </div>
        )}
      </section>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        HMAC authenticates a message with a shared secret. Keep the secret private and use a
        cryptographically random key in production.
      </p>
    </div>
  );
}
