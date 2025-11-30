'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
  'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
  'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores',
  'quas', 'molestias', 'excepturi', 'obcaecati', 'cupiditate', 'provident',
  'similique', 'mollitia', 'animi', 'perspiciatis', 'unde', 'omnis', 'iste',
  'natus', 'error', 'voluptatem', 'accusantium', 'doloremque', 'laudantium',
  'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore',
  'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'explicabo',
];

const FIRST_SENTENCE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getRandomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(minWords: number = 5, maxWords: number = 15): string {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words: string[] = [];
  
  for (let i = 0; i < wordCount; i++) {
    words.push(getRandomWord());
  }
  
  return capitalize(words.join(' ')) + '.';
}

function generateParagraph(minSentences: number = 3, maxSentences: number = 7): string {
  const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences: string[] = [];
  
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  
  return sentences.join(' ');
}

type OutputType = 'paragraphs' | 'sentences' | 'words';

export default function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [outputType, setOutputType] = useState<OutputType>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let result = '';
    
    switch (outputType) {
      case 'paragraphs':
        const paragraphs: string[] = [];
        for (let i = 0; i < count; i++) {
          if (i === 0 && startWithLorem) {
            paragraphs.push(FIRST_SENTENCE + ' ' + generateParagraph(2, 6));
          } else {
            paragraphs.push(generateParagraph());
          }
        }
        result = paragraphs.join('\n\n');
        break;
        
      case 'sentences':
        const sentences: string[] = [];
        for (let i = 0; i < count; i++) {
          if (i === 0 && startWithLorem) {
            sentences.push(FIRST_SENTENCE);
          } else {
            sentences.push(generateSentence());
          }
        }
        result = sentences.join(' ');
        break;
        
      case 'words':
        const words: string[] = [];
        if (startWithLorem) {
          words.push('Lorem', 'ipsum');
        }
        while (words.length < count) {
          words.push(getRandomWord());
        }
        result = words.slice(0, count).join(' ');
        break;
    }
    
    setOutput(result);
  }, [count, outputType, startWithLorem]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
          <select
            value={outputType}
            onChange={(e) => setOutputType(e.target.value as OutputType)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of {outputType}
          </label>
          <input
            type="number"
            min="1"
            max={outputType === 'words' ? 1000 : 100}
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Start with "Lorem ipsum..."</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={generate}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Generate
        </button>
        {output && (
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Output */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generated Text</label>
        <textarea
          value={output}
          readOnly
          rows={12}
          placeholder="Click 'Generate' to create Lorem Ipsum text..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-serif text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Statistics */}
      {output && (
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>Words: <strong className="text-gray-900 dark:text-white">{output.split(/\s+/).filter(Boolean).length}</strong></span>
          <span>Characters: <strong className="text-gray-900 dark:text-white">{output.length}</strong></span>
          <span>Sentences: <strong className="text-gray-900 dark:text-white">{(output.match(/[.!?]+/g) || []).length}</strong></span>
          <span>Paragraphs: <strong className="text-gray-900 dark:text-white">{output.split(/\n\n+/).filter(Boolean).length}</strong></span>
        </div>
      )}
    </div>
  );
}
