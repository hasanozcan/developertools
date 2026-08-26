declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoogleAdsConversion(): boolean {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return false;
  }

  const envSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO?.trim();
  const winSendTo = typeof window !== 'undefined' ? (window as unknown as { __NEXT_PUBLIC_GOOGLE_ADS_SEND_TO?: string }).__NEXT_PUBLIC_GOOGLE_ADS_SEND_TO?.trim() : undefined;
  const sendTo = envSendTo || winSendTo;
  if (!sendTo) {
    return false;
  }

  const payload: Record<string, number | string> = { send_to: sendTo };
  const envVal = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE?.trim();
  const winVal = typeof window !== 'undefined' ? (window as unknown as { __NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE?: string }).__NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE?.trim() : undefined;
  const configuredValue = envVal || winVal;
  const value = configuredValue === undefined ? Number.NaN : Number(configuredValue);

  const envCurr = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY?.trim();
  const winCurr = typeof window !== 'undefined' ? (window as unknown as { __NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY?: string }).__NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY?.trim() : undefined;
  const currency = (envCurr || winCurr)?.toUpperCase();

  if (Number.isFinite(value) && value >= 0) {
    payload.value = value;
  }

  if (currency && /^[A-Z]{3}$/.test(currency)) {
    payload.currency = currency;
  }

  window.gtag('event', 'conversion', payload);
  return true;
}

