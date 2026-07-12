import { describe, expect, it } from 'vitest';
import { normalizeAdSenseClientId } from './adsense';

describe('normalizeAdSenseClientId', () => {
  it('accepts and trims a real publisher id', () => {
    expect(normalizeAdSenseClientId('  ca-pub-1234567890123456  ')).toBe('ca-pub-1234567890123456');
  });

  it.each([undefined, '', 'ca-pub-xxxxxxxxxxxxxxxx', 'pub-123', 'ca-pub-123-test'])(
    'rejects invalid publisher id %s',
    (value) => {
      expect(normalizeAdSenseClientId(value)).toBeUndefined();
    },
  );
});
