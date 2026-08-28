import { describe, it, expect } from 'vitest';
import { encodeHtmlEntities, decodeHtmlEntities } from './htmlEntitiesConverter';

describe('htmlEntitiesConverter', () => {
  it('encodes special characters into named HTML entities', () => {
    const raw = '<h1>Hello & "World" © 2026</h1>';
    const encoded = encodeHtmlEntities(raw, 'named');
    expect(encoded).toBe('&lt;h1&gt;Hello &amp; &quot;World&quot; &copy; 2026&lt;/h1&gt;');
  });

  it('decodes HTML entities and numeric references back to unicode', () => {
    const encoded = '&lt;span&gt;&#169; DevTools &amp; Co. &#x20AC;&lt;/span&gt;';
    const decoded = decodeHtmlEntities(encoded);
    expect(decoded).toBe('<span>© DevTools & Co. €</span>');
  });
});
