// @vitest-environment jsdom

import React from 'react';
import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import { setBrowserUrl } from '@/test/browserLocation';
import PostToolAdBanner from './PostToolAdBanner';
import InFeedAdCard from './InFeedAdCard';
import ServiceWorkerRegister from './ServiceWorkerRegister';

describe('AdSense shell visibility', () => {
  const originalUrl = window.location.href;

  beforeEach(() => {
    setBrowserUrl('https://devstools.app/tools/json/json-formatter');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', 'ca-pub-123');
  });

  afterEach(() => {
    setBrowserUrl(originalUrl);
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders nothing on non-production origin, missing publisher id, or empty slot', () => {
    setBrowserUrl('http://localhost:3000/');
    const localhostPost = render(
      <LanguageProvider>
        <PostToolAdBanner slot="123456" />
      </LanguageProvider>,
    );
    expect(localhostPost.container).toBeEmptyDOMElement();

    const localhostInFeed = render(
      <LanguageProvider>
        <InFeedAdCard slot="123456" />
      </LanguageProvider>,
    );
    expect(localhostInFeed.container).toBeEmptyDOMElement();

    setBrowserUrl('https://devstools.app/');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', '');
    const missingId = render(
      <LanguageProvider>
        <PostToolAdBanner slot="123456" />
      </LanguageProvider>,
    );
    expect(missingId.container).toBeEmptyDOMElement();

    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', 'ca-pub-123');
    const emptySlot = render(
      <LanguageProvider>
        <PostToolAdBanner slot="   " />
      </LanguageProvider>,
    );
    expect(emptySlot.container).toBeEmptyDOMElement();

    const emptyInFeedSlot = render(
      <LanguageProvider>
        <InFeedAdCard slot="" />
      </LanguageProvider>,
    );
    expect(emptyInFeedSlot.container).toBeEmptyDOMElement();
  });

  it('renders nothing during SSR and renders shell on allowed production origin with valid config', () => {
    const ssrHtml = renderToString(
      <LanguageProvider>
        <PostToolAdBanner slot="123456" />
        <InFeedAdCard slot="654321" />
      </LanguageProvider>,
    );
    expect(ssrHtml).toBe('');

    const { container } = render(
      <LanguageProvider>
        <PostToolAdBanner slot="123456" />
        <InFeedAdCard slot="654321" />
      </LanguageProvider>,
    );
    expect(container.querySelectorAll('[data-ad-banner="true"]')).toHaveLength(2);
  });
});

describe('ServiceWorkerRegister', () => {
  const originalReadyState = Object.getOwnPropertyDescriptor(document, 'readyState');
  const originalServiceWorker = Object.getOwnPropertyDescriptor(navigator, 'serviceWorker');

  afterEach(() => {
    if (originalReadyState) Object.defineProperty(document, 'readyState', originalReadyState);
    if (originalServiceWorker) {
      Object.defineProperty(navigator, 'serviceWorker', originalServiceWorker);
    }
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('registers immediately when document is already complete in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const register = vi.fn().mockResolvedValue({});
    Object.defineProperty(navigator, 'serviceWorker', { configurable: true, value: { register } });
    Object.defineProperty(document, 'readyState', { configurable: true, value: 'complete' });

    render(<ServiceWorkerRegister />);
    expect(register).toHaveBeenCalledWith('/sw.js');
  });

  it('defers registration until window load and removes listener on unmount', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const register = vi.fn().mockResolvedValue({});
    Object.defineProperty(navigator, 'serviceWorker', { configurable: true, value: { register } });
    Object.defineProperty(document, 'readyState', { configurable: true, value: 'interactive' });

    const { unmount } = render(<ServiceWorkerRegister />);
    expect(register).not.toHaveBeenCalled();

    unmount();
    window.dispatchEvent(new Event('load'));
    expect(register).not.toHaveBeenCalled();

    render(<ServiceWorkerRegister />);
    window.dispatchEvent(new Event('load'));
    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith('/sw.js');
  });
});
