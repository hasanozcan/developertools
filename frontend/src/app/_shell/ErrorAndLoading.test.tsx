// @vitest-environment jsdom

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import type { Language } from '@/context/LanguageContext';
import ErrorBoundaryContent from './ErrorBoundaryContent';
import LoadingContent from './LoadingContent';
import GlobalError from '../global-error';

describe('ErrorBoundaryContent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs the error, calls reset on retry, and renders a localized home link across all 7 locales', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const reset = vi.fn();
    const err = new Error('boom');

    const locales: { locale: Language; retry: string; homeHref: string }[] = [
      { locale: 'en', retry: 'Try again', homeHref: '/' },
      { locale: 'tr', retry: 'Tekrar dene', homeHref: '/tr' },
      { locale: 'de', retry: 'Erneut versuchen', homeHref: '/de' },
      { locale: 'es', retry: 'Intentar de nuevo', homeHref: '/es' },
      { locale: 'fr', retry: 'Réessayer', homeHref: '/fr' },
      { locale: 'ru', retry: 'Повторить', homeHref: '/ru' },
      { locale: 'zh', retry: '重试', homeHref: '/zh' },
    ];

    for (const { locale, retry, homeHref } of locales) {
      const { unmount } = render(
        <LanguageProvider initialLocale={locale}>
          <ErrorBoundaryContent error={err} reset={reset} />
        </LanguageProvider>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: retry }));
      expect(screen.getByRole('link')).toHaveAttribute('href', homeHref);
      unmount();
    }

    expect(consoleSpy).toHaveBeenCalledWith(err);
    expect(reset).toHaveBeenCalledTimes(locales.length);
  });
});

describe('GlobalError', () => {
  it('renders standalone document shell with retry button and home anchor without context providers', () => {
    const html = renderToString(<GlobalError error={new Error('root crash')} reset={vi.fn()} />);
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('Something went wrong');
    expect(html).toContain('Try again');
    expect(html).toContain('href="/"');
  });
});

describe('LoadingContent', () => {
  it('renders accessible loading status container', () => {
    render(<LoadingContent />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
