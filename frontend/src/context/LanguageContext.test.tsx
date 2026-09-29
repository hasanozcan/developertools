import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePathname, useRouter } from 'next/navigation';
import { LanguageProvider, ToolTextProvider, useLanguage } from './LanguageContext';
import LocalizedLink from '@/components/common/LocalizedLink';

function Navigation() {
  const { language, setLanguage } = useLanguage();
  return (
    <>
      <span>{language}</span>
      <LocalizedLink href="/tools/encoding#tools">Tools</LocalizedLink>
      <LocalizedLink href="/contact">Contact</LocalizedLink>
      <button onClick={() => setLanguage('en')}>English</button>
    </>
  );
}

describe('localized navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePathname).mockReturnValue('/tr');
    window.history.replaceState({}, '', '/tr');
  });

  it('keeps links localized and follows a later route change', () => {
    const { rerender } = render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>,
    );
    expect(screen.getByRole('link', { name: 'Tools' })).toHaveAttribute(
      'href',
      '/tr/tools/encoding#tools',
    );
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/tr/contact');
    vi.mocked(usePathname).mockReturnValue('/de/tools/json/json-formatter');
    rerender(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>,
    );
    expect(screen.getByRole('link', { name: 'Tools' })).toHaveAttribute(
      'href',
      '/de/tools/encoding#tools',
    );
    expect(document.documentElement.lang).toBe('de');
  });

  it('preserves query and fragment data when switching to English', () => {
    window.history.replaceState({}, '', '/tr?search=json#input=a%2Bb');
    render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    expect(useRouter().push).toHaveBeenCalledWith('/?search=json#input=a%2Bb');
  });

  it('migrates legacy language links without losing the input fragment', () => {
    vi.mocked(usePathname).mockReturnValue('/tools/crypto/sha256-hash');
    window.history.replaceState({}, '', '/tools/crypto/sha256-hash?lang=tr#input=abc');
    render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>,
    );
    expect(useRouter().replace).toHaveBeenCalledWith('/tr/tools/crypto/sha256-hash#input=abc');
  });
});

describe('dictionary and tool text', () => {
  function Probe() {
    const { t } = useLanguage();
    return (
      <>
        <span data-testid="ui">{t('search')}</span>
        <span data-testid="tool">{t('toolName.json-formatter')}</span>
        <span data-testid="missing">{`[${t('toolName.not-in-client-dictionary')}]`}</span>
      </>
    );
  }

  it('resolves page-scoped tool names through ToolTextProvider only', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    const { rerender } = render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('missing')).toHaveTextContent('[]');

    rerender(
      <LanguageProvider>
        <ToolTextProvider text={{ 'toolName.not-in-client-dictionary': 'Scoped name' }}>
          <Probe />
        </ToolTextProvider>
      </LanguageProvider>,
    );
    expect(screen.getByTestId('missing')).toHaveTextContent('[Scoped name]');
    expect(screen.getByTestId('ui').textContent).not.toBe('');
  });
});
