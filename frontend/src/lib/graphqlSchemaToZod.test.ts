import { describe, it, expect } from 'vitest';
import { convertGraphqlToZod } from './graphqlSchemaToZod';

describe('graphqlSchemaToZod', () => {
  it('converts GraphQL type and enum to Zod schema', () => {
    const sdl = `
enum Role {
  ADMIN
  USER
}

type User {
  id: ID!
  name: String!
  age: Int
  roles: [String!]!
}
`;

    const zodCode = convertGraphqlToZod(sdl);
    expect(zodCode).toContain('export const RoleSchema = z.enum(');
    expect(zodCode).toContain('export const UserSchema = z.object({');
    expect(zodCode).toContain('id: z.string(),');
    expect(zodCode).toContain('age: z.number().int().nullable().optional(),');
    expect(zodCode).toContain('roles: z.array(z.string()),');
  });
});
