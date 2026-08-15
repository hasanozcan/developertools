import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { trackGoogleAdsConversion } from './googleAds';

describe('trackGoogleAdsConversion', () => {
  const gtag = vi.fn();

  beforeEach(() => {
    gtag.mockReset();
    window.gtag = gtag;
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_SEND_TO', 'AW-123/abc');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE', '1.5');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY', 'try');
  });

  afterEach(() => {
    delete window.gtag;
    vi.unstubAllEnvs();
  });

  it('emits the conversion only when explicitly called', () => {
    expect(gtag).not.toHaveBeenCalled();

    expect(trackGoogleAdsConversion()).toBe(true);
    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledWith('event', 'conversion', {
      currency: 'TRY',
      send_to: 'AW-123/abc',
      value: 1.5,
    });
  });

  it('does nothing without a destination or the Google tag runtime', () => {
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_SEND_TO', '');
    expect(trackGoogleAdsConversion()).toBe(false);
    expect(gtag).not.toHaveBeenCalled();

    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_SEND_TO', 'AW-123/abc');
    delete window.gtag;
    expect(trackGoogleAdsConversion()).toBe(false);
  });

  it('omits invalid optional value and currency fields', () => {
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE', '-1');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY', 'invalid');

    expect(trackGoogleAdsConversion()).toBe(true);
    expect(gtag).toHaveBeenCalledWith('event', 'conversion', {
      send_to: 'AW-123/abc',
    });
  });
});

