import { StrictMode } from 'react';
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AdSense from './AdSense';

describe('AdSense', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', 'ca-pub-123');
    Reflect.deleteProperty(window, 'adsbygoogle');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    Reflect.deleteProperty(window, 'adsbygoogle');
  });

  it('renders nothing when AdSense is not configured', () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', '');

    const { container } = render(<AdSense slot="123" />);

    expect(container).toBeEmptyDOMElement();
    expect(container.querySelector('ins.adsbygoogle')).toBeNull();
  });

  it('renders the official ad element in the document DOM and queues one request in StrictMode', () => {
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
    expect(window.adsbygoogle).toHaveLength(2);
  });

  it('queues a fresh request whenever a reused component changes slots', () => {
    const { container, rerender } = render(<AdSense slot="123" />);

    rerender(<AdSense slot="456" />);
    expect(container.querySelector('ins.adsbygoogle')).toHaveAttribute('data-ad-slot', '456');

    rerender(<AdSense slot="123" />);
    expect(container.querySelector('ins.adsbygoogle')).toHaveAttribute('data-ad-slot', '123');
    expect(window.adsbygoogle).toHaveLength(3);
  });

  it('never replaces an unfilled Google slot with a site advertisement', () => {
    const { container } = render(<AdSense slot="123" />);
    const ad = container.querySelector('ins.adsbygoogle');
    expect(ad).not.toBeNull();

    ad?.setAttribute('data-ad-status', 'unfilled');

    expect(container.querySelector('ins.adsbygoogle')).not.toBeNull();
    expect(container.querySelector('[data-testid="ad-fallback"]')).toBeNull();
  });
});
