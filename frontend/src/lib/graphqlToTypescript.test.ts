import { describe, it, expect } from 'vitest';
import { graphqlToTypescript } from './graphqlToTypescript';

describe('graphqlToTypescript', () => {
  it('converts GraphQL SDL types to TypeScript interfaces', () => {
    const sdl = `
type User {
  id: ID!
  username: String!
  age: Int
  friends: [User]
}
`;
    const ts = graphqlToTypescript(sdl);
    expect(ts).toContain('export interface User {');
    expect(ts).toContain('id: string;');
    expect(ts).toContain('username: string;');
    expect(ts).toContain('age?: number;');
    expect(ts).toContain('friends?: User[];');
  });
});
