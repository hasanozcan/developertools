import { describe, it, expect } from 'vitest';
import { buildOpenAiToolDefinition } from './llmFunctionCallingBuilder';

describe('llmFunctionCallingBuilder', () => {
  it('builds OpenAI tool and function calling schema', () => {
    const tool = buildOpenAiToolDefinition({
      name: 'get_weather',
      description: 'Get current weather in location',
      parameters: [
        { name: 'location', type: 'string', description: 'City name', required: true },
        { name: 'unit', type: 'string', description: 'Temperature unit', required: false, enumOptions: ['celsius', 'fahrenheit'] }
      ]
    });

    expect(tool.function.name).toBe('get_weather');
    expect(tool.function.parameters.required).toEqual(['location']);
    expect(tool.function.parameters.properties.unit.enum).toEqual(['celsius', 'fahrenheit']);
  });
});
