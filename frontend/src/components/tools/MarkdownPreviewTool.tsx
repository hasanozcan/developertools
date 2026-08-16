'use client';

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Check, Code, Copy, Download, Eye, FileText } from 'lucide-react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';
import { renderSafeMarkdown } from '@/lib/markdown';

const MARKDOWN_MAX_LENGTH = 250_000;

const SAMPLE_MARKDOWN = `# Markdown Preview Tool

## Introduction
This is a **local, sanitized** Markdown preview with GitHub Flavored Markdown support.

### Features
- Responsive live preview
- Tables and task lists
- Dark mode support
- Sanitized HTML export

### Code Example
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

Fenced code language labels are preserved, but syntax highlighting is not applied.

### Blockquote
> Good tools make their security boundaries visible.

### Links
Visit [GitHub](https://github.com) for more projects.

### Task List
- [x] Learn Markdown
- [x] Preview sanitized output
- [ ] Review before publishing

### Table Support
| Feature | Status |
|---------|--------|
| Tables | ✅ Supported |
| Task Lists | ✅ Supported |
| Strikethrough | ✅ Supported |

---

*Made with care by Developer Tools*`;

export default function MarkdownPreviewTool() {
  const { language, t } = useLanguage();
  const [markdown, setMarkdown] = useState('');
  const [viewMode, setViewMode] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [allowNetworkImages, setAllowNetworkImages] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deferredMarkdown = useDeferredValue(markdown);
  const blockedImageLabel = t('tool.markdownPreview.linkedImageBlocked');
  const html = useMemo(
    () =>
      deferredMarkdown
        ? renderSafeMarkdown(deferredMarkdown, {
            allowNetworkImages,
            blockedImageLabel,
          })
        : '',
    [allowNetworkImages, blockedImageLabel, deferredMarkdown],
  );
  const isRendering = markdown !== deferredMarkdown;

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const copyHtml = async () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(html);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    resetTimer.current = setTimeout(() => setCopyStatus('idle'), 3_000);
  };

  const downloadHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Preview</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
    h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; }
    h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    code { background-color: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
    pre { background-color: #f6f8fa; padding: 16px; overflow: auto; border-radius: 6px; }
    pre code { background-color: transparent; padding: 0; }
    blockquote { border-left: 4px solid #dfe2e5; padding-left: 16px; color: #6a737d; }
    table { border-collapse: collapse; width: 100%; }
    table th, table td { border: 1px solid #dfe2e5; padding: 6px 13px; }
    table th { background-color: #f6f8fa; font-weight: 600; }
    img { max-width: 100%; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
    hr { border: 0; border-top: 1px solid #eaecef; height: 0; margin: 24px 0; }
    input[type="checkbox"] { margin-right: 8px; }
    del { color: #6a737d; }
  </style>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-preview.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setMarkdown(SAMPLE_MARKDOWN);
  };

  const copyLabel =
    copyStatus === 'copied'
      ? t('common.copied')
      : copyStatus === 'error'
        ? t('common.copyFailed')
        : t('tool.markdownPreview.copyHtml');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <div
          className="grid w-full grid-cols-2 overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 sm:flex sm:w-auto"
          role="group"
          aria-label={`${t('tool.markdownPreview.preview')} / HTML`}
        >
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            aria-pressed={viewMode === 'preview'}
            aria-controls="markdown-output"
            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'preview'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <Eye className="w-4 h-4" />
            {t('tool.markdownPreview.preview')}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('html')}
            aria-pressed={viewMode === 'html'}
            aria-controls="markdown-output"
            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'html'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <Code className="w-4 h-4" />
            HTML
          </button>
        </div>

        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
          <button
            type="button"
            onClick={loadSample}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 sm:w-auto sm:px-4"
          >
            <FileText className="w-4 h-4" />
            {t('common.loadSample')}
          </button>
          {html ? (
            <>
              <button
                type="button"
                onClick={copyHtml}
                disabled={isRendering}
                aria-live="polite"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-wait disabled:opacity-60 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:w-auto sm:px-4"
              >
                {copyStatus === 'copied' ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copyLabel}
              </button>
              <button
                type="button"
                onClick={downloadHtml}
                disabled={isRendering}
                className="col-span-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-wait disabled:opacity-60 sm:col-span-1 sm:w-auto sm:px-4"
              >
                <Download className="w-4 h-4" />
                {t('tool.markdownPreview.exportHtml')}
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id="allow-linked-images"
            type="checkbox"
            checked={allowNetworkImages}
            onChange={(event) => setAllowNetworkImages(event.target.checked)}
            aria-labelledby="allow-linked-images-label"
            aria-describedby="linked-images-warning"
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <span>
            <span
              id="allow-linked-images-label"
              className="block text-sm font-semibold text-amber-900 dark:text-amber-200"
            >
              {t('tool.markdownPreview.allowLinkedImages')}
            </span>
            <span
              id="linked-images-warning"
              className="mt-1 block text-xs leading-5 text-amber-800 dark:text-amber-300"
            >
              {t('tool.markdownPreview.linkedImagesWarning')}
            </span>
          </span>
        </label>
      </div>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label
            htmlFor="markdown-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('tool.markdownPreview.markdownInput')}
          </label>
          <CodeEditor
            id="markdown-input"
            value={markdown}
            onChange={setMarkdown}
            placeholder={t('tool.markdownPreview.inputPlaceholder')}
            language="markdown"
            minHeight="320px"
            maxLength={MARKDOWN_MAX_LENGTH}
            showCharacterCount
          />
        </div>

        {/* Output */}
        <div>
          <div className="mb-2 flex min-h-5 items-center justify-between gap-3">
            <span
              id="markdown-output-label"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {viewMode === 'preview'
                ? t('tool.markdownPreview.preview')
                : t('tool.markdownPreview.htmlOutput')}
            </span>
            {isRendering ? (
              <span role="status" className="text-xs text-gray-500 dark:text-gray-400">
                {t('tool.markdownPreview.updatingPreview')}
              </span>
            ) : null}
          </div>
          <div
            id="markdown-output"
            role="region"
            aria-labelledby="markdown-output-label"
            aria-busy={isRendering}
            className={`h-[360px] w-full overflow-auto rounded-lg border border-gray-300 bg-white transition-opacity dark:border-gray-600 dark:bg-gray-800 sm:h-[480px] ${
              isRendering ? 'opacity-70' : 'opacity-100'
            }`}
          >
            {viewMode === 'preview' ? (
              html ? (
                <div
                  className="prose prose-sm max-w-none p-6 dark:prose-invert [&_.markdown-image-blocked]:inline-flex [&_.markdown-image-blocked]:rounded-md [&_.markdown-image-blocked]:border [&_.markdown-image-blocked]:border-amber-300 [&_.markdown-image-blocked]:bg-amber-50 [&_.markdown-image-blocked]:px-3 [&_.markdown-image-blocked]:py-2 [&_.markdown-image-blocked]:text-sm [&_.markdown-image-blocked]:text-amber-900 dark:[&_.markdown-image-blocked]:border-amber-700 dark:[&_.markdown-image-blocked]:bg-amber-900/30 dark:[&_.markdown-image-blocked]:text-amber-200"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <p className="p-6 text-sm italic text-gray-400 dark:text-gray-500">
                  {t('tool.markdownPreview.previewPlaceholder')}
                </p>
              )
            ) : (
              <pre className="p-4 text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {html || t('tool.markdownPreview.htmlPlaceholder')}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Cheat Sheet */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {t('tool.markdownPreview.cheatSheet')}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {t('tool.markdownPreview.headers')}
            </h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div># H1</div>
              <div>## H2</div>
              <div>### H3</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {t('tool.markdownPreview.emphasis')}
            </h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>**bold** or __bold__</div>
              <div>*italic* or _italic_</div>
              <div>~~strikethrough~~</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {t('tool.markdownPreview.lists')}
            </h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>- Unordered item</div>
              <div>1. Ordered item</div>
              <div>- [x] Task done</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {t('tool.markdownPreview.linksImages')}
            </h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>[link text](url)</div>
              <div>![alt text](image-url)</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {t('tool.markdownPreview.codeBlocks')}
            </h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>\`inline code\`</div>
              <div>\`\`\`language</div>
              <div>code block</div>
              <div>\`\`\`</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {t('tool.markdownPreview.tables')} &amp; {t('tool.markdownPreview.other')}
            </h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>\| Col 1 \| Col 2 \|</div>
              <div>&gt; Blockquote</div>
              <div>--- Horizontal rule</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
