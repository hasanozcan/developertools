// @vitest-environment jsdom

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ToolPageWrapper from './ToolPageWrapper';

vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    t: (key: string) =>
      ({
        zenMode: 'Full Screen',
        exitZenMode: 'Exit Full Screen',
        'nav.home': 'Home',
        'toolPage.howToUse': 'How to use',
        'toolPage.howToUseSteps': 'Enter input\nReview output',
        'toolPage.faq': 'FAQ',
        'toolPage.relatedTools': 'Related developer tools',
        'toolPage.continueWith': 'Continue with',
        'toolPage.sourcesAndReferences': 'Sources & references',
        'toolPage.primaryReferences': 'Primary references:',
      })[key] || key,
  }),
}));

vi.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ setTheme: vi.fn(), resolvedTheme: 'light' }),
}));

vi.mock('@/components/common/FavoriteButton', () => ({ default: () => null }));
vi.mock('@/components/common/HistoryTracker', () => ({ default: () => null }));
vi.mock('@/components/common/QuickAccessBar', () => ({ default: () => null }));
vi.mock('@/components/common/ToolWorkflowBar', () => ({ default: () => null }));
vi.mock('@/components/common/WorkspaceControls', () => ({ default: () => null }));
vi.mock('@/components/common/PostToolAdBanner', () => ({ default: () => null }));
vi.mock('@/components/common/LocalizedLink', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>{children}</a>
  ),
}));
vi.mock('@/components/common/AdSense', () => ({
  default: ({ placement, format, responsive }: { placement: string; format: string; responsive: boolean }) => (
    <div
      data-testid={`ad-${placement}`}
      data-format={format}
      data-responsive={String(responsive)}
    />
  ),
}));

describe('ToolPageWrapper full screen ads', () => {
  beforeEach(() => {
    let rafId = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      rafId += 1;
      window.setTimeout(() => callback(performance.now()), 0);
      return rafId;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('mounts responsive auto ads after full screen layout settles and remounts them after reopening', async () => {
    render(
      <ToolPageWrapper
        toolSlug="json-formatter"
        category="json"
        categoryName="JSON"
        defaultName="JSON Formatter"
        defaultDescription="Format JSON"
        faqs={[]}
        sources={[]}
        answerSections={[]}
        relatedTools={[]}
        topicCollections={[]}
      >
        <div>Tool content</div>
      </ToolPageWrapper>,
    );

    expect(screen.queryByTestId('ad-tool-zen-left')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));

    await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());
    expect(screen.getByTestId('ad-tool-zen-left')).toHaveAttribute('data-format', 'auto');
    expect(screen.getByTestId('ad-tool-zen-left')).toHaveAttribute('data-responsive', 'true');
    expect(screen.getByTestId('ad-tool-zen-right')).toHaveAttribute('data-format', 'auto');
    expect(screen.getByTestId('ad-tool-zen-bottom')).toHaveAttribute('data-format', 'auto');

    fireEvent.click(screen.getByRole('button', { name: 'Exit Full Screen' }));
    expect(screen.queryByTestId('ad-tool-zen-left')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));
    await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());
  });
});
