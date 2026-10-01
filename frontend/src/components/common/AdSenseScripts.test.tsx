import type { ReactNode } from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NON_PRODUCTION_AD_ORIGINS, setBrowserUrl } from '@/test/browserLocation';
import AdSenseScripts from './AdSenseScripts';

vi.mock('@/lib/analytics', () => ({ trackProductEvent: vi.fn() }));
vi.mock('next/script', () => ({
  default: ({
    id,
    src,
    strategy,
    children,
  }: {
    id: string;
    src?: string;
    strategy: string;
    children?: ReactNode;
  }) => (
    <script async id={id} data-src={src} data-strategy={strategy} type="application/x-test">
      {children}
    </script>
  ),
}));

const originalUrl = window.location.href;
const loaderSelector = 'script[data-devstools-adsense-loader="true"]';

beforeEach(() => {
  setBrowserUrl('https://devstools.app/tools/json/json-formatter');
  Reflect.deleteProperty(window, 'adsbygoogle');
});

afterEach(() => {
  cleanup();
  document
    .querySelectorAll(`${loaderSelector}, iframe[name="googlefcPresent"]`)
    .forEach((node) => node.remove());
  setBrowserUrl(originalUrl);
  Reflect.deleteProperty(window, 'adsbygoogle');
  vi.unstubAllEnvs();
});

function runPresenceSignal(
  documentObject: { body: HTMLElement | null; createElement: Document['createElement'] } = document,
  defer: (callback: () => void, delay: number) => unknown = setTimeout,
) {
  const signal = document.getElementById('google-funding-choices-signal');
  expect(signal).not.toBeNull();
  new Function('window', 'document', 'setTimeout', signal!.textContent!)(
    window,
    documentObject,
    defer,
  );
}

describe('AdSenseScripts', () => {
  it.each(NON_PRODUCTION_AD_ORIGINS)('does not start consent or ads on %s', (origin) => {
    setBrowserUrl(origin);
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://devstools.app');
    const { container } = render(<AdSenseScripts clientId="ca-pub-123" />);
    expect(container).toBeEmptyDOMElement();
    expect(document.querySelector(loaderSelector)).toBeNull();
    expect(document.querySelector('iframe[name="googlefcPresent"]')).toBeNull();
    expect(Reflect.get(window, 'adsbygoogle')).toBeUndefined();
  });

  it('keeps the production consent IDs, normalized publisher, strategies and AdSense loader', () => {
    render(<AdSenseScripts clientId="  ca-pub-123  " />);
    const consent = document.getElementById('google-funding-choices');
    expect(consent).toHaveAttribute(
      'data-src',
      'https://fundingchoicesmessages.google.com/i/pub-123?ers=1',
    );
    expect(consent).toHaveAttribute('data-strategy', 'afterInteractive');
    expect(document.getElementById('google-funding-choices-signal')).toHaveAttribute(
      'data-strategy',
      'afterInteractive',
    );
    expect(document.querySelector(loaderSelector)).toHaveAttribute(
      'src',
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-123',
    );
    runPresenceSignal();
    runPresenceSignal();
    const frames = document.querySelectorAll('iframe[name="googlefcPresent"]');
    expect(frames).toHaveLength(1);
    expect(frames[0]).toHaveStyle({ display: 'none', width: '0px', height: '0px' });
  });

  it('retains the presence signal fallback until the document body exists', () => {
    render(<AdSenseScripts clientId="ca-pub-123" />);
    let body: HTMLElement | null = null;
    const documentObject = {
      get body() {
        return body;
      },
      createElement: document.createElement.bind(document),
    };
    const defer = vi.fn();
    runPresenceSignal(documentObject, defer);
    expect(defer).toHaveBeenCalledWith(expect.any(Function), 0);
    expect(document.querySelector('iframe[name="googlefcPresent"]')).toBeNull();
    body = document.body;
    defer.mock.calls[0][0]();
    expect(document.querySelectorAll('iframe[name="googlefcPresent"]')).toHaveLength(1);
  });

  it.each(['', 'pub-123', 'ca-pub-invalid'])(
    'ignores an invalid publisher configuration: %s',
    (clientId) => {
      const { container } = render(<AdSenseScripts clientId={clientId} />);
      expect(container).toBeEmptyDOMElement();
      expect(document.querySelector(loaderSelector)).toBeNull();
    },
  );

  it.each(['https://devstools.app', 'https://developertools-git-test.vercel.app'])(
    'hydrates the empty server snapshot without a mismatch on %s',
    async (origin) => {
      setBrowserUrl(origin);
      const element = <AdSenseScripts clientId="ca-pub-123" />;
      const html = renderToString(element);
      expect(html).toBe('');
      expect(document.querySelector(loaderSelector)).toBeNull();
      const container = document.createElement('div');
      container.innerHTML = html;
      document.body.appendChild(container);
      const onRecoverableError = vi.fn();
      let root: ReturnType<typeof hydrateRoot> | undefined;
      try {
        await act(async () => {
          root = hydrateRoot(container, element, { onRecoverableError });
        });
        if (origin === 'https://devstools.app') {
          expect(container.querySelector('#google-funding-choices')).not.toBeNull();
          expect(document.querySelector(loaderSelector)).not.toBeNull();
        } else {
          expect(container).toBeEmptyDOMElement();
          expect(document.querySelector(loaderSelector)).toBeNull();
        }
        expect(onRecoverableError).not.toHaveBeenCalled();
      } finally {
        act(() => root?.unmount());
        container.remove();
      }
    },
  );
});
