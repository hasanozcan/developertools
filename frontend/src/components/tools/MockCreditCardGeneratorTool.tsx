'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useEffect } from 'react';
import { generateTestCard } from '@/lib/mockCreditCardGenerator';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function MockCreditCardGeneratorTool() {
  const { t } = useLanguage();
  const [brand, setBrand] = useState<'visa' | 'mastercard' | 'amex'>('visa');
  const [card, setCard] = useState({ number: '', exp: '', cvv: '', brand: 'visa' });
  const [copied, setCopied] = useState(false);

  const gen = (b: 'visa' | 'mastercard' | 'amex' = brand) => setCard(generateTestCard(b));
  useEffect(() => { gen('visa'); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button onClick={() => { setBrand('visa'); gen('visa'); }} className={`rounded-lg px-3 py-1 text-xs font-semibold ${brand === 'visa' ? 'bg-indigo-600 text-white' : ''}`}>{t("uiText.486facb8")}</button>
          <button onClick={() => { setBrand('mastercard'); gen('mastercard'); }} className={`rounded-lg px-3 py-1 text-xs font-semibold ${brand === 'mastercard' ? 'bg-indigo-600 text-white' : ''}`}>{t("uiText.1cbc10e5")}</button>
          <button onClick={() => { setBrand('amex'); gen('amex'); }} className={`rounded-lg px-3 py-1 text-xs font-semibold ${brand === 'amex' ? 'bg-indigo-600 text-white' : ''}`}>{t("uiText.c8b3b42e")}</button>
        </div>
        <button onClick={() => gen()} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500">
          <RefreshCw className="h-4 w-4" /> {t("uiText.77f5a18f")}</button>
      </div>

      <div className="p-6 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white max-w-sm mx-auto shadow-2xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-indigo-300">
          <span>{t("uiText.4dff1020")}</span>
          <span className="font-bold text-white uppercase">{card.brand}</span>
        </div>
        <p className="font-mono text-xl font-bold tracking-widest">{card.number.match(/.{1,4}/g)?.join(' ')}</p>
        <div className="flex justify-between text-xs font-mono">
          <div><span className="text-slate-400 block text-[10px]">{t("uiText.72967023")}</span>{card.exp}</div>
          <div><span className="text-slate-400 block text-[10px]">{t("uiText.892a070e")}</span>{card.cvv}</div>
        </div>
      </div>
    </div>
  );
}
