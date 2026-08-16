import { describe, expect, it } from 'vitest';
import { OpenApiError, analyzeOpenApi, isOpenApiOperationMethod } from './openApi';

const validYaml = `openapi: 3.1.0
info:
  title: Pet API
  version: 1.0.0
servers:
  - url: https://api.example.test
security:
  - bearerAuth: []
paths:
  /pets/{id}:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
    get:
      operationId: getPet
      summary: Read one pet
      tags: [pets]
      responses:
        '200':
          description: Found
        '404':
          description: Missing
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
`;

describe('OpenAPI analysis', () => {
  it('parses valid YAML and inventories operations', () => {
    const analysis = analyzeOpenApi(validYaml);

    expect(analysis.valid).toBe(true);
    expect(analysis.format).toBe('YAML');
    expect(analysis.title).toBe('Pet API');
    expect(analysis.stats).toEqual({
      paths: 1,
      operations: 1,
      tags: 1,
      deprecated: 0,
      externalReferences: 0,
    });
    expect(analysis.endpoints[0]).toEqual({
      path: '/pets/{id}',
      method: 'GET',
      summary: 'Read one pet',
      operationId: 'getPet',
      tags: ['pets'],
      deprecated: false,
      responseCodes: ['200', '404'],
      security: 'secured',
    });
  });

  it('reports structural errors and duplicate operation IDs', () => {
    const analysis = analyzeOpenApi(
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Broken', version: '1' },
        paths: {
          '/first': { get: { operationId: 'same', responses: { 200: { description: 'ok' } } } },
          '/second/{id}': { post: { operationId: 'same' } },
        },
      }),
    );
    const codes = analysis.messages.map((message) => message.code);

    expect(analysis.valid).toBe(false);
    expect(codes).toContain('duplicate-operation-id');
    expect(codes).toContain('missing-responses');
    expect(codes).toContain('missing-path-parameter');
    expect(codes).toContain('missing-servers');
  });

  it('does not fetch external references and detects missing local references', () => {
    const analysis = analyzeOpenApi(`openapi: 3.0.3
info: { title: Refs, version: '1' }
paths:
  /items:
    get:
      operationId: listItems
      responses:
        '200':
          $ref: '#/components/responses/Missing'
components:
  schemas:
    Remote:
      $ref: https://example.test/schema.yaml#/Item
`);

    expect(analysis.messages.map((message) => message.code)).toEqual(
      expect.arrayContaining(['unresolved-local-reference', 'external-reference-not-resolved']),
    );
    expect(analysis.stats.externalReferences).toBe(1);
  });

  it('rejects non-object roots, oversized input, and unsupported versions', () => {
    expect(() => analyzeOpenApi('[]')).toThrow(OpenApiError);
    expect(() => analyzeOpenApi('x'.repeat(1_000_001))).toThrow(/limited/u);
    expect(
      analyzeOpenApi('{"openapi":"2.0","info":{},"paths":{}}').messages.map(
        (message) => message.code,
      ),
    ).toContain('unsupported-openapi-version');
    expect(isOpenApiOperationMethod('PATCH')).toBe(true);
    expect(isOpenApiOperationMethod('CONNECT')).toBe(false);
  });
});
