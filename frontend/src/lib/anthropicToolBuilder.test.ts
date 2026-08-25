import { describe, expect, it } from 'vitest';
import { buildAnthropicToolDefinition } from './anthropicToolBuilder';

describe('anthropicToolBuilder', () => {
  it('generates valid Claude input_schema tool', () => {
    const code = buildAnthropicToolDefinition('get_weather', 'Get weather for location', [
      { name: 'location', type: 'string', description: 'City name', required: true }
    ]);
    const parsed = JSON.parse(code);
    expect(parsed[0].name).toBe('get_weather');
    expect(parsed[0].input_schema.type).toBe('object');
    expect(parsed[0].input_schema.required).toContain('location');
  });
});
