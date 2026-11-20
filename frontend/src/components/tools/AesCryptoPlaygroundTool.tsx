'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { Lock, RefreshCw, Unlock } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import {
  decryptAes,
  encryptAes,
  formatAesKeyHex,
  generateAesIvHex,
  type AesAlgorithm,
  type AesKeyBits,
} from '@/lib/aesCryptoPlayground';

export default function AesCryptoPlaygroundTool() {
  const { t } = useLanguage();
  const [algorithm, setAlgorithm] = useState<AesAlgorithm>('AES-GCM');
  const [keyBits, setKeyBits] = useState<AesKeyBits>(256);
  const [keyHex, setKeyHex] = useState(() => formatAesKeyHex(256));
  const [ivHex, setIvHex] = useState(() => generateAesIvHex('AES-GCM'));
  const [plaintext, setPlaintext] = useState('{"message":"Secret payload"}');
  const [ciphertext, setCiphertext] = useState('');
  const [cipherFormat, setCipherFormat] = useState<'base64' | 'hex'>('base64');
  const [decrypted, setDecrypted] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleAlgorithmChange = (nextAlg: AesAlgorithm) => {
    setAlgorithm(nextAlg);
    setIvHex(generateAesIvHex(nextAlg));
    setError(null);
  };

  const handleKeyBitsChange = (nextBits: AesKeyBits) => {
    setKeyBits(nextBits);
    setKeyHex(formatAesKeyHex(nextBits));
    setError(null);
  };

  const handleEncrypt = async () => {
    setBusy(true);
    setError(null);
    try {
      const freshIv = generateAesIvHex(algorithm);
      const res = await encryptAes(plaintext, keyHex, algorithm, freshIv);
      setIvHex(res.ivHex);
      setCiphertext(cipherFormat === 'hex' ? res.ciphertextHex : res.ciphertextBase64);
      setDecrypted('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed.');
    } finally {
      setBusy(false);
    }
  };

  const handleDecrypt = async () => {
    setBusy(true);
    setError(null);
    try {
      const plain = await decryptAes(ciphertext, keyHex, ivHex, algorithm, cipherFormat);
      setDecrypted(plain);
    } catch (err) {
      setDecrypted('');
      setError(err instanceof Error ? err.message : 'Decryption failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="aes-alg" className="block text-xs font-semibold">
              Cipher Mode
            </label>
            <select
              id="aes-alg"
              value={algorithm}
              onChange={(e) => handleAlgorithmChange(e.target.value as AesAlgorithm)}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="AES-GCM">AES-GCM (Authenticated)</option>
              <option value="AES-CBC">AES-CBC (PKCS#7)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="aes-bits" className="block text-xs font-semibold">
              Key Size
            </label>
            <select
              id="aes-bits"
              value={keyBits}
              onChange={(e) => handleKeyBitsChange(Number(e.target.value) as AesKeyBits)}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value={256}>256-bit (32 bytes)</option>
              <option value={128}>128-bit (16 bytes)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="aes-format" className="block text-xs font-semibold">
              Ciphertext Format
            </label>
            <select
              id="aes-format"
              value={cipherFormat}
              onChange={(e) => setCipherFormat(e.target.value as 'base64' | 'hex')}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="base64">Base64</option>
              <option value="hex">Hexadecimal</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="aes-key-input" className="text-xs font-semibold">
                Key (Hex)
              </label>
              <button
                type="button"
                onClick={() => setKeyHex(formatAesKeyHex(keyBits))}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                <RefreshCw className="h-3 w-3" />
                {keyBits === 256 ? t('uiText.476000b9') : 'Generate 128-bit AES Key'}
              </button>
            </div>
            <input
              id="aes-key-input"
              type="text"
              value={keyHex}
              onChange={(e) => setKeyHex(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="aes-iv-input" className="text-xs font-semibold">
                IV / Nonce (Hex, {algorithm === 'AES-GCM' ? '12 bytes' : '16 bytes'})
              </label>
              <button
                type="button"
                onClick={() => setIvHex(generateAesIvHex(algorithm))}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                <RefreshCw className="h-3 w-3" />
                Random IV
              </button>
            </div>
            <input
              id="aes-iv-input"
              type="text"
              value={ivHex}
              onChange={(e) => setIvHex(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="aes-plaintext" className="text-xs font-semibold">
              Plaintext Input
            </label>
            <button
              type="button"
              onClick={handleEncrypt}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              <Lock className="h-3.5 w-3.5" />
              Encrypt
            </button>
          </div>
          <textarea
            id="aes-plaintext"
            rows={6}
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="aes-ciphertext" className="text-xs font-semibold">
              Ciphertext ({cipherFormat.toUpperCase()})
            </label>
            <div className="flex items-center gap-2">
              <CopyButton text={ciphertext} />
              <button
                type="button"
                onClick={handleDecrypt}
                disabled={busy || !ciphertext.trim()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                <Unlock className="h-3.5 w-3.5" />
                Decrypt
              </button>
            </div>
          </div>
          <textarea
            id="aes-ciphertext"
            rows={6}
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            placeholder="Click Encrypt or paste ciphertext to decrypt..."
            className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>

      {decrypted !== '' && (
        <div className="surface-card rounded-2xl p-6 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="aes-decrypted"
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-300"
            >
              Decrypted Plaintext
            </label>
            <CopyButton text={decrypted} />
          </div>
          <textarea
            id="aes-decrypted"
            readOnly
            rows={4}
            value={decrypted}
            className="w-full rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 font-mono text-xs dark:border-emerald-900/50 dark:bg-emerald-950/30"
          />
        </div>
      )}
    </div>
  );
}
