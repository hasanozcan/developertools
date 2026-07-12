'use client';

import { useState, type FormEvent } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage, type Language } from '@/context/LanguageContext';
import {
  CidrValidationError,
  calculateIpv4Subnet,
  type Ipv4SubnetResult,
} from '@/lib/cidrCalculator';

const SAMPLE_ADDRESS = '192.168.1.130';
const SAMPLE_PREFIX = '/26';

const numberLocales: Record<Language, string> = {
  en: 'en-US',
  tr: 'tr-TR',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  ru: 'ru-RU',
  zh: 'zh-CN',
};

function formatCount(value: number, language: Language): string {
  return value.toLocaleString(numberLocales[language]);
}

function formatHostRange(result: Ipv4SubnetResult): string {
  return result.hostRange.first === result.hostRange.last
    ? result.hostRange.first
    : `${result.hostRange.first} – ${result.hostRange.last}`;
}

function formatResultForCopy(
  result: Ipv4SubnetResult,
  t: (key: string) => string,
  semanticsDescription: string,
  language: Language,
): string {
  return [
    `${t('tool.cidr.canonicalCidr')}: ${result.cidr}`,
    `${t('tool.cidr.networkAddress')}: ${result.networkAddress}`,
    `${t('tool.cidr.broadcastAddress')}: ${result.broadcastAddress ?? t('tool.cidr.notApplicable')}`,
    `${t('tool.cidr.subnetMask')}: ${result.netmask}`,
    `${t('tool.cidr.wildcardMask')}: ${result.wildcardMask}`,
    `${t('tool.cidr.totalAddresses')}: ${formatCount(result.totalAddresses, language)}`,
    `${t('tool.cidr.usableHosts')}: ${formatCount(result.usableHostCount, language)}`,
    `${t('tool.cidr.usableHostRange')}: ${result.hostRange.first} - ${result.hostRange.last}`,
    `${t('tool.cidr.semantics')}: ${semanticsDescription}`,
  ].join('\n');
}

export default function CidrCalculatorTool() {
  const { t, language } = useLanguage();
  const [address, setAddress] = useState(SAMPLE_ADDRESS);
  const [prefixOrNetmask, setPrefixOrNetmask] = useState(SAMPLE_PREFIX);
  const [result, setResult] = useState<Ipv4SubnetResult | null>(() =>
    calculateIpv4Subnet(SAMPLE_ADDRESS, SAMPLE_PREFIX),
  );
  const [error, setError] = useState<string | null>(null);

  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setResult(calculateIpv4Subnet(address, prefixOrNetmask));
      setError(null);
    } catch (calculationError) {
      setResult(null);
      setError(
        calculationError instanceof CidrValidationError
          ? t('tool.cidr.invalidInput')
          : t('tool.cidr.error'),
      );
    }
  };

  const updateAddress = (value: string) => {
    setAddress(value);
    setResult(null);
    setError(null);
  };

  const updatePrefixOrNetmask = (value: string) => {
    setPrefixOrNetmask(value);
    setResult(null);
    setError(null);
  };

  const loadSample = () => {
    setAddress(SAMPLE_ADDRESS);
    setPrefixOrNetmask(SAMPLE_PREFIX);
    setResult(calculateIpv4Subnet(SAMPLE_ADDRESS, SAMPLE_PREFIX));
    setError(null);
  };

  const clearAll = () => {
    setAddress('');
    setPrefixOrNetmask('');
    setResult(null);
    setError(null);
  };

  const resultRows = result
    ? [
        { label: t('tool.cidr.canonicalCidr'), value: result.cidr },
        { label: t('tool.cidr.networkAddress'), value: result.networkAddress },
        {
          label: t('tool.cidr.broadcastAddress'),
          value: result.broadcastAddress ?? t('tool.cidr.notApplicable'),
        },
        { label: t('tool.cidr.subnetMask'), value: result.netmask },
        { label: t('tool.cidr.wildcardMask'), value: result.wildcardMask },
        {
          label: t('tool.cidr.totalAddresses'),
          value: formatCount(result.totalAddresses, language),
        },
        {
          label: t('tool.cidr.usableHosts'),
          value: formatCount(result.usableHostCount, language),
        },
        { label: t('tool.cidr.usableHostRange'), value: formatHostRange(result) },
      ]
    : [];

  const semanticsTitle = result
    ? t(
        result.hostSemantics === 'rfc3021'
          ? 'tool.cidr.rfc3021Title'
          : result.hostSemantics === 'single-host'
            ? 'tool.cidr.singleHostTitle'
            : 'tool.cidr.standardTitle',
      )
    : '';
  const semanticsDescription = result
    ? t(
        result.hostSemantics === 'rfc3021'
          ? 'tool.cidr.rfc3021Description'
          : result.hostSemantics === 'single-host'
            ? 'tool.cidr.singleHostDescription'
            : 'tool.cidr.standardDescription',
      )
    : '';

  return (
    <div className="space-y-6">
      <form onSubmit={calculate} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="cidr-ipv4-address"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('tool.cidr.ipv4Address')}
            </label>
            <input
              id="cidr-ipv4-address"
              value={address}
              onChange={(event) => updateAddress(event.target.value)}
              placeholder="192.168.1.130"
              inputMode="decimal"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-gray-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {t('tool.cidr.addressHint')}
            </p>
          </div>

          <div>
            <label
              htmlFor="cidr-prefix-or-netmask"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('tool.cidr.prefixOrNetmask')}
            </label>
            <input
              id="cidr-prefix-or-netmask"
              value={prefixOrNetmask}
              onChange={(event) => updatePrefixOrNetmask(event.target.value)}
              placeholder="/24 or 255.255.255.0"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-gray-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {t('tool.cidr.prefixHint')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700"
          >
            {t('tool.cidr.calculate')}
          </button>
          <button
            type="button"
            onClick={loadSample}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t('common.loadSample')}
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t('common.clear')}
          </button>
        </div>
      </form>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-5" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('tool.cidr.result')}
            </h3>
            <CopyButton text={formatResultForCopy(result, t, semanticsDescription, language)} />
          </div>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {resultRows.map((row) => (
              <div
                key={row.label}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/60"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {row.label}
                </dt>
                <dd className="mt-1 break-all font-mono text-sm font-semibold text-gray-900 dark:text-white">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/30">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              {semanticsTitle}
            </p>
            <p className="mt-1 text-sm text-blue-800 dark:text-blue-300">{semanticsDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}
