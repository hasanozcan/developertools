import { describe, it, expect } from 'vitest';
import { jsonToOpenAIFunctionSchema } from './openaiFunctionSchema';

describe('openaiFunctionSchema', () => {
  it('converts JSON object into OpenAI function calling schema format', () => {
    const input = JSON.stringify({
      location: 'San Francisco, CA',
      temperature_unit: 'celsius',
      days: 5,
    });

    const schemaStr = jsonToOpenAIFunctionSchema(input, {
      functionName: 'get_weather_forecast',
      description: 'Get weather forecast for a location',
    });

    const parsed = JSON.parse(schemaStr);
    expect(parsed.type).toBe('function');
    expect(parsed.function.name).toBe('get_weather_forecast');
    expect(parsed.function.parameters.type).toBe('object');
    expect(parsed.function.parameters.properties.location.type).toBe('string');
  });
});
