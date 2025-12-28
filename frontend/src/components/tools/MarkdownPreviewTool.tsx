'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Code, Copy, Check, FileText, Trash2, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { marked } from 'marked';

export default function MarkdownPreviewTool() {
  const { t } = useLanguage();
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [viewMode, setViewMode] = useState<'preview' | 'html'>('preview');
  const [copied, setCopied] = useState(false);

  // Configure marked for better parsing
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  useEffect(() => {
    if (markdown) {
      // Use marked library for proper markdown parsing
      const parsedHtml = marked.parse(markdown) as string;
      setHtml(parsedHtml);
    } else {
      setHtml('');
    }
  }, [markdown]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
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
    setMarkdown(`# Markdown Preview Tool

## Introduction
This is a **powerful** markdown preview tool that supports various formatting options.

### Features
- Real-time preview
- Syntax highlighting
- Dark mode support
- Export to HTML

### Code Example
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

You can also use \`inline code\` like this.

### Blockquote
> "The best way to predict the future is to create it." - Peter Drucker

### Links and Images
Visit [GitHub](https://github.com) for more projects.

### Task List
- [x] Learn Markdown
- [x] Build a preview tool
- [ ] Share with others

### Table Support
| Feature | Status |
|---------|--------|
| Tables | ✅ Supported |
| Footnotes | ✅ Supported |
| Task Lists | ✅ Supported |

---

*Made with love by Developer Tools*`);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
              viewMode === 'preview'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <Eye className="w-4 h-4" />
            {t('tool.markdownPreview.preview')}
          </button>
          <button
            onClick={() => setViewMode('html')}
            className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
              viewMode === 'html'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <Code className="w-4 h-4" />
            HTML
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadSample}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {t('common.loadSample')}
          </button>
          <button
            onClick={() => setMarkdown('')}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {t('common.clear')}
          </button>
          {html && (
            <>
              <button
                onClick={copyHtml}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2 text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? t('common.copied') : t('tool.markdownPreview.copyHtml')}
              </button>
              <button
                onClick={downloadHtml}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Export HTML
              </button>
            </>
          )}
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('tool.markdownPreview.markdownInput')}
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={20}
            placeholder="# Enter your markdown here..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {viewMode === 'preview' ? t('tool.markdownPreview.preview') : t('tool.markdownPreview.htmlOutput')}
          </label>
          <div className="w-full h-[480px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto bg-white dark:bg-gray-800">
            {viewMode === 'preview' ? (
              <div 
                className="p-6 prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: html || `<p class="text-gray-400 dark:text-gray-500 italic">${t('tool.markdownPreview.previewPlaceholder')}</p>` }}
              />
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
          <span className="font-medium text-gray-700 dark:text-gray-300">{t('tool.markdownPreview.cheatSheet')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{t('tool.markdownPreview.headers')}</h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div># H1</div>
              <div>## H2</div>
              <div>### H3</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{t('tool.markdownPreview.emphasis')}</h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>**bold** or __bold__</div>
              <div>*italic* or _italic_</div>
              <div>~~strikethrough~~</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{t('tool.markdownPreview.lists')}</h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>- Unordered item</div>
              <div>1. Ordered item</div>
              <div>- [x] Task done</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{t('tool.markdownPreview.linksImages')}</h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>[link text](url)</div>
              <div>![alt text](image-url)</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{t('tool.markdownPreview.codeBlocks')}</h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>\`inline code\`</div>
              <div>\`\`\`language</div>
              <div>code block</div>
              <div>\`\`\`</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">Tables & More</h4>
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
