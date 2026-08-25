import { describe, expect, it } from 'vitest';
import { generateDotenvFromCompose } from './dockerComposeEnvGenerator';

describe('dockerComposeEnvGenerator', () => {
  it('extracts variable placeholders into .env format', () => {
    const yaml = 'image: postgres:${PG_VERSION:-16}\nenvironment:\n  - POSTGRES_PASSWORD=${DB_PASS}';
    const env = generateDotenvFromCompose(yaml);
    expect(env).toContain('PG_VERSION=');
    expect(env).toContain('DB_PASS=');
  });
});
