'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import {
  convertBtcUnits,
  convertEthUnits,
  type BtcUnit,
  type EthUnit,
} from '@/lib/cryptoUnitConverter';

export default function CryptoUnitConverterTool() {
  const { t } = useLanguage();
  const [chain, setChain] = useState<'eth' | 'btc'>('eth');
  const [val, setVal] = useState('1');
  const [ethUnit, setEthUnit] = useState<EthUnit>('ether');
  const [btcUnit, setBtcUnit] = useState<BtcUnit>('btc');

  const { ethResult, btcResult, error } = useMemo(() => {
    try {
      if (chain === 'eth') {
        return { ethResult: convertEthUnits(val, ethUnit), btcResult: null, error: '' };
      }
      return { ethResult: null, btcResult: convertBtcUnits(val, btcUnit), error: '' };
    } catch (e) {
      return {
        ethResult: null,
        btcResult: null,
        error: e instanceof Error ? e.message : 'Invalid numeric amount',
      };
    }
  }, [chain, val, ethUnit, btcUnit]);

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
        <button
          type="button"
          onClick={() => setChain('eth')}
          className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
            chain === 'eth'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
          }`}
        >
          Ethereum (ETH / Gwei / Wei)
        </button>
        <button
          type="button"
          onClick={() => setChain('btc')}
          className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
            chain === 'btc'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
          }`}
        >
          Bitcoin (BTC / mBTC / Satoshi)
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          aria-label="Crypto amount"
          className="flex-1 rounded-2xl border border-slate-200 p-3 font-mono text-sm font-semibold dark:border-white/10 dark:bg-slate-950"
        />
        {chain === 'eth' ? (
          <select
            value={ethUnit}
            aria-label="Ethereum unit"
            onChange={(e) => setEthUnit(e.target.value as EthUnit)}
            className="rounded-2xl border border-slate-200 p-3 text-xs dark:border-white/10 dark:bg-slate-950"
          >
            <option value="ether">{t('uiText.07468f1d')}</option>
            <option value="gwei">{t('uiText.fcb78d21')}</option>
            <option value="wei">{t('uiText.676442e0')}</option>
          </select>
        ) : (
          <select
            value={btcUnit}
            aria-label="Bitcoin unit"
            onChange={(e) => setBtcUnit(e.target.value as BtcUnit)}
            className="rounded-2xl border border-slate-200 p-3 text-xs dark:border-white/10 dark:bg-slate-950"
          >
            <option value="btc">{t('uiText.f4d00413')}</option>
            <option value="mbtc">Millibitcoin (mBTC)</option>
            <option value="satoshi">{t('uiText.fccd00cd')}</option>
          </select>
        )}
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </div>
      ) : chain === 'eth' && ethResult ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900 space-y-2">
            <span className="text-xs font-semibold text-slate-500">{t('uiText.573a72ab')}</span>
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 break-all">
              {ethResult.ether}
            </p>
            <CopyButton text={ethResult.ether} className="px-2 py-1 text-xs" />
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900 space-y-2">
            <span className="text-xs font-semibold text-slate-500">{t('uiText.fcb78d21')}</span>
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 break-all">
              {ethResult.gwei}
            </p>
            <CopyButton text={ethResult.gwei} className="px-2 py-1 text-xs" />
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900 space-y-2">
            <span className="text-xs font-semibold text-slate-500">{t('uiText.676442e0')}</span>
            <p className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 break-all">
              {ethResult.wei}
            </p>
            <CopyButton text={ethResult.wei} className="px-2 py-1 text-xs" />
          </div>
        </div>
      ) : btcResult ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900 space-y-2">
            <span className="text-xs font-semibold text-slate-500">BTC</span>
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 break-all">
              {btcResult.btc}
            </p>
            <CopyButton text={btcResult.btc} className="px-2 py-1 text-xs" />
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900 space-y-2">
            <span className="text-xs font-semibold text-slate-500">mBTC</span>
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 break-all">
              {btcResult.mbtc}
            </p>
            <CopyButton text={btcResult.mbtc} className="px-2 py-1 text-xs" />
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900 space-y-2">
            <span className="text-xs font-semibold text-slate-500">{t('uiText.f155628f')}</span>
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 break-all">
              {btcResult.satoshi}
            </p>
            <CopyButton text={btcResult.satoshi} className="px-2 py-1 text-xs" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
