import { describe, it, expect } from 'vitest';
import { generateStoredProcedure } from './sqlStoredProcedureGenerator';

describe('sqlStoredProcedureGenerator', () => {
  it('generates SQL stored procedure', () => {
    expect(generateStoredProcedure('cleanup', 'events', 60)).toContain('CREATE PROCEDURE cleanup');
  });
});
