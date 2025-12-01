'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Code, Copy, Check, FileText, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function MarkdownPreviewTool() {
  const { t } = useLanguage();
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [viewMode, setViewMode] = useState<'preview' | 'html'>('preview');
  const [copied, setCopied] = useState(false);

  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const parseMarkdown = (md: string): string => {
    let html = md;

    // Code blocks (must be first)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm font-mono">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-primary-600 dark:text-primary-400">$1</code>');

    // Headers
    html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-sm font-semibold text-gray-900 dark:text-white mt-6 mb-2">$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-base font-semibold text-gray-900 dark:text-white mt-6 mb-2">$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h1>');

    // Blockquotes
    html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 text-gray-600 dark:text-gray-400 italic">$1</blockquote>');

    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-200 dark:border-gray-700" />');
    html = html.replace(/^\*\*\*$/gm, '<hr class="my-8 border-gray-200 dark:border-gray-700" />');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong class="font-bold">$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

    // Strikethrough
    html = html.replace(/~~(.+?)~~/g, '<del class="line-through">$1</del>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />');

    // Unordered lists
    html = html.replace(/^[\*\-]\s+(.+)$/gm, '<li class="ml-4 list-disc text-gray-700 dark:text-gray-300">$1</li>');
    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-4 space-y-1">$&</ul>');

    // Ordered lists  
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-4 list-decimal text-gray-700 dark:text-gray-300">$1</li>');

    // Task lists
    html = html.replace(/^[\*\-]\s+\[x\]\s+(.+)$/gm, '<li class="ml-4 flex items-center gap-2"><input type="checkbox" checked disabled class="rounded" /><span class="line-through text-gray-500">$1</span></li>');
    html = html.replace(/^[\*\-]\s+\[\s\]\s+(.+)$/gm, '<li class="ml-4 flex items-center gap-2"><input type="checkbox" disabled class="rounded" /><span>$1</span></li>');

    // Tables
    html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
      const cells = content.split('|').map((cell: string) => cell.trim());
      const isHeader = cells.some((cell: string) => /^[-:]+$/.test(cell));
      if (isHeader) return '';
      
      const cellHtml = cells.map((cell: string) => `<td class="px-4 py-2 border border-gray-200 dark:border-gray-700">${cell}</td>`).join('');
      return `<tr>${cellHtml}</tr>`;
    });

    // Paragraphs
    html = html.replace(/^(?!<[a-z]|$)(.+)$/gm, '<p class="text-gray-700 dark:text-gray-300 my-3 leading-relaxed">$1</p>');

    // Clean up empty paragraphs
    html = html.replace(/<p[^>]*>\s*<\/p>/g, '');

    return html;
  };

  useEffect(() => {
    if (markdown) {
      setHtml(parseMarkdown(markdown));
    } else {
      setHtml('');
    }
  }, [markdown]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

---

*Made with ❤️ by Developer Tools*`);
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
            <button
              onClick={copyHtml}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2 text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? t('common.copied') : t('tool.markdownPreview.copyHtml')}
            </button>
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
                className="p-6 prose dark:prose-invert max-w-none"
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
              <div>`inline code`</div>
              <div>```language</div>
              <div>code block</div>
              <div>```</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{t('tool.markdownPreview.other')}</h4>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>&gt; Blockquote</div>
              <div>--- Horizontal rule</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
