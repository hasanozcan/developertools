'use client';

import { useState, useCallback, useEffect } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR = 'il1Lo0O';

function filterSimilarChars(chars: string, excludeSimilar: boolean): string {
  if (!excludeSimilar) return chars;
  return Array.from(chars).filter((char) => !SIMILAR.includes(char)).join('');
}

function buildRandomChars(length: number, chars: string): string[] {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (value) => chars[value % chars.length]);
}

function shuffleChars(items: string[]): void {
  if (items.length <= 1) return;
  const array = new Uint32Array(items.length);
  crypto.getRandomValues(array);
  for (let i = items.length - 1; i > 0; i--) {
    const j = array[i] % (i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
}

function generatePassword(
  length: number,
  useLowercase: boolean,
  useUppercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
  excludeSimilar: boolean
): string {
  const sets = [];
  if (useLowercase) sets.push(filterSimilarChars(LOWERCASE, excludeSimilar));
  if (useUppercase) sets.push(filterSimilarChars(UPPERCASE, excludeSimilar));
  if (useNumbers) sets.push(filterSimilarChars(NUMBERS, excludeSimilar));
  if (useSymbols) sets.push(filterSimilarChars(SYMBOLS, excludeSimilar));

  const activeSets = sets.filter((set) => set.length > 0);
  if (!activeSets.length) return '';

  const allChars = activeSets.join('');
  if (length <= 0) return '';

  if (length < activeSets.length) {
    return buildRandomChars(length, allChars).join('');
  }

  const passwordChars: string[] = [];
  activeSets.forEach((set) => {
    passwordChars.push(buildRandomChars(1, set)[0]);
  });
  const remaining = length - passwordChars.length;
  if (remaining > 0) {
    passwordChars.push(...buildRandomChars(remaining, allChars));
  }
  shuffleChars(passwordChars);
  return passwordChars.join('');
}

function calculateStrength(password: string, t: (key: string) => string): { score: number; label: string; color: string } {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { score: 25, label: t('tool.passwordGenerator.weak'), color: 'bg-red-500' };
  if (score <= 4) return { score: 50, label: t('tool.passwordGenerator.fair'), color: 'bg-yellow-500' };
  if (score <= 5) return { score: 75, label: t('tool.passwordGenerator.good'), color: 'bg-blue-500' };
  return { score: 100, label: t('tool.passwordGenerator.strong'), color: 'bg-green-500' };
}

export default function PasswordGeneratorTool() {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const generate = useCallback(() => {
    const newPassword = generatePassword(
      length,
      useLowercase,
      useUppercase,
      useNumbers,
      useSymbols,
      excludeSimilar
    );
    setPassword(newPassword);
  }, [length, useLowercase, useUppercase, useNumbers, useSymbols, excludeSimilar]);

  useEffect(() => {
    generate();
  }, []);

  const strength = calculateStrength(password, t);

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <div className="relative">
        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <code className="flex-1 font-mono text-lg break-all text-gray-900 dark:text-white">
            {showPassword ? password : '*'.repeat(password.length)}
          </code>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <CopyButton text={password} />
        </div>
        
        {/* Strength indicator */}
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">{t('tool.passwordGenerator.strength')}:</span>
            <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>
              {strength.label}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.color} transition-all`}
              style={{ width: `${strength.score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Length slider */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-gray-600 dark:text-gray-400">{t('tool.passwordGenerator.length')}</label>
            <span className="font-medium text-gray-900 dark:text-white">{length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* Character options */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={(e) => setUseLowercase(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.passwordGenerator.lowercase')} (a-z)</span>
          </label>
          
          <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={(e) => setUseUppercase(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.passwordGenerator.uppercase')} (A-Z)</span>
          </label>
          
          <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.passwordGenerator.numbers')} (0-9)</span>
          </label>
          
          <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.passwordGenerator.symbols')} (!@#$%)</span>
          </label>

          <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={(e) => setExcludeSimilar(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.passwordGenerator.excludeSimilar')}</span>
          </label>
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <RefreshCw className="w-5 h-5" />
          {t('common.generate')}
        </button>
      </div>
    </div>
  );
}
