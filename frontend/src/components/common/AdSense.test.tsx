import { StrictMode } from 'react';
import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AdSense from './AdSense';

interface ObservedAd {
  callback: IntersectionObserverCallback;
  target?: Element;
  active: boolean;
  observer: IntersectionObserver;
}

let observedAds: ObservedAd[] = [];

function revealObservedAds() {
  act(() => {
    observedAds
      .filter((item) => item.active && item.target)
      .forEach((item) => {
        item.callback(
          [{ isIntersecting: true, target: item.target } as IntersectionObserverEntry],
          item.observer,
        );
      });
  });
}

describe('AdSense', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', 'ca-pub-123');
    Reflect.deleteProperty(window, 'adsbygoogle');
    observedAds = [];
    vi.stubGlobal(
      'IntersectionObserver',
      class IntersectionObserverMock implements IntersectionObserver {
        readonly root = null;
        readonly rootMargin = '400px 0px';
        readonly thresholds = [0];
        private readonly observed: ObservedAd;

        constructor(callback: IntersectionObserverCallback) {
          this.observed = {
            callback,
            active: true,
            observer: this,
          };
          observedAds.push(this.observed);
        }

        disconnect() {
          this.observed.active = false;
        }

        observe(target: Element) {
          this.observed.target = target;
        }

        takeRecords() {
          return [];
        }

        unobserve() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    Reflect.deleteProperty(window, 'adsbygoogle');
  });

  it('renders nothing when AdSense is not configured', () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', '');

    const { container } = render(<AdSense slot="123" />);

    expect(container).toBeEmptyDOMElement();
    expect(container.querySelector('ins.adsbygoogle')).toBeNull();
  });

  it('queues one request in StrictMode only when the slot approaches the viewport', () => {
    const { container } = render(
      <StrictMode>
        <AdSense slot="123" />
      </StrictMode>,
    );

    const ad = container.querySelector('ins.adsbygoogle');
    expect(ad).not.toBeNull();
    expect(ad?.getRootNode()).toBe(document);
    expect(ad).toHaveAttribute('data-ad-client', 'ca-pub-123');
    expect(ad).toHaveAttribute('data-ad-slot', '123');
    expect(container.firstChild).not.toHaveAttribute('data-site-support-slot');
    expect(Reflect.get(window, 'adsbygoogle')).toBeUndefined();

    revealObservedAds();

    expect(container.firstChild).toHaveAttribute('data-site-support-slot', 'true');
    expect(window.adsbygoogle).toHaveLength(1);
  });

  it('queues each rendered slot instance even when slot ids match', () => {
    const { container } = render(
      <>
        <AdSense slot="123" />
        <AdSense slot="123" />
      </>,
    );

    expect(container.querySelectorAll('ins.adsbygoogle')).toHaveLength(2);
    revealObservedAds();
    expect(window.adsbygoogle).toHaveLength(2);
  });

  it('queues a fresh request whenever a reused component changes slots', () => {
    const { container, rerender } = render(<AdSense slot="123" />);
    revealObservedAds();

    rerender(<AdSense slot="456" />);
    expect(container.querySelector('ins.adsbygoogle')).toHaveAttribute('data-ad-slot', '456');

    rerender(<AdSense slot="123" />);
    expect(container.querySelector('ins.adsbygoogle')).toHaveAttribute('data-ad-slot', '123');
    expect(window.adsbygoogle).toHaveLength(3);
  });

  it('never replaces an unfilled Google slot with a site advertisement', async () => {
    const { container } = render(<AdSense slot="123" />);
    const ad = container.querySelector('ins.adsbygoogle');
    expect(ad).not.toBeNull();

    await act(async () => {
      ad?.setAttribute('data-ad-status', 'unfilled');
      await Promise.resolve();
    });

    expect(container.querySelector('ins.adsbygoogle')).not.toBeNull();
    expect(container.querySelector('[data-testid="ad-fallback"]')).toBeNull();
  });
});
