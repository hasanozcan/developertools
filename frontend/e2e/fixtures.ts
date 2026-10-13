import { test as base, expect } from '@playwright/test';

const blockedHosts =
  /(?:^|\.)(?:googlesyndication\.com|doubleclick\.net|googleadservices\.com|googletagmanager\.com|google-analytics\.com|analytics\.google\.com|vercel-insights\.com)$/;

// Install the route before each test's first navigation, including pages opened later.
export const test = base.extend({
  page: async ({ page, context }, resume) => {
    await context.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (blockedHosts.test(url.hostname) || url.pathname.startsWith('/_vercel/insights')) {
        return route.abort();
      }
      return route.continue();
    });
    await resume(page);
  },
});

export { expect };
export type { Locator, Page } from '@playwright/test';
