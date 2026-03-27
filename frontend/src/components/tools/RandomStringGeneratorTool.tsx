'use client';

import { useState, useCallback, useEffect } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SIMILAR = 'il1Lo0O';

function filterSimilarChars(chars: string, excludeSimilar: boolean): string {
  if (!excludeSimilar) return chars;
  return Array.from(chars).filter((char) => !SIMILAR.includes(char)).join('');
}

function generateRandomString(
  length: number,
  useLowercase: boolean,
  useUppercase: boolean,
  useNumbers: boolean,
  customChars: string,
  excludeSimilar: boolean
): string {
  const sets: string[] = [];
  if (useLowercase) sets.push(filterSimilarChars(LOWERCASE, excludeSimilar));
  if (useUppercase) sets.push(filterSimilarChars(UPPERCASE, excludeSimilar));
  if (useNumbers) sets.push(filterSimilarChars(NUMBERS, excludeSimilar));
  if (customChars) sets.push(customChars);

  const activeSets = sets.filter((set) => set.length > 0);
  if (!activeSets.length) return '';

  const allChars = activeSets.join('');
  if (length <= 0) return '';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (value) => allChars[value % allChars.length]).join('');
}

export default function RandomStringGeneratorTool() {
  const { t } = useLanguage();
  const [outputs, setOutputs] = useState<string[]>([]);
  const [length, setLength] = useState(16);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [customChars, setCustomChars] = useState('');
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const generate = useCallback(() => {
    const newOutputs: string[] = [];
    for (let i = 0; i < quantity; i++) {
      newOutputs.push(
        generateRandomString(
          length,
          useLowercase,
          useUppercase,
          useNumbers,
          customChars,
          excludeSimilar
        )
      );
    }
    setOutputs(newOutputs);
  }, [length, useLowercase, useUppercase, useNumbers, customChars, excludeSimilar, quantity]);

  useEffect(() => {
    generate();
  }, []);

  const copyAll = () => {
    navigator.clipboard.writeText(outputs.join('\n'));
  };

  const hasOutputs = outputs.length > 0;
  const allSelected = outputs.length > 1;

  return (
    <div className="space-y-6">
      {/* Output Display */}
      <div className="space-y-3">
        {hasOutputs ? (
          <div className="space-y-2">
            {outputs.map((output, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <code className="flex-1 font-mono text-sm break-all text-gray-900 dark:text-white">
                  {output}
                </code>
                <CopyButton text={output} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            No strings generated yet
          </div>
        )}

        {/* Copy All Button */}
        {hasOutputs && allSelected && (
          <button
            onClick={copyAll}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            <Copy className="w-4 h-4" />
            Copy All ({quantity})
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Length slider */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-gray-600 dark:text-gray-400">Length</label>
            <span className="font-medium text-gray-900 dark:text-white">{length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={128}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>4</span>
            <span>128</span>
          </div>
          <div className="mt-2">
            <input
              type="number"
              min={4}
              max={128}
              value={length}
              onChange={(e) => setLength(Math.min(128, Math.max(4, parseInt(e.target.value) || 4)))}
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Quantity selector */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-gray-600 dark:text-gray-400">Quantity</label>
            <span className="font-medium text-gray-900 dark:text-white">{quantity}</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        {/* Character set options */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={(e) => setUseLowercase(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
          </label>

          <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={(e) => setUseUppercase(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
          </label>

          <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={(e) => setExcludeSimilar(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Exclude Ambiguous (il1Lo0O)</span>
          </label>
        </div>

        {/* Custom characters input */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
            Custom Characters
          </label>
          <input
            type="text"
            value={customChars}
            onChange={(e) => setCustomChars(e.target.value)}
            placeholder="Enter custom characters..."
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
          />
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <RefreshCw className="w-5 h-5" />
          Generate
        </button>
      </div>
    </div>
  );
}
