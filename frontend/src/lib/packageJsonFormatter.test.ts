import { describe, it, expect } from 'vitest';
import { formatPackageJson } from './packageJsonFormatter';

describe('packageJsonFormatter', () => {
  it('sorts dependencies and formats package.json alphabetically', () => {
    const raw = JSON.stringify({
      name: 'my-app',
      dependencies: { zod: '^3.0', react: '^19.0', next: '^15.0' },
    });
    const formatted = formatPackageJson(raw);
    const parsed = JSON.parse(formatted);
    expect(Object.keys(parsed.dependencies)).toEqual(['next', 'react', 'zod']);
  });
});
