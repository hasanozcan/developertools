import { describe, it, expect } from 'vitest';
import { generateDockerfile } from './dockerfileAiGenerator';

describe('dockerfileAiGenerator', () => {
  it('generates multi-stage node dockerfile', () => {
    expect(generateDockerfile('node', 8080)).toContain('EXPOSE 8080');
  });
});
