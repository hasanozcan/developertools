import { describe, it, expect } from 'vitest';
import { generateRandomBlobRadius, generateBlob } from './cssBlob';

describe('cssBlob', () => {
  it('should generate valid random border radius percentage syntax', () => {
    const radius = generateRandomBlobRadius();
    expect(radius).toMatch(/^\d+%\s+\d+%\s+\d+%\s+\d+%\s+\/\s+\d+%\s+\d+%\s+\d+%\s+\d+%$/);
  });

  it('should generate blob result with css and svg code', () => {
    const blob = generateBlob('30% 70% 70% 30% / 30% 30% 70% 70%', '#6366F1');
    expect(blob.css).toContain('border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;');
    expect(blob.svgCode).toContain('<svg viewBox="-100 -100 200 200"');
    expect(blob.svgCode).toContain('fill="#6366F1"');
  });
});
