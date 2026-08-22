import { describe, it, expect } from 'vitest';
import { getSvgDataUri } from './svgToWebp';

describe('getSvgDataUri', () => {
  it('encodes svg to data URI', () => {
    const uri = getSvgDataUri('<svg><circle r="10"/></svg>');
    expect(uri).toContain('data:image/svg+xml;base64,');
  });
});