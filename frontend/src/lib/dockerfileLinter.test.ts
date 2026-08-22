import { describe, it, expect } from 'vitest';
import { lintDockerfile } from './dockerfileLinter';

describe('dockerfileLinter', () => {
  it('detects best practice issues in Dockerfiles', () => {
    const df = 'FROM node:latest\nRUN apt-get update\nCOPY . .\nCMD ["npm", "start"]';
    const issues = lintDockerfile(df);
    expect(issues.length).toBeGreaterThan(0);
    expect(issues.some((i) => i.message.includes(':latest'))).toBe(true);
  });
});
