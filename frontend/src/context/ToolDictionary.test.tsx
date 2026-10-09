import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { translations } from '@/translations';
import { LanguageProvider, ToolDictionaryProvider, ToolTextProvider, useLanguage } from './LanguageContext';

// The test setup wraps <LanguageProvider> with the full English dictionary, so 'common.copy'
// is a shared string and keys that do not exist there stand in for a tool's own strings.
function Probe({ keys }: { keys: string[] }) {
  const { t } = useLanguage();
  return (
    <ul>
      {keys.map((key) => (
        <li key={key} data-testid={key}>
          [{t(key)}]
        </li>
      ))}
    </ul>
  );
}

describe('tool dictionary', () => {
  const copy = translations.en['common.copy'];

  it('adds the tool strings to the shared dictionary without overriding it', () => {
    render(
      <LanguageProvider initialLocale="en">
        <ToolDictionaryProvider dictionary={{ 'zz.tool.b': 'tool B', 'common.copy': 'tool copy' }}>
          <Probe keys={['common.copy', 'zz.tool.b', 'zz.tool.missing']} />
        </ToolDictionaryProvider>
      </LanguageProvider>,
    );
    expect(screen.getByTestId('common.copy')).toHaveTextContent(`[${copy}]`);
    expect(screen.getByTestId('zz.tool.b')).toHaveTextContent('[tool B]');
    expect(screen.getByTestId('zz.tool.missing')).toHaveTextContent('[]');
  });

  it('keeps tool strings out of pages that do not provide them', () => {
    render(
      <LanguageProvider initialLocale="en">
        <Probe keys={['zz.tool.b']} />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('zz.tool.b')).toHaveTextContent('[]');
  });

  it('still resolves page-scoped tool names next to a tool dictionary', () => {
    render(
      <LanguageProvider initialLocale="en">
        <ToolTextProvider text={{ 'toolName.zz': 'Tool ZZ' }}>
          <ToolDictionaryProvider dictionary={{ 'zz.tool.b': 'tool B' }}>
            <Probe keys={['toolName.zz', 'zz.tool.b', 'common.copy']} />
          </ToolDictionaryProvider>
        </ToolTextProvider>
      </LanguageProvider>,
    );
    expect(screen.getByTestId('toolName.zz')).toHaveTextContent('[Tool ZZ]');
    expect(screen.getByTestId('zz.tool.b')).toHaveTextContent('[tool B]');
    expect(screen.getByTestId('common.copy')).toHaveTextContent(`[${copy}]`);
  });
});
