'use client';

import { useCallback, useRef, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import { parseX509Certificates, type CertificateInfo } from '@/lib/certificate';

const MAX_INPUT_LENGTH = 250_000;

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Certificate decoding failed.';
}

export default function CertificateDecoderTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [certificates, setCertificates] = useState<CertificateInfo[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const operationId = useRef(0);

  const decode = useCallback(async () => {
    const currentOperation = ++operationId.current;
    setLoading(true);
    setError('');
    try {
      const result = await parseX509Certificates(input);
      if (currentOperation !== operationId.current) return;
      setCertificates(result);
    } catch (decodeError) {
      if (currentOperation !== operationId.current) return;
      setCertificates([]);
      setError(errorMessage(decodeError));
    } finally {
      if (currentOperation === operationId.current) setLoading(false);
    }
  }, [input]);

  const updateInput = (value: string) => {
    operationId.current += 1;
    setInput(value);
    setCertificates([]);
    setError('');
    setLoading(false);
  };

  const validityLabel = (validity: CertificateInfo['validity']): string =>
    t(`tool.certificate.validity.${validity}`);

  const validityClasses = (validity: CertificateInfo['validity']): string =>
    validity === 'valid'
      ? 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300'
      : validity === 'expired'
        ? 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300'
        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300';

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="certificate-input"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('tool.certificate.input')}
        </label>
        <textarea
          id="certificate-input"
          value={input}
          onChange={(event) => updateInput(event.target.value)}
          maxLength={MAX_INPUT_LENGTH}
          rows={13}
          spellCheck={false}
          placeholder={'-----BEGIN CERTIFICATE-----\nMIIB...\n-----END CERTIFICATE-----'}
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {t('tool.certificate.inputHelp')}
        </p>
      </div>

      <button
        type="button"
        onClick={decode}
        disabled={loading || !input.trim()}
        className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? t('tool.certificate.decoding') : t('tool.certificate.decode')}
      </button>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}

      {certificates.length > 0 ? (
        <div className="space-y-5" aria-live="polite">
          <p
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300"
          >
            {t('tool.certificate.decoded')} {certificates.length}
          </p>

          {certificates.map((certificate) => (
            <article
              key={`${certificate.index}-${certificate.sha256Fingerprint}`}
              className="space-y-5 rounded-xl border border-gray-200 p-5 dark:border-gray-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('tool.certificate.certificate')} #{certificate.index}
                </h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${validityClasses(certificate.validity)}`}
                >
                  {validityLabel(certificate.validity)}
                </span>
              </div>

              <dl className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.subject')}
                  </dt>
                  <dd className="mt-1 break-words text-gray-900 dark:text-white">
                    {certificate.subject}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.issuer')}
                  </dt>
                  <dd className="mt-1 break-words text-gray-900 dark:text-white">
                    {certificate.issuer}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.validFrom')}
                  </dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">
                    {new Date(certificate.notBefore).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.validUntil')}
                  </dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">
                    {new Date(certificate.notAfter).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.signatureAlgorithm')}
                  </dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">
                    {certificate.signatureAlgorithm}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.publicKey')}
                  </dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">
                    {[certificate.publicKeyAlgorithm, ...certificate.publicKeyDetails].join(' · ')}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.serial')}
                  </dt>
                  <dd className="mt-1 break-all font-mono text-gray-900 dark:text-white">
                    {certificate.serialNumber}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.selfSigned')}
                  </dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">
                    {certificate.selfSigned === null
                      ? t('tool.certificate.unknown')
                      : certificate.selfSigned
                        ? t('tool.certificate.yes')
                        : t('tool.certificate.no')}
                  </dd>
                </div>
              </dl>

              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.fingerprint')}
                  </h3>
                  <CopyButton text={certificate.sha256Fingerprint} />
                </div>
                <code className="block break-all rounded-lg bg-gray-100 p-3 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  {certificate.sha256Fingerprint}
                </code>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('tool.certificate.sans')}
                </h3>
                {certificate.subjectAlternativeNames.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {certificate.subjectAlternativeNames.map((name, index) => (
                      <li
                        key={`${name.type}-${name.value}-${index}`}
                        className="rounded-md bg-gray-100 px-2.5 py-1 font-mono text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      >
                        {name.type}: {name.value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('tool.certificate.noSans')}
                  </p>
                )}
              </div>

              <details className="rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-200">
                  {t('tool.certificate.extensions')} ({certificate.extensions.length}) ·{' '}
                  {certificate.rawBytes} bytes
                </summary>
                <ul className="mt-3 space-y-1 font-mono text-xs text-gray-600 dark:text-gray-300">
                  {certificate.extensions.map((extension, index) => (
                    <li key={`${extension.oid}-${index}`}>
                      {extension.oid}
                      {extension.critical ? ` · ${t('tool.certificate.critical')}` : ''}
                    </li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
        </div>
      ) : null}

      <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        {t('tool.certificate.boundary')}
      </p>
    </div>
  );
}
