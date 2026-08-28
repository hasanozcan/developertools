import { describe, it, expect } from 'vitest';
import { lookupMimeType } from './mimeTypeExtensionLookup';

describe('mimeTypeExtensionLookup', () => {
  it('maps extensions to MIME types', () => {
    expect(lookupMimeType('json')).toBe('application/json');
  });
});
