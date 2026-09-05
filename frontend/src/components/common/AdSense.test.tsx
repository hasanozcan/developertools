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
let resizeCallbacks: (() => void)[] = [];
let availableWidth = 600;

function resizeAdContainers() {
  act(() => resizeCallbacks.forEach((callback) => callback()));
}

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
    resizeCallbacks = [];
    availableWidth = 600;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return new DOMRect(0, 0, this.closest('[hidden]') ? 0 : availableWidth, 90);
    });
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          resizeCallbacks.push(callback);
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
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
    vi.restoreAllMocks();
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

    const ad = container.querySelector('ins');
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

    expect(container.querySelectorAll('ins')).toHaveLength(2);
    revealObservedAds();
    expect(window.adsbygoogle).toHaveLength(2);
  });

  it('queues a fresh request whenever a reused component changes slots', () => {
    const { container, rerender } = render(<AdSense slot="123" />);
    revealObservedAds();

    rerender(<AdSense slot="456" />);
    revealObservedAds();
    expect(container.querySelector('ins.adsbygoogle')).toHaveAttribute('data-ad-slot', '456');

    rerender(<AdSense slot="123" />);
    revealObservedAds();
    expect(container.querySelector('ins.adsbygoogle')).toHaveAttribute('data-ad-slot', '123');
    expect(window.adsbygoogle).toHaveLength(3);
  });

  it('never replaces an unfilled Google slot with a site advertisement', async () => {
    const { container } = render(<AdSense slot="123" />);
    revealObservedAds();
    const ad = container.querySelector('ins.adsbygoogle');
    expect(ad).not.toBeNull();

    await act(async () => {
      ad?.setAttribute('data-ad-status', 'unfilled');
      await Promise.resolve();
    });

    expect(container.querySelector('ins.adsbygoogle')).not.toBeNull();
    expect(container.querySelector('[data-testid="ad-fallback"]')).toBeNull();
  });

  it('waits for a visible width even for immediate slots, then requests only once', () => {
    availableWidth = 0;
    const { container } = render(<AdSense slot="123" immediate />);

    expect(Reflect.get(window, 'adsbygoogle')).toBeUndefined();
    expect(container.firstChild).not.toHaveAttribute('data-site-support-slot');
    expect(container.querySelector('ins.adsbygoogle')).toBeNull();

    availableWidth = 300;
    resizeAdContainers();
    expect(window.adsbygoogle).toHaveLength(1);
    expect(container.firstChild).toHaveAttribute('data-site-support-slot', 'true');

    availableWidth = 0;
    resizeAdContainers();
    availableWidth = 300;
    resizeAdContainers();
    expect(window.adsbygoogle).toHaveLength(1);
  });

  it('does not let a visible slot initialize an earlier hidden slot through the shared queue', () => {
    const processedSlots: string[] = [];
    window.adsbygoogle = [];
    vi.spyOn(window.adsbygoogle, 'push').mockImplementation(() => {
      const pending = document.querySelector('ins.adsbygoogle:not([data-adsbygoogle-status])');
      expect(pending?.getBoundingClientRect().width).toBeGreaterThan(0);
      processedSlots.push(pending?.getAttribute('data-ad-slot') ?? 'missing');
      pending?.setAttribute('data-adsbygoogle-status', 'done');
      return processedSlots.length;
    });

    render(
      <>
        <div hidden>
          <AdSense slot="hidden" immediate />
        </div>
        <AdSense slot="visible" immediate />
      </>,
    );
    expect(processedSlots).toEqual(['visible']);
  });

  it('rechecks width after a lazy slot enters the viewport', () => {
    availableWidth = 0;
    render(<AdSense slot="123" />);
    revealObservedAds();
    expect(Reflect.get(window, 'adsbygoogle')).toBeUndefined();

    availableWidth = 300;
    resizeAdContainers();
    expect(window.adsbygoogle).toHaveLength(1);
  });

  it('starts the next slot without carrying over an unfilled state', async () => {
    const { container, rerender } = render(<AdSense slot="123" immediate />);
    const oldAd = container.querySelector('ins');
    await act(async () => oldAd?.setAttribute('data-ad-status', 'unfilled'));

    rerender(<AdSense slot="456" immediate />);
    const nextAd = container.querySelector('ins');
    expect(nextAd).not.toBe(oldAd);
    expect(nextAd).not.toHaveAttribute('data-ad-status');
    expect(nextAd).toHaveStyle({ display: 'block' });
    expect(container.firstChild).not.toHaveClass('hidden');
    expect(window.adsbygoogle).toHaveLength(2);
  });

  it('uses resize events when ResizeObserver is unavailable', () => {
    vi.stubGlobal('ResizeObserver', undefined);
    availableWidth = 0;
    render(<AdSense slot="123" immediate />);
    expect(Reflect.get(window, 'adsbygoogle')).toBeUndefined();

    availableWidth = 300;
    act(() => window.dispatchEvent(new Event('resize')));
    expect(window.adsbygoogle).toHaveLength(1);
  });
});
