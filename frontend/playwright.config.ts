import { defineConfig, devices } from '@playwright/test';

const port = 3100;
const baseURL = `http://127.0.0.1:${port}`;
const useProductionServer =
  Boolean(process.env.CI) || process.env.PLAYWRIGHT_USE_PRODUCTION_SERVER === 'true';

export default defineConfig({
  testDir: './e2e',
  timeout: 300_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  outputDir: 'output/playwright',
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never', outputFolder: 'output/playwright-report' }]]
    : [['list'], ['html', { open: 'never', outputFolder: 'output/playwright-report' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: useProductionServer
      ? `npm run start -- --hostname 127.0.0.1 --port ${port}`
      : `npm run dev -- --hostname 127.0.0.1 --port ${port}`,
    env: {
      NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY: 'USD',
      NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE: '1',
      NEXT_PUBLIC_GOOGLE_ADS_SEND_TO: 'AW-TEST/contact',
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: baseURL,
  },
});
