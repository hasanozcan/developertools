import { describe, expect, it } from 'vitest';
import { encodeTransferredInput, readTransferredInput } from './toolWorkflow';

describe('tool workflow transfer', () => {
  it('round-trips content and type through a URL fragment', () => {
    const input = '{"hello":"world + 1"}';
    const hash = encodeTransferredInput(input, 'json');

    expect(readTransferredInput(hash)).toEqual({ value: input, dataType: 'json' });
  });

  it('accepts extension-style input without a type', () => {
    expect(readTransferredInput('#input=curl+-X+GET')).toEqual({
      value: 'curl -X GET',
      dataType: undefined,
    });
  });
});
