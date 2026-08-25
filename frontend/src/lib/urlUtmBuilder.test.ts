import { describe, expect, it } from 'vitest';
import { buildUtmUrl } from './urlUtmBuilder';

describe('urlUtmBuilder', () => {
  it('appends UTM parameters properly to URL', () => {
    const res = buildUtmUrl('https://devstools.app', { source: 'twitter', medium: 'social', campaign: 'spring_sale' });
    expect(res).toContain('utm_source=twitter');
    expect(res).toContain('utm_campaign=spring_sale');
  });
});
