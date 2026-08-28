import { describe, it, expect } from 'vitest';
import { convertZodToTsType } from './zodToTypescriptType';

describe('zodToTypescriptType', () => {
  it('extracts zod types', () => {
    expect(convertZodToTsType('export const UserSchema = z.object({ name: z.string() })')).toContain('z.infer<typeof UserSchema>');
  });
});
