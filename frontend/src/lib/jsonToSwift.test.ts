import { describe, it, expect } from 'vitest';
import { jsonToSwift } from './jsonToSwift';

describe('jsonToSwift', () => {
  it('converts JSON to Swift Codable structs', () => {
    const json = JSON.stringify({ id: 101, title: 'Swift Doc', published: true });
    const swiftCode = jsonToSwift(json, 'Article');
    expect(swiftCode).toContain('struct Article: Codable, Identifiable {');
    expect(swiftCode).toContain('let id: Int');
    expect(swiftCode).toContain('let title: String');
    expect(swiftCode).toContain('let published: Bool');
  });
});
