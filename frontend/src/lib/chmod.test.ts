import { describe, expect, it } from 'vitest';
import { formatChmod, parseChmod } from './chmod';

describe('chmod conversion', () => {
  it.each([
    ['755', 'rwxr-xr-x'],
    ['0644', 'rw-r--r--'],
    ['4755', 'rwsr-xr-x'],
    ['2750', 'rwxr-s---'],
    ['1777', 'rwxrwxrwt'],
    ['4700', 'rws------'],
    ['4600', 'rwS------'],
  ])('converts %s to %s', (input, symbolic) => {
    expect(formatChmod(parseChmod(input)).symbolic).toBe(symbolic);
  });

  it('round-trips special bits and builds a command', () => {
    expect(formatChmod(parseChmod('6755'))).toEqual({
      octal: '6755',
      symbolic: 'rwsr-sr-x',
      command: 'chmod 6755',
    });
  });

  it.each(['', '88', '999', '12345', '7a5', '-755'])('rejects invalid mode %j', (input) => {
    expect(() => parseChmod(input)).toThrow();
  });
});
