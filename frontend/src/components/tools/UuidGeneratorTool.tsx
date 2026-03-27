'use client';

import { useState, useCallback, useEffect } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { RefreshCw, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type UuidVersion = 'v1' | 'v3' | 'v4' | 'v5';

// UUID v1: Time-based
function generateUUIDv1(): string {
  const bytes = new Uint8Array(16);
  const timestamp = Date.now();
  const clockSeq = (Math.random() * 16384) | 0;

  bytes[0] = (timestamp >> 24) & 0xff;
  bytes[1] = (timestamp >> 16) & 0xff;
  bytes[2] = (timestamp >> 8) & 0xff;
  bytes[3] = timestamp & 0xff;
  bytes[4] = ((timestamp >> 40) & 0xff);
  bytes[5] = ((timestamp >> 32) & 0xff);
  bytes[6] = ((timestamp >> 48) & 0x0f) | 0x10;
  bytes[8] = (clockSeq & 0x3f) | 0x80;
  bytes[9] = clockSeq & 0xff;
  crypto.getRandomValues(bytes.subarray(10, 16));

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Simple MD5 implementation for UUID v3
function md5(str: string): string {
  function safeAdd(x: number, y: number) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  const msg = unescape(encodeURIComponent(str));
  const P = Math.pow(2, 32);
  const k = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * P));

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;

  const len = msg.length;
  const nblocks = Math.floor((len + 9) / 64);
  const padded = msg + '\x80' + String.fromCharCode(0).repeat((64 - (len + 9) % 64) % 64);
  const bytes = [];
  for (let i = 0; i < padded.length; i++) {
    bytes.push(padded.charCodeAt(i));
  }
  const hi = ((len / 0xffffffff) | 0);
  const lo = (len % 0xffffffff);
  bytes.push((hi >> 24) & 0xff, (hi >> 16) & 0xff, (hi >> 8) & 0xff, hi & 0xff);
  bytes.push((lo >> 24) & 0xff, (lo >> 16) & 0xff, (lo >> 8) & 0xff, lo & 0xff);

  for (let block = 0; block < nblocks; block++) {
    const X = [];
    for (let i = 0; i < 16; i++) {
      X.push((bytes[block * 64 + i * 4] | (bytes[block * 64 + i * 4 + 1] << 8) |
        (bytes[block * 64 + i * 4 + 2] << 16) | (bytes[block * 64 + i * 4 + 3] << 24)) >>> 0);
    }

    const aa = a, bb = b, cc = c, dd = d;

    a = md5ff(a, b, c, d, X[0], 7, k[0]);
    d = md5ff(d, a, b, c, X[1], 12, k[1]);
    c = md5ff(c, d, a, b, X[2], 17, k[2]);
    b = md5ff(b, c, d, a, X[3], 22, k[3]);
    a = md5ff(a, b, c, d, X[4], 7, k[4]);
    d = md5ff(d, a, b, c, X[5], 12, k[5]);
    c = md5ff(c, d, a, b, X[6], 17, k[6]);
    b = md5ff(b, c, d, a, X[7], 22, k[7]);
    a = md5ff(a, b, c, d, X[8], 7, k[8]);
    d = md5ff(d, a, b, c, X[9], 12, k[9]);
    c = md5ff(c, d, a, b, X[10], 17, k[10]);
    b = md5ff(b, c, d, a, X[11], 22, k[11]);
    a = md5ff(a, b, c, d, X[12], 7, k[12]);
    d = md5ff(d, a, b, c, X[13], 12, k[13]);
    c = md5ff(c, d, a, b, X[14], 17, k[14]);
    b = md5ff(b, c, d, a, X[15], 22, k[15]);

    a = md5gg(a, b, c, d, X[1], 5, k[16]);
    d = md5gg(d, a, b, c, X[6], 9, k[17]);
    c = md5gg(c, d, a, b, X[11], 14, k[18]);
    b = md5gg(b, c, d, a, X[0], 20, k[19]);
    a = md5gg(a, b, c, d, X[5], 5, k[20]);
    d = md5gg(d, a, b, c, X[10], 9, k[21]);
    c = md5gg(c, d, a, b, X[15], 14, k[22]);
    b = md5gg(b, c, d, a, X[4], 20, k[23]);
    a = md5gg(a, b, c, d, X[9], 5, k[24]);
    d = md5gg(d, a, b, c, X[14], 9, k[25]);
    c = md5gg(c, d, a, b, X[3], 14, k[26]);
    b = md5gg(b, c, d, a, X[8], 20, k[27]);
    a = md5gg(a, b, c, d, X[13], 5, k[28]);
    d = md5gg(d, a, b, c, X[2], 9, k[29]);
    c = md5gg(c, d, a, b, X[7], 14, k[30]);
    b = md5gg(b, c, d, a, X[12], 20, k[31]);

    a = md5hh(a, b, c, d, X[5], 4, k[32]);
    d = md5hh(d, a, b, c, X[8], 11, k[33]);
    c = md5hh(c, d, a, b, X[11], 16, k[34]);
    b = md5hh(b, c, d, a, X[14], 23, k[35]);
    a = md5hh(a, b, c, d, X[1], 4, k[36]);
    d = md5hh(d, a, b, c, X[4], 11, k[37]);
    c = md5hh(c, d, a, b, X[7], 16, k[38]);
    b = md5hh(b, c, d, a, X[10], 23, k[39]);
    a = md5hh(a, b, c, d, X[13], 4, k[40]);
    d = md5hh(d, a, b, c, X[0], 11, k[41]);
    c = md5hh(c, d, a, b, X[3], 16, k[42]);
    b = md5hh(b, c, d, a, X[6], 23, k[43]);
    a = md5hh(a, b, c, d, X[9], 4, k[44]);
    d = md5hh(d, a, b, c, X[12], 11, k[45]);
    c = md5hh(c, d, a, b, X[15], 16, k[46]);
    b = md5hh(b, c, d, a, X[2], 23, k[47]);

    a = md5ii(a, b, c, d, X[0], 6, k[48]);
    d = md5ii(d, a, b, c, X[7], 10, k[49]);
    c = md5ii(c, d, a, b, X[14], 15, k[50]);
    b = md5ii(b, c, d, a, X[5], 21, k[51]);
    a = md5ii(a, b, c, d, X[12], 6, k[52]);
    d = md5ii(d, a, b, c, X[3], 10, k[53]);
    c = md5ii(c, d, a, b, X[10], 15, k[54]);
    b = md5ii(b, c, d, a, X[1], 21, k[55]);
    a = md5ii(a, b, c, d, X[8], 6, k[56]);
    d = md5ii(d, a, b, c, X[15], 10, k[57]);
    c = md5ii(c, d, a, b, X[6], 15, k[58]);
    b = md5ii(b, c, d, a, X[13], 21, k[59]);
    a = md5ii(a, b, c, d, X[4], 6, k[60]);
    d = md5ii(d, a, b, c, X[11], 10, k[61]);
    c = md5ii(c, d, a, b, X[2], 15, k[62]);
    b = md5ii(b, c, d, a, X[9], 21, k[63]);

    a = ((a + aa) >>> 0);
    b = ((b + bb) >>> 0);
    c = ((c + cc) >>> 0);
    d = ((d + dd) >>> 0);
  }

  const toHex = (n: number) => {
    let h = '';
    for (let i = 0; i < 4; i++) {
      h += ((n >>> (i * 8)) & 0xff).toString(16).padStart(2, '0');
    }
    return h;
  };

  return toHex(a) + toHex(b) + toHex(c) + toHex(d);
}

// SHA-1 hash for UUID v5
async function sha1(str: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// UUID v4: Random
function generateUUIDv4(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// UUID v3: MD5-based namespace
function generateUUIDv3(namespace: string, name: string): string {
  const n = md5(namespace + name);
  const bytes = [];
  for (let i = 0; i < 16; i++) {
    bytes.push(parseInt(n.slice(i * 2, i * 2 + 2), 16));
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x30;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// UUID v5: SHA-1-based namespace (async)
async function generateUUIDv5(namespace: string, name: string): Promise<string> {
  const n = await sha1(namespace + name);
  const bytes = [];
  for (let i = 0; i < 16; i++) {
    bytes.push(parseInt(n.slice(i * 2, i * 2 + 2), 16));
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Namespace UUIDs
const NAMESPACES: Record<string, string> = {
  'dns': '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  'url': '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  'oid': '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
  'x500': '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
};

export default function UuidGeneratorTool() {
  const { t } = useLanguage();
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [includeHyphens, setIncludeHyphens] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [version, setVersion] = useState<UuidVersion>('v4');
  const [namespace, setNamespace] = useState('dns');
  const [customNamespace, setCustomNamespace] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const useNamespace = namespace === 'custom' ? customNamespace : NAMESPACES[namespace];

  useEffect(() => {
    if (!isInitialized) {
      setUuids([generateUUIDv4()]);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const formatUuid = useCallback((uuid: string): string => {
    let formatted = uuid;
    if (!includeHyphens) {
      formatted = formatted.replace(/-/g, '');
    }
    if (uppercase) {
      formatted = formatted.toUpperCase();
    }
    return formatted;
  }, [uppercase, includeHyphens]);

  const generateUuids = useCallback(async () => {
    setIsGenerating(true);
    const newUuids: string[] = [];

    for (let i = 0; i < count; i++) {
      let uuid = '';
      switch (version) {
        case 'v1':
          uuid = generateUUIDv1();
          break;
        case 'v3':
          if (nameInput) {
            uuid = generateUUIDv3(useNamespace || NAMESPACES.dns, nameInput);
          } else {
            uuid = generateUUIDv3(NAMESPACES.dns, `name-${i}`);
          }
          break;
        case 'v4':
          uuid = generateUUIDv4();
          break;
        case 'v5':
          if (nameInput) {
            uuid = await generateUUIDv5(useNamespace || NAMESPACES.dns, nameInput);
          } else {
            uuid = await generateUUIDv5(NAMESPACES.dns, `name-${i}`);
          }
          break;
      }
      newUuids.push(uuid);
    }

    setUuids(newUuids);
    setIsGenerating(false);
  }, [count, version, useNamespace, nameInput]);

  const clearUuids = useCallback(() => {
    setUuids([]);
  }, []);

  const allUuids = uuids.map(formatUuid).join('\n');

  return (
    <div className="space-y-6">
      {/* Version Selection */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">{t('tool.uuidGenerator.version')}:</label>
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value as UuidVersion)}
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="v4">v4 (Random)</option>
            <option value="v1">v1 (Time-based)</option>
            <option value="v3">v3 (MD5 namespace)</option>
            <option value="v5">v5 (SHA-1 namespace)</option>
          </select>
        </div>

        {(version === 'v3' || version === 'v5') && (
          <>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">{t('tool.uuidGenerator.namespace')}:</label>
              <select
                value={namespace}
                onChange={(e) => setNamespace(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="dns">DNS</option>
                <option value="url">URL</option>
                <option value="oid">OID</option>
                <option value="x500">X.500</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {namespace === 'custom' && (
              <input
                type="text"
                value={customNamespace}
                onChange={(e) => setCustomNamespace(e.target.value)}
                placeholder="Custom namespace UUID"
                className="flex-1 min-w-[200px] border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            )}

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">{t('tool.uuidGenerator.name')}:</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder={t('tool.uuidGenerator.namePlaceholder')}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">{t('tool.uuidGenerator.quantity')}:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="w-20 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          {t('tool.uuidGenerator.uppercase')}
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={includeHyphens}
            onChange={(e) => setIncludeHyphens(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          {t('tool.uuidGenerator.hyphens')}
        </label>

        <button
          onClick={generateUuids}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {t('common.generate')}
        </button>

        <button
          onClick={clearUuids}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={t('common.clear')}
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <CopyButton text={allUuids} />
      </div>

      {/* Version Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
        {version === 'v4' && <p><strong>v4:</strong> {t('tool.uuidGenerator.v4Info')}</p>}
        {version === 'v1' && <p><strong>v1:</strong> {t('tool.uuidGenerator.v1Info')}</p>}
        {version === 'v3' && <p><strong>v3:</strong> {t('tool.uuidGenerator.v3Info')}</p>}
        {version === 'v5' && <p><strong>v5:</strong> {t('tool.uuidGenerator.v5Info')}</p>}
      </div>

      {/* Generated UUIDs */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
        {uuids.length > 0 ? (
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-600"
              >
                <code className="font-mono text-sm text-gray-800 dark:text-gray-200">
                  {formatUuid(uuid)}
                </code>
                <CopyButton text={formatUuid(uuid)} className="text-xs" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('common.generate')}...</p>
        )}
      </div>
    </div>
  );
}
