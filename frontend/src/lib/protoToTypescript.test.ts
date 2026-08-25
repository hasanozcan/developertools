import { describe, expect, it } from 'vitest';
import { protoToTypescript } from './protoToTypescript';

describe('protoToTypescript', () => {
  it('converts proto3 messages to TypeScript interfaces', () => {
    const proto = `message UserProfile {
      string id = 1;
      string email = 2;
      int32 age = 3;
      repeated string tags = 4;
    }`;
    const ts = protoToTypescript(proto);
    expect(ts).toContain('export interface UserProfile {');
    expect(ts).toContain('email?: string;');
    expect(ts).toContain('tags?: string[];');
  });
});
