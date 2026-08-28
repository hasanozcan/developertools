import { describe, it, expect } from 'vitest';
import { convertTsInterfaceToZod } from './typescriptInterfaceToZod';

describe('typescriptInterfaceToZod', () => {
  it('converts interface to zod', () => {
    expect(convertTsInterfaceToZod('interface Item { id: number; }')).toContain('z.object');
  });
});
