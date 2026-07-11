'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { RefreshCw, Eye, EyeOff, Volume2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  DEFAULT_PASSPHRASE_WORDS,
  estimatePassphraseEntropyBits,
  generateSecurePassphrase,
  MAX_PASSPHRASE_WORDS,
  MIN_PASSPHRASE_WORDS,
  secureRandomInt,
} from '@/lib/passwordSecurity';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR = 'il1Lo0O';

const PHONETIC_ALPHABET: Record<string, string> = {
  a: 'Alpha',
  b: 'Bravo',
  c: 'Charlie',
  d: 'Delta',
  e: 'Echo',
  f: 'Foxtrot',
  g: 'Golf',
  h: 'Hotel',
  i: 'India',
  j: 'Juliet',
  k: 'Kilo',
  l: 'Lima',
  m: 'Mike',
  n: 'November',
  o: 'Oscar',
  p: 'Papa',
  q: 'Quebec',
  r: 'Romeo',
  s: 'Sierra',
  t: 'Tango',
  u: 'Uniform',
  v: 'Victor',
  w: 'Whiskey',
  x: 'X-ray',
  y: 'Yankee',
  z: 'Zulu',
  '0': 'Zero',
  '1': 'One',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine',
  '!': 'Exclamation',
  '@': 'At',
  '#': 'Hash',
  $: 'Dollar',
  '%': 'Percent',
  '^': 'Caret',
  '&': 'Ampersand',
  '*': 'Star',
  '(': 'Left-Paren',
  ')': 'Right-Paren',
  '-': 'Dash',
  _: 'Underscore',
  '=': 'Equals',
  '+': 'Plus',
  '[': 'Left-Bracket',
  ']': 'Right-Bracket',
  '{': 'Left-Brace',
  '}': 'Right-Brace',
  '|': 'Pipe',
  ';': 'Semicolon',
  ':': 'Colon',
  "'": 'Apostrophe',
  '"': 'Quote',
  ',': 'Comma',
  '.': 'Dot',
  '<': 'Less-Than',
  '>': 'Greater-Than',
  '?': 'Question',
  '/': 'Slash',
};

function toPhonetic(password: string): string[] {
  const result: string[] = [];
  for (const char of password) {
    const lowerChar = char.toLowerCase();
    const phonetic = PHONETIC_ALPHABET[lowerChar] || char.toUpperCase();
    result.push(phonetic);
  }
  return result;
}

function filterSimilarChars(chars: string, excludeSimilar: boolean): string {
  if (!excludeSimilar) return chars;
  return Array.from(chars)
    .filter((char) => !SIMILAR.includes(char))
    .join('');
}

function buildRandomChars(length: number, chars: string): string[] {
  return Array.from({ length }, () => chars[secureRandomInt(chars.length)]);
}

function shuffleChars(items: string[]): void {
  if (items.length <= 1) return;
  for (let i = items.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
}

function generatePassword(
  length: number,
  useLowercase: boolean,
  useUppercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
  excludeSimilar: boolean,
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

function estimateRandomPasswordEntropyBits(
  length: number,
  useLowercase: boolean,
  useUppercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
  excludeSimilar: boolean,
): number {
  const activeCharacterSets = [
    useLowercase ? filterSimilarChars(LOWERCASE, excludeSimilar) : '',
    useUppercase ? filterSimilarChars(UPPERCASE, excludeSimilar) : '',
    useNumbers ? filterSimilarChars(NUMBERS, excludeSimilar) : '',
    useSymbols ? filterSimilarChars(SYMBOLS, excludeSimilar) : '',
  ].filter(Boolean);
  const characterPoolSize = activeCharacterSets.join('').length;

  if (characterPoolSize === 0) return 0;
  if (length < activeCharacterSets.length) return length * Math.log2(characterPoolSize);

  const mandatoryCharacterEntropy = activeCharacterSets.reduce(
    (total, characterSet) => total + Math.log2(characterSet.length),
    0,
  );

  return (
    mandatoryCharacterEntropy + (length - activeCharacterSets.length) * Math.log2(characterPoolSize)
  );
}

function calculateStrength(
  entropyBits: number,
  t: (key: string) => string,
): { score: number; label: string; color: string } {
  if (entropyBits < 40)
    return { score: 25, label: t('tool.passwordGenerator.weak'), color: 'bg-red-500' };
  if (entropyBits < 60)
    return { score: 50, label: t('tool.passwordGenerator.fair'), color: 'bg-yellow-500' };
  if (entropyBits < 75)
    return { score: 75, label: t('tool.passwordGenerator.good'), color: 'bg-blue-500' };
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
  const [usePassphrase, setUsePassphrase] = useState(false);
  const [passphraseWordCount, setPassphraseWordCount] = useState(DEFAULT_PASSPHRASE_WORDS);
  const [passphraseSeparator, setPassphraseSeparator] = useState('-');
  const [showPhonetic, setShowPhonetic] = useState(false);
  const [entropyBits, setEntropyBits] = useState(0);

  const generate = useCallback(() => {
    let newPassword = '';
    let generatedEntropyBits = 0;
    if (usePassphrase) {
      newPassword = generateSecurePassphrase(passphraseWordCount, passphraseSeparator);
      generatedEntropyBits = estimatePassphraseEntropyBits(passphraseWordCount);
    } else {
      newPassword = generatePassword(
        length,
        useLowercase,
        useUppercase,
        useNumbers,
        useSymbols,
        excludeSimilar,
      );
      generatedEntropyBits = estimateRandomPasswordEntropyBits(
        length,
        useLowercase,
        useUppercase,
        useNumbers,
        useSymbols,
        excludeSimilar,
      );
    }
    setPassword(newPassword);
    setEntropyBits(generatedEntropyBits);
  }, [
    length,
    useLowercase,
    useUppercase,
    useNumbers,
    useSymbols,
    excludeSimilar,
    usePassphrase,
    passphraseWordCount,
    passphraseSeparator,
  ]);
  const initialGenerate = useRef(generate);

  useEffect(() => {
    initialGenerate.current();
  }, []);

  const strength = calculateStrength(entropyBits, t);

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
            <span className="text-gray-600 dark:text-gray-400">
              {t('tool.passwordGenerator.strength')}:
            </span>
            <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>
              ~{entropyBits.toFixed(0)} bits · {strength.label}
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

      {/* Phonetic Display */}
      {showPhonetic && password && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-medium text-sm">
            <Volume2 className="w-4 h-4" />
            {t('tool.passwordGenerator.showPhonetic')}
          </div>
          <div className="flex flex-wrap gap-2">
            {toPhonetic(password).map((phonetic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 rounded text-sm font-mono"
              >
                {phonetic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mode Toggle */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('tool.passwordGenerator.passphraseMode')}:
        </span>
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => {
              setUsePassphrase(false);
            }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              !usePassphrase
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Random Characters
          </button>
          <button
            onClick={() => {
              setUsePassphrase(true);
            }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              usePassphrase
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Passphrase (Words)
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {usePassphrase ? (
          // Passphrase Controls
          <>
            {/* Word Count Slider */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="text-gray-600 dark:text-gray-400">
                  {t('tool.passwordGenerator.wordCount')}
                </label>
                <span className="font-medium text-gray-900 dark:text-white">
                  {passphraseWordCount}
                </span>
              </div>
              <input
                type="range"
                min={MIN_PASSPHRASE_WORDS}
                max={MAX_PASSPHRASE_WORDS}
                value={passphraseWordCount}
                onChange={(e) => setPassphraseWordCount(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{MIN_PASSPHRASE_WORDS}</span>
                <span>{MAX_PASSPHRASE_WORDS}</span>
              </div>
            </div>

            {/* Separator */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t('tool.passwordGenerator.wordSeparator')}
              </label>
              <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                {['-', ' ', '.', '_'].map((sep) => (
                  <button
                    key={sep}
                    onClick={() => setPassphraseSeparator(sep)}
                    className={`flex-1 px-3 py-2 text-sm font-mono transition-colors ${
                      passphraseSeparator === sep
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {sep === ' '
                      ? t('tool.passwordGenerator.separatorSpace')
                      : sep === '-'
                        ? t('tool.passwordGenerator.separatorDash')
                        : sep === '.'
                          ? t('tool.passwordGenerator.separatorDot')
                          : sep === '_'
                            ? t('tool.passwordGenerator.separatorUnderscore')
                            : sep}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          // Random Character Controls
          <>
            {/* Length slider */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="text-gray-600 dark:text-gray-400">
                  {t('tool.passwordGenerator.length')}
                </label>
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
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('tool.passwordGenerator.lowercase')} (a-z)
                </span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
                <input
                  type="checkbox"
                  checked={useUppercase}
                  onChange={(e) => setUseUppercase(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('tool.passwordGenerator.uppercase')} (A-Z)
                </span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('tool.passwordGenerator.numbers')} (0-9)
                </span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('tool.passwordGenerator.symbols')} (!@#$%)
                </span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700">
                <input
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={(e) => setExcludeSimilar(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('tool.passwordGenerator.excludeSimilar')}
                </span>
              </label>
            </div>
          </>
        )}

        {/* Phonetic Toggle */}
        <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent dark:border-gray-700">
          <input
            type="checkbox"
            checked={showPhonetic}
            onChange={(e) => setShowPhonetic(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-600"
          />
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('tool.passwordGenerator.showPhonetic')}
            </span>
          </div>
        </label>

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
