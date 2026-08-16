'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  ariaLabel?: string;
  placeholder?: string;
  readOnly?: boolean;
  language?: string;
  minHeight?: string;
  maxLength?: number;
  resizable?: boolean;
  showCharacterCount?: boolean;
  showClear?: boolean;
  showCopy?: boolean;
}

type EditorFeedback = 'cleared' | 'copied' | 'copy-error' | 'limit' | null;

const DEFAULT_MAX_LENGTH = 1_000_000;

export default function CodeEditor({
  value,
  onChange,
  id,
  ariaLabel,
  placeholder,
  readOnly = false,
  language = 'json',
  minHeight = '300px',
  maxLength = DEFAULT_MAX_LENGTH,
  resizable = true,
  showCharacterCount = false,
  showClear = true,
  showCopy = true,
}: CodeEditorProps) {
  const { t } = useLanguage();
  const generatedId = useId();
  const editorId = id ?? `code-editor-${generatedId}`;
  const feedbackId = `${editorId}-feedback`;
  const [feedback, setFeedback] = useState<EditorFeedback>(null);
  const [undoValue, setUndoValue] = useState<string | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const effectivePlaceholder =
    placeholder ??
    t(readOnly ? 'common.editorOutputPlaceholder' : 'common.editorInputPlaceholder');

  useEffect(() => {
    if (!feedback) return;

    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(
      () => {
        setFeedback(null);
        if (feedback === 'cleared') setUndoValue(null);
      },
      feedback === 'cleared' ? 8_000 : 3_000,
    );

    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, [feedback]);

  useEffect(() => {
    if (feedback === 'cleared' && value) {
      setFeedback(null);
      setUndoValue(null);
    }
  }, [feedback, value]);

  const handleCopy = useCallback(async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(value);
      setFeedback('copied');
    } catch {
      setFeedback('copy-error');
    }
  }, [value]);

  const handleClear = useCallback(() => {
    setUndoValue(value);
    onChange('');
    setFeedback('cleared');
  }, [onChange, value]);

  const handleUndo = useCallback(() => {
    if (undoValue === null) return;
    onChange(undoValue);
    setUndoValue(null);
    setFeedback(null);
  }, [onChange, undoValue]);

  const handleChange = useCallback(
    (nextValue: string) => {
      if (maxLength > 0 && nextValue.length > maxLength) {
        onChange(nextValue.slice(0, maxLength));
        setFeedback('limit');
      } else {
        onChange(nextValue);
        if (feedback === 'limit') setFeedback(null);
      }
      setUndoValue(null);
    },
    [feedback, maxLength, onChange],
  );

  const showCount =
    maxLength > 0 && (showCharacterCount || value.length >= Math.floor(maxLength * 0.8));
  const showFeedback = feedback !== null || showCount;
  const feedbackText =
    feedback === 'copied'
      ? t('common.copied')
      : feedback === 'copy-error'
        ? t('common.copyFailed')
        : feedback === 'cleared'
          ? t('common.cleared')
          : feedback === 'limit'
            ? t('common.inputLimitReached').replace('{count}', maxLength.toLocaleString())
            : '';

  return (
    <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">{language}</span>
        <div className="flex items-center gap-2">
          {!readOnly && showClear && value ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
              title={t('common.clear')}
              aria-label={t('common.clear')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : null}
          {showCopy ? (
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:text-gray-300 rounded transition-colors"
              title={feedback === 'copied' ? t('common.copied') : t('common.copy')}
              aria-label={feedback === 'copied' ? t('common.copied') : t('common.copy')}
              disabled={!value}
            >
              {feedback === 'copied' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          ) : null}
        </div>
      </div>

      {/* Editor */}
      <textarea
        id={editorId}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={effectivePlaceholder}
        readOnly={readOnly}
        aria-label={id && !ariaLabel ? undefined : (ariaLabel ?? effectivePlaceholder)}
        aria-describedby={showFeedback ? feedbackId : undefined}
        className={`
          w-full p-4 font-mono text-sm bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 placeholder-gray-400 dark:placeholder-gray-500
          ${resizable && !readOnly ? 'resize-y' : 'resize-none'}
          ${readOnly ? 'bg-gray-50 dark:bg-gray-900 cursor-default' : ''}
        `}
        style={{ minHeight }}
        spellCheck={false}
      />
      {showFeedback ? (
        <div
          id={feedbackId}
          role={feedback === 'copy-error' ? 'alert' : 'status'}
          className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          <span>{feedbackText}</span>
          <span className="ml-auto flex items-center gap-3">
            {feedback === 'cleared' && undoValue !== null ? (
              <button
                type="button"
                onClick={handleUndo}
                className="font-semibold text-primary-600 hover:text-primary-700 hover:underline dark:text-primary-400"
              >
                {t('common.undo')}
              </button>
            ) : null}
            {showCount ? (
              <span aria-label={`${value.length} / ${maxLength}`}>
                {value.length.toLocaleString()} / {maxLength.toLocaleString()}
              </span>
            ) : null}
          </span>
        </div>
      ) : null}
    </div>
  );
}
