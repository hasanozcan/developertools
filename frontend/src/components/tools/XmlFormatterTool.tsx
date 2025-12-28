'use client';

import { useState, useCallback, useMemo } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';

function formatXml(xml: string, indentSize: number = 2): string {
  let formatted = '';
  let indent = 0;
  const indentString = ' '.repeat(indentSize);
  
  // Remove existing whitespace between tags
  let clean = xml.replace(/^\s+|\s+$/g, '');
  
  // Parse XML tokens
  const tokens: { type: 'tag' | 'text' | 'comment' | 'cdata'; content: string; isOpening?: boolean; isClosing?: boolean; isSelfClosing?: boolean }[] = [];
  let i = 0;
  
  while (i < clean.length) {
    // Check for CDATA sections
    if (clean.substr(i, 9) === '<![CDATA[') {
      const end = clean.indexOf(']]>', i);
      if (end !== -1) {
        tokens.push({ type: 'cdata', content: clean.substring(i, end + 3) });
        i = end + 3;
        continue;
      }
    }
    
    // Check for comments
    if (clean.substr(i, 4) === '<!--') {
      const end = clean.indexOf('-->', i);
      if (end !== -1) {
        tokens.push({ type: 'comment', content: clean.substring(i, end + 3) });
        i = end + 3;
        continue;
      }
    }
    
    // Check for processing instructions
    if (clean.substr(i, 2) === '<?') {
      const end = clean.indexOf('?>', i);
      if (end !== -1) {
        tokens.push({ type: 'tag', content: clean.substring(i, end + 2), isSelfClosing: true });
        i = end + 2;
        continue;
      }
    }
    
    // Check for DOCTYPE
    if (clean.substr(i, 9).toUpperCase() === '<!DOCTYPE') {
      const end = clean.indexOf('>', i);
      if (end !== -1) {
        tokens.push({ type: 'tag', content: clean.substring(i, end + 1), isSelfClosing: true });
        i = end + 1;
        continue;
      }
    }
    
    // Check for tags
    if (clean[i] === '<') {
      const end = clean.indexOf('>', i);
      if (end !== -1) {
        const tag = clean.substring(i, end + 1);
        const isClosing = tag.startsWith('</');
        const isSelfClosing = tag.endsWith('/>');
        
        tokens.push({ 
          type: 'tag', 
          content: tag,
          isOpening: !isClosing && !isSelfClosing,
          isClosing,
          isSelfClosing 
        });
        i = end + 1;
        continue;
      }
    }
    
    // Text content
    let textEnd = clean.indexOf('<', i);
    if (textEnd === -1) textEnd = clean.length;
    
    if (textEnd > i) {
      tokens.push({ type: 'text', content: clean.substring(i, textEnd) });
      i = textEnd;
    } else {
      i++;
    }
  }
  
  // Build formatted output
  for (let j = 0; j < tokens.length; j++) {
    const token = tokens[j];
    
    if (token.type === 'comment' || token.type === 'cdata' || (token.type === 'tag' && token.isSelfClosing)) {
      if (formatted && !formatted.endsWith('\n')) {
        formatted += '\n';
      }
      formatted += indentString.repeat(indent) + token.content;
      if (j < tokens.length - 1) {
        formatted += '\n';
      }
    } else if (token.type === 'tag') {
      if (token.isClosing) {
        indent = Math.max(0, indent - 1);
        if (formatted && !formatted.endsWith('\n')) {
          formatted += '\n';
        }
        formatted += indentString.repeat(indent) + token.content;
      } else {
        if (formatted && !formatted.endsWith('\n')) {
          formatted += '\n';
        }
        formatted += indentString.repeat(indent) + token.content;
        indent++;
      }
      
      // Add newline after opening tags if next token is not text
      if (token.isOpening && j < tokens.length - 1 && tokens[j + 1].type !== 'text') {
        formatted += '\n';
      }
    } else if (token.type === 'text') {
      const text = token.content.trim();
      if (text) {
        if (formatted.endsWith('\n')) {
          formatted += indentString.repeat(indent);
        }
        formatted += text;
      }
    }
  }
  
  return formatted.trim();
}

export default function XmlFormatterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const formatted = useMemo(() => {
    if (!input.trim()) return '';
    return formatXml(input, indentSize);
  }, [input, indentSize]);

  const stats = useMemo(() => {
    return {
      originalSize: input.length,
      formattedSize: formatted.length,
      lines: formatted.split('\n').length,
    };
  }, [input, formatted]);

  const loadSample = useCallback(() => {
    setInput('<?xml version="1.0" encoding="UTF-8"?><root><person id="1"><name>John Doe</name><age>30</age><email>john@example.com</email></person><person id="2"><name>Jane Smith</name><age>28</age><email>jane@example.com</email></person></root>');
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <span>Indent:</span>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </label>

        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Stats */}
      {input && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            {stats.lines} lines
          </span>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full">
            Original: {stats.originalSize} chars
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full">
            Formatted: {stats.formattedSize} chars
          </span>
        </div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            XML Input
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder="Enter XML code to format..."
            language="xml"
            minHeight="300px"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Formatted XML
          </label>
          <div className="relative">
            <CodeEditor
              value={formatted}
              onChange={() => {}}
              readOnly
              language="xml"
              minHeight="300px"
            />
            {formatted && (
              <div className="absolute top-2 right-2">
                <CopyButton text={formatted} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}