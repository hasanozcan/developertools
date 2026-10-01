'use client';

import Script from 'next/script';
import { normalizeAdSenseClientId, normalizeAdSensePublisherId } from '@/lib/adsense';
import AdSenseScriptLoader from './AdSenseScriptLoader';
import { useAdSenseAllowedHost } from './useAdSenseAllowedHost';

const signalGoogleFundingChoices = `(function() {
  function signalGooglefcPresent() {
    if (!window.frames['googlefcPresent']) {
      if (document.body) {
        const iframe = document.createElement('iframe');
        iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
        iframe.style.display = 'none';
        iframe.name = 'googlefcPresent';
        document.body.appendChild(iframe);
      } else {
        setTimeout(signalGooglefcPresent, 0);
      }
    }
  }
  signalGooglefcPresent();
})();`;

export default function AdSenseScripts({ clientId }: { clientId: string }) {
  const allowedHost = useAdSenseAllowedHost();
  const normalizedClientId = normalizeAdSenseClientId(clientId);
  const publisherId = normalizeAdSensePublisherId(normalizedClientId);
  if (!allowedHost || !normalizedClientId || !publisherId) return null;

  return (
    <>
      <Script
        id="google-funding-choices"
        strategy="afterInteractive"
        src={`https://fundingchoicesmessages.google.com/i/${publisherId}?ers=1`}
      />
      <Script id="google-funding-choices-signal" strategy="afterInteractive">
        {signalGoogleFundingChoices}
      </Script>
      <AdSenseScriptLoader clientId={normalizedClientId} />
    </>
  );
}
