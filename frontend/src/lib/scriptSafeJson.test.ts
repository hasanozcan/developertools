import { describe, expect, it } from 'vitest';
import { serializeJsonForHtmlScript } from './scriptSafeJson';

describe('serializeJsonForHtmlScript', () => {
  it('neutralizes closing script tags while preserving the JSON value', () => {
    const value = {
      name: '</script><script>alert("xss")</script>',
      description: 'A & B > C',
    };
    const serialized = serializeJsonForHtmlScript(value, 2);

    expect(serialized.toLowerCase()).not.toContain('</script');
    expect(serialized).not.toContain('<');
    expect(serialized).not.toContain('>');
    expect(serialized).not.toContain('&');
    expect(JSON.parse(serialized)).toEqual(value);
  });

  it('escapes JavaScript line separator characters', () => {
    const serialized = serializeJsonForHtmlScript({ value: `left\u2028middle\u2029right` });

    expect(serialized).toContain('\\u2028');
    expect(serialized).toContain('\\u2029');
    expect(JSON.parse(serialized)).toEqual({ value: `left\u2028middle\u2029right` });
  });

  it('rejects values JSON cannot serialize at the root', () => {
    expect(() => serializeJsonForHtmlScript(undefined)).toThrow(/cannot be serialized/);
  });
});
