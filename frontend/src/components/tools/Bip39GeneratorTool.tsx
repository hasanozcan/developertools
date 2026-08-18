'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Check, RefreshCw, Key, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { generateMnemonic, validateMnemonic, type WordCount } from '@/lib/bip39';
import { useLanguage } from '@/context/LanguageContext';

export default function Bip39GeneratorTool() {
  const { t } = useLanguage();
  const [wordCount, setWordCount] = useState<WordCount>(12);
  const [mnemonic, setMnemonic] = useState('');
  const [entropyHex, setEntropyHex] = useState('');
  const [entropyBits, setEntropyBits] = useState(128);
  const [words, setWords] = useState<string[]>([]);
  const [showWords, setShowWords] = useState(true);
  const [copied, setCopied] = useState(false);

  // Manual validator state
  const [verifyInput, setVerifyInput] = useState('');

  const generateNewSeed = useCallback(async () => {
    try {
      const res = await generateMnemonic(wordCount);
      setMnemonic(res.mnemonic);
      setEntropyHex(res.entropyHex);
      setEntropyBits(res.entropyBits);
      setWords(res.words);
    } catch (err) {
      console.error(err);
    }
  }, [wordCount]);

  useEffect(() => {
    generateNewSeed();
  }, [generateNewSeed]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validation = verifyInput.trim() ? validateMnemonic(verifyInput) : null;

  return (
    <div className="space-y-8">
      {/* Generator Section */}
      <div className="p-6 rounded-3xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-900 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Mnemonic Length
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {([12, 15, 18, 21, 24] as WordCount[]).map((count) => (
                <button
                  key={count}
                  onClick={() => setWordCount(count)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    wordCount === count
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {count} Words ({count === 12 ? '128' : count === 24 ? '256' : (count / 3) * 32} bits)
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWords(!showWords)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {showWords ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showWords ? 'Hide Words' : 'Reveal Words'}
            </button>
            <button
              onClick={generateNewSeed}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Generate New
            </button>
          </div>
        </div>

        {/* Word Grid Display */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 rounded-2xl border border-slate-100 bg-slate-50/80 dark:border-white/5 dark:bg-slate-800/80"
            >
              <span className="text-[10px] font-mono font-bold text-slate-400 w-5">
                {String(index + 1).padStart(2, '0')}.
              </span>
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
                {showWords ? word : '••••••'}
              </span>
            </div>
          ))}
        </div>

        {/* Full Mnemonic Line & Copy */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-full">
            Entropy ({entropyBits} bits): <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{entropyHex}</span>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300 dark:hover:bg-indigo-400/20 w-full sm:w-auto justify-center"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied to Clipboard' : 'Copy Seed Phrase'}
          </button>
        </div>
      </div>

      {/* Seed Validator Section */}
      <div className="p-6 rounded-3xl border border-slate-200/80 bg-slate-50/60 dark:border-white/10 dark:bg-slate-900/40 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-indigo-500" /> Verify / Check Existing Seed Phrase
        </span>
        <textarea
          value={verifyInput}
          onChange={(e) => setVerifyInput(e.target.value)}
          placeholder="Paste 12 or 24 words separated by space to verify against official BIP-39 dictionary..."
          rows={3}
          className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
        />

        {validation && (
          <div
            className={`p-4 rounded-2xl border text-xs flex items-center gap-2 ${
              validation.isValid
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800/40 dark:text-emerald-300'
                : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/40 dark:text-red-300'
            }`}
          >
            {validation.isValid ? (
              <>
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>
                  Valid BIP-39 mnemonic phrase ({validation.wordCount} words recognized).
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>
                  Invalid phrase. {validation.invalidWords.length > 0 && `Unrecognized words: ${validation.invalidWords.join(', ')}`}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
