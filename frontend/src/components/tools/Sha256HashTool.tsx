'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';

// SHA256 implementation (client-side)
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function Sha256HashTool() {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [uppercase, setUppercase] = useState(false);

  const generateHash = useCallback(async () => {
    if (!input) {
      setHash('');
      return;
    }
    const result = await sha256(input);
    setHash(uppercase ? result.toUpperCase() : result);
  }, [input, uppercase]);

  const handleInputChange = useCallback(async (value: string) => {
    setInput(value);
    if (value) {
      const result = await sha256(value);
      setHash(uppercase ? result.toUpperCase() : result);
    } else {
      setHash('');
    }
  }, [uppercase]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={generateHash}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Generate SHA256 Hash
        </button>
        
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => {
              setUppercase(e.target.checked);
              if (hash) {
                setHash(e.target.checked ? hash.toUpperCase() : hash.toLowerCase());
              }
            }}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          Uppercase
        </label>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
        <CodeEditor
          value={input}
          onChange={handleInputChange}
          placeholder="Enter text to generate SHA256 hash..."
          language="text"
          minHeight="150px"
        />
      </div>

      {/* Output */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SHA256 Hash (256-bit)</label>
        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <code className="flex-1 font-mono text-sm break-all text-gray-800 dark:text-gray-200">
            {hash || 'Hash will appear here...'}
          </code>
          {hash && <CopyButton text={hash} />}
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>SHA256 produces a 256-bit (32-byte) hash value, expressed as a 64-character hexadecimal number.</p>
      </div>
    </div>
  );
}
