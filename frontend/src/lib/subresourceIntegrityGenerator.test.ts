import { describe, it, expect } from 'vitest';
import { generateSriScriptTag } from './subresourceIntegrityGenerator';

describe('generateSriScriptTag', () => {
  it('creates script tag with integrity attribute', () => {
    const tag = generateSriScriptTag('https://cdn.example.com/lib.js', 'oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC');
    expect(tag).toContain('integrity="sha384-');
    expect(tag).toContain('crossorigin="anonymous"');
  });
});