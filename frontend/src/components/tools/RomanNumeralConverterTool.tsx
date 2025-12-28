'use client';

import { useState, useCallback, useMemo } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { ArrowDownUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Roman numeral conversion
const romanNumerals = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' },
];

function numberToRoman(num: number): string {
  if (num <= 0 || num > 3999) {
    throw new Error('Number must be between 1 and 3999');
  }

  let result = '';
  let remaining = num;

  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
}

function romanToNumber(roman: string): number {
  const upperRoman = roman.toUpperCase().trim();
  
  // Validate Roman numeral
  if (!/^[MDCLXVI]+$/.test(upperRoman)) {
    throw new Error('Invalid Roman numeral');
  }

  let result = 0;
  let prevValue = 0;

  for (let i = upperRoman.length - 1; i >= 0; i--) {
    const char = upperRoman[i];
    const value = romanNumerals.find(r => r.numeral === char)?.value ?? 0;
    
    if (value === 0) {
      throw new Error(`Invalid Roman numeral character: ${char}`);
    }

    if (value < prevValue) {
      result -= value;
    } else {
      result += value;
      prevValue = value;
    }
  }

  // Validate the result is a proper Roman numeral
  if (result > 3999 || result < 1) {
    throw new Error('Roman numeral must represent a number between 1 and 3999');
  }

  return result;
}

export default function RomanNumeralConverterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'toRoman' | 'toNumber'>('toRoman');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (mode === 'toRoman') {
        const num = parseInt(input, 10);
        if (isNaN(num)) {
          throw new Error('Please enter a valid number');
        }
        setOutput(numberToRoman(num));
      } else {
        const num = romanToNumber(input);
        setOutput(num.toString());
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion error');
      setOutput('');
    }
  }, [input, mode]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'toRoman' ? 'toNumber' : 'toRoman'));
    setInput(output);
    setOutput(input);
    setError(null);
  }, [input, output]);

  const loadSample = useCallback(() => {
    if (mode === 'toRoman') {
      setInput('2024');
    } else {
      setInput('MMXXIV');
    }
    setOutput('');
    setError(null);
  }, [mode]);

  // Auto-convert on input change
  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (!value.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (mode === 'toRoman') {
        const num = parseInt(value, 10);
        if (isNaN(num)) {
          throw new Error('Please enter a valid number');
        }
        setOutput(numberToRoman(num));
      } else {
        const num = romanToNumber(value);
        setOutput(num.toString());
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion error');
      setOutput('');
    }
  }, [mode]);

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
            onClick={() => setMode('toRoman')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'toRoman'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Number → Roman
          </button>
          <button
            onClick={() => setMode('toNumber')}
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
            placeholder={mode === 'toRoman' ? 'Enter a number (e.g., 2024)...' : 'Enter Roman numeral (e.g., MMXXIV)...'}
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
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Reference</h3>
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
        <p>Roman numerals can represent numbers from 1 to 3999. The system uses additive notation (VI = 5 + 1 = 6) and subtractive notation (IV = 5 - 1 = 4) for specific combinations.</p>
      </div>
    </div>
  );
}