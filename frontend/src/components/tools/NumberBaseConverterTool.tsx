'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { convertIntegerToAllBases, type NumberBase } from '@/lib/numberBase';
import { localizeUiText } from '@/lib/localizedText';

export default function NumberBaseConverterTool() {
  const { t } = useLanguage();
  const [decimal, setDecimal] = useState('');
  const [hex, setHex] = useState('');
  const [octal, setOctal] = useState('');
  const [binary, setBinary] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convertAll = useCallback((value: string, sourceBase: NumberBase) => {
    if (!value.trim()) {
      setDecimal('');
      setHex('');
      setOctal('');
      setBinary('');
      setError(null);
      return;
    }

    try {
      const converted = convertIntegerToAllBases(value, sourceBase);
      setDecimal(converted.decimal);
      setHex(converted.hex);
      setOctal(converted.octal);
      setBinary(converted.binary);
      setError(null);
    } catch (error) {
      setDecimal(sourceBase === 'decimal' ? value : '');
      setHex(sourceBase === 'hex' ? value : '');
      setOctal(sourceBase === 'octal' ? value : '');
      setBinary(sourceBase === 'binary' ? value : '');
      setError(error instanceof Error ? error.message : 'Invalid integer input');
    }
  }, []);

  const handleDecimalChange = useCallback((value: string) => {
    setDecimal(value);
    convertAll(value, 'decimal');
  }, [convertAll]);

  const handleHexChange = useCallback((value: string) => {
    setHex(value);
    convertAll(value, 'hex');
  }, [convertAll]);

  const handleOctalChange = useCallback((value: string) => {
    setOctal(value);
    convertAll(value, 'octal');
  }, [convertAll]);

  const handleBinaryChange = useCallback((value: string) => {
    setBinary(value);
    convertAll(value, 'binary');
  }, [convertAll]);

  const loadSample = useCallback(() => {
    const sample = '255';
    setDecimal(sample);
    convertAll(sample, 'decimal');
  }, [convertAll]);

  const clearAll = useCallback(() => {
    setDecimal('');
    setHex('');
    setOctal('');
    setBinary('');
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          {t("common.loadSample")}</button>
        <button
          onClick={clearAll}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          {t("uiText.de7f94e5")}</button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
          {localizeUiText(error, t)}
        </div>
      )}

      {/* Conversion Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Decimal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("uiText.8c769f81")}</label>
          <div className="relative">
            <CodeEditor
              value={decimal}
              onChange={handleDecimalChange}
              placeholder={t("uiText.0d9c7190")}
              language="text"
              minHeight="80px"
            />
          </div>
        </div>

        {/* Hexadecimal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("uiText.4674ba4f")}</label>
          <div className="relative">
            <CodeEditor
              value={hex}
              onChange={handleHexChange}
              placeholder={t("uiText.c47ded9b")}
              language="text"
              minHeight="80px"
            />
          </div>
        </div>

        {/* Octal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("uiText.c4176068")}</label>
          <div className="relative">
            <CodeEditor
              value={octal}
              onChange={handleOctalChange}
              placeholder={t("uiText.51cf6d16")}
              language="text"
              minHeight="80px"
            />
          </div>
        </div>

        {/* Binary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("uiText.6f478fce")}</label>
          <div className="relative">
            <CodeEditor
              value={binary}
              onChange={handleBinaryChange}
              placeholder={t("uiText.9f0d20cf")}
              language="text"
              minHeight="80px"
            />
          </div>
        </div>
      </div>

      {/* Character Codes Reference */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {t("uiText.cb5d6d3a")}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-300">{t("uiText.2879e23d")}</th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-300">{t("uiText.a5aaf4ec")}</th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-300">{t("uiText.613f34ea")}</th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-300">{t("uiText.d03c439c")}</th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-300">{t("tool.binaryEncoder.binary")}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { char: 'A', dec: 65 },
                { char: 'Z', dec: 90 },
                { char: 'a', dec: 97 },
                { char: 'z', dec: 122 },
                { char: '0', dec: 48 },
                { char: '9', dec: 57 },
                { char: ' ', dec: 32 },
              ].map(({ char, dec }) => (
                <tr key={char} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-3 py-2 font-mono">{`'${char === ' ' ? 'space' : char}'`}</td>
                  <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">{dec}</td>
                  <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">0x{dec.toString(16).toUpperCase()}</td>
                  <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">0o{dec.toString(8)}</td>
                  <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400 text-xs">0b{dec.toString(2).padStart(8, '0')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
