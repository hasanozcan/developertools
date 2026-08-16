'use client';

import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  lines: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

function calculateStats(text: string): TextStats {
  const trimmed = text.trim();
  
  // Count characters
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  
  // Count lines
  const lines = text ? text.split('\n').length : 0;
  
  // Count words
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  
  // Count sentences (approximate by looking for sentence endings)
  const sentences = trimmed 
    ? trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length 
    : 0;
  
  // Count paragraphs (separated by blank lines)
  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    : 0;
  
  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil(words / 200);
  
  return {
    words,
    characters,
    charactersNoSpaces,
    lines,
    sentences,
    paragraphs,
    readingTime,
  };
}

export default function WordCounterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);
  const isUpdating = input !== deferredInput;

  const stats = useMemo(() => calculateStats(deferredInput), [deferredInput]);

  const loadSample = useCallback(() => {
    setInput(`The quick brown fox jumps over the lazy dog.

This is a second paragraph with more text to count. It contains multiple sentences! How many words can you count?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Input */}
      <div>
        <div className="mb-2 flex min-h-5 items-center justify-between gap-3">
          <label
            htmlFor="word-counter-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Enter Your Text
          </label>
          {isUpdating ? (
            <span role="status" className="text-xs text-gray-500 dark:text-gray-400">
              {t('common.updating')}
            </span>
          ) : null}
        </div>
        <CodeEditor
          id="word-counter-input"
          value={input}
          onChange={setInput}
          placeholder="Type or paste your text here to count words, characters, lines, sentences, and paragraphs..."
          language="text"
          minHeight="200px"
          maxLength={250_000}
        />
      </div>

      {/* Stats Grid */}
      <div
        aria-busy={isUpdating}
        className={`grid grid-cols-2 gap-4 transition-opacity sm:grid-cols-3 lg:grid-cols-4 ${
          isUpdating ? 'opacity-70' : 'opacity-100'
        }`}
      >
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.words}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.characters}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.charactersNoSpaces}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chars (no spaces)</div>
        </div>
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.lines}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Lines</div>
        </div>
        <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
          <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{stats.sentences}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
        </div>
        <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stats.paragraphs}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
        </div>
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 col-span-2 sm:col-span-1">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.readingTime}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stats.readingTime === 1 ? 'minute' : 'minutes'} read
          </div>
        </div>
      </div>

      {/* Reading Time Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>Reading time is calculated based on an average reading speed of 200 words per minute.</p>
      </div>
    </div>
  );
}
