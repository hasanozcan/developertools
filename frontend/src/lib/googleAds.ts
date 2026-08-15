declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoogleAdsConversion(): boolean {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return false;
  }

  const sendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO?.trim();
  if (!sendTo) {
    return false;
  }

  const payload: Record<string, number | string> = { send_to: sendTo };
  const configuredValue = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE;
  const value = configuredValue === undefined ? Number.NaN : Number(configuredValue);
  const currency = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY?.trim().toUpperCase();

  if (Number.isFinite(value) && value >= 0) {
    payload.value = value;
  }

  if (currency && /^[A-Z]{3}$/.test(currency)) {
    payload.currency = currency;
  }

  window.gtag('event', 'conversion', payload);
  return true;
}

