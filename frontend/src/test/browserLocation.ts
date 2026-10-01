export const NON_PRODUCTION_AD_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://[::1]:3000',
  'https://developertools-git-test.vercel.app',
  'https://www.devstools.app',
  'https://preview.devstools.app',
  'https://devstools.app.evil.example',
  'http://devstools.app',
  'https://devstools.app:3000',
];

/** Change jsdom's real URL, rather than mocking the policy under test. */
export function setBrowserUrl(url: string) {
  const environment = Reflect.get(globalThis, 'jsdom') as {
    reconfigure: (options: { url: string }) => void;
  };
  environment.reconfigure({ url });
}
