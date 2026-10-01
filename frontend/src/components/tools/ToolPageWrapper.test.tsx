// @vitest-environment jsdom

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ToolPageWrapper from './ToolPageWrapper';

let mockLanguage = 'en';

vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    language: mockLanguage,
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
        // English placeholders, as the real dicts hold for tools whose
        // translation lives only in enhancedTools.
        'toolName.openapi-to-postman': 'OpenAPI to Postman Collection Generator',
        'toolDesc.openapi-to-postman': 'Generate a Postman collection from OpenAPI.',
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
vi.mock('@/components/common/PostToolAdBanner', () => ({
  default: ({ slot }: { slot: string }) => (
    <div data-testid="ad-tool-post-result" data-slot={slot} />
  ),
}));
vi.mock('@/components/common/LocalizedLink', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} data-localized-link="true" {...props}>
      {children}
    </a>
  ),
}));
vi.mock('@/components/common/AdSense', () => ({
  default: ({
    slot,
    placement,
    format,
    responsive,
    immediate,
  }: {
    slot: string;
    placement: string;
    format: string;
    responsive: boolean;
    immediate?: boolean;
  }) => (
    <div
      data-testid={`ad-${placement}`}
      data-slot={slot}
      data-format={format}
      data-responsive={String(responsive)}
      data-immediate={String(Boolean(immediate))}
    />
  ),
}));

function renderToolPage() {
  return render(
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
}

describe('ToolPageWrapper full screen ads', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_FOOTER_SLOT', '');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT', '');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_LEFT_SLOT', '');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_RIGHT_SLOT', '');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT', '9876543210');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_ZEN_BOTTOM_SLOT', '1234567890');
    let rafId = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      rafId += 1;
      window.setTimeout(() => callback(performance.now()), 0);
      return rafId;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('mounts responsive auto ads after full screen layout settles and remounts them after reopening', async () => {
    renderToolPage();

    expect(screen.queryByTestId('ad-tool-zen-left')).not.toBeInTheDocument();
    expect(screen.getByTestId('ad-tool-bottom')).toHaveAttribute('data-slot', '9876543210');

    fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));

    await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());
    expect(screen.getByTestId('ad-tool-zen-left')).toHaveAttribute('data-format', 'auto');
    expect(screen.getByTestId('ad-tool-zen-left')).toHaveAttribute('data-responsive', 'true');
    expect(screen.getByTestId('ad-tool-zen-right')).toHaveAttribute('data-format', 'auto');
    expect(screen.getByTestId('ad-tool-zen-bottom')).toHaveAttribute('data-format', 'auto');
    expect(screen.getByTestId('ad-tool-zen-bottom')).toHaveAttribute('data-slot', '1234567890');

    fireEvent.click(screen.getByRole('button', { name: 'Exit Full Screen' }));
    expect(screen.queryByTestId('ad-tool-zen-left')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));
    await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());
  });

  it.each([undefined, 'not-a-slot', '1234x'])(
    'hides both bottom placements with invalid slot %s',
    async (slot) => {
      vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT', slot);
      vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_ZEN_BOTTOM_SLOT', slot);
      renderToolPage();
      expect(screen.queryByTestId('ad-tool-bottom')).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));
      await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());
      expect(screen.queryByTestId('ad-tool-zen-bottom')).not.toBeInTheDocument();
    },
  );

  it.each([
    ['NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT', 'tool-bottom', 'tool-zen-bottom'],
    ['NEXT_PUBLIC_ADSENSE_TOOL_ZEN_BOTTOM_SLOT', 'tool-zen-bottom', 'tool-bottom'],
  ])(
    'keeps the other bottom placement independent when %s is missing',
    async (key, missing, configured) => {
      vi.stubEnv(key, '');
      renderToolPage();
      fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));
      await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());
      expect(screen.queryByTestId(`ad-${missing}`)).not.toBeInTheDocument();
      expect(screen.getByTestId(`ad-${configured}`)).toBeInTheDocument();
    },
  );

  it('hides a placement that has no slot of its own instead of reusing another one', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_ZEN_BOTTOM_SLOT', '');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT', '');

    renderToolPage();

    // Unconfigured placements must not share the post-result reporting unit.
    expect(screen.queryByTestId('ad-tool-bottom')).not.toBeInTheDocument();
    expect(screen.queryByTestId('ad-tool-sidebar')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));
    await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());

    expect(screen.queryByTestId('ad-tool-zen-bottom')).not.toBeInTheDocument();
  });

  it.each([
    'NEXT_PUBLIC_ADSENSE_FOOTER_SLOT',
    'NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT',
    'NEXT_PUBLIC_ADSENSE_LEFT_SLOT',
    'NEXT_PUBLIC_ADSENSE_RIGHT_SLOT',
  ])('rejects bottom slots that collide with configured %s', async (key) => {
    vi.stubEnv(key, ' 4567890123 ');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT', ' 4567890123 ');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_ZEN_BOTTOM_SLOT', '4567890123');
    renderToolPage();

    expect(screen.queryByTestId('ad-tool-bottom')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));
    await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());
    expect(screen.queryByTestId('ad-tool-zen-bottom')).not.toBeInTheDocument();
    const slots = screen.getAllByTestId(/^ad-/).map((ad) => ad.getAttribute('data-slot'));
    expect(slots).toContain('4567890123');
    expect(new Set(slots).size).toBe(slots.length);
  });

  it('rejects bottom slots that collide with the default footer', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT', '7781534087');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_ZEN_BOTTOM_SLOT', '7781534087');
    renderToolPage();

    expect(screen.getByTestId('ad-tool-post-result')).toHaveAttribute('data-slot', '7781534087');
    expect(screen.queryByTestId('ad-tool-bottom')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));
    await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());
    expect(screen.queryByTestId('ad-tool-zen-bottom')).not.toBeInTheDocument();
  });

  it('keeps normal bottom and skips Zen bottom when they share a slot', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT', ' 1234567890 ');
    renderToolPage();
    expect(screen.getByTestId('ad-tool-bottom')).toHaveAttribute('data-slot', '1234567890');

    fireEvent.click(screen.getByRole('button', { name: 'Full Screen' }));
    await waitFor(() => expect(screen.getByTestId('ad-tool-zen-left')).toBeInTheDocument());
    expect(screen.queryByTestId('ad-tool-zen-bottom')).not.toBeInTheDocument();
    expect(screen.getByTestId('ad-tool-bottom')).toHaveAttribute('data-slot', '1234567890');
  });
});

describe('ToolPageWrapper localization, layout stability, and sidebar ad loading', () => {
  afterEach(() => {
    mockLanguage = 'en';
    vi.unstubAllGlobals();
  });

  function renderWithLinks() {
    return render(
      <ToolPageWrapper
        toolSlug="json-formatter"
        category="json"
        categoryName="JSON"
        defaultName="JSON Formatter"
        defaultDescription="Format JSON"
        faqs={[]}
        sources={[]}
        answerSections={[]}
        relatedTools={[
          {
            name: 'JSON Validator',
            description: 'Validate JSON',
            href: '/tools/json/json-validator',
          },
        ]}
        topicCollections={[
          { name: 'JSON Development', description: 'JSON tools', href: '/collections/json' },
        ]}
      >
        <div>Tool content</div>
      </ToolPageWrapper>,
    );
  }

  it('renders related tools through the locale-aware link component', () => {
    renderWithLinks();
    const relatedSection = document.querySelector('[data-related-tools="true"]')!;
    const links = relatedSection.querySelectorAll('a[href="/tools/json/json-validator"]');
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).toHaveAttribute('data-localized-link', 'true'));
  });

  it('localizes the topic collections heading', () => {
    renderWithLinks();
    expect(screen.getByRole('heading', { name: 'Topic collections' })).toBeInTheDocument();
  });

  it('uses the current language for the topic collections heading', () => {
    mockLanguage = 'tr';
    renderWithLinks();
    expect(screen.getByRole('heading', { name: 'Konu koleksiyonları' })).toBeInTheDocument();
    expect(screen.queryByText('Topic collections')).not.toBeInTheDocument();
  });

  it('reserves height for the client-only tool interface', () => {
    renderWithLinks();
    const slot = document.querySelector('[data-tool-interface="true"] [data-tool-slot="true"]');
    expect(slot).toHaveStyle({ minHeight: '420px' });
  });

  it('loads the sidebar ad lazily when the viewport is below lg', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    renderWithLinks();
    expect(screen.getByTestId('ad-tool-sidebar')).toHaveAttribute('data-immediate', 'false');
  });

  it('loads the sidebar ad immediately on lg+ viewports', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query === '(min-width: 1024px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    renderWithLinks();
    expect(screen.getByTestId('ad-tool-sidebar')).toHaveAttribute('data-immediate', 'true');
  });
});

describe('ToolPageWrapper localized tool name', () => {
  afterEach(() => {
    mockLanguage = 'en';
  });

  function renderOpenApiToPostman(props: {
    localizedName?: string;
    localizedDescription?: string;
  }) {
    return render(
      <ToolPageWrapper
        toolSlug="openapi-to-postman"
        category="converters"
        categoryName="Converters"
        defaultName="OpenAPI to Postman Collection Generator"
        defaultDescription="Generate a Postman collection from OpenAPI."
        faqs={[]}
        sources={[]}
        answerSections={[]}
        relatedTools={[]}
        topicCollections={[]}
        {...props}
      >
        <div>Tool content</div>
      </ToolPageWrapper>,
    );
  }

  it('prefers the server-resolved localized name over an English dict placeholder', () => {
    mockLanguage = 'tr';
    renderOpenApiToPostman({
      localizedName: 'OpenAPI to Postman Koleksiyonu Üretici',
      localizedDescription: 'OpenAPI tanımından Postman koleksiyonu üretin.',
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'OpenAPI to Postman Koleksiyonu Üretici',
    );
    expect(screen.getByText('OpenAPI tanımından Postman koleksiyonu üretin.')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'How to use OpenAPI to Postman Koleksiyonu Üretici' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('OpenAPI to Postman Collection Generator')).not.toBeInTheDocument();
  });

  it('keeps the translation-dict name when no localized name is passed (EN)', () => {
    renderOpenApiToPostman({});
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'OpenAPI to Postman Collection Generator',
    );
  });
});
