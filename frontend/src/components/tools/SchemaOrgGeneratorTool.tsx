'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Plus, Trash2, Globe, Tag } from 'lucide-react';
import {
  generateSchemaOrgJsonLd,
  formatSchemaOrgScript,
  type SchemaType,
  type FAQItem,
} from '@/lib/schemaOrgGenerator';

export default function SchemaOrgGeneratorTool() {
  const [type, setType] = useState<SchemaType>('FAQPage');
  const [copied, setCopied] = useState(false);

  // FAQ state
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { question: 'What is DevsTools?', answer: 'DevsTools is a free, privacy-first developer tools suite.' },
    { question: 'Does it process data in the cloud?', answer: 'No, 100% of processing happens in your browser.' },
  ]);

  // Article state
  const [headline, setHeadline] = useState('Top Modern Developer Tools');
  const [description, setDescription] = useState('An in-depth guide on high-productivity developer utilities.');
  const [authorName, setAuthorName] = useState('Jane Doe');
  const [publisherName, setPublisherName] = useState('Tech Devs');
  const [datePublished, setDatePublished] = useState('2026-03-01');

  // Product state
  const [productName, setProductName] = useState('Developer Pro Suite');
  const [brand, setBrand] = useState('DevBrand');
  const [price, setPrice] = useState('49.99');
  const [priceCurrency, setPriceCurrency] = useState('USD');
  const [ratingValue, setRatingValue] = useState('4.9');
  const [reviewCount, setReviewCount] = useState('128');

  const jsonLdObject = useMemo(() => {
    return generateSchemaOrgJsonLd({
      type,
      faqs,
      headline,
      description,
      authorName,
      publisherName,
      datePublished,
      productName,
      brand,
      price,
      priceCurrency,
      ratingValue,
      reviewCount,
    });
  }, [
    type,
    faqs,
    headline,
    description,
    authorName,
    publisherName,
    datePublished,
    productName,
    brand,
    price,
    priceCurrency,
    ratingValue,
    reviewCount,
  ]);

  const scriptTagOutput = useMemo(() => {
    return formatSchemaOrgScript(jsonLdObject);
  }, [jsonLdObject]);

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptTagOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: 'question' | 'answer', val: string) => {
    const updated = [...faqs];
    updated[index][field] = val;
    setFaqs(updated);
  };

  return (
    <div className="space-y-6">
      {/* Schema Type Selector */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Schema Type:</span>
        {(['FAQPage', 'Article', 'Product', 'Organization'] as SchemaType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              type === t
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Form Inputs */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-indigo-500" /> {type} Configuration
          </span>

          {type === 'FAQPage' && (
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Question #{idx + 1}</span>
                    {faqs.length > 1 && (
                      <button
                        onClick={() => removeFaq(idx)}
                        className="text-red-500 hover:text-red-600 p-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. How does this work?"
                    value={faq.question}
                    onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <textarea
                    placeholder="Answer details..."
                    value={faq.answer}
                    onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              ))}
              <button
                onClick={addFaq}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition"
              >
                <Plus className="h-3.5 w-3.5" /> Add Another FAQ Item
              </button>
            </div>
          )}

          {type === 'Article' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Publisher</label>
                <input
                  type="text"
                  value={publisherName}
                  onChange={(e) => setPublisherName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Date Published</label>
                <input
                  type="date"
                  value={datePublished}
                  onChange={(e) => setDatePublished(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>
          )}

          {type === 'Product' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Price</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Generated JSON-LD Preview */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-indigo-500" /> JSON-LD Script Tag
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy Script'}
            </button>
          </div>
          <textarea
            readOnly
            value={scriptTagOutput}
            rows={16}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
