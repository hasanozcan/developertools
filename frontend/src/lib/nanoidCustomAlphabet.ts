import { secureRandomInt } from './passwordSecurity';

export function generateCustomNanoId(alphabet: string = '0123456789abcdefghijklmnopqrstuvwxyz', size: number = 21): string {
  if (!alphabet || alphabet.length === 0) {
    throw new RangeError('Alphabet must not be empty');
  }
  if (!Number.isSafeInteger(size) || size <= 0) {
    throw new RangeError('Size must be a positive safe integer');
  }

  let id = '';
  for (let i = 0; i < size; i++) {
    id += alphabet[secureRandomInt(alphabet.length)];
  }
  return id;
}
