'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';

// Simple MD5 implementation (client-side)
function md5(string: string): string {
  function rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift));
  }

  function addUnsigned(x: number, y: number): number {
    const lsw = (x & 0xFFFF) + (y & 0xFFFF);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  function f(x: number, y: number, z: number): number { return (x & y) | ((~x) & z); }
  function g(x: number, y: number, z: number): number { return (x & z) | (y & (~z)); }
  function h(x: number, y: number, z: number): number { return x ^ y ^ z; }
  function i(x: number, y: number, z: number): number { return y ^ (x | (~z)); }

  function ff(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(str: string): number[] {
    const utf8str = unescape(encodeURIComponent(str));
    const lWordCount = (((utf8str.length + 8) >> 6) + 1) * 16;
    const lWordArray = new Array(lWordCount).fill(0);
    
    for (let i = 0; i < utf8str.length; i++) {
      lWordArray[i >> 2] |= utf8str.charCodeAt(i) << ((i % 4) * 8);
    }
    lWordArray[utf8str.length >> 2] |= 0x80 << ((utf8str.length % 4) * 8);
    lWordArray[lWordCount - 2] = utf8str.length * 8;
    
    return lWordArray;
  }

  function wordToHex(value: number): string {
    let hex = '';
    for (let i = 0; i <= 3; i++) {
      const byte = (value >>> (i * 8)) & 255;
      hex += ('0' + byte.toString(16)).slice(-2);
    }
    return hex;
  }

  const x = convertToWordArray(string);
  let [a, b, c, d] = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476];

  for (let k = 0; k < x.length; k += 16) {
    const [AA, BB, CC, DD] = [a, b, c, d];
    
    a = ff(a, b, c, d, x[k], 7, 0xD76AA478);
    d = ff(d, a, b, c, x[k + 1], 12, 0xE8C7B756);
    c = ff(c, d, a, b, x[k + 2], 17, 0x242070DB);
    b = ff(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE);
    a = ff(a, b, c, d, x[k + 4], 7, 0xF57C0FAF);
    d = ff(d, a, b, c, x[k + 5], 12, 0x4787C62A);
    c = ff(c, d, a, b, x[k + 6], 17, 0xA8304613);
    b = ff(b, c, d, a, x[k + 7], 22, 0xFD469501);
    a = ff(a, b, c, d, x[k + 8], 7, 0x698098D8);
    d = ff(d, a, b, c, x[k + 9], 12, 0x8B44F7AF);
    c = ff(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1);
    b = ff(b, c, d, a, x[k + 11], 22, 0x895CD7BE);
    a = ff(a, b, c, d, x[k + 12], 7, 0x6B901122);
    d = ff(d, a, b, c, x[k + 13], 12, 0xFD987193);
    c = ff(c, d, a, b, x[k + 14], 17, 0xA679438E);
    b = ff(b, c, d, a, x[k + 15], 22, 0x49B40821);

    a = gg(a, b, c, d, x[k + 1], 5, 0xF61E2562);
    d = gg(d, a, b, c, x[k + 6], 9, 0xC040B340);
    c = gg(c, d, a, b, x[k + 11], 14, 0x265E5A51);
    b = gg(b, c, d, a, x[k], 20, 0xE9B6C7AA);
    a = gg(a, b, c, d, x[k + 5], 5, 0xD62F105D);
    d = gg(d, a, b, c, x[k + 10], 9, 0x02441453);
    c = gg(c, d, a, b, x[k + 15], 14, 0xD8A1E681);
    b = gg(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8);
    a = gg(a, b, c, d, x[k + 9], 5, 0x21E1CDE6);
    d = gg(d, a, b, c, x[k + 14], 9, 0xC33707D6);
    c = gg(c, d, a, b, x[k + 3], 14, 0xF4D50D87);
    b = gg(b, c, d, a, x[k + 8], 20, 0x455A14ED);
    a = gg(a, b, c, d, x[k + 13], 5, 0xA9E3E905);
    d = gg(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8);
    c = gg(c, d, a, b, x[k + 7], 14, 0x676F02D9);
    b = gg(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A);

    a = hh(a, b, c, d, x[k + 5], 4, 0xFFFA3942);
    d = hh(d, a, b, c, x[k + 8], 11, 0x8771F681);
    c = hh(c, d, a, b, x[k + 11], 16, 0x6D9D6122);
    b = hh(b, c, d, a, x[k + 14], 23, 0xFDE5380C);
    a = hh(a, b, c, d, x[k + 1], 4, 0xA4BEEA44);
    d = hh(d, a, b, c, x[k + 4], 11, 0x4BDECFA9);
    c = hh(c, d, a, b, x[k + 7], 16, 0xF6BB4B60);
    b = hh(b, c, d, a, x[k + 10], 23, 0xBEBFBC70);
    a = hh(a, b, c, d, x[k + 13], 4, 0x289B7EC6);
    d = hh(d, a, b, c, x[k + 0], 11, 0xEAA127FA);
    c = hh(c, d, a, b, x[k + 3], 16, 0xD4EF3085);
    b = hh(b, c, d, a, x[k + 6], 23, 0x04881D05);
    a = hh(a, b, c, d, x[k + 9], 4, 0xD9D4D039);
    d = hh(d, a, b, c, x[k + 12], 11, 0xE6DB99E5);
    c = hh(c, d, a, b, x[k + 15], 16, 0x1FA27CF8);
    b = hh(b, c, d, a, x[k + 2], 23, 0xC4AC5665);

    a = ii(a, b, c, d, x[k], 6, 0xF4292244);
    d = ii(d, a, b, c, x[k + 7], 10, 0x432AFF97);
    c = ii(c, d, a, b, x[k + 14], 15, 0xAB9423A7);
    b = ii(b, c, d, a, x[k + 5], 21, 0xFC93A039);
    a = ii(a, b, c, d, x[k + 12], 6, 0x655B59C3);
    d = ii(d, a, b, c, x[k + 3], 10, 0x8F0CCC92);
    c = ii(c, d, a, b, x[k + 10], 15, 0xFFEFF47D);
    b = ii(b, c, d, a, x[k + 1], 21, 0x85845DD1);
    a = ii(a, b, c, d, x[k + 8], 6, 0x6FA87E4F);
    d = ii(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0);
    c = ii(c, d, a, b, x[k + 6], 15, 0xA3014314);
    b = ii(b, c, d, a, x[k + 13], 21, 0x4E0811A1);
    a = ii(a, b, c, d, x[k + 4], 6, 0xF7537E82);
    d = ii(d, a, b, c, x[k + 11], 10, 0xBD3AF235);
    c = ii(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB);
    b = ii(b, c, d, a, x[k + 9], 21, 0xEB86D391);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
}

export default function Md5HashTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [uppercase, setUppercase] = useState(false);

  const generateHash = useCallback(() => {
    if (!input) {
      setHash('');
      return;
    }
    const result = md5(input);
    setHash(uppercase ? result.toUpperCase() : result);
  }, [input, uppercase]);

  // Auto-generate on input change
  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (value) {
      const result = md5(value);
      setHash(uppercase ? result.toUpperCase() : result);
    } else {
      setHash('');
    }
  }, [uppercase]);

  const loadSample = useCallback(() => {
    const sampleText = 'Hello, World! This is a sample text for MD5 hashing.';
    setInput(sampleText);
    const result = md5(sampleText);
    setHash(uppercase ? result.toUpperCase() : result);
  }, [uppercase]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={generateHash}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {t('tool.md5Hash.generateHash')}
        </button>
        
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          {t('common.loadSample')}
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
          {t('common.uppercase')}
        </label>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('common.input')}</label>
        <CodeEditor
          value={input}
          onChange={handleInputChange}
          placeholder="Enter text to generate MD5 hash..."
          language="text"
          minHeight="150px"
        />
      </div>

      {/* Output */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('tool.md5Hash.md5Hash')}</label>
        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <code className="flex-1 font-mono text-sm break-all text-gray-800 dark:text-gray-200">
            {hash || 'Hash will appear here...'}
          </code>
          {hash && <CopyButton text={hash} />}
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>{t('tool.md5Hash.infoText')}</p>
      </div>
    </div>
  );
}
