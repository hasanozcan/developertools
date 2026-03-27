'use client';

import { useState, useCallback, useEffect } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ValidationError {
  line: number;
  column: number;
  message: string;
  suggestion?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  stats?: {
    tags: number;
    selfClosingTags: number;
    attributes: number;
  };
}

const SELF_CLOSING_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr', 'command',
  'keygen', 'menuitem', 'frame', 'colgroup'
]);

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

function validateHtml(html: string): ValidationResult {
  const errors: ValidationError[] = [];
  const lines = html.split('\n');

  // Track tag stack for matching opening/closing tags
  const tagStack: { name: string; line: number; column: number }[] = [];

  // Track stats
  let tagCount = 0;
  let selfClosingCount = 0;
  let attributeCount = 0;

  // Regex patterns
  const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)\s*([^>]*?)(\/?)>/g;
  const attributePattern = /([a-zA-Z-]+)\s*=\s*(["']?)([^"'\s>]+)\2/g;

  let match;
  let lineNum = 0;
  let charIndex = 0;

  while (lineNum < lines.length) {
    const line = lines[lineNum];
    const lineStartIndex = charIndex;

    // Check for unclosed strings/attributes on the line
    let inQuote: string | null = null;
    let quoteStartLine = -1;
    let quoteStartCol = -1;

    for (let col = 0; col < line.length; col++) {
      const char = line[col];

      if ((char === '"' || char === "'") && !inQuote) {
        inQuote = char;
        quoteStartLine = lineNum;
        quoteStartCol = col;
      } else if (char === inQuote) {
        inQuote = null;
      }

      // Check for unescaped < or > inside attributes
      if (inQuote && (char === '<' || char === '>')) {
        errors.push({
          line: lineNum + 1,
          column: col + 1,
          message: `Unescaped '${char}' inside attribute value`,
          suggestion: 'Use &lt; or &gt; instead, or properly quote the attribute value'
        });
      }
    }

    if (inQuote !== null) {
      errors.push({
        line: quoteStartLine + 1,
        column: quoteStartCol + 1,
        message: 'Unclosed quote in attribute value',
        suggestion: `Add closing quote '${inQuote}'`
      });
    }

    // Parse tags on this line
    tagPattern.lastIndex = 0;
    while ((match = tagPattern.exec(line)) !== null) {
      const fullMatch = match[0];
      const tagName = match[1].toLowerCase();
      const attributes = match[2];
      const selfClosing = match[3] === '/';

      tagCount++;

      if (SELF_CLOSING_TAGS.has(tagName) || VOID_ELEMENTS.has(tagName)) {
        selfClosingCount++;
        continue;
      }

      // Check for attributes without quotes
      attributePattern.lastIndex = 0;
      let attrMatch;
      const attrString = attributes;
      let hasUnquotedAttr = false;

      // Simple check for unquoted attribute values
      const unquotedPattern = /=\s*([^"'\s>]+)/g;
      let unquotedMatch;
      const unquotedAttrPattern = /([a-zA-Z-]+)\s*=\s*([^"'\s>]+)/;
      const simpleAttrMatch = attrString.match(unquotedAttrPattern);
      if (simpleAttrMatch && !attrString.includes('"') && !attrString.includes("'")) {
        hasUnquotedAttr = true;
        const attrCol = attrString.indexOf(simpleAttrMatch[2]);
        errors.push({
          line: lineNum + 1,
          column: match.index + attrCol + 1,
          message: `Unquoted attribute value '${simpleAttrMatch[2]}'`,
          suggestion: `Wrap the value in quotes: ${simpleAttrMatch[1]}="${simpleAttrMatch[2]}"`
        });
      }

      // Count attributes
      const attrMatches = attrString.match(/[a-zA-Z-]+=/g);
      if (attrMatches) {
        attributeCount += attrMatches.length;
      }

      // Determine column position within the line
      const tagStartInLine = match.index;

      if (fullMatch.startsWith('</')) {
        // Closing tag
        const expectedTag = tagStack.pop();
        if (!expectedTag) {
          errors.push({
            line: lineNum + 1,
            column: tagStartInLine + 1,
            message: `Unexpected closing tag '</${tagName}>'`,
            suggestion: `Remove this closing tag or add a matching opening tag`
          });
        } else if (expectedTag.name !== tagName) {
          errors.push({
            line: lineNum + 1,
            column: tagStartInLine + 1,
            message: `Mismatched closing tag '</${tagName}>' - expected '</${expectedTag.name}>'`,
            suggestion: `Change '</${tagName}>' to '</${expectedTag.name}>' or remove it`
          });
        }
      } else if (selfClosing) {
        // Self-closing tag (like <br/>)
        // No push to stack needed
      } else {
        // Opening tag
        tagStack.push({ name: tagName, line: lineNum + 1, column: tagStartInLine + 1 });
      }
    }

    charIndex += line.length + 1; // +1 for newline
    lineNum++;
  }

  // Check for unclosed tags
  for (const unclosed of tagStack) {
    errors.push({
      line: unclosed.line,
      column: unclosed.column,
      message: `Unclosed tag '<${unclosed.name}>'`,
      suggestion: `Add closing tag '</${unclosed.name}>' after line ${unclosed.line}`
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    stats: {
      tags: tagCount,
      selfClosingTags: selfClosingCount,
      attributes: attributeCount
    }
  };
}

export default function HtmlValidatorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [autoValidate, setAutoValidate] = useState(true);

  const handleValidate = useCallback(() => {
    const validationResult = validateHtml(input);
    setResult(validationResult);
  }, [input]);

  // Auto-validate on input change
  useEffect(() => {
    if (autoValidate && input.trim()) {
      const timer = setTimeout(() => {
        handleValidate();
      }, 300);
      return () => clearTimeout(timer);
    } else if (!input.trim()) {
      setResult(null);
    }
  }, [input, autoValidate, handleValidate]);

  const loadValidSample = useCallback(() => {
    const sample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <header>
    <h1>Welcome</h1>
    <nav>
      <a href="/home">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <p>This is a paragraph with <strong>bold</strong> text.</p>
    <img src="/image.png" alt="Sample">
  </main>
</body>
</html>`;
    setInput(sample);
  }, []);

  const loadInvalidSample = useCallback(() => {
    const sample = `<div>
  <p>This is a paragraph
  <span>Unclosed span
  <div>Mismatched closing</div>
</p>
  <a href="/test" title=Test>Link</a>
</div>`;
    setInput(sample);
  }, []);

  const clearInput = useCallback(() => {
    setInput('');
    setResult(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleValidate}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Validate
        </button>
        <button
          onClick={clearInput}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
        >
          Clear
        </button>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={autoValidate}
              onChange={(e) => setAutoValidate(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            Auto-validate
          </label>
        </div>
      </div>

      {/* Sample buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">Load sample:</span>
        <button
          onClick={loadValidSample}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Valid HTML
        </button>
        <span className="text-gray-400">|</span>
        <button
          onClick={loadInvalidSample}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Invalid HTML
        </button>
      </div>

      {/* Validation Result */}
      {result && (
        <div
          className={`p-4 rounded-lg border ${
            result.isValid
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-start gap-3">
            {result.isValid ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3
                className={`font-semibold ${
                  result.isValid
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}
              >
                {result.isValid ? 'Valid HTML' : 'Invalid HTML'}
              </h3>

              {!result.isValid && result.errors.length > 0 && (
                <div className="mt-3 space-y-3">
                  {result.errors.map((error, index) => (
                    <div
                      key={index}
                      className="text-sm bg-red-100 dark:bg-red-900/30 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          Line {error.line}, Col {error.column}:
                        </span>
                        <span className="text-red-700 dark:text-red-300">
                          {error.message}
                        </span>
                      </div>
                      {error.suggestion && (
                        <div className="mt-1 text-blue-600 dark:text-blue-400 text-xs">
                          Suggestion: {error.suggestion}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {result.isValid && result.stats && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Tags</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.tags}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Self-closing</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.selfClosingTags}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Attributes</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.attributes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          HTML Input
        </label>
        <CodeEditor
          value={input}
          onChange={setInput}
          placeholder="Enter HTML code to validate..."
          language="html"
        />
      </div>

      {/* Error count badge if there are errors */}
      {result && !result.isValid && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
          <AlertTriangle className="w-4 h-4" />
          Found {result.errors.length} error{result.errors.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">Validation Rules</h3>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>- Opening and closing tags must match</li>
              <li>- Attribute values should be quoted</li>
              <li>- Tags must be properly nested (no overlapping)</li>
              <li>- Self-closing tags end with /&gt;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
