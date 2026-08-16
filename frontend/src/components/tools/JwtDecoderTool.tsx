'use client';

import { useCallback, useRef, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import {
  HMAC_JWT_ALGORITHMS,
  decodeJwt,
  signJwtHmac,
  verifyJwtHmac,
  type DecodedJwt,
  type HmacJwtAlgorithm,
  type JwtVerificationResult,
} from '@/lib/jwt';

const MAX_TOKEN_LENGTH = 100_000;
const SAMPLE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const SAMPLE_SECRET = 'your-256-bit-secret';

function parseObject(input: string, label: string): Record<string, unknown> {
  let value: unknown;
  try {
    value = JSON.parse(input);
  } catch (error) {
    throw new Error(`${label}: ${error instanceof Error ? error.message : 'invalid JSON'}`);
  }
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be a JSON object.`);
  }
  return value as Record<string, unknown>;
}

function displayClaim(value: unknown): string {
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
}

function formatTimestamp(value: unknown): string | null {
  return typeof value === 'number' && Number.isFinite(value)
    ? `${new Date(value * 1000).toLocaleString()} (${Math.floor(value)})`
    : null;
}

export default function JwtDecoderTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [decodeError, setDecodeError] = useState('');
  const [secret, setSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [issuer, setIssuer] = useState('');
  const [audience, setAudience] = useState('');
  const [clockSkew, setClockSkew] = useState('0');
  const [verification, setVerification] = useState<JwtVerificationResult | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [headerInput, setHeaderInput] = useState('{\n  "typ": "JWT"\n}');
  const [payloadInput, setPayloadInput] = useState(
    '{\n  "sub": "1234567890",\n  "name": "Ada",\n  "iat": 1767225600,\n  "exp": 2051222400\n}',
  );
  const [algorithm, setAlgorithm] = useState<HmacJwtAlgorithm>('HS256');
  const [signing, setSigning] = useState(false);
  const [signError, setSignError] = useState('');
  const [signStatus, setSignStatus] = useState('');
  const operationId = useRef(0);

  const updateToken = useCallback(
    (value: string) => {
      operationId.current += 1;
      setInput(value);
      setVerification(null);
      setVerifying(false);
      setSignStatus('');
      if (!value.trim()) {
        setDecoded(null);
        setDecodeError('');
        return;
      }
      const result = decodeJwt(value.trim());
      setDecoded(result);
      setDecodeError(result ? '' : t('tool.jwtDecoder.invalidToken'));
    },
    [t],
  );

  const loadSample = useCallback(() => {
    setSecret(SAMPLE_SECRET);
    updateToken(SAMPLE_TOKEN);
  }, [updateToken]);

  const verify = useCallback(async () => {
    const skew = Number(clockSkew);
    if (!Number.isFinite(skew) || skew < 0 || skew > 300) {
      setDecodeError(t('tool.jwtDecoder.invalidSkew'));
      return;
    }
    const currentOperation = ++operationId.current;
    setVerifying(true);
    setDecodeError('');
    try {
      const result = await verifyJwtHmac(input.trim(), secret, {
        clockSkewSeconds: skew,
        issuer: issuer.trim() || undefined,
        audience: audience.trim() || undefined,
      });
      if (currentOperation === operationId.current) setVerification(result);
    } catch (error) {
      if (currentOperation === operationId.current) {
        setVerification(null);
        setDecodeError(error instanceof Error ? error.message : t('tool.jwtDecoder.verifyFailed'));
      }
    } finally {
      if (currentOperation === operationId.current) setVerifying(false);
    }
  }, [audience, clockSkew, input, issuer, secret, t]);

  const sign = useCallback(async () => {
    const currentOperation = ++operationId.current;
    setSigning(true);
    setSignError('');
    setSignStatus('');
    try {
      const header = parseObject(headerInput, t('tool.jwtDecoder.headerJson'));
      const payload = parseObject(payloadInput, t('tool.jwtDecoder.payloadJson'));
      const token = await signJwtHmac(header, payload, secret, algorithm);
      if (currentOperation !== operationId.current) return;
      setInput(token);
      setDecoded(decodeJwt(token));
      setDecodeError('');
      setVerification(null);
      setSignStatus(t('tool.jwtDecoder.generated'));
    } catch (error) {
      if (currentOperation === operationId.current) {
        setSignError(error instanceof Error ? error.message : t('tool.jwtDecoder.signFailed'));
      }
    } finally {
      if (currentOperation === operationId.current) setSigning(false);
    }
  }, [algorithm, headerInput, payloadInput, secret, t]);

  const verificationMessage = verification
    ? verification.signatureValid
      ? verification.claimIssues.length === 0
        ? t('tool.jwtDecoder.verified')
        : t('tool.jwtDecoder.claimsInvalid')
      : t(`tool.jwtDecoder.error.${verification.error ?? 'invalid-signature'}`)
    : '';
  const verificationIsGood = verification?.valid === true;
  const editorClass =
    'w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white';

  const commonClaims = decoded
    ? ['sub', 'iss', 'aud', 'iat', 'nbf', 'exp']
        .filter((claim) => decoded.payload[claim] !== undefined)
        .map((claim) => ({
          claim,
          value: ['iat', 'nbf', 'exp'].includes(claim)
            ? (formatTimestamp(decoded.payload[claim]) ?? displayClaim(decoded.payload[claim]))
            : displayClaim(decoded.payload[claim]),
        }))
    : [];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <label
            htmlFor="jwt-token-input"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.jwtDecoder.jwtToken')}
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {t('common.loadSample')}
            </button>
            <CopyButton text={input} />
          </div>
        </div>
        <textarea
          id="jwt-token-input"
          value={input}
          onChange={(event) => updateToken(event.target.value)}
          maxLength={MAX_TOKEN_LENGTH}
          rows={5}
          spellCheck={false}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className={editorClass}
        />
      </div>

      {decodeError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
        >
          {decodeError}
        </p>
      ) : null}

      <section
        aria-labelledby="jwt-verification-heading"
        className="space-y-4 rounded-xl border border-gray-200 p-5 dark:border-gray-700"
      >
        <div>
          <h2
            id="jwt-verification-heading"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            {t('tool.jwtDecoder.hmacVerification')}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('tool.jwtDecoder.hmacOnly')}
          </p>
        </div>

        <div>
          <label
            htmlFor="jwt-secret"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.jwtDecoder.hmacSecret')}
          </label>
          <div className="flex gap-2">
            <input
              id="jwt-secret"
              type={showSecret ? 'text' : 'password'}
              value={secret}
              onChange={(event) => {
                operationId.current += 1;
                setSecret(event.target.value);
                setVerification(null);
              }}
              autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder={t('tool.jwtDecoder.secretPlaceholder')}
            />
            <button
              type="button"
              onClick={() => setShowSecret((visible) => !visible)}
              className="rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200"
              aria-pressed={showSecret}
            >
              {showSecret ? t('tool.jwtDecoder.hideSecret') : t('tool.jwtDecoder.showSecret')}
            </button>
          </div>
        </div>

        <details className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
          <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-200">
            {t('tool.jwtDecoder.claimOptions')}
          </summary>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              {t('tool.jwtDecoder.expectedIssuer')}
              <input
                value={issuer}
                onChange={(event) => setIssuer(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              {t('tool.jwtDecoder.expectedAudience')}
              <input
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              {t('tool.jwtDecoder.clockSkew')}
              <input
                type="number"
                min="0"
                max="300"
                value={clockSkew}
                onChange={(event) => setClockSkew(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </label>
          </div>
        </details>

        <button
          type="button"
          onClick={verify}
          disabled={!decoded || !secret || verifying}
          className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {verifying ? t('tool.jwtDecoder.verifying') : t('tool.jwtDecoder.verify')}
        </button>

        {verification ? (
          <div
            role="status"
            className={`rounded-lg border p-4 text-sm font-semibold ${verificationIsGood ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300' : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300'}`}
          >
            {verificationMessage}
            {verification.claimIssues.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 font-normal">
                {verification.claimIssues.map((issue) => (
                  <li key={`${issue.claim}-${issue.code}`}>
                    {t(`tool.jwtDecoder.claim.${issue.code}`)} ({issue.claim})
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </section>

      {decoded ? (
        <div className="space-y-5">
          {!verification ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
              {t('tool.jwtDecoder.decodedOnly')}
            </p>
          ) : null}
          <div className="grid gap-5 lg:grid-cols-2">
            <section>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {t('tool.jwtDecoder.header')}
                </h2>
                <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
              </div>
              <pre className="min-h-48 overflow-auto rounded-lg border border-blue-200 bg-blue-50 p-4 font-mono text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </section>
            <section>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {t('tool.jwtDecoder.payload')}
                </h2>
                <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
              </div>
              <pre className="min-h-48 overflow-auto rounded-lg border border-purple-200 bg-purple-50 p-4 font-mono text-sm text-purple-900 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-200">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </section>
          </div>

          {commonClaims.length > 0 ? (
            <dl className="grid gap-3 text-sm md:grid-cols-2">
              {commonClaims.map(({ claim, value }) => (
                <div key={claim} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                  <dt className="font-mono font-semibold text-gray-500 dark:text-gray-400">
                    {claim}
                  </dt>
                  <dd className="mt-1 break-words text-gray-900 dark:text-white">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div>
            <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">
              {t('tool.jwtDecoder.signature')}
            </h2>
            <code className="block break-all rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200">
              {decoded.signature || '(empty)'}
            </code>
          </div>
        </div>
      ) : null}

      <details className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
        <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-white">
          {t('tool.jwtDecoder.signHeading')}
        </summary>
        <div className="mt-5 space-y-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('tool.jwtDecoder.signHelp')}
          </p>
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label
                htmlFor="jwt-header-json"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t('tool.jwtDecoder.headerJson')}
              </label>
              <textarea
                id="jwt-header-json"
                value={headerInput}
                onChange={(event) => setHeaderInput(event.target.value)}
                rows={8}
                spellCheck={false}
                className={editorClass}
              />
            </div>
            <div>
              <label
                htmlFor="jwt-payload-json"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t('tool.jwtDecoder.payloadJson')}
              </label>
              <textarea
                id="jwt-payload-json"
                value={payloadInput}
                onChange={(event) => setPayloadInput(event.target.value)}
                rows={8}
                spellCheck={false}
                className={editorClass}
              />
            </div>
          </div>
          <label className="block max-w-xs text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('tool.jwtDecoder.algorithm')}
            <select
              value={algorithm}
              onChange={(event) => setAlgorithm(event.target.value as HmacJwtAlgorithm)}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              {HMAC_JWT_ALGORITHMS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={sign}
            disabled={signing || !secret}
            className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {signing ? t('tool.jwtDecoder.signing') : t('tool.jwtDecoder.sign')}
          </button>
          {signError ? (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
            >
              {signError}
            </p>
          ) : null}
          {signStatus ? (
            <p
              role="status"
              className="rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-300"
            >
              {signStatus}
            </p>
          ) : null}
        </div>
      </details>

      <p className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
        {t('tool.jwtDecoder.localNote')}
      </p>
    </div>
  );
}
