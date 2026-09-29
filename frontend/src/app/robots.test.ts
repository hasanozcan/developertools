// @vitest-environment node

import { describe, expect, it } from 'vitest';
import robots from './robots';

describe('robots', () => {
  it('lets crawlers follow legacy ?lang= redirects while still blocking other query URLs', () => {
    const { rules } = robots();
    const ruleList = Array.isArray(rules) ? rules : [rules];

    for (const userAgent of ['*', 'Googlebot']) {
      const rule = ruleList.find((candidate) => candidate.userAgent === userAgent);
      expect(rule?.allow).toContain('/*?lang=');
      expect(rule?.disallow).toContain('/*?*');
      // Must outrank `/*?lang=` (longest match wins) so the API stays blocked.
      expect(rule?.disallow).toContain('/api/*?lang=');
    }
  });
});
