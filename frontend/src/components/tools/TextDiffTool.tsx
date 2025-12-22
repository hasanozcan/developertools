'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { Copy, Check, ArrowLeftRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DiffLine {
  type: 'same' | 'added' | 'removed' | 'modified';
  lineNumber1?: number;
  lineNumber2?: number;
  content1?: string;
  content2?: string;
}

type DiffSegment = { type: 'same' | 'added' | 'removed'; text: string };

type DiffOptions = {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
};

function normalizeForCompare(text: string, { ignoreWhitespace, ignoreCase }: DiffOptions): string {
  let value = text;
  if (ignoreWhitespace) value = value.replace(/\s+/g, ' ').trim();
  if (ignoreCase) value = value.toLowerCase();
  return value;
}

type BigramInfo = {
  counts: Map<string, number>;
  length: number;
  total: number;
};

function getBigramInfo(value: string, cache: Map<string, BigramInfo>): BigramInfo {
  const cached = cache.get(value);
  if (cached) return cached;

  const chars = Array.from(value);
  const counts = new Map<string, number>();

  if (chars.length === 1) {
    counts.set(chars[0], 1);
  } else {
    for (let i = 0; i < chars.length - 1; i++) {
      const gram = `${chars[i]}${chars[i + 1]}`;
      counts.set(gram, (counts.get(gram) || 0) + 1);
    }
  }

  const info: BigramInfo = {
    counts,
    length: chars.length,
    total: Math.max(1, chars.length - 1),
  };

  cache.set(value, info);
  return info;
}

function bigramSimilarity(a: string, b: string, cache: Map<string, BigramInfo>): number {
  if (a === b) return 1;
  if (!a || !b) return 0;

  const infoA = getBigramInfo(a, cache);
  const infoB = getBigramInfo(b, cache);

  let intersection = 0;
  const small = infoA.counts.size <= infoB.counts.size ? infoA : infoB;
  const large = small === infoA ? infoB : infoA;

  for (const [gram, count] of small.counts) {
    const other = large.counts.get(gram);
    if (other) intersection += Math.min(count, other);
  }

  const dice = (2 * intersection) / (infoA.total + infoB.total);
  const lengthRatio = Math.min(infoA.length, infoB.length) / Math.max(infoA.length, infoB.length);
  return dice * lengthRatio;
}

function alignChangeHunk(removed: DiffLine[], added: DiffLine[], similarity: (a: string, b: string) => number): DiffLine[] {
  const gapCost = 0.45;
  const minSimilarity = 0.2;

  const r = removed.length;
  const a = added.length;
  const dp: number[][] = Array(r + 1)
    .fill(null)
    .map(() => Array(a + 1).fill(0));
  const dir: Array<Array<'diag' | 'up' | 'left'>> = Array(r + 1)
    .fill(null)
    .map(() => Array(a + 1).fill('diag'));

  for (let i = 1; i <= r; i++) {
    dp[i][0] = dp[i - 1][0] + gapCost;
    dir[i][0] = 'up';
  }
  for (let j = 1; j <= a; j++) {
    dp[0][j] = dp[0][j - 1] + gapCost;
    dir[0][j] = 'left';
  }

  const EPS = 1e-9;
  for (let i = 1; i <= r; i++) {
    for (let j = 1; j <= a; j++) {
      const sim = similarity(removed[i - 1].content1 ?? '', added[j - 1].content2 ?? '');
      const matchCost = sim >= minSimilarity ? dp[i - 1][j - 1] + (1 - sim) : Number.POSITIVE_INFINITY;
      const delCost = dp[i - 1][j] + gapCost;
      const insCost = dp[i][j - 1] + gapCost;

      const best = Math.min(matchCost, delCost, insCost);
      dp[i][j] = best;

      if (Math.abs(best - matchCost) <= EPS) dir[i][j] = 'diag';
      else if (Math.abs(best - delCost) <= EPS) dir[i][j] = 'up';
      else dir[i][j] = 'left';
    }
  }

  let i = r;
  let j = a;
  const reversed: DiffLine[] = [];

  while (i > 0 || j > 0) {
    const step = dir[i][j];
    if (step === 'diag') {
      const from = removed[i - 1];
      const to = added[j - 1];
      reversed.push({
        type: 'modified',
        lineNumber1: from.lineNumber1,
        lineNumber2: to.lineNumber2,
        content1: from.content1,
        content2: to.content2,
      });
      i--;
      j--;
    } else if (step === 'up') {
      reversed.push(removed[i - 1]);
      i--;
    } else {
      reversed.push(added[j - 1]);
      j--;
    }
  }

  reversed.reverse();
  return reversed;
}

function computeDiff(text1: string, text2: string, options: DiffOptions): DiffLine[] {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const compare1 = lines1.map((line) => normalizeForCompare(line, options));
  const compare2 = lines2.map((line) => normalizeForCompare(line, options));
  const result: DiffLine[] = [];
  const bigramCache = new Map<string, BigramInfo>();
  const similarity = (a: string | undefined, b: string | undefined) => {
    const na = normalizeForCompare(a ?? '', options);
    const nb = normalizeForCompare(b ?? '', options);
    if (na === nb) return 1;
    if (!na || !nb) return 0;
    return bigramSimilarity(na, nb, bigramCache);
  };

  // Simple LCS-based diff algorithm
  const m = lines1.length;
  const n = lines2.length;

  // Build LCS table
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (compare1[i - 1] === compare2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find diff
  let i = m;
  let j = n;
  const tempResult: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && compare1[i - 1] === compare2[j - 1]) {
      tempResult.unshift({
        type: 'same',
        lineNumber1: i,
        lineNumber2: j,
        content1: lines1[i - 1],
        content2: lines2[j - 1],
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      tempResult.unshift({
        type: 'added',
        lineNumber2: j,
        content2: lines2[j - 1],
      });
      j--;
    } else if (i > 0) {
      tempResult.unshift({
        type: 'removed',
        lineNumber1: i,
        content1: lines1[i - 1],
      });
      i--;
    }
  }

  // Pair removed/added lines within each change hunk to better detect modifications
  let cursor = 0;
  while (cursor < tempResult.length) {
    const current = tempResult[cursor];
    if (current.type === 'same') {
      result.push(current);
      cursor++;
      continue;
    }

    const start = cursor;
    while (cursor < tempResult.length && tempResult[cursor].type !== 'same') cursor++;
    const hunk = tempResult.slice(start, cursor);

    const removed = hunk
      .filter((l) => l.type === 'removed')
      .sort((a, b) => (a.lineNumber1 || 0) - (b.lineNumber1 || 0));
    const added = hunk
      .filter((l) => l.type === 'added')
      .sort((a, b) => (a.lineNumber2 || 0) - (b.lineNumber2 || 0));

    if (removed.length > 0 && added.length > 0) {
      result.push(...alignChangeHunk(removed, added, (a, b) => similarity(a, b)));
    } else {
      result.push(...hunk);
    }
  }

  return result;
}

function computeCharDiff(a: string, b: string): { oldParts: DiffSegment[]; newParts: DiffSegment[] } {
  const s1 = Array.from(a);
  const s2 = Array.from(b);
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const oldTokens: DiffSegment[] = [];
  const newTokens: DiffSegment[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && s1[i - 1] === s2[j - 1]) {
      oldTokens.unshift({ type: 'same', text: s1[i - 1] });
      newTokens.unshift({ type: 'same', text: s2[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      newTokens.unshift({ type: 'added', text: s2[j - 1] });
      j--;
    } else if (i > 0) {
      oldTokens.unshift({ type: 'removed', text: s1[i - 1] });
      i--;
    }
  }

  const group = (tokens: DiffSegment[]) => {
    const grouped: DiffSegment[] = [];
    tokens.forEach((t) => {
      const last = grouped[grouped.length - 1];
      if (last && last.type === t.type) {
        last.text += t.text;
      } else {
        grouped.push({ ...t });
      }
    });
    return grouped;
  };

  return { oldParts: group(oldTokens), newParts: group(newTokens) };
}

// Segment text into rough "word" tokens to avoid noisy char-level output
function segmentTokens(text: string): string[] {
  const tokens: string[] = [];
  let buffer = '';
  const flush = () => {
    if (buffer) {
      tokens.push(buffer);
      buffer = '';
    }
  };
  for (const ch of text) {
    if (/\s/.test(ch)) {
      flush();
      tokens.push(ch);
    } else {
      buffer += ch;
    }
  }
  flush();
  return tokens;
}

function computeTokenDiff(a: string, b: string): { oldParts: DiffSegment[]; newParts: DiffSegment[] } {
  const s1 = segmentTokens(a);
  const s2 = segmentTokens(b);
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const oldTokens: DiffSegment[] = [];
  const newTokens: DiffSegment[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && s1[i - 1] === s2[j - 1]) {
      oldTokens.unshift({ type: 'same', text: s1[i - 1] });
      newTokens.unshift({ type: 'same', text: s2[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      newTokens.unshift({ type: 'added', text: s2[j - 1] });
      j--;
    } else if (i > 0) {
      oldTokens.unshift({ type: 'removed', text: s1[i - 1] });
      i--;
    }
  }

  const group = (tokens: DiffSegment[]) => {
    const grouped: DiffSegment[] = [];
    tokens.forEach((t) => {
      const last = grouped[grouped.length - 1];
      if (last && last.type === t.type) {
        last.text += t.text;
      } else {
        grouped.push({ ...t });
      }
    });
    return grouped;
  };

  return { oldParts: group(oldTokens), newParts: group(newTokens) };
}

interface DiffStats {
  additions: number;
  deletions: number;
  modifications: number;
  unchanged: number;
}

interface TextStats {
  lines: number;
  words: number;
  characters: number;
}

function calculateStats(diff: DiffLine[]): DiffStats {
  return diff.reduce(
    (acc, line) => {
      if (line.type === 'added') acc.additions++;
      else if (line.type === 'removed') acc.deletions++;
      else if (line.type === 'modified') acc.modifications++;
      else if (line.type === 'same') acc.unchanged++;
      return acc;
    },
    { additions: 0, deletions: 0, modifications: 0, unchanged: 0 }
  );
}

function getTextStats(text: string): TextStats {
  if (!text) return { lines: 0, words: 0, characters: 0 };

  const lines = text.split('\n').length;
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  return { lines, words, characters: text.length };
}

export default function TextDiffTool() {
  const { t } = useLanguage();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [showOnlyChanges, setShowOnlyChanges] = useState(false);
  const [wrapLines, setWrapLines] = useState(false);
  const [copied, setCopied] = useState(false);

  const diff = useMemo(() => {
    if (!text1 && !text2) return [];
    return computeDiff(text1, text2, { ignoreWhitespace, ignoreCase });
  }, [text1, text2, ignoreWhitespace, ignoreCase]);

  const stats = useMemo(() => calculateStats(diff), [diff]);
  const leftStats = useMemo(() => getTextStats(text1), [text1]);
  const rightStats = useMemo(() => getTextStats(text2), [text2]);
  const visibleDiff = useMemo(() => {
    if (!showOnlyChanges) return diff;
    return diff.filter((line) => line.type !== 'same');
  }, [diff, showOnlyChanges]);

  const tokenDiffs = useMemo(() => {
    return visibleDiff.map((line) =>
      line.type === 'modified' ? computeTokenDiff(line.content1 || '', line.content2 || '') : null
    );
  }, [visibleDiff]);

  const codeWhitespaceClass = wrapLines ? 'whitespace-pre-wrap break-words' : 'whitespace-pre';
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const syncingScrollRef = useRef(false);

  const swapTexts = useCallback(() => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  }, [text1, text2]);

  const copyDiff = useCallback(() => {
    const diffText = visibleDiff
      .map((line) => {
        if (line.type === 'same') return `  ${line.content1}`;
        if (line.type === 'added') return `+ ${line.content2}`;
        if (line.type === 'removed') return `- ${line.content1}`;
        if (line.type === 'modified') return `- ${line.content1}\n+ ${line.content2}`;
        return '';
      })
      .join('\n');

    navigator.clipboard.writeText(diffText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [visibleDiff]);

  const syncScroll = useCallback((source: 'left' | 'right') => {
    if (syncingScrollRef.current) return;
    const from = source === 'left' ? leftScrollRef.current : rightScrollRef.current;
    const to = source === 'left' ? rightScrollRef.current : leftScrollRef.current;
    if (!from || !to) return;

    syncingScrollRef.current = true;
    to.scrollTop = from.scrollTop;
    to.scrollLeft = from.scrollLeft;
    requestAnimationFrame(() => {
      syncingScrollRef.current = false;
    });
  }, []);

  const loadSample = useCallback(() => {
    setText1(`# Text Diff sample
# Try toggles: Ignore case, Ignore whitespace, Show only changes, Wrap lines

MODE=PRODUCTION
timeout_ms = 2500
LOG_LEVEL=INFO
FEATURE_FLAGS = enableSearch, enableHistory, enableAds
THEME=dark

# Unchanged block
owner = DevsTools
notes = This line stays the same.

API_BASE_URL=https://api.devstools.app/v1
CACHE_TTL =  3600

function greet(name) {
  console.log("Hello, " + name);
  return true;
}

const VERY_LONG_LINE = "This is a very long line that will overflow horizontally when wrapping is disabled; turn on 'Wrap lines' to see it wrapped nicely in the diff output.";`);
    setText2(`# Text Diff sample
# Try toggles: Ignore case, Ignore whitespace, Show only changes, Wrap lines

mode=production
timeout_ms =    2500
LOG_LEVEL=info
FEATURE_FLAGS = enableSearch, enableHistory, enableAds, enableI18n
THEME=dark

# Unchanged block
owner = DevsTools
notes = This line stays the same.

API_BASE_URL=https://api.devstools.app/v2
CACHE_TTL = 3600

function greet(name, greeting = "Hello") {
  console.log(greeting + ", " + name + "!");
  return true;
}

const VERY_LONG_LINE = "This is a very long line that will overflow horizontally when wrapping is disabled; turn on 'Wrap lines' to see it wrapped nicely in the diff output, plus a bit more text so it's definitely long.";`);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => setViewMode('split')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'split'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {t('tool.textDiff.splitView')}
          </button>
          <button
            onClick={() => setViewMode('unified')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'unified'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {t('tool.textDiff.unifiedView')}
          </button>
        </div>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.textDiff.ignoreWhitespace')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.textDiff.ignoreCase')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyChanges}
            onChange={(e) => setShowOnlyChanges(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.textDiff.showOnlyChanges')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={wrapLines}
            onChange={(e) => setWrapLines(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.textDiff.wrapLines')}</span>
        </label>
        
        <button
          onClick={swapTexts}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={t('tool.textDiff.swapTooltip')}
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={loadSample}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {t('common.loadSample')}
        </button>
        <button
          onClick={() => {
            setText1('');
            setText2('');
          }}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {t('common.clear')}
        </button>
        
        {visibleDiff.length > 0 && (
          <button
            onClick={copyDiff}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2 text-sm"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? t('common.copied') : t('tool.textDiff.copyDiff')}
          </button>
        )}
      </div>

      {/* Input Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool.textDiff.originalText')}</label>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {leftStats.lines} {t('common.lines')} | {leftStats.words} {t('common.words')} | {leftStats.characters} {t('common.characters')}
            </span>
          </div>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            rows={10}
            placeholder={t('tool.textDiff.originalPlaceholder') || 'Enter original text...'}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool.textDiff.modifiedText')}</label>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {rightStats.lines} {t('common.lines')} | {rightStats.words} {t('common.words')} | {rightStats.characters} {t('common.characters')}
            </span>
          </div>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            rows={10}
            placeholder={t('tool.textDiff.modifiedPlaceholder') || 'Enter modified text...'}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Stats */}
      {diff.length > 0 && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full">
            +{stats.additions} {t('tool.textDiff.additions')}
          </span>
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full">
            -{stats.deletions} {t('tool.textDiff.deletions')}
          </span>
          <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-full">
            ~{stats.modifications} {t('tool.textDiff.modifications')}
          </span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            {stats.unchanged} {t('tool.textDiff.unchanged')}
          </span>
        </div>
      )}

      {/* Diff Output */}
      {diff.length > 0 && (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool.textDiff.diffResult')}</span>
          </div>
          
          {visibleDiff.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
              {t('tool.textDiff.noDifferences')}
            </div>
          ) : viewMode === 'split' ? (
            <div className="grid grid-cols-2 divide-x divide-gray-300 dark:divide-gray-600">
              <div ref={leftScrollRef} onScroll={() => syncScroll('left')} className="overflow-auto max-h-96">
                {visibleDiff.map((line, index) => {
                  const tokenDiff = tokenDiffs[index];

                  return (
                    <div
                      key={`left-${index}`}
                      className={`flex font-mono text-sm ${
                        line.type === 'removed'
                          ? 'bg-red-50 dark:bg-red-900/30'
                          : line.type === 'modified'
                          ? 'bg-amber-50 dark:bg-amber-900/30'
                          : line.type === 'added'
                          ? 'bg-gray-50 dark:bg-gray-800'
                          : ''
                      }`}
                    >
                      <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                        {line.lineNumber1 || ''}
                      </span>

                      {line.type === 'modified' ? (
                        <span className={`flex-1 px-3 py-1 ${codeWhitespaceClass}`}>
                          <span className="text-red-700 dark:text-red-400 select-none">- </span>
                          {tokenDiff?.oldParts.map((p, i) => (
                            <span
                              key={`old-split-${index}-${i}`}
                              className={
                                p.type === 'same'
                                  ? 'text-gray-900 dark:text-gray-100'
                                  : 'bg-red-200/60 dark:bg-red-800/60 rounded px-0.5 text-red-800 dark:text-red-100'
                              }
                            >
                              {p.text}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span
                          className={`flex-1 px-3 py-1 ${codeWhitespaceClass} ${
                            line.type === 'removed'
                              ? 'text-red-700 dark:text-red-400'
                              : line.type === 'added'
                              ? 'text-gray-400 dark:text-gray-600'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          {line.type === 'removed' ? `- ${line.content1}` : line.type === 'added' ? '' : line.content1}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div ref={rightScrollRef} onScroll={() => syncScroll('right')} className="overflow-auto max-h-96">
                {visibleDiff.map((line, index) => {
                  const tokenDiff = tokenDiffs[index];

                  return (
                    <div
                      key={`right-${index}`}
                      className={`flex font-mono text-sm ${
                        line.type === 'added'
                          ? 'bg-green-50 dark:bg-green-900/30'
                          : line.type === 'modified'
                          ? 'bg-amber-50 dark:bg-amber-900/30'
                          : line.type === 'removed'
                          ? 'bg-gray-50 dark:bg-gray-800'
                          : ''
                      }`}
                    >
                      <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                        {line.lineNumber2 || ''}
                      </span>

                      {line.type === 'modified' ? (
                        <span className={`flex-1 px-3 py-1 ${codeWhitespaceClass}`}>
                          <span className="text-green-700 dark:text-green-400 select-none">+ </span>
                          {tokenDiff?.newParts.map((p, i) => (
                            <span
                              key={`new-split-${index}-${i}`}
                              className={
                                p.type === 'same'
                                  ? 'text-gray-900 dark:text-gray-100'
                                  : 'bg-green-200/60 dark:bg-green-800/60 rounded px-0.5 text-green-800 dark:text-green-100'
                              }
                            >
                              {p.text}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span
                          className={`flex-1 px-3 py-1 ${codeWhitespaceClass} ${
                            line.type === 'added'
                              ? 'text-green-700 dark:text-green-400'
                              : line.type === 'removed'
                              ? 'text-gray-400 dark:text-gray-600'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          {line.type === 'added' ? `+ ${line.content2}` : line.type === 'removed' ? '' : line.content2}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="overflow-auto max-h-96">
                {visibleDiff.map((line, index) => {
                  const tokenDiff = tokenDiffs[index];

                  if (line.type === 'modified' && tokenDiff) {
                    const { oldParts, newParts } = tokenDiff;
                    return (
                    <div
                      key={index}
                      className="flex font-mono text-sm bg-amber-50 dark:bg-amber-900/30"
                    >
                      <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                        {line.lineNumber1 || ''}
                      </span>
                      <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                        {line.lineNumber2 || ''}
                      </span>
                      <span className={`flex-1 px-3 py-1 ${codeWhitespaceClass}`}>
                        <span className="text-gray-500 dark:text-gray-400">~</span>
                        {oldParts.map((p, i) => (
                          <span
                            key={`old-${i}`}
                            className={
                              p.type === 'same'
                                ? 'text-gray-700 dark:text-gray-200'
                                : 'bg-red-200/60 dark:bg-red-800/60 rounded px-0.5 text-red-800 dark:text-red-100'
                            }
                          >
                            {p.text}
                          </span>
                        ))}
                        <span className="mx-2 text-gray-400 dark:text-gray-500 select-none">-&gt;</span>
                        {newParts.map((p, i) => (
                          <span
                            key={`new-${i}`}
                            className={
                              p.type === 'same'
                                ? 'text-gray-700 dark:text-gray-200'
                                : 'bg-green-200/60 dark:bg-green-800/60 rounded px-0.5 text-green-800 dark:text-green-100'
                            }
                          >
                            {p.text}
                          </span>
                        ))}
                      </span>
                    </div>
                    );
                  }

                return (
                  <div
                    key={index}
                    className={`flex font-mono text-sm ${
                      line.type === 'added'
                        ? 'bg-green-50 dark:bg-green-900/30'
                        : line.type === 'removed'
                        ? 'bg-red-50 dark:bg-red-900/30'
                        : ''
                    }`}
                  >
                    <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                      {line.lineNumber1 || ''}
                    </span>
                    <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                      {line.lineNumber2 || ''}
                    </span>
                    <span
                      className={`flex-1 px-3 py-1 ${codeWhitespaceClass} ${
                        line.type === 'added'
                          ? 'text-green-700 dark:text-green-400'
                          : line.type === 'removed'
                          ? 'text-red-700 dark:text-red-400'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {line.type === 'same'
                        ? `  ${line.content1}`
                        : line.type === 'added'
                        ? `+ ${line.content2}`
                        : `- ${line.content1}`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
