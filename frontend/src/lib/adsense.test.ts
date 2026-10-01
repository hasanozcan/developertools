import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  isAdSenseAllowedInBrowser,
  isAdSenseAllowedOrigin,
  normalizeAdSenseClientId,
  normalizeAdSensePublisherId,
} from './adsense';
import { NON_PRODUCTION_AD_ORIGINS, setBrowserUrl } from '@/test/browserLocation';

const originalUrl = window.location.href;

describe('AdSense production origin policy', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    setBrowserUrl(originalUrl);
  });

  it('accepts the canonical HTTPS production origin', () => {
    expect(isAdSenseAllowedOrigin('https://devstools.app')).toBe(true);
    setBrowserUrl('https://devstools.app/tools/json/json-formatter');
    expect(isAdSenseAllowedInBrowser()).toBe(true);
  });

  it.each(NON_PRODUCTION_AD_ORIGINS)('rejects %s even with a production SEO URL', (origin) => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://devstools.app');
    setBrowserUrl(origin);
    expect(isAdSenseAllowedOrigin(origin)).toBe(false);
    expect(isAdSenseAllowedInBrowser()).toBe(false);
    vi.unstubAllEnvs();
  });

  it('fails closed when an origin or browser is unavailable', () => {
    expect(isAdSenseAllowedOrigin(undefined)).toBe(false);
    expect(isAdSenseAllowedOrigin('')).toBe(false);
    vi.stubGlobal('window', undefined);
    expect(isAdSenseAllowedInBrowser()).toBe(false);
  });
});

describe('normalizeAdSenseClientId', () => {
  it('accepts and trims a real publisher id', () => {
    expect(normalizeAdSenseClientId('  ca-pub-1234567890123456  ')).toBe('ca-pub-1234567890123456');
  });

  it.each([undefined, '', 'ca-pub-xxxxxxxxxxxxxxxx', 'pub-123', 'ca-pub-123-test'])(
    'rejects invalid publisher id %s',
    (value) => {
      expect(normalizeAdSenseClientId(value)).toBeUndefined();
    },
  );
});

describe('normalizeAdSensePublisherId', () => {
  it('converts a valid client id to the publisher id used by Funding Choices', () => {
    expect(normalizeAdSensePublisherId('  ca-pub-1234567890123456  ')).toBe('pub-1234567890123456');
  });

  it('rejects invalid client ids', () => {
    expect(normalizeAdSensePublisherId('pub-1234567890123456')).toBeUndefined();
  });
});
