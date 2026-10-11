'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  calculateClaudeTokens,
  CLAUDE_PRICING,
  DEFAULT_CLAUDE_MODEL,
  parseClaudeOutputTokens,
  type ClaudeModelId,
} from '@/lib/claudeTokenCounter';

function formatCost(cost: number): string {
  return cost > 0 && cost < 0.000001 ? '<$0.000001' : `$${cost.toFixed(6)}`;
}

export default function ClaudeTokenCounterTool() {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [model, setModel] = useState<ClaudeModelId>(DEFAULT_CLAUDE_MODEL);
  const [output, setOutput] = useState('0');
  const outputTokens = parseClaudeOutputTokens(output);
  const stats = useMemo(
    () => (outputTokens === null ? null : calculateClaudeTokens(text, model, outputTokens)),
    [text, model, outputTokens],
  );
  const fieldClass =
    'w-full min-w-0 rounded-xl border border-border bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary';

  return (
    <div className="space-y-6">
      <p
        id="claude-estimate-notice"
        className="rounded-xl border border-border bg-muted p-4 text-sm"
      >
        {t('claude.approximation')}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="min-w-0 space-y-2">
          <span className="block text-sm font-medium">{t('claude.model')}</span>
          <select
            className={fieldClass}
            value={model}
            onChange={(e) => setModel(e.target.value as ClaudeModelId)}
          >
            {CLAUDE_PRICING.models.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0 space-y-2">
          <span className="block text-sm font-medium">{t('claude.outputTokens')}</span>
          <input
            className={fieldClass}
            type="text"
            inputMode="numeric"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            aria-invalid={outputTokens === null}
            aria-describedby="claude-output-help"
          />
        </label>
      </div>
      <p id="claude-output-help" className="text-sm text-muted-foreground">
        {t('claude.outputHelp')}
      </p>
      {outputTokens === null && (
        <p role="alert" className="text-sm text-destructive">
          {t('claude.invalidOutput')}
        </p>
      )}
      <label className="block space-y-2">
        <span className="block text-sm font-medium">{t('claude.inputText')}</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className={`${fieldClass} font-mono`}
          aria-describedby="claude-estimate-notice"
          placeholder={t('claude.placeholder')}
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="min-h-11 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => {
            setText('Summarize the code and list the risks.'.repeat(100));
            setOutput('500');
          }}
        >
          {t('claude.example')}
        </button>
        <button
          type="button"
          className="min-h-11 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => {
            setText('const message = "Merhaba 世界 👋";\nconsole.log(message);');
            setOutput('250');
          }}
        >
          {t('claude.unicodeExample')}
        </button>
        <button
          type="button"
          className="min-h-11 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => {
            setText('');
            setOutput('0');
            setModel(DEFAULT_CLAUDE_MODEL);
          }}
        >
          {t('claude.reset')}
        </button>
      </div>
      {stats && (
        <div role="status" aria-live="polite" aria-atomic="true" className="space-y-4">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(
              [
                ['claude.inputTokens', stats.inputTokens, 'input-tokens'],
                ['claude.outputTokens', stats.outputTokens, 'output-tokens'],
                ['claude.inputCost', formatCost(stats.inputCost), 'input-cost'],
                ['claude.outputCost', formatCost(stats.outputCost), 'output-cost'],
                ['claude.totalCost', formatCost(stats.totalCost), 'total-cost'],
              ] as const
            ).map(([key, value, id]) => (
              <div key={key} className="min-w-0 rounded-xl border border-border bg-card p-4">
                <dt className="text-sm text-muted-foreground">{t(key)}</dt>
                <dd data-testid={id} className="break-words text-xl font-semibold">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-muted-foreground">
            {t('claude.rates')}: ${stats.inputRate} / ${stats.outputRate}
          </p>
        </div>
      )}
      <p className="text-sm text-muted-foreground">{t('claude.pricingScope')}</p>
      <p className="text-sm text-muted-foreground">
        {t('claude.sources')} ({CLAUDE_PRICING.verifiedOn}):{' '}
        <a
          className="underline"
          href={CLAUDE_PRICING.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('claude.pricing')}
        </a>
        {' · '}
        <a
          className="underline"
          href={CLAUDE_PRICING.tokenCountingSource}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('claude.tokenGuide')}
        </a>
      </p>
    </div>
  );
}
