import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import { translations, type Language } from '@/translations';
import { toolDictionaryKeys } from '@/translations/toolDictionaryKeys';
import { getToolUiDictionary } from '@/lib/toolUiDictionary';
import { localizeToolPageCopy } from '@/lib/localizedToolPageCopy';
import { toolPageContent } from '@/lib/toolPageContent';
import ClaudeTokenCounterTool from './ClaudeTokenCounterTool';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
const renderTool = (locale: Language = 'en') =>
  render(
    <LanguageProvider initialLocale={locale}>
      <ClaudeTokenCounterTool />
    </LanguageProvider>,
  );

describe('Claude token estimate UI', () => {
  it('starts empty with separate zero budgets and an explicit local approximation notice', () => {
    renderTool();
    expect(screen.getByLabelText('Input text')).toHaveValue('');
    expect(screen.getByTestId('total-cost')).toHaveTextContent('$0.000000');
    expect(screen.getByText(/Local approximation only/)).toHaveTextContent(
      'not an Anthropic token count',
    );
    expect(screen.getByRole('link', { name: 'API pricing' })).toHaveAttribute(
      'href',
      'https://platform.claude.com/docs/en/about-claude/pricing',
    );
  });
  it('loads the worked example, changes models, resets all controls and supports repeated use locally', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    renderTool();
    for (let i = 0; i < 2; i++) {
      fireEvent.click(screen.getByRole('button', { name: 'Load 1,000-token estimate example' }));
      expect(screen.getByTestId('input-tokens')).toHaveTextContent('1000');
      expect(screen.getByTestId('output-tokens')).toHaveTextContent('500');
      expect(screen.getByTestId('input-cost')).toHaveTextContent('$0.002000');
      expect(screen.getByTestId('output-cost')).toHaveTextContent('$0.005000');
      expect(screen.getByTestId('total-cost')).toHaveTextContent('$0.007000');
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'claude-opus-5-5' } });
      expect(screen.getByTestId('total-cost')).toHaveTextContent('$0.014000');
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
      expect(screen.getByRole('combobox')).toHaveValue('claude-sonnet-5-5');
      expect(screen.getByLabelText('Input text')).toHaveValue('');
      expect(screen.getByLabelText('Expected output tokens')).toHaveValue('0');
      expect(screen.getByTestId('total-cost')).toHaveTextContent('$0.000000');
    }
    expect(fetchSpy).not.toHaveBeenCalled();
  });
  it.each(['', '-1', '1.5', '1e3', '128001'])(
    'labels invalid output %s, hides stale totals and recovers',
    (value) => {
      renderTool();
      const output = screen.getByLabelText('Expected output tokens');
      fireEvent.change(output, { target: { value } });
      expect(output).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('alert')).toHaveTextContent('whole number');
      expect(screen.queryByTestId('total-cost')).not.toBeInTheDocument();
      fireEvent.change(output, { target: { value: '500' } });
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByTestId('total-cost')).toHaveTextContent('$0.005000');
    },
  );
  it('does not round a nonzero Haiku micro-cost down to zero', () => {
    renderTool();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'claude-haiku-5-5' } });
    fireEvent.change(screen.getByLabelText('Input text'), { target: { value: 'a' } });
    expect(screen.getByTestId('input-cost')).toHaveTextContent('<$0.000001');
  });
  it('loads the multilingual code example as plain text', () => {
    renderTool();
    fireEvent.click(screen.getByRole('button', { name: 'Load code / Unicode example' }));
    expect(screen.getByLabelText('Input text')).toHaveValue(
      'const message = "Merhaba 世界 👋";\nconsole.log(message);',
    );
    expect(screen.getByLabelText('Expected output tokens')).toHaveValue('250');
  });
  it('handles Unicode, whitespace and markup as plain input', () => {
    renderTool();
    fireEvent.change(screen.getByLabelText('Input text'), { target: { value: '😀汉e\u0301' } });
    expect(screen.getByTestId('input-tokens')).toHaveTextContent('2');
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: '<img src=x onerror=alert(1)>' },
    });
    expect(document.querySelector('img[src="x"]')).toBeNull();
    fireEvent.change(screen.getByLabelText('Input text'), { target: { value: '    ' } });
    expect(screen.getByTestId('input-tokens')).toHaveTextContent('2');
  });
  it.each(['en', 'tr', 'de', 'es', 'fr', 'ru', 'zh'] as const)(
    'ships complete UI and page copy for %s',
    async (locale) => {
      renderTool(locale);
      const dictionary = await getToolUiDictionary(locale, 'claude-token-counter');
      for (const key of toolDictionaryKeys['claude-token-counter'].filter((key) =>
        key.startsWith('claude.'),
      )) {
        expect(dictionary[key], key).toBe(translations[locale][key]);
        expect(dictionary[key].trim()).toBeTruthy();
      }
      expect(screen.getByLabelText(translations[locale]['claude.inputText'])).toBeVisible();
      const content = toolPageContent.utilities['claude-token-counter'];
      const localized = await localizeToolPageCopy(content, locale);
      expect(localized.howToUseSteps).toHaveLength(3);
      if (locale !== 'en') {
        expect(translations[locale]['claude.approximation']).not.toBe(
          translations.en['claude.approximation'],
        );
        expect(localized.howToUseSteps![0]).not.toBe(content.howToUseSteps![0]);
        expect(localized.faqs[0].answer).not.toBe(content.faqs[0].answer);
        expect(translations[locale]['toolDesc.claude-token-counter']).not.toContain('Claude 3.5');
      }
    },
  );
});
