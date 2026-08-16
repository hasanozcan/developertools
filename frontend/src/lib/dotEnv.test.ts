import { describe, expect, it } from 'vitest';
import { convertDotEnvToJson, convertJsonToDotEnv, parseDotEnv } from './dotEnv';

describe('parseDotEnv', () => {
  it('parses comments, export prefixes, quotes, escapes, and multiline values', () => {
    const result = parseDotEnv(
      [
        '# local sample',
        'export API_URL=https://example.com',
        'MESSAGE="hello\\nworld" # comment',
        "LITERAL='value # stays'",
        'MULTILINE="first',
        'second"',
      ].join('\n'),
    );

    expect(result.value).toEqual({
      API_URL: 'https://example.com',
      MESSAGE: 'hello\nworld',
      LITERAL: 'value # stays',
      MULTILINE: 'first\nsecond',
    });
    expect(result.warnings).toEqual([]);
  });

  it('optionally infers JSON primitives without converting leading-zero strings', () => {
    const result = parseDotEnv('ENABLED=true\nPORT=3000\nEMPTY=null\nCODE=0012', {
      inferTypes: true,
    });

    expect(result.value).toEqual({ ENABLED: true, PORT: 3000, EMPTY: null, CODE: '0012' });
  });

  it('uses the last duplicate and keeps prototype-like keys as ordinary data', () => {
    const result = parseDotEnv('VALUE=first\nVALUE=second\n__proto__=safe');

    expect(result.value.VALUE).toBe('second');
    expect(result.value.__proto__).toBe('safe');
    expect(result.warnings).toHaveLength(1);
  });

  it('rejects malformed and unterminated assignments with line numbers', () => {
    expect(() => parseDotEnv('VALID=yes\nnot an assignment')).toThrow('Line 2');
    expect(() => parseDotEnv('VALUE="unfinished')).toThrow('unterminated quoted value');
  });
});

describe('dotenv and JSON conversion', () => {
  it('formats dotenv as indented JSON', () => {
    expect(convertDotEnvToJson('PORT=3000\nDEBUG=false', { inferTypes: true }).output).toBe(
      '{\n  "PORT": 3000,\n  "DEBUG": false\n}',
    );
  });

  it('serializes JSON primitives and structured values safely', () => {
    const result = convertJsonToDotEnv(
      '{"NAME":"hello world","PORT":3000,"ENABLED":true,"EMPTY":null,"FLAGS":["a","b"]}',
    );

    expect(result.output).toBe(
      'NAME="hello world"\nPORT=3000\nENABLED=true\nEMPTY=""\nFLAGS="[\\"a\\",\\"b\\"]"',
    );
    expect(result.warnings).toHaveLength(2);
  });

  it('rejects non-object JSON and invalid environment variable names', () => {
    expect(() => convertJsonToDotEnv('[]')).toThrow('must be an object');
    expect(() => convertJsonToDotEnv('{"1INVALID":"value"}')).toThrow(
      'Invalid environment variable name',
    );
  });
});
