'use client';

import { useState, useCallback, useMemo } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { ArrowDownUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { numberToRoman, parseRomanNumberInput, romanToNumber } from '@/lib/romanNumerals';

type ConversionMode = 'toRoman' | 'toNumber';

export default function RomanNumeralConverterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<ConversionMode>('toRoman');
  const [error, setError] = useState<string | null>(null);

  const applyConversion = useCallback((value: string, conversionMode: ConversionMode) => {
    if (!value.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const result =
        conversionMode === 'toRoman'
          ? numberToRoman(parseRomanNumberInput(value))
          : romanToNumber(value).toString();
      setOutput(result);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion error');
      setOutput('');
    }
  }, []);

  const handleModeChange = useCallback(
    (nextMode: ConversionMode) => {
      setMode(nextMode);
      applyConversion(input, nextMode);
    },
    [applyConversion, input],
  );

  const swapMode = useCallback(() => {
    const nextMode = mode === 'toRoman' ? 'toNumber' : 'toRoman';
    const nextInput = output;
    setMode(nextMode);
    setInput(nextInput);
    applyConversion(nextInput, nextMode);
  }, [applyConversion, mode, output]);

  const loadSample = useCallback(() => {
    const sample = mode === 'toRoman' ? '2024' : 'MMXXIV';
    setInput(sample);
    applyConversion(sample, mode);
  }, [applyConversion, mode]);

  // Auto-convert on input change
  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      applyConversion(value, mode);
    },
    [applyConversion, mode],
  );

  // Quick reference table
  const referenceTable = useMemo(() => {
    return [
      { number: 1, roman: 'I' },
      { number: 4, roman: 'IV' },
      { number: 5, roman: 'V' },
      { number: 9, roman: 'IX' },
      { number: 10, roman: 'X' },
      { number: 40, roman: 'XL' },
      { number: 50, roman: 'L' },
      { number: 90, roman: 'XC' },
      { number: 100, roman: 'C' },
      { number: 400, roman: 'CD' },
      { number: 500, roman: 'D' },
      { number: 900, roman: 'CM' },
      { number: 1000, roman: 'M' },
    ];
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => handleModeChange('toRoman')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'toRoman'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Number → Roman
          </button>
          <button
            onClick={() => handleModeChange('toNumber')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'toNumber'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Roman → Number
          </button>
        </div>

        <button
          onClick={swapMode}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Swap input/output"
        >
          <ArrowDownUp className="w-5 h-5" />
        </button>

        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'toRoman' ? 'Number (1-3999)' : 'Roman Numeral'}
          </label>
          <CodeEditor
            value={input}
            onChange={handleInputChange}
            placeholder={
              mode === 'toRoman'
                ? 'Enter a number (e.g., 2024)...'
                : 'Enter Roman numeral (e.g., MMXXIV)...'
            }
            language="text"
            minHeight="100px"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'toRoman' ? 'Roman Numeral' : 'Number'}
          </label>
          <div className="relative">
            <CodeEditor
              value={output}
              onChange={() => {}}
              readOnly
              language="text"
              minHeight="100px"
            />
            {output && (
              <div className="absolute top-2 right-2">
                <CopyButton text={output} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reference Table */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Reference
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2">
          {referenceTable.map(({ number, roman }) => (
            <div
              key={number}
              className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-center"
            >
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{roman}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>
          Roman numerals can represent numbers from 1 to 3999. The system uses additive notation (VI
          = 5 + 1 = 6) and subtractive notation (IV = 5 - 1 = 4) for specific combinations.
        </p>
      </div>
    </div>
  );
}
