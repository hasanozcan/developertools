import { describe, it, expect } from 'vitest';
import { formatDockerCompose } from './dockerComposeFormatter';

describe('formatDockerCompose', () => {
  it('replaces tabs with spaces in docker compose yaml', () => {
    const input = 'version: "3.8"\nservices:\n\tapp:\n\t\timage: redis';
    const res = formatDockerCompose(input);
    expect(res).not.toContain('\t');
    expect(res).toContain('  app:');
  });
});