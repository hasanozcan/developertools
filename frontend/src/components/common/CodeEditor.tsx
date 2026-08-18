'use client';

import { useCallback, useEffect, useId, useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { Copy, Check, Trash2, ClipboardPaste, Upload, Download, WrapText, Type } from 'lucide-react';
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
  showPaste?: boolean;
  showUpload?: boolean;
  showDownload?: boolean;
  downloadFilename?: string;
  onRun?: () => void;
}

type EditorFeedback = 'cleared' | 'copied' | 'copy-error' | 'pasted' | 'paste-error' | 'limit' | null;

const DEFAULT_MAX_LENGTH = 1_000_000;

function formatByteSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

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
  showCharacterCount = true,
  showClear = true,
  showCopy = true,
  showPaste = true,
  showUpload = true,
  showDownload = true,
  downloadFilename,
  onRun,
}: CodeEditorProps) {
  const { t } = useLanguage();
  const generatedId = useId();
  const editorId = id ?? `code-editor-${generatedId}`;
  const feedbackId = `${editorId}-feedback`;
  const [feedback, setFeedback] = useState<EditorFeedback>(null);
  const [undoValue, setUndoValue] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isWordWrap, setIsWordWrap] = useState(true);
  const [fontSize, setFontSize] = useState<'text-xs' | 'text-sm' | 'text-base'>('text-sm');
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handlePaste = useCallback(async () => {
    try {
      if (!navigator.clipboard?.readText) throw new Error('Clipboard API unavailable');
      const text = await navigator.clipboard.readText();
      if (text) {
        if (maxLength > 0 && text.length > maxLength) {
          onChange(text.slice(0, maxLength));
          setFeedback('limit');
        } else {
          onChange(text);
          setFeedback('pasted');
        }
      }
    } catch {
      setFeedback('paste-error');
    }
  }, [maxLength, onChange]);

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

  const handleDownload = useCallback(() => {
    if (!value) return;
    const ext = language === 'json' ? 'json' : language === 'sql' ? 'sql' : language === 'svg' ? 'svg' : language === 'html' ? 'html' : language === 'yaml' ? 'yaml' : 'txt';
    const filename = downloadFilename || `export-${Date.now()}.${ext}`;
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [downloadFilename, language, value]);

  const handleFileUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          if (maxLength > 0 && text.length > maxLength) {
            onChange(text.slice(0, maxLength));
            setFeedback('limit');
          } else {
            onChange(text);
          }
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [maxLength, onChange],
  );

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!readOnly) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (readOnly) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          if (maxLength > 0 && text.length > maxLength) {
            onChange(text.slice(0, maxLength));
            setFeedback('limit');
          } else {
            onChange(text);
          }
        }
      };
      reader.readAsText(file);
    }
  };

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

  // Calculate live statistics
  const linesCount = value ? value.split('\n').length : 0;
  const charsCount = value.length;
  const byteSize = formatByteSize(new Blob([value]).size);

  const showCount =
    maxLength > 0 && (showCharacterCount || value.length >= Math.floor(maxLength * 0.8));
  const feedbackText =
    feedback === 'copied'
      ? t('common.copied') || 'Copied!'
      : feedback === 'copy-error'
        ? t('common.copyFailed') || 'Copy failed. Check browser permissions.'
        : feedback === 'pasted'
          ? t('common.pasted') || 'Pasted from clipboard'
          : feedback === 'paste-error'
            ? 'Paste failed. Check clipboard permissions.'
            : feedback === 'cleared'
              ? t('common.cleared') || 'Content cleared.'
              : feedback === 'limit'
                ? t('common.inputLimitReached').replace('{count}', maxLength.toLocaleString())
                : '';

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border transition rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 shadow-xs ${
        isDragOver
          ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-50/20 dark:bg-indigo-950/20'
          : 'border-slate-200/80 dark:border-white/10'
      }`}
    >
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        aria-label="Upload file"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-white dark:bg-slate-800/90 border-b border-slate-200/80 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            {language}
          </span>
          {readOnly && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
              {t('common.output') || 'Output'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Paste Button */}
          {!readOnly && showPaste && (
            <button
              type="button"
              onClick={handlePaste}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 transition"
              title={t('common.paste') || 'Paste'}
              aria-label={t('common.paste') || 'Paste'}
            >
              <ClipboardPaste className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('common.paste') || 'Paste'}</span>
            </button>
          )}

          {/* Upload Button */}
          {!readOnly && showUpload && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 transition"
              title={t('common.uploadFile') || 'Upload File'}
              aria-label={t('common.uploadFile') || 'Upload File'}
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t('common.uploadFile') || 'Upload'}</span>
            </button>
          )}

          {/* Download Button */}
          {showDownload && value && (
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 transition"
              title={t('common.download') || 'Download'}
              aria-label={t('common.download') || 'Download'}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Word Wrap Toggle */}
          <button
            type="button"
            onClick={() => setIsWordWrap(!isWordWrap)}
            className={`p-1.5 rounded-lg transition ${
              isWordWrap
                ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            title={t('common.wrap') || 'Word Wrap'}
            aria-label={t('common.wrap') || 'Word Wrap'}
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>

          {/* Font Size Toggle */}
          <button
            type="button"
            onClick={() =>
              setFontSize((prev) =>
                prev === 'text-xs' ? 'text-sm' : prev === 'text-sm' ? 'text-base' : 'text-xs',
              )
            }
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition"
            title={t('common.fontSize') || 'Font Size'}
            aria-label={t('common.fontSize') || 'Font Size'}
          >
            <Type className="w-3.5 h-3.5" />
          </button>

          {/* Clear Button */}
          {!readOnly && showClear && value ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition"
              title={t('common.clear') || 'Clear'}
              aria-label={t('common.clear') || 'Clear'}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          ) : null}

          {/* Copy Button */}
          {showCopy ? (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/50 disabled:opacity-40 transition"
              title={feedback === 'copied' ? t('common.copied') || 'Copied' : t('common.copy') || 'Copy'}
              aria-label={feedback === 'copied' ? t('common.copied') || 'Copied' : t('common.copy') || 'Copy'}
              disabled={!value}
            >
              {feedback === 'copied' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t('common.copied') || 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('common.copy') || 'Copy'}</span>
                </>
              )}
            </button>
          ) : null}
        </div>
      </div>

      {/* Editor Textarea with Drag Overlay */}
      <div className="relative">
        {isDragOver && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-indigo-600/10 backdrop-blur-xs border-2 border-dashed border-indigo-500 rounded-b-2xl pointer-events-none">
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-xl shadow-lg">
              📂 {t('common.dragDropHint') || 'Drop file here to insert content'}
            </span>
          </div>
        )}
        <textarea
          id={editorId}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          onKeyDown={(event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
              event.preventDefault();
              if (onRun) onRun();
            }
          }}
          placeholder={effectivePlaceholder}
          readOnly={readOnly}
          aria-label={id && !ariaLabel ? undefined : (ariaLabel ?? effectivePlaceholder)}
          aria-describedby={feedback ? feedbackId : undefined}
          className={`
            w-full p-4 font-mono ${fontSize} bg-white dark:bg-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 placeholder-slate-400 dark:placeholder-slate-500
            ${isWordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'}
            ${resizable && !readOnly ? 'resize-y' : 'resize-none'}
            ${readOnly ? 'bg-slate-50/50 dark:bg-slate-900/50 cursor-default' : ''}
          `}
          style={{ minHeight }}
          spellCheck={false}
        />
      </div>

      {/* Live Statistics & Status Feedback Footer */}
      <div
        id={feedbackId}
        role={feedback === 'copy-error' || feedback === 'paste-error' ? 'alert' : 'status'}
        className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 bg-slate-50 px-3.5 py-1.5 text-[11px] text-slate-500 dark:border-white/5 dark:bg-slate-800/60 dark:text-slate-400"
      >
        <div className="flex items-center gap-2">
          {feedback ? (
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{feedbackText}</span>
          ) : (
            <span className="font-mono opacity-80">
              {linesCount} {t('common.lines') || 'lines'} · {charsCount.toLocaleString()} {t('common.characters') || 'chars'} · {byteSize}
            </span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3">
          {feedback === 'cleared' && undoValue !== null ? (
            <button
              type="button"
              onClick={handleUndo}
              className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline dark:text-indigo-400"
            >
              {t('common.undo') || 'Undo'}
            </button>
          ) : null}
          {showCount ? (
            <span aria-label={`${value.length} / ${maxLength}`} className="font-mono text-[10px]">
              {value.length.toLocaleString()} / {maxLength.toLocaleString()}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
