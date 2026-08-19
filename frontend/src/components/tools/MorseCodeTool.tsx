'use client';

import React, { useState } from 'react';
import { Volume2, ArrowLeftRight, Copy, Check } from 'lucide-react';
import { textToMorse, morseToText } from '@/lib/morseCode';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_TEXT = 'SOS HELP';

export default function MorseCodeTool() {
  const { t } = useLanguage();
  const [textInput, setTextInput] = useState(SAMPLE_TEXT);
  const [morseInput, setMorseInput] = useState('... --- ... / .... . .-.. .--.');
  const [copied, setCopied] = useState(false);

  const handleTextToMorse = () => {
    setMorseInput(textToMorse(textInput));
  };

  const handleMorseToText = () => {
    setTextInput(morseToText(morseInput));
  };

  const playMorseSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const dotTime = 0.08;
      let currentTime = audioCtx.currentTime;

      for (let i = 0; i < morseInput.length; i++) {
        const char = morseInput[i];
        if (char === '.' || char === '-') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.value = 650;
          osc.connect(gain);
          gain.connect(audioCtx.destination);

          const duration = char === '.' ? dotTime : dotTime * 3;
          osc.start(currentTime);
          osc.stop(currentTime + duration);
          currentTime += duration + dotTime;
        } else if (char === ' ') {
          currentTime += dotTime * 2;
        } else if (char === '/') {
          currentTime += dotTime * 4;
        }
      }
    } catch {
      // ignore audio errors
    }
  };

  const handleCopyMorse = () => {
    navigator.clipboard.writeText(morseInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.morse.title') || 'Morse Code Audio & Text Translator'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={playMorseSound}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Play Audio</span>
          </button>
          <button
            onClick={handleTextToMorse}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            Text → Morse
          </button>
          <button
            onClick={handleMorseToText}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition"
          >
            Morse → Text
          </button>
        </div>
      </div>

      {/* Grid: Text & Morse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Plain Text Input</span>
            <button
              onClick={() => {
                setTextInput(SAMPLE_TEXT);
                setMorseInput(textToMorse(SAMPLE_TEXT));
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={8}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Morse Code (. and -)</span>
            {morseInput && (
              <button
                onClick={handleCopyMorse}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Morse')}
              </button>
            )}
          </div>
          <textarea
            value={morseInput}
            onChange={(e) => setMorseInput(e.target.value)}
            rows={8}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
