import { describe, it, expect } from 'vitest';
import { convertOpenApiToTypeScript } from './swaggerToTypescript';

describe('swaggerToTypescript', () => {
  it('generates TypeScript interfaces and client from OpenAPI JSON', () => {
    const schema = JSON.stringify({
      openapi: '3.0.0',
      info: { title: 'PetStore', version: '1.0' },
      components: {
        schemas: {
          Pet: {
            type: 'object',
            required: ['id', 'name'],
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              status: { type: 'string', enum: ['available', 'sold'] }
            }
          }
        }
      },
      paths: {
        '/pets': {
          get: { operationId: 'getPets' }
        }
      }
    });

    const result = convertOpenApiToTypeScript(schema);
    expect(result).toContain('export interface Pet {');
    expect(result).toContain('id: number;');
    expect(result).toContain("status?: 'available' | 'sold';");
    expect(result).toContain('async getPets(options?: RequestInit): Promise<any>');
  });
});
